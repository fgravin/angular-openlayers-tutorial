import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import Map from 'ol/Map';

@Component({
  selector: 'app-map',
  template: '',
  styles: [':host { width: 100%; height: 100%; display: block; }',  
  '::ng-deep .ol-control.ol-layerswitcher-image.ol-collapsed, ::ng-deep .ol-control.ol-layerswitcher-image {    bottom: 0.5em !important;    left: 0.5em !important;    top: unset !important;    right: unset !important;  }'
  
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  @Input() map: Map;
  constructor(private elementRef: ElementRef) {
  }
  ngOnInit() {
    this.map.setTarget(this.elementRef.nativeElement);
  }
}
