import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryStatisticsComponent } from './repository-statistics.component';

describe('RepositoryStatisticsComponent', () => {
  let component: RepositoryStatisticsComponent;
  let fixture: ComponentFixture<RepositoryStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoryStatisticsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
