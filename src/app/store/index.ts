import { InjectionToken } from '@angular/core';
import * as contentReducer from '../pages/container-module/store/container';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface AppState {
  ['container']: contentReducer.ThingContainerStateInterface;
}

export const ROOT_REDUCERS = new InjectionToken('Root reducers token', {
    factory: () => ({
      ['container']: contentReducer.reducer,
    })
  }
);

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  if (environment.storeDebug) {
    return (state, action) => reducer(state, action);
  }
  return (state, action) => reducer(state, action);
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [debug] : [];
