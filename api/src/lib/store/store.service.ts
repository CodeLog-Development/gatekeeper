import { Injectable, Logger } from '@nestjs/common';
import { StoreItem } from './dto/item.interface';
import { FirebaseService } from '../firebase/firebase.service';
import { Transaction } from './dto/new-transaction.dto';
import * as crypto from 'crypto';

@Injectable()
export class StoreService {
  private logger = new Logger(StoreService.name);

  constructor(private firebaseService: FirebaseService) { }

  async getAllItems(): Promise<StoreItem[] | undefined> {
    const firestore = this.firebaseService.getFirestore();
    if (!firestore) {
      this.logger.fatal('No firebase database is available');
      return undefined;
    }

    const docs = await firestore.collection('/storeItems').get();
    const result: StoreItem[] = [];

    for (const doc of docs.docs) {
      result.push(doc.data() as StoreItem);
    }

    return result;
  }

  async newTransaction(
    email: string,
    itemId: string,
  ): Promise<{ ref: string; amount: number } | undefined> {
    const firestore = this.firebaseService.getFirestore();
    if (!firestore) {
      this.logger.fatal('No firebase database is available');
      return undefined;
    }

    const snapshot = await firestore
      .collection('/storeItems')
      .where('id', '==', itemId)
      .limit(1)
      .get();

    if (snapshot.docs.length !== 1) {
      return undefined;
    }

    const doc = snapshot.docs[0].data() as StoreItem;
    const transaction: Transaction = new Transaction({
      customerEmail: email,
      reference: crypto.randomBytes(16).toString('hex'),
      completed: false,
    });

    await firestore.collection('/pendingTransactions').add(transaction);
    return { ref: transaction.reference, amount: doc.price };
  }
}
