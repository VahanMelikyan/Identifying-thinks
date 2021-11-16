import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromContainer from './container/container.reducer';

export interface ContainerState {
  items: fromContainer.ThingContainerStateInterface;
}


export const reducers: ActionReducerMap<ContainerState> = {
  items: fromContainer.reducer,
};

const featureKey = 'container';
export const containerFeatureKey = featureKey;

export const getContainerItemsState = createFeatureSelector<ContainerState>(featureKey);
