import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  }));

  it('should be able to report the login status', async () => {
    const isLoggedIn = await service.isLoggedIn();
    expect(isLoggedIn).toBeDefined();
  });
});
