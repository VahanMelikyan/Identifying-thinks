import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IonApp, ModalController } from '@ionic/angular';
import { FormComponent } from '../../../components/form/form.component';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { getContainerItems, getThingItems } from '../store/container/container.selectors';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject} from 'rxjs';
import { FakeApiService } from '../../../services/fake-api.service';
import { moveToContainer, setThings, ThingContainerItemInterface, ThingContainerStateInterface } from '../store/container';

@Component({
  selector: 'app-container-thing',
  templateUrl: './container-thing.page.html',
  styleUrls: ['./container-thing.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ContainerThingPage implements OnInit, OnDestroy {

  destroyed$ = new Subject();
  things: ThingContainerItemInterface[];
  containers: ThingContainerItemInterface[];
  thingsVolume: number;
  isContainerChecked: boolean;
  freeSpace: number;


  constructor(
    private app: IonApp,
    private modalCtrl: ModalController,
    public http: HttpClient,
    private store: Store,
    private fakeApiService: FakeApiService
  ) {
  }

  ngOnInit(): void {
     this.fakeApiService.getItems().pipe(
       switchMap((items: ThingContainerStateInterface): Observable<any> => {
         this.store.dispatch(setThings(items));
         return this.store.select(getContainerItems);
       }),
       switchMap((containers: ThingContainerItemInterface[]): Observable<any>  => {
         this.containers = containers;
         this.isContainerChecked = !!this.containers.find((item) => item.checked);
         return this.store.select(getThingItems).pipe(takeUntil(this.destroyed$));
       })).subscribe((things: ThingContainerItemInterface[]) => {
         this.things = things;
         this.thingsVolume = this.things.filter((thing) => thing.checked).reduce((accumulator, current) => accumulator + current.volume, 0);
     });
  }

  public async openForm(type: string): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: FormComponent,
      componentProps: {
        type
      }
    });
    return await modal.present();
  }

  public trackById(index: number, thing): number {
    return thing.id;
  }

  isDisabledMoveToButton() {
    if (this.things && this.containers) {
      const isThingSelected = this.things.findIndex((thing) => thing.checked );
      const isContainerSelected = this.containers.findIndex((container) => container.checked );
      return isThingSelected === -1 || isContainerSelected === -1;
    }
    return true;
  }

  public moveToContainer() {
      const selectedThingsIds = this.things.filter((thing) => thing.checked).map((item) => item.id);
      const selectedContainerId = this.containers.filter((thing) => thing.checked).find((item) => item.id).id;
      this.store.dispatch(moveToContainer({ selectedThingsIds, selectedContainerId}));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
