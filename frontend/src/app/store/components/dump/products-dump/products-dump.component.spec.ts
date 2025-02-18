import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDumpComponent } from './products-dump.component';

describe('ProductsDumpComponent', () => {
  let component: ProductsDumpComponent;
  let fixture: ComponentFixture<ProductsDumpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDumpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
