'use strict';
class RegionOwnership {
  constructor(region='region-a'){ this.region=region; this.epoch=1; }
  promote(region){ this.region=region; return ++this.epoch; }
  authorize({region,epoch}){ return region===this.region && epoch===this.epoch; }
}
module.exports={RegionOwnership};
