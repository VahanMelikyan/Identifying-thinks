import { createAction, props } from '@ngrx/store';
import { ThingContainerStateInterface } from './container.reducer';

export const setThings = createAction('[Container] Set all available things', props<ThingContainerStateInterface>());

export const removeThing = createAction('[Container] Remove thing', props<{ id: number }>());

export const addThing = createAction('[Container] add thing', props<{ thing: ThingContainerStateInterface }>());

export const updateThing = createAction('[Container] update thing', props<{ thing: ThingContainerStateInterface }>());

export const moveToContainer = createAction(
  '[Container] move to container',
  props<{ selectedThingsIds: number[]; selectedContainerId: number }>()
);

export const revertToThingsList = createAction(
  '[Container] revert to things list',
  props<{ containerItemId: number; containerId: number }>()
);

export const checkedContainer = createAction('[Container] checked container', props<{ id: number; checked: boolean }>());

export const checkedThinks = createAction('[Container] checked thinks', props<{ id: number; checked: boolean }>());
