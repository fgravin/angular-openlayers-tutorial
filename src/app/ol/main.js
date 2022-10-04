import CSIWMTS from "./csiwmts";

import { getCenter, getTopLeft, getWidth } from "ol/extent";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import { addProjection } from "ol/proj";
// import Projection from "ol/proj/Projection";
import OSM from "ol/source/OSM";
import tilegridWMTS from "ol/tilegrid/WMTS";
import View from "ol/View";
import WMTS from "ol/source/WMTS";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { get as getProjection } from "ol/proj"; // getTransform

import { optionsFromCapabilities } from "ol/source/WMTS";
import WMTSCapabilities from "ol/format/WMTSCapabilities";

import LayerSwitcherImage from "ol-ext/control/LayerSwitcherImage";

import "ol-ext/control/LayerSwitcher.css";
import "ol-ext/control/LayerSwitcherImage.css";

import "ol/ol.css";

const prjCode = "EPSG:32632";
const proj4def = "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs";
const projExtent = [313263.0, 4879724.0, 517049.0, 5145994.0];
const worldExtent = [
  -10198294.6545,
  -5596920.6825,
  11389716.6914,
  15991090.6634
];

proj4.defs(prjCode, proj4def);
register(proj4);
const projection = getProjection(prjCode);
// projection.setWorldExtent(worldExtent);
projection.setExtent(worldExtent);

addProjection(projection);

const wmtsLayersColor = "regp_sfondo_bdtre_wmts";
const wmtsLayersBN = "regp_sfondo_bdtre_bn_wmts";
const wmtsLayersOrtofoto = "rp_ortofoto_2010_wmts";

const wmtsLayers = wmtsLayersOrtofoto;

const options = { wmtsLayers: wmtsLayers };
const olWmtsSource2 = new CSIWMTS(options);

const map = new Map({
  view: new View({
    projection: getProjection("EPSG:32632"),
    center: getCenter(projExtent),
    zoom: 7
  }),
  layers: [
    new TileLayer({
      source: olWmtsSource2,
      title: "Ortofoto",
      baseLayer: true,
      visible: true,
      preview:
        "https://geomap.reteunitaria.piemonte.it/mapproxy/service?layer=rp_ortofoto_2010_wmts&style=default&tilematrixset=grid_32632_nw&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=06&TileCol=31&TileRow=32"
    }),

    new TileLayer({
      source: new CSIWMTS({ wmtsLayers: wmtsLayersColor }),
      title: "Colori",
      baseLayer: true,
      visible: false,
      preview:
        "https://geomap.reteunitaria.piemonte.it/mapproxy/service?layer=regp_sfondo_bdtre_wmts&style=default&tilematrixset=grid_32632_nw&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=06&TileCol=31&TileRow=32"
    }),
    new TileLayer({
      source: new CSIWMTS({ wmtsLayers: wmtsLayersBN }),
      title: "B/N",
      baseLayer: true,
      visible: false,
      preview:
        "https://geomap.reteunitaria.piemonte.it/mapproxy/service?layer=regp_sfondo_bdtre_bn_wmts&style=default&tilematrixset=grid_32632_nw&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=06&TileCol=31&TileRow=32"
    })
  ],
  target: "map"
});

// Add a new Layerswitcher to the map
map.addControl(new LayerSwitcherImage());