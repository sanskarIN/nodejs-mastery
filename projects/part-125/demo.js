import {EvidenceBundle,ArchitectureScorecard,Certification,RecoveryObjective,RiskRegister} from './src/capstone.js';
const evidence=new EvidenceBundle();['tests','security','restore','failover','load','rollback'].forEach(n=>evidence.add(n,true,{run:'capstone'}));
const score=new ArchitectureScorecard();for(const area of Object.keys(score.weights))score.set(area,5);
console.log(new Certification({minScore:.85,requiredEvidence:['tests','security','restore','failover','load','rollback']}).decide({scorecard:score,evidence}));
console.log('recovery',new RecoveryObjective({rpoMs:60000,rtoMs:300000}).meets({lostMs:10000,recoveryMs:120000}));
const risks=new RiskRegister();risks.add({id:'single-region',likelihood:3,impact:5,mitigation:'tested failover'});risks.add({id:'minor-ui',likelihood:2,impact:1,mitigation:'rollback'});console.log('risks',risks.priority());
