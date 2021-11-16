import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContainerThingPage } from './container-thing.page';

xdescribe('ContainerThingPage', () => {
  let component: ContainerThingPage;
  let fixture: ComponentFixture<ContainerThingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerThingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerThingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
