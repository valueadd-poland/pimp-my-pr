import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { cold, hot } from 'jest-marbles';
import { TimelineEffects } from './timeline.effects';
import { fromTimelineActions } from './timeline.actions';
import { TimelineDataService } from '../services/timeline-data.service';
import { createSpyObj } from 'jest-createspyobj';

describe('TimelineEffects', () => {
  let timelineDataService: jest.Mocked<TimelineDataService>;
  let actions: Observable<any>;
  let effects: TimelineEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        TimelineEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore({ initialState: {} }),
        {
          provide: TimelineDataService,
          useValue: createSpyObj(TimelineDataService)
        }
      ]
    });

    effects = TestBed.get(TimelineEffects);
    timelineDataService = TestBed.get(TimelineDataService);
  });

  describe('getTimelineRecord$', () => {
    test('returns GetTimelineSuccess action on success', () => {
      const payload = {} as any;
      const action = new fromTimelineActions.GetTimeline({} as any);
      const completion = new fromTimelineActions.GetTimelineSuccess(payload);

      actions = hot('-a', { a: action });
      const response = cold('--b|', { b: payload });
      const expected = cold('---c', { c: completion });
      timelineDataService.getTimeline.mockReturnValue(response);

      expect(effects.getTimeline$).toSatisfyOnFlush(() => {
        expect(timelineDataService.getTimeline).toHaveBeenCalled();
      });
      expect(effects.getTimeline$).toBeObservable(expected);
    });

    test('returns GetTimelineFail action on fail', () => {
      const payload = {} as any;
      const action = new fromTimelineActions.GetTimeline({} as any);
      const completion = new fromTimelineActions.GetTimelineFail(payload);

      actions = hot('-a', { a: action });
      const response = cold('-#', {}, payload);
      const expected = cold('--c', { c: completion });
      timelineDataService.getTimeline.mockReturnValue(response);

      expect(effects.getTimeline$).toSatisfyOnFlush(() => {
        expect(timelineDataService.getTimeline).toHaveBeenCalled();
      });
      expect(effects.getTimeline$).toBeObservable(expected);
    });
  });
});
