import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStoreSmartComponent } from './home-store-smart.component';

describe('HomeStoreSmartComponent', () => {
  let component: HomeStoreSmartComponent;
  let fixture: ComponentFixture<HomeStoreSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeStoreSmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeStoreSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
