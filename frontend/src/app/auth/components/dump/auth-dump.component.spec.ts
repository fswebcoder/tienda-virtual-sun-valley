import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDumpComponent } from './auth-dump.component';

describe('AuthDumpComponent', () => {
  let component: AuthDumpComponent;
  let fixture: ComponentFixture<AuthDumpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthDumpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthDumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
