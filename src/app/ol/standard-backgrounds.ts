import olLayerTile from 'ol/layer/Tile';
import csiwmts from './csi-wmts'


export class StandardBackground {
public bg;

 wmtsLayersColor = "regp_sfondo_bdtre_wmts";
 wmtsLayersBN = "regp_sfondo_bdtre_bn_wmts";
 wmtsLayersOrtofoto = "rp_ortofoto_2010_wmts";

  constructor() {

    const ortofoto = new olLayerTile({
      source: new csiwmts({
        // url: url,
        wmtsLayers: this.wmtsLayersOrtofoto,
      }),
      title: "Ortofoto",
      baseLayer: true,
      visible: true,
      preview:
      `https://geomap.reteunitaria.piemonte.it/mapproxy/service?layer=${this.wmtsLayersOrtofoto}&style=default&tilematrixset=grid_32632_nw&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=06&TileCol=31&TileRow=32`
    })

    const color = new olLayerTile({
      source: new csiwmts({
        // url: url,
        wmtsLayers: this.wmtsLayersColor,
      }),
      title: "Colore",
      baseLayer: true,
      visible: true,
      preview:
      `https://geomap.reteunitaria.piemonte.it/mapproxy/service?layer=${this.wmtsLayersColor}&style=default&tilematrixset=grid_32632_nw&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=06&TileCol=31&TileRow=32`
    })

    const bn = new olLayerTile({
      source: new csiwmts({
        // url: url,
        wmtsLayers: this.wmtsLayersBN,
      }),
      title: "B/N",
      baseLayer: true,
      visible: true,
      preview:
      `https://geomap.reteunitaria.piemonte.it/mapproxy/service?layer=${this.wmtsLayersBN}&style=default&tilematrixset=grid_32632_nw&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=06&TileCol=31&TileRow=32`
    })

    this.bg = [
      ortofoto,
      color,
      bn
    ]



  }

}