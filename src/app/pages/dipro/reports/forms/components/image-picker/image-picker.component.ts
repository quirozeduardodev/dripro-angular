/* eslint-disable @typescript-eslint/member-ordering */
import {
  AfterViewInit,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  OnDestroy,
  OnInit, Optional,
  QueryList, Self, ViewChild
} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {BaseDialogComponent} from "../../../../../../components/dialogs/base-dialog/base-dialog.component";

// export const IMAGE_PICKER_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => ImagePickerComponent),
//   multi: true
// };


@Component({
  selector: 'form-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
  // providers: [IMAGE_PICKER_VALUE_ACCESSOR]
})
export class ImagePickerComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {


  @Input() imageQuality: number = 90;

  private _value: any[] = [];
  private _isPickingPhoto: boolean = false;

  // Value Accessor
  private _onChange: (_: any) => void = (_: any) => {};
  private _onTouched: () => void = () => {};
  private _isDisabled: boolean = false;

  previewImage: any = null;
  @ViewChild('dialog') dialog: BaseDialogComponent | null = null;
  constructor(@Self() @Optional() public ngControl?: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  get value(): any[] {
    return this._value;
  }


  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get control(): AbstractControl | null {
    return this.ngControl?.control ?? null;
  }

  takePicture(): void {
    if (this.isDisabled && this._isPickingPhoto) {
      return;
    }
    try {
      this._isPickingPhoto = true;
      Camera.getPhoto({
        quality: this.imageQuality,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        width: 800,
        height: 1000,
        promptLabelHeader: 'pages.dipro.camera.title | translate',
        promptLabelPhoto: 'pages.dipro.camera.galery | translate',
        promptLabelPicture: 'pages.dipro.camera.photo | translate',
        promptLabelCancel: 'Cancel'
      }).then(image => {
        const base64Result: string | null = image.base64String ?? null;
        this._value.push(base64Result);
        /// This is a hack to prevent that writeValue override the selected value
        setTimeout(() => {
          this._onChange(this._value);
          this._isPickingPhoto = false;
        }, 800);
      });
    } catch (e) {
      this._isPickingPhoto = false;
    }
  }

  ngAfterViewInit(): void {
  }

  writeValue(value: any): void {
    if (this._isPickingPhoto) {
      return;
    }
    this._value = value && Array.isArray(value) ? <any[]>value.filter(item => item !== null && item !== undefined) : [];
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  ngOnDestroy(): void {
  }

  getImageValue(image: any | null) {
    if (image === null) {
      return null;
    }
    if (String(image).includes('http')) {
      return image;
    }
    return `data:image/png;base64,${image}`;
  }

  removeImageAt(index: number): void {
    this._value.splice(index, 1);
    this._onChange(this._value);
  }

  openPreview(event: MouseEvent, image: any) {
    event.stopPropagation();
    this.previewImage = image;
    this.dialog?.open();
  }
}
