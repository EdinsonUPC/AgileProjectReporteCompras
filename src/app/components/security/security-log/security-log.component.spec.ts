import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityLogComponent } from './security-log.component';

describe('SecurityLogComponent', () => {
  let component: SecurityLogComponent;
  let fixture: ComponentFixture<SecurityLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
