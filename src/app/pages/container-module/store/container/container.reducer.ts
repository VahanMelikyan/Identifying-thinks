import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import * as ThingContainerAction from './container.action';


export interface ThingContainerItemInterface {
    'id': number;
    'title': string;
    'volume': number;
    'description': string;
    'itemType': string;
    'checked'?: boolean;
    'selectedThings'?: [];
    'freeSpace'?: number;
    'isContainer'?: boolean;
}

export interface ThingContainerStateInterface {
  items: ThingContainerItemInterface[];
}

const initialState: ThingContainerStateInterface = {
  items: null
};

const contentReducer = createReducer(
  initialState,
  on(ThingContainerAction.setThings, (state, things) => ({...state, ...things})),

  on(ThingContainerAction.removeThing, (state, {id}) => {
    const items = cloneDeep(state.items);
    let selectedItems = [];
    const thingIndex = items.findIndex(x => Number(x.id) === Number(id));
    if (thingIndex > -1) {
      if (items[thingIndex].itemType ==='container' && items[thingIndex].selectedThings) {
        selectedItems = items[thingIndex].selectedThings;
        selectedItems.forEach(item => item.isContainer = false);
      }
      items.splice(thingIndex, 1);
    }
    return {...state, items, ...selectedItems};
  }),

  on(ThingContainerAction.addThing, (state, item) => {
    const items = cloneDeep(state.items);
    const newItem = cloneDeep(item);
    newItem.freeSpace = newItem.volume;
    items.push(newItem);
    return {...state, items};
  }),

  on(ThingContainerAction.updateThing, (state, thing) => {
    const items = cloneDeep(state.items);
    const { id }: any = thing;
    const index = items.findIndex(x => x.id === id);
    items[index] = thing;
    return {...state, items};
  }),

  on(ThingContainerAction.moveToContainer, (state,  {selectedThingsIds, selectedContainerId}) => {
    const items = cloneDeep(state.items);
    const filteredThings = items.filter((item) => selectedThingsIds.includes(item.id));
    const index = items.findIndex(x => x.id === selectedContainerId);
    items.forEach(item => item.checked = false);
    items[index].selectedThings = items[index].selectedThings || [];
    items[index].selectedThings = [...items[index].selectedThings, ...filteredThings];
    const freeSpace = items[index].selectedThings.reduce((accumulator, current) => accumulator + current.volume, 0);
    items[index].freeSpace = Number(items[index].volume) - Number(freeSpace);
    selectedThingsIds.forEach(id => {
      items[items.findIndex((i) => id === i.id)].isContainer = true;
    });
    return {...state, items};
  }),


  on(ThingContainerAction.revertToThingsList, (state, {containerItemId, containerId}) => {
    const items = cloneDeep(state.items);
    const containerIndex = items.findIndex(x => x.id === containerId);
    const containerItemIndex = items[containerIndex].selectedThings.findIndex(x => x.id === containerItemId);
    items[containerIndex].freeSpace = Number(items[containerIndex].freeSpace) + Number(items[containerIndex].selectedThings[containerItemIndex].volume);
    items[containerIndex].selectedThings[containerItemIndex].isContainer = false;
    items[containerIndex].selectedThings.splice(containerItemIndex, 1);
    return {...state, items};
  }),

  on(ThingContainerAction.checkedContainer, (state, {id, checked}) => {
    const items = cloneDeep(state.items);
    const selectedIndex = items.findIndex(x => x.id === id);
    if (checked) {
      items.forEach((item, i) => {
        if (item.itemType === 'container') {
          items[i].checked = false;
        }
      });
    }
    items[selectedIndex].checked = checked;

    return {...state, items};
  }),

  on(ThingContainerAction.checkedThinks, (state, {id, checked}) => {
    const items = cloneDeep(state.items);
    const index = items.findIndex(x => x.id === id);
    items[index].checked = checked;
    return {...state, items};
  }),

);

export function reducer(state = initialState, action: Action) {
  return contentReducer(state, action);
}
