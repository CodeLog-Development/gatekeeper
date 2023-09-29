import { TestBed, waitForAsync } from '@angular/core/testing';
import { StatusPageComponent } from './status.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StatusPageComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StatusPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the status page component', () => {
    const fixture = TestBed.createComponent(StatusPageComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});
