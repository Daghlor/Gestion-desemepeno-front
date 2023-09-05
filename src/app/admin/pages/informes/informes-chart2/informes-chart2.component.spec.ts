import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesChart2Component } from './informes-chart2.component';

describe('InformesChart2Component', () => {
  let component: InformesChart2Component;
  let fixture: ComponentFixture<InformesChart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesChart2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
