import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { cold, hot } from 'jasmine-marbles';
import { UserEffects } from './user.effects';
import { fromUserActions } from './user.actions';
import { UserDataService } from '../services/user-data.service';
import { getClassMethodsNames } from '@valueadd/testing';

describe('UserEffects', () => {
  let userDataService: jasmine.SpyObj<UserDataService>;
  let actions: Observable<any>;
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [
        UserEffects,
        DataPersistence,
        provideMockActions(() => actions),
        {
          provide: UserDataService,
          useValue: jasmine.createSpyObj('userDataService', getClassMethodsNames(UserDataService))
        }
      ]
    });

    effects = TestBed.get(UserEffects);
    userDataService = TestBed.get(UserDataService);
  });

  describe('getUserStatisticsCollection$', () => {
    it('should be successful', () => {
      const payload = {} as any;
      const action = new fromUserActions.GetUserStatisticsCollection({} as any);
      const completion = new fromUserActions.GetUserStatisticsCollectionSuccess(payload);

      actions = hot('-a', { a: action });
      const response = cold('--b|', { b: payload });
      const expected = cold('---c', { c: completion });
      userDataService.getUserStatisticsCollection.and.returnValue(response);

      expect(effects.getUserStatisticsCollection$).toBeObservable(expected);
      expect(userDataService.getUserStatisticsCollection).toHaveBeenCalled();
    });

    it('should fail', () => {
      const payload = {} as any;
      const action = new fromUserActions.GetUserStatisticsCollection({} as any);
      const completion = new fromUserActions.GetUserStatisticsCollectionFail(payload);

      actions = hot('-a', { a: action });
      const response = cold('-#', {}, payload);
      const expected = cold('--c', { c: completion });
      userDataService.getUserStatisticsCollection.and.returnValue(response);

      expect(effects.getUserStatisticsCollection$).toBeObservable(expected);
      expect(userDataService.getUserStatisticsCollection).toHaveBeenCalled();
    });
  });
});
