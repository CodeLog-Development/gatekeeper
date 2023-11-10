import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { StoreItemResponse } from './dto/item.interface';
import { StoreService } from './store.service';
import {
  NewTransaction,
  NewTransactionResponse,
} from './dto/new-transaction.dto';
import { Request } from '../api.interface';
import { PaystackEvent } from './dto/paystack-event.dto';
import { FirebaseService } from '../firebase/firebase.service';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('store')
export class StoreController {
  private logger = new Logger(StoreController.name);

  constructor(
    private storeService: StoreService,
    private firebaseService: FirebaseService,
    private config: ConfigService,
  ) { }

  @Get('items')
  async getAvailableItems(): Promise<StoreItemResponse> {
    const items = await this.storeService.getAllItems();
    if (items === undefined) {
      return { success: false, message: 'Failed to retrieve store items' };
    }

    return { success: true, message: 'Retrieved store items', items };
  }

  @Post('purchase')
  async purchaseItem(
    @Req() request: Request,
    @Body() newTransaction: NewTransaction,
  ): Promise<NewTransactionResponse> {
    if (!request.user) {
      throw new UnauthorizedException('Not logged in');
    }

    const transaction = await this.storeService.newTransaction(
      request.user?.email,
      newTransaction.itemId,
    );

    if (!transaction) {
      return { success: false, message: 'Failed to create transaction' };
    }

    return {
      success: true,
      message: 'Created new transaction',
      transactionDetails: {
        amount: transaction.amount,
        reference: transaction.ref,
        currency: 'ZAR',
        customerEmail: request.user.email,
      },
    };
  }

  @Post('complete')
  async completeTransaction(
    @Req() request: Request,
    @Body() body: PaystackEvent,
  ) {
    const secret = this.config.get<string>('paystackSecret');
    const firestore = this.firebaseService.getFirestore();
    if (!firestore) {
      this.logger.fatal('No firebase database available');
      throw new InternalServerErrorException(
        'Failed to communicate with database. Try again later, please',
      );
    }

    if (secret === undefined) {
      this.logger.fatal('No paystack secret available');
      throw new InternalServerErrorException('Failed to create transaction');
    }

    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(body))
      .digest('hex');

    if (hash !== request.headers['x-paystack-signature']) {
      throw new BadRequestException('Invalid signature');
    }

    this.logger.log('Received paystack event with good signature: ', body);

    if (body.event === 'charge.success') {
      const { reference } = body.data;
      const snapshot = await firestore
        .collection('/pendingTransactions')
        .where('reference', '==', reference)
        .limit(1)
        .get();

      if (snapshot.docs.length !== 1) {
        this.logger.error(
          "Failed to find the transaction referred to by paystack event. Someone's probably losing money!",
        );
        throw new BadRequestException('No such transaction exists');
      }

      const doc = snapshot.docs[0];
      try {
        await doc.ref.update({ completed: true });
      } catch (e) {
        this.logger.error(
          "Failed to update transaction. Someone's  probably losing money!",
        );
        throw new InternalServerErrorException(
          'Failed to update transaction state',
        );
      }
    }
  }
}
