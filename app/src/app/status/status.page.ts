import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gatekeeper-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
  ngOnInit(): void {
    console.log(' 🚀 status.page.ts:10 ~ ngOnInit()');
  }
}
