import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  checkedContainer,
  checkedThinks,
  removeThing,
  revertToThingsList,
  ThingContainerItemInterface
} from '../../pages/container-module/store/container';
import { FormComponent } from '../form/form.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-container-item',
  templateUrl: './container-item.component.html',
  styleUrls: ['./container-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContainerItemComponent implements OnChanges{
  @Input() title: string;
  @Input() volume: number;
  @Input() description: string;
  @Input() id: number;
  @Input() type?: string;
  @Input() checked: boolean;
  @Input() thingsVolume: number;
  @Input() items?: ThingContainerItemInterface[];
  @Input() freeSpace?: number;

  constructor(
    private store: Store,
    private modalCtrl: ModalController) {
  }

  remove(id: number): void {
    this.store.dispatch(removeThing({id}));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.thingsVolume && changes.thingsVolume.currentValue !== changes.thingsVolume.previousValue) {
      if (changes.thingsVolume.currentValue > this.freeSpace && this.checked) {
        this.store.dispatch(checkedThinks({id: this.id, checked: false}));
      }
    }
  }

  removeFromContainer(containerItemId: number, containerId: number): void {
    this.store.dispatch(revertToThingsList({ containerItemId, containerId }))
  }

  public async openEditForm(id: number): Promise<void> {
      const modal = await this.modalCtrl.create({
        component: FormComponent,
        componentProps: {
          id, type: 'Edit'
        }
      });
    return await modal.present();
  }

  public checkboxClick(event, id: number, type): void {
       if (type === 'container') {
         this.store.dispatch(checkedContainer({id, checked: event.target.checked}));
       } else {
         this.store.dispatch(checkedThinks({id, checked: event.target.checked}));
       }
  }
}
