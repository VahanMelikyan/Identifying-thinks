import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { validateNumber } from '../../validations/numeric';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getContainerState } from '../../pages/container-module/store/container/container.selectors';
import {
  addThing,
  ThingContainerItemInterface,
  ThingContainerStateInterface,
  updateThing
} from '../../pages/container-module/store/container';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  thingForm: FormGroup;
  title: string;
  destroyed$ = new Subject();
  nextId: number;
  id: number;
  formItem: ThingContainerItemInterface;
  type: string;


  constructor(
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private modalController: ModalController,
    private store: Store) {}

  ngOnInit(): void {

    this.type = this.navParams.get('type');
    this.title = this.type.toLowerCase() !== 'edit' ? `Add ${this.type}`:this.type;
    this.id = this.navParams.get('id');
    this.thingForm = this.formBuilder.group({
      description: [null, Validators.required],
      title: [null, Validators.required],
      volume: [null, [Validators.required, validateNumber ]]
    });

    this.store.select(getContainerState).pipe(takeUntil(this.destroyed$)).subscribe(({items}: ThingContainerStateInterface) => {
      this.nextId = items.length + 1;
      this.formItem = items.find(thing => thing.id === this.id);
    });

    if (this.type.toLowerCase() === 'edit') {
      this.thingForm.get('description').setValue(this.formItem.description);
      this.thingForm.get('title').setValue(this.formItem.title);
      this.thingForm.get('volume').setValue(this.formItem.volume);
    }

  }

  submit(): void {
    if (this.thingForm.invalid) {
      return;
    }

    const newThing = this.thingForm.value;

    if (this.type.toLowerCase() === 'edit') {
      newThing.itemType = this.formItem.itemType;
      newThing.id = this.id;
      this.store.dispatch(updateThing(newThing));
      this.modalController.dismiss();
      return;
    }
    newThing.itemType = this.type;
    newThing.id = this.nextId;
    newThing.volume = Number(newThing.volume);

    this.store.dispatch(addThing(newThing));
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}
