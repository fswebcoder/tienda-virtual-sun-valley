import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSmartComponent } from './products-smart.component';

describe('ProductsSmartComponent', () => {
  let component: ProductsSmartComponent;
  let fixture: ComponentFixture<ProductsSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
