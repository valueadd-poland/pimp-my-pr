import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserStatisticsTableComponent } from './single-user-statistics-table.component';

describe('SingleUserStatisticsTableComponent', () => {
  let component: SingleUserStatisticsTableComponent;
  let fixture: ComponentFixture<SingleUserStatisticsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleUserStatisticsTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserStatisticsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
