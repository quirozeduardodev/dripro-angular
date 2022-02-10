import { Component, OnInit } from '@angular/core';
import {ManualEndpointService} from "../../../services/endpoints/manual-endpoint.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {ManualResponse} from "../../../types/response/manual-response";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-manuals',
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.scss'],
})
export class ManualsComponent implements OnInit {

  isLoading: boolean = true;
  manuals: ManualResponse[] = [];

  maxWidthCols = 130;
  constructor(private manualEndpointService: ManualEndpointService) { }

  ngOnInit() {
    this.loadManuals();
  }

  loadManuals(): void {
    this.isLoading = true;
    this.manualEndpointService.all()
      .pipe(catchError((err, caught) => {
        this.isLoading = false;
        return throwError(err);
      })).subscribe(value => {
      this.isLoading = false;
      this.manuals = value;
    });
  }

  calcWidthCard(offsetWidth: number): number {
    if(offsetWidth < this.maxWidthCols) {
      return offsetWidth;
    }
    const cols = Math.floor(offsetWidth / this.maxWidthCols);
    return offsetWidth / cols;
  }

  openManual(item: ManualResponse) {
    window.location.href = (`${environment.baseUrl}/${item.url}`);
  }
}
