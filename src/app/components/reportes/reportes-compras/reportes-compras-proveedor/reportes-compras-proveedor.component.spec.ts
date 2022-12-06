import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesComprasProveedorComponent } from './reportes-compras-proveedor.component';

describe('ReportesComprasProveedorComponent', () => {
  let component: ReportesComprasProveedorComponent;
  let fixture: ComponentFixture<ReportesComprasProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesComprasProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesComprasProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
