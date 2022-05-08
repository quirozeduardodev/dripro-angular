import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Directive,
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
export declare type MultiplierFormControlIn = {
  answers?: { [p: string]: AbstractControl } | null;
  formControls: MultiplierStructure;
};
@Directive({
  selector: '[appMultiplierFormControl]',
})
export class MultiplierFormControlDirective
  implements AfterContentInit
{
  public static baseId: string = 'form_builder_container_multiplier';

  @Input() appMultiplierFormControl: MultiplierFormControlIn = {
    formControls: {}
  };

  private _rootFormGroup: FormGroup | null = null;
  private _currentId: number = 0;
  private _formControls: {id: number; structure: MultiplierStructure}[] = [];
  constructor(
    private _viewContainer: ViewContainerRef,
    private _template: TemplateRef<MultiplierFormControlContext>
  ) {}

  get isDisabled(): boolean {
    return this._rootFormGroup ? this._rootFormGroup.disabled : false;
  }

  ngAfterContentInit(): void {
    this.tryToLoadRootFormGroup().then(() => {
      this._applyChanges();
    });
  }

  addOneMore(customId?: number): void {
    const newControls: MultiplierStructure = {};
    for (const [key, value] of Object.entries(this.appMultiplierFormControl.formControls)) {
      newControls[key] = new FormControl(null, value.validator);
    }
    this._formControls.push({
      id: this._currentId + 1,
      structure: newControls
    });
    this._currentId++;
    this._applyChanges();
  }

  private _applyChanges() {
    const viewContainer = this._viewContainer;
    viewContainer.clear();
    viewContainer.createEmbeddedView(
      this._template,
      {
        $implicit: this.appMultiplierFormControl.formControls
      }
      // currentIndex === null ? undefined : currentIndex
    );
    for (let i = 0; i < this._formControls.length; i++) {
      const item = this._formControls[i];
      for (const [key, value] of Object.entries(item.structure)) {
        if (this._rootFormGroup) {
          this._rootFormGroup.addControl(
            `${MultiplierFormControlDirective.baseId}-${key}-${item.id}`,
            value
          );
        }
      }
      const tempRef =
      this._viewContainer.createComponent<RemoveComponent<MultiplierFormControlContext>>(RemoveComponent);
      tempRef.instance.templateRef = {
        context: {
          $implicit: item.structure
        },
        templateRef: this._template
      };
      tempRef.instance.remove.subscribe(() => {
        this._formControls.splice(i, 1);
        for (const [key, value] of Object.entries(this._rootFormGroup?.controls ?? {})) {
          if(key.match(`${MultiplierFormControlDirective.baseId}-([a-zA-Z0-9_-]+)-${i + 1}`)) {
            this._rootFormGroup?.removeControl(key);
          }
        }
        this._applyChanges();
      });
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
      this.appMultiplierFormControl.formControls
    )) {
      if (!this._rootFormGroup) {
        this._rootFormGroup = value.parent as FormGroup;
      } else {
        break;
      }
    }
    if(this._rootFormGroup) {
      for (const [key, value] of Object.entries(this.appMultiplierFormControl.formControls)) {
        for (const [key2, value2] of Object.entries(this.appMultiplierFormControl.answers ?? {})) {
          const resultMatch = key2.match(`${MultiplierFormControlDirective.baseId}-${key}-([0-9]+)`);
          if(resultMatch) {
            const idFnd = Number(resultMatch[1]);
            const newControls: MultiplierStructure = {};
            for (const [keyX, valueX] of Object.entries(this.appMultiplierFormControl.formControls)) {
              newControls[keyX] = new FormControl(null, valueX.validator);
            }
            for (const [key3, value3] of Object.entries(newControls)) {
              for (const [key4, value4] of Object.entries(this.appMultiplierFormControl.answers ?? {})) {
                if(key4.match(`${MultiplierFormControlDirective.baseId}-${key3}-${idFnd}`)){
                  newControls[key3].setValue(value4);
                  break;
                }
              }
            }
            this._formControls.push({
              id: idFnd,
              structure: newControls
            });
            this._currentId = idFnd > this._currentId ? idFnd : this._currentId;
          }
        }
        break;
      }
    }
  }
}
export interface MultiplierFormControlContext {
  $implicit: MultiplierStructure;
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
  <button #button type="button" (click)="remove.emit()">
      <i class="mdi mdi-minus-circle-outline"></i>
  </button>`,
  styles: [
    `:host {position: relative;}`,
    `:host button {color: #ec0909FF; position: absolute; top: 0; right: 0;}`
  ]
})
export class RemoveComponent<T> implements AfterViewInit, OnDestroy {
  @ViewChild('button', {read: ViewContainerRef}) container: ViewContainerRef | null = null;
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  isEmbedded: boolean = false;
  isContentInit: boolean = false;
  private _templateRef: {context: T; templateRef: TemplateRef<T>} | null = null;

  constructor(private ref: ChangeDetectorRef) {
  }

  set templateRef(val: {context: T; templateRef: TemplateRef<T>}) {
    this._templateRef = val;
    if(this._templateRef && !this.isEmbedded && this.isContentInit) {
      this.isEmbedded = true;
      this.container?.createEmbeddedView(this._templateRef.templateRef, this._templateRef.context);
    }
  }

  ngAfterViewInit(): void {
    this.isContentInit = true;
    if(this._templateRef && !this.isEmbedded) {
      this.isEmbedded = true;
      this.container?.createEmbeddedView(this._templateRef.templateRef, this._templateRef.context);
      this.ref.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.remove.unsubscribe();
  }
}
