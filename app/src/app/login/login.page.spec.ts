import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthModule } from '../auth/auth.module';
import { LoginPage } from './login.page';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from '../notification.service';

describe('LoginPage', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule, HttpClientModule],
      providers: [NotificationService],
    });
  }));

  it('should be able to create the login page', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});
