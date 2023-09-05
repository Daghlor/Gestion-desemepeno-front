import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesChart4Component } from './informes-chart4.component';

describe('InformesChart4Component', () => {
  let component: InformesChart4Component;
  let fixture: ComponentFixture<InformesChart4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesChart4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesChart4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
