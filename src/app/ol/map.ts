import olLayerTile from 'ol/layer/Tile';
import olMap from 'ol/Map';
import proj4 from 'proj4';
import * as olproj from 'ol/proj';
import * as olproj4 from 'ol/proj/proj4';
import olView from 'ol/View';
import { LayerWMTS } from './wmts';
import { getCenter as olGetCenter } from 'ol/extent';
import { StandardBackground } from './standard-backgrounds';


import LayerSwitcherImage from "ol-ext/control/LayerSwitcherImage";

// import "ol/ol.css";
// import "ol-ext/control/LayerSwitcher.css";
// import "ol-ext/control/LayerSwitcherImage.css";


export interface MapViewOptions {
  projection?: string;
  center?: [number, number];
  zoom?: number;
}

export interface MapOptions {
  view?: MapViewOptions;
  overlay?: boolean;
  interactions?: boolean;
}

export interface Projection {
  alias?: string;
  code: string;
  def: string;
  extent: [number, number, number, number];
}

export class Map {
  public olMap: olMap;

  private options: MapOptions;
  private defaultOptions: Partial<MapOptions> = {  
  };
  regPiemExtent: number[] = [313263.0, 4879724.0, 517049.0, 5145994.0];
  epsg32632: Projection = {
    code: "EPSG:32632",
    def: "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs",
    extent: [
      -10198294.6545,
      -5596920.6825,
      11389716.6914,
      15991090.6634
    ]
  };

  constructor(options?: MapOptions) {
    this.options = Object.assign({}, this.defaultOptions, options);
    olproj4.register(proj4);    
    this.registerProjection(this.epsg32632);

    this.init();
  }

  init() {

    const bg = new StandardBackground().bg;

    this.olMap = new olMap({
      view: new olView({
        projection: olproj.get(this.epsg32632.code),
        center: olGetCenter(this.regPiemExtent),
        zoom: 7,
      }),
      layers: [
        // new LayerWMTS().wmts
      ]      
    });

    // this.olMap.addLayer(bg[1]);
    this.olMap.getLayers().extend(bg)
    
    // Add a new Layerswitcher to the map
    this.olMap.addControl(new LayerSwitcherImage());

  }

  /**
   * Define a proj4 projection and register it in OL
   * @param projection Projection
   */
     registerProjection(projection: Projection) {
      proj4.defs(projection.code, projection.def);
      olproj4.register(proj4);
      if (projection.extent) {
        olproj.get(projection.code).setExtent(projection.extent);
      }
    }

}