import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export declare type MultiplierStructure = { [p: string]: AbstractControl };
@Directive({
  selector: '[appMultiplierFormControl]',
})
export class MultiplierFormControlDirective
  implements AfterContentInit
{
  public static baseId: string = 'form_builder_container_multiplier';

  @Input() appMultiplierFormControl: MultiplierStructure = {};

  private _rootFormGroup: FormGroup | null = null;
  private _currentId: number = 0;
  private _formControls: MultiplierStructure[] = [];
  constructor(
    private _viewContainer: ViewContainerRef,
    private _template: TemplateRef<MultiplierFormControlContext>
  ) {}

  ngAfterContentInit(): void {
    this.tryToLoadRootFormGroup().then(() => {
      this._applyChanges();
    });
  }

  addOneMore(): void {
    const newControls: MultiplierStructure = {};
    for (const [key, value] of Object.entries(this.appMultiplierFormControl)) {
      newControls[key] = new FormControl(value.value, value.validator);
    }
    this._formControls.push(newControls);
    this._applyChanges();
  }

  private _applyChanges() {
    const viewContainer = this._viewContainer;
    viewContainer.clear();
    viewContainer.createEmbeddedView(
      this._template,
      this.appMultiplierFormControl
      // currentIndex === null ? undefined : currentIndex
    );
    for (let i = 0; i < this._formControls.length; i++) {
      const item = this._formControls[i];
      for (const [key, value] of Object.entries(item)) {
        if (this._rootFormGroup) {
          this._rootFormGroup.addControl(
            `${MultiplierFormControlDirective.baseId}-${key}-${i + 1}`,
            value
          );
        }
      }
      // viewContainer.createEmbeddedView(
      //   this._template,
      //   item
      //   // currentIndex === null ? undefined : currentIndex
      // );
      const tempRef =
      this._viewContainer.createComponent<RemoveComponent<MultiplierFormControlContext>>(RemoveComponent);
      tempRef.instance.templateRef = {
        context: item,
        templateRef: this._template
      };
    }
    const btnRef =
      this._viewContainer.createComponent<AddMoreComponent>(AddMoreComponent);
    btnRef.instance.add.subscribe(() => {
      this.addOneMore();
    });
  }

  private async tryToLoadRootFormGroup(): Promise<void> {
    this._rootFormGroup = null;
    for (const [key, value] of await Object.entries(
      this.appMultiplierFormControl
    )) {
      if (!this._rootFormGroup) {
        this._rootFormGroup = value.parent as FormGroup | null;
      } else {
        break;
      }
    }
  }
}
export interface MultiplierFormControlContext {
  [p: string]: FormControl;
}

@Component({
  template: `
  <div class="container">
    <button type="button" (click)="add.emit()">
      <i class="mdi mdi-plus"></i>
    </button>
  </div>`,
  styles: [
    `.container {width: 100%; display: flex; justify-content: center; padding-top: 0.25rem;}`,
    `.container button {color: #ec0909FF}`
  ]
})
export class AddMoreComponent implements OnDestroy {
  @Output() add: EventEmitter<void> = new EventEmitter<void>();

  ngOnDestroy(): void {
    this.add.unsubscribe();
  }
}

@Component({
  template: `
  <div #container class="container">
  </div>`,
  styles: [
    `.container {}`
  ]
})
export class RemoveComponent<T> implements AfterViewInit {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef | null = null;
  set templateRef(val: {context: any; templateRef: TemplateRef<T>}) {
    this._templateRef = val;
    if(this._templateRef && !this.isEmbedded && this.isContentInit) {
      this.isEmbedded = true;
      this.container?.createEmbeddedView(this._templateRef.templateRef, this._templateRef.context);
    }
  }
  isEmbedded: boolean = false;
  isContentInit: boolean = false;
  private _templateRef: {context: any; templateRef: TemplateRef<T>} | null = null;

  ngAfterViewInit(): void {
    this.isContentInit = true;
    if(this._templateRef && !this.isEmbedded) {
      this.isEmbedded = true;
      this.container?.createEmbeddedView(this._templateRef.templateRef, this._templateRef.context);
    }
  }
}
