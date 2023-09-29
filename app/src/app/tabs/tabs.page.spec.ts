import { TestBed, waitForAsync } from '@angular/core/testing';
import { TabsPage } from './tabs.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TabsPage', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TabsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the page', () => {
    const fixture = TestBed.createComponent(TabsPage);
    const page = fixture.debugElement.componentInstance;
    expect(page).toBeTruthy();
  });
});
