import { TestBed, waitForAsync } from '@angular/core/testing';
import { StatusPageComponent } from './status.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ServerStatusService } from './server.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

describe('StatusPageComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [StatusPageComponent],
      providers: [ServerStatusService, AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the status page component', () => {
    const fixture = TestBed.createComponent(StatusPageComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});
