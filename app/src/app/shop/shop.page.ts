import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Subscription } from 'rxjs';
import { TokenBundle } from '@gatekeeper/api';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'gatekeeper-shop-page',
  templateUrl: 'shop.page.html',
  styleUrls: ['shop.page.scss'],
})
export class ShopPageComponent implements OnInit, OnDestroy {
  loaded = false;
  selectedCurrency = 'zar';
  currencySymbol = 'R';
  bundles: { id: string; amount: number; price: number }[] = [];

  private bundlesSubscription?: Subscription;
  private exchangeRateSubscription?: Subscription;
  private zarEuro?: number;

  constructor(
    private shopService: ShopService,
    private actionSheetController: ActionSheetController,
  ) {}

  ngOnDestroy(): void {
    this.bundlesSubscription?.unsubscribe();
    this.exchangeRateSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.bundlesSubscription = this.shopService
      .getTokenBundles()
      .subscribe((bundles) => this.handleTokenBundles(bundles));
    this.exchangeRateSubscription = this.shopService
      .getExchangeRate()
      .subscribe((data) => {
        if (data?.success) {
          this.zarEuro = data.rate;
        }
      });
  }

  localPrice(zarValue: number): number {
    if (this.selectedCurrency === 'zar') {
      return zarValue;
    } else if (this.selectedCurrency === 'eur') {
      return zarValue * (this.zarEuro || 1);
    } else {
      return 1;
    }
  }

  handleTokenBundles(bundles: TokenBundle[]) {
    this.bundles = [];
    for (const b of bundles) {
      this.bundles.push({
        id: b.bundleId,
        amount: b.tokenAmount,
        price: this.localPrice(b.zarValue),
      });
    }
    this.loaded = true;
  }

  currencyChanged() {
    this.loaded = false;
    if (this.bundlesSubscription) {
      this.bundlesSubscription.unsubscribe();
      this.bundlesSubscription = undefined;
    }

    this.bundlesSubscription = this.shopService
      .getTokenBundles()
      .subscribe((bundles) => this.handleTokenBundles(bundles));

    if (this.selectedCurrency == 'zar') {
      this.currencySymbol = 'R';
    } else if (this.selectedCurrency === 'eur') {
      this.currencySymbol = '€';
    }
  }

  async purchaseBundle(id: string) {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: 'Purchase bundle?',
      buttons: [
        {
          text: 'Buy',
          role: 'destructive',
          data: {
            action: 'buy',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss<{
      action: 'buy' | 'cancel';
    }>();

    if (result.data?.action === 'buy') {
      console.log(' 🚀 ~ shop.page.ts → User wants to buy bundle with id', id);
    }
  }
}
