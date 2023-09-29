import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gatekeeper-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusPageComponent implements OnInit {
  ngOnInit(): void {
    console.log(' 🚀 status.page.ts:10 ~ ngOnInit()');
  }
}
