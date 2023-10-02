import { TestBed, waitForAsync } from '@angular/core/testing';
import { TabsPage } from './tabs.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('TabsPage', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TabsPage],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the page', () => {
    const fixture = TestBed.createComponent(TabsPage);
    const page = fixture.debugElement.componentInstance;
    expect(page).toBeTruthy();
  });
});
