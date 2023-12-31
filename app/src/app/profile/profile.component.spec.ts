import { TestBed, waitForAsync } from '@angular/core/testing';
import { ProfilePageComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

describe('ProfilePageComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, HttpClientModule],
      declarations: [ProfilePageComponent],
      providers: [ProfileService, AuthService],
    }).compileComponents();
  }));

  it('should create the profile page component', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});
