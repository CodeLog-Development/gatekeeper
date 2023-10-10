import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gatekeeper-shop-page',
  templateUrl: 'shop.page.html',
  styleUrls: ['shop.page.scss'],
})
export class ShopPageComponent implements OnInit {
  loaded = false;
  selectedCurrency = 'zar';

  ngOnInit(): void {
    this.loaded = true;
  }
}
