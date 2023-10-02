import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  }));

  it('should be able to report the login status', async () => {
    const isLoggedIn = service.isLoggedIn();
    expect(isLoggedIn).toBeDefined();
  });
});
