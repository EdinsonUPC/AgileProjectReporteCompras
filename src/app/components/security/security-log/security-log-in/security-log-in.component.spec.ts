import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityLogInComponent } from './security-log-in.component';

describe('SecurityLogInComponent', () => {
  let component: SecurityLogInComponent;
  let fixture: ComponentFixture<SecurityLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityLogInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
