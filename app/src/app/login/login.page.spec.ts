import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthModule } from '../auth/auth.module';
import { LoginPage } from './login.page';
import { HttpClientModule } from '@angular/common/http';

describe('LoginPage', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule, HttpClientModule],
    });
  }));

  it('should be able to create the login page', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});
