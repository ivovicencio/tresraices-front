import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteDetalle } from './lote-detalle';

describe('LoteDetalle', () => {
  let component: LoteDetalle;
  let fixture: ComponentFixture<LoteDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(LoteDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
