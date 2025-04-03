import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSinistreListComponent } from './admin-sinistre-list.component';

describe('AdminSinistreListComponent', () => {
  let component: AdminSinistreListComponent;
  let fixture: ComponentFixture<AdminSinistreListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSinistreListComponent]
    });
    fixture = TestBed.createComponent(AdminSinistreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
