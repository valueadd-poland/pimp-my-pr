import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { UserEffects } from './user.effects';
import { UserFacade } from './user.facade';
import { UserState, initialState, userReducer } from './user.reducer';
import { UserDataService } from '../services/user-data.service';
import { of } from 'rxjs';
import { getClassMethodsNames } from '@valueadd/testing';

describe('UserFacade', () => {
  let userDataService: jasmine.SpyObj<UserDataService>;
  let facade: UserFacade;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('user', userReducer, { initialState }),
          EffectsModule.forFeature([UserEffects])
        ],
        providers: [UserFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({
        imports: [RootModule],
        providers: [
          {
            provide: UserDataService,
            useValue: jasmine.createSpyObj('userDataService', getClassMethodsNames(UserDataService))
          }
        ]
      });

      facade = TestBed.get(UserFacade);
      userDataService = TestBed.get(UserDataService);
    });

    describe('#getUserStatisticsCollection', () => {
      it('should set userStatisticsCollection, userStatisticsCollectionLoading, userStatisticsCollectionLoadError', async done => {
        try {
          let userStatisticsCollection = await readFirst(facade.userStatisticsCollection$);
          let userStatisticsCollectionLoading = await readFirst(
            facade.userStatisticsCollectionLoading$
          );
          let userStatisticsCollectionLoadError = await readFirst(
            facade.userStatisticsCollectionLoadError$
          );

          expect(userStatisticsCollection).toEqual(initialState.userStatisticsCollection);
          expect(userStatisticsCollectionLoading).toEqual(
            initialState.userStatisticsCollectionLoading
          );
          expect(userStatisticsCollectionLoadError).toEqual(
            initialState.userStatisticsCollectionLoadError
          );

          const response = {} as any;
          userDataService.getUserStatisticsCollection.and.returnValue(of(response));
          facade.getUserStatisticsCollection({} as any);

          userStatisticsCollection = await readFirst(facade.userStatisticsCollection$);
          userStatisticsCollectionLoading = await readFirst(
            facade.userStatisticsCollectionLoading$
          );
          userStatisticsCollectionLoadError = await readFirst(
            facade.userStatisticsCollectionLoadError$
          );

          expect(userStatisticsCollection).toEqual(response);
          expect(userStatisticsCollectionLoading).toEqual(false);
          expect(userStatisticsCollectionLoadError).toEqual(null);

          done();
        } catch (err) {
          done.fail(err);
        }
      });
    });
  });
});
