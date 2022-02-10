import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngersollRandHlEhHbComponent } from './ingersoll-rand-hl-eh-hb.component';

describe('IngersollRandHlEhHbComponent', () => {
  let component: IngersollRandHlEhHbComponent;
  let fixture: ComponentFixture<IngersollRandHlEhHbComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngersollRandHlEhHbComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngersollRandHlEhHbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
