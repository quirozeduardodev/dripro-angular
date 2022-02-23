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
      newControls[key] = new FormControl(null, value.validator);
    }
    this._formControls.push(newControls);
    this._applyChanges();
  }

  private _applyChanges() {
    const viewContainer = this._viewContainer;
    viewContainer.clear();
    viewContainer.createEmbeddedView(
      this._template,
      {
        $implicit: this.appMultiplierFormControl
      }
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
      const tempRef =
      this._viewContainer.createComponent<RemoveComponent<MultiplierFormControlContext>>(RemoveComponent);
      tempRef.instance.templateRef = {
        context: {
          $implicit: item
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
        console.log(this._rootFormGroup?.controls);
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
      this.appMultiplierFormControl
    )) {
      if (!this._rootFormGroup) {
        this._rootFormGroup = value.parent as FormGroup;
      } else {
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