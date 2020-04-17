import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map, pluck, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionStatusResolverService {
  constructor(private actions$: Actions, private store: Store<any>) {}
  resolve<T = Action>(
    actionToDispatch: Action,
    successType: string,
    failType: string,
    t = 30000
  ): Observable<T> {
    setTimeout(() => {
      this.store.dispatch(actionToDispatch);
    });
    return this.actions$.pipe(
      ofType(successType, failType),
      timeout(t),
      first(),
      map(action => {
        if (action.type === successType) {
          return (action as unknown) as T;
        } else {
          const a = action as any;
          throw a.payload ? a.payload : a;
        }
      }),
      pluck('payload')
    );
  }
}
