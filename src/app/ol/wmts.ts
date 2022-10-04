import olLayerTile from 'ol/layer/Tile';
import csiwmts from './csi-wmts'


export class LayerWMTS {
public wmts;

  constructor() {
    this.wmts = new olLayerTile({
      source: new csiwmts(),
    })
  }

}