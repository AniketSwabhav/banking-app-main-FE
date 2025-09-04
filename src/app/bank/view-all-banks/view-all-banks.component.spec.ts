import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllBanksComponent } from './view-all-banks.component';

describe('ViewAllBanksComponent', () => {
  let component: ViewAllBanksComponent;
  let fixture: ComponentFixture<ViewAllBanksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ViewAllBanksComponent]
    });
    fixture = TestBed.createComponent(ViewAllBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
