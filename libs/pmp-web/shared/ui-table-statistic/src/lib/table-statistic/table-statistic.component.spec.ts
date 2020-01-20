import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStatisticComponent } from './table-statistic.component';

describe('TableStatisticComponent', () => {
  let component: TableStatisticComponent;
  let fixture: ComponentFixture<TableStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableStatisticComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
