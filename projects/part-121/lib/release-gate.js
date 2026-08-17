'use strict';
class ReleaseGate {
  constructor(){this.checks=[];}
  add(name,pass,evidence=''){this.checks.push({name,pass:Boolean(pass),evidence});return this;}
  result(){const failed=this.checks.filter(c=>!c.pass);return {pass:failed.length===0,total:this.checks.length,failed};}
}
module.exports={ReleaseGate};
