import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDefaultComponent } from './menu-default.component';

describe('MenuDefaultComponent', () => {
  let component: MenuDefaultComponent;
  let fixture: ComponentFixture<MenuDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
