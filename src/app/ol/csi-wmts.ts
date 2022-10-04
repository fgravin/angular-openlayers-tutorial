/**
 * @module ol/source/OSM
 */

 import WMTS from "ol/source/WMTS";
 import tilegridWMTS from "ol/tilegrid/WMTS";
 import { getCenter, getTopLeft, getWidth } from "ol/extent";
 import { get as getProjection } from "ol/proj"; // getTransform
 
 /**
  * The attribution containing a link to the Copyright and License
  * page.
  * @const
  * @type {string}
  * @api
  */
 export const ATTRIBUTION = "" + "";
  
 
 /**
  * @classdesc
  * Layer source for the CSI WMTS tile server.
  * @api
  */
 class CSIWMTS extends WMTS {
   /**
    * @param {Options} [options] CSI WMTS options.
    */
   constructor(options?) {
     options = options || {};
 
     let attributions;
     if (options.attributions !== undefined) {
       attributions = options.attributions;
     } else {
       attributions = undefined; // [ATTRIBUTION];
     }
 
     const crossOrigin =
       options.crossOrigin !== undefined ? options.crossOrigin : "anonymous";
 
     const url =
       options.url !== undefined
         ? options.url
         : "https://geomap.reteunitaria.piemonte.it/mapproxy/service";
 
     const wmtsLayers =
       options.wmtsLayers !== undefined
         ? options.wmtsLayers
         : "regp_sfondo_bdtre_wmts";
     const tileMatrixSet =
       options.tileMatrixSet !== undefined
         ? options.tileMatrixSet
         : "grid_32632_nw";
     const imgFormat =
       options.imgFormat !== undefined ? options.imgFormat : "image/png";
     const projection =
       options.projection !== undefined
         ? options.projection
         : getProjection("EPSG:32632");
 
     const projectionExtent = projection.getExtent();
     const size = getWidth(projectionExtent) / 256;
     const resolutions = new Array(19);
     const matrixIds = new Array(19);
     for (let z = 0; z < 19; ++z) {
       // generate resolutions and matrixIds arrays for this WMTS
       resolutions[z] = size / Math.pow(2, z);
       matrixIds[z] = z.toString().replace(/^(\d)$/, "0$1"); // FIX
     }
 
     const tilegrid =
       options.tilegridWMTS !== undefined
         ? options.tilegridWMTS
         : new tilegridWMTS({
             origin: getTopLeft(projection.getExtent()),
             resolutions: resolutions,
             matrixIds: matrixIds
           });
 
     super({
       attributions: attributions,
       url: url,
       layer: wmtsLayers,
       matrixSet: tileMatrixSet,
       format: imgFormat,
       projection: projection,
       tileGrid: tilegrid,
       style: "default",
       //,wrapX: true
       crossOrigin: crossOrigin,
       transition: 0
     });
   }
 }
 
 export default CSIWMTS;