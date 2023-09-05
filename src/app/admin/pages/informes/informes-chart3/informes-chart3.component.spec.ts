import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesChart3Component } from './informes-chart3.component';

describe('InformesChart3Component', () => {
  let component: InformesChart3Component;
  let fixture: ComponentFixture<InformesChart3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesChart3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesChart3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
