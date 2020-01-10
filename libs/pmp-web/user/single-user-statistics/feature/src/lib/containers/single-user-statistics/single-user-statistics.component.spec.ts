import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserStatisticsComponent } from './single-user-statistics.component';

describe('SingleUserStatisticsComponent', () => {
  let component: SingleUserStatisticsComponent;
  let fixture: ComponentFixture<SingleUserStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleUserStatisticsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
