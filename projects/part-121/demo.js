'use strict';
const {VersionedStore}=require('./lib/versioned-store');
const {ReplicaSet}=require('./lib/replica');
const {ShardRouter}=require('./lib/shard-router');
const {VersionedCache}=require('./lib/cache');
const {BackupManager}=require('./lib/backup');
const {RegionOwnership}=require('./lib/region-owner');
const {AuditChain}=require('./lib/audit-chain');

const store=new VersionedStore(); store.seed('account:42',{balance:1000});
const tx=store.begin({isolation:'serializable'}); const account=tx.read('account:42'); tx.write('account:42',{balance:account.balance-149}); tx.commit();
const replicas=new ReplicaSet(store); replicas.addReplica('read-a'); replicas.replicate('read-a');
const router=new ShardRouter([{start:0,end:50,shard:'s1'},{start:50,end:100,shard:'s2'}]);
const cache=new VersionedCache(); const row=store.read('account:42'); cache.put('account:42',row.value,row.version);
const backups=new BackupManager(); const snapshot=backups.create(store);
const owner=new RegionOwnership('india-a'); const audit=new AuditChain();
audit.append('transaction_committed',{version:store.commitVersion}); audit.append('backup_verified',{ok:backups.verify(snapshot)});
console.log(JSON.stringify({balance:store.read('account:42').value.balance,replicaLag:replicas.lag('read-a'),route:router.route(75),cache:cache.get('account:42',{minVersion:row.version}),backupVerified:backups.verify(snapshot),owner:{region:owner.region,epoch:owner.epoch},auditVerified:audit.verify()},null,2));
