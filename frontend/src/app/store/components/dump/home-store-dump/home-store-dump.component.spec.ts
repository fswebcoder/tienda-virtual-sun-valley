import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStoreDumpComponent } from './home-store-dump.component';

describe('HomeStoreDumpComponent', () => {
  let component: HomeStoreDumpComponent;
  let fixture: ComponentFixture<HomeStoreDumpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeStoreDumpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeStoreDumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
