import { createSelector } from '@ngrx/store';
import { getContainerItemsState, ContainerState } from '..';
import { ThingContainerStateInterface } from './container.reducer';

export const getContainerState = createSelector(
  getContainerItemsState,
  (state: ContainerState) => state.items,
);

export const getContainerItems = createSelector(
  getContainerState,
  (state: ThingContainerStateInterface) => state.items.filter(({itemType}) => itemType === 'container' ),
);

export const getThingItems = createSelector(
  getContainerState,
  (state: ThingContainerStateInterface) => state.items.filter(({itemType}) => itemType !== 'container'),
);
