import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesComprasProductoComponent } from './reportes-compras-producto.component';

describe('ReportesComprasProductoComponent', () => {
  let component: ReportesComprasProductoComponent;
  let fixture: ComponentFixture<ReportesComprasProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesComprasProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesComprasProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
