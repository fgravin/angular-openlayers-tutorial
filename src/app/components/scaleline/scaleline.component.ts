import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import ControlScaleLine from 'ol/control/ScaleLine';

@Component({
  selector: 'app-scaleline',
  template: ``,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScalelineComponent implements OnInit {
  @Input() map: Map;
  control: ControlScaleLine;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.control = new ControlScaleLine({
      target: this.elementRef.nativeElement,
    });
    this.map.addControl(this.control);
  }
}
