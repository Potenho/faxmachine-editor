import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtcControllerComponent } from './etc-controller.component';

describe('EtcControllerComponent', () => {
  let component: EtcControllerComponent;
  let fixture: ComponentFixture<EtcControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtcControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtcControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
