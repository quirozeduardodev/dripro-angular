/* eslint-disable @typescript-eslint/member-ordering */
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
  Optional,
  Self,
} from '@angular/core';
import * as SignaturePadNative from 'signature_pad';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

// export const SIGNATURE_PAD_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => SignaturePadComponent),
//   multi: true,
// };

@Component({
  selector: 'form-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
  // providers: [SIGNATURE_PAD_VALUE_ACCESSOR],
})
export class SignaturePadComponent
  implements AfterContentInit, AfterViewInit, OnDestroy, ControlValueAccessor
{
  @Input() public options: SignaturePadNative.Options = {
    minWidth: 1,
    maxWidth: 1,
  };
  @Input() isDrawing: boolean = true;

  private signaturePad: any;
  private elementRef: ElementRef;

  private _onChange: (val: any) => void = (value: number) => {};
  private _onTouched: () => void = () => {};
  private _isDisabled: boolean = false;
  private _value: any | null = null;
  private _mainWrapperObserver: ResizeObserver | null = null;

  mainSize: { width: number; height: number } = { width: 1, height: 1 };
  constructor(elementRef: ElementRef, @Self() @Optional() public ngControl?: NgControl) {
    this.elementRef = elementRef;
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  get value(): any | null {
    return this._value;
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  registerOnChange(fn: (val: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    this._value = obj ?? null;
  }

  public ngAfterContentInit(): void {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');

    if ((this.options as any).canvasHeight) {
      canvas.height = (this.options as any).canvasHeight;
    }

    if ((this.options as any).canvasWidth) {
      canvas.width = (this.options as any).canvasWidth;
    }

    this.signaturePad = new SignaturePadNative.default(canvas, this.options);
    this.signaturePad.onBegin = () => {
      // console.log(this.toDataURL());
    };
    this.signaturePad.onEnd = () => {
      this._value = this.toDataURL().replace('data:image/png;base64,', '');
      this._onChange(this._value);
    };
  }

  ngAfterViewInit(): void {
    this._mainWrapperObserver = new ResizeObserver((entries, observer) => {
      const width = entries[0].contentRect.width;
      const height = entries[0].contentRect.height;
      this.mainSize = { width, height };
      this.resizeCanvas();
    });
    this._mainWrapperObserver?.observe(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this._mainWrapperObserver?.disconnect();
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    canvas.width = 0;
    canvas.height = 0;
  }

  public resizeCanvas(): void {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    const ratio: number = Math.max(window.devicePixelRatio || 1, 1);
    const canvas: any = this.signaturePad.canvas;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
    this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
  }

  // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
  public toDataURL(imageType?: string, quality?: number): string {
    return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
  }

  buttonActionClicked($event: MouseEvent): void {
    $event.stopPropagation();
    this.isDrawing = !this.isDrawing;
  }
}
