import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletRechargeComponent } from './wallet-recharge.component';

describe('WalletRechargeComponent', () => {
  let component: WalletRechargeComponent;
  let fixture: ComponentFixture<WalletRechargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletRechargeComponent]
    });
    fixture = TestBed.createComponent(WalletRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
