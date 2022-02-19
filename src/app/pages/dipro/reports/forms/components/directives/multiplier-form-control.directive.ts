import { AfterContentInit, ContentChildren, Directive, DoCheck, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appMultiplierFormControl]'
})
export class MultiplierFormControlDirective implements DoCheck, AfterContentInit {

  @Input() appMultiplierFormControl: {[p: string]: AbstractControl} = {};

  constructor(private _viewContainer: ViewContainerRef,
    private _template: TemplateRef<MultiplierFormControlContext>) { }

  ngDoCheck(): void {
    console.log('ngDoCheck');
    // this._viewContainer.
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
    this._applyChanges();
  }

  private _applyChanges() {
    const viewContainer = this._viewContainer;
    let fg: FormGroup | null = null;
    for (const [key, value] of Object.entries(this.appMultiplierFormControl)) {
      if(!fg) {
        fg = value.parent as (FormGroup | null);
      } else {
        break;
      }
    }
    for(let i = 0; i < 7; i++) {
      const newControls: {[p: string]: AbstractControl} = {};
      for (const [key, value] of Object.entries(this.appMultiplierFormControl)) {
        newControls[key] = new FormControl(value.value, value.validator);
      }
      for (const [key, value] of Object.entries(newControls)) {
        if(fg) {
          fg.addControl(`form_builder_multiplier_${key}_${i}`, value);
        }
      }
      viewContainer.createEmbeddedView(
        this._template,
        newControls
        // currentIndex === null ? undefined : currentIndex
      );
    }

    // changes.forEachOperation(
    //   (
    //     item: IterableChangeRecord<T>,
    //     adjustedPreviousIndex: number | null,
    //     currentIndex: number | null
    //   ) => {
    //     if (item.previousIndex == null) {
    //       // NgForOf is never "null" or "undefined" here because the differ detected
    //       // that a new item needs to be inserted from the iterable. This implies that
    //       // there is an iterable value for "_ngForOf".
    //       viewContainer.createEmbeddedView(
    //         this._template,
    //         new NgForOfContext<T, U>(item.item, this._ngForOf!, -1, -1),
    //         currentIndex === null ? undefined : currentIndex
    //       );
    //     } else if (currentIndex == null) {
    //       viewContainer.remove(
    //         adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex
    //       );
    //     } else if (adjustedPreviousIndex !== null) {
    //       const view = viewContainer.get(adjustedPreviousIndex)!;
    //       viewContainer.move(view, currentIndex);
    //       applyViewChange(view as EmbeddedViewRef<NgForOfContext<T, U>>, item);
    //     }
    //   }
    // );

    // for (let i = 0, ilen = viewContainer.length; i < ilen; i++) {
    //   const viewRef = <EmbeddedViewRef<NgForOfContext<T, U>>>(
    //     viewContainer.get(i)
    //   );
    //   const context = viewRef.context;
    //   context.index = i;
    //   context.count = ilen;
    //   context.ngForOf = this._ngForOf!;
    // }

    // changes.forEachIdentityChange((record: any) => {
    //   const viewRef = <EmbeddedViewRef<NgForOfContext<T, U>>>(
    //     viewContainer.get(record.currentIndex)
    //   );
    //   applyViewChange(viewRef, record);
    // });
  }

}

export interface MultiplierFormControlContext {
  [p: string]: FormControl;
}
