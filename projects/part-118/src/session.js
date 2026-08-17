import { randomUUID } from 'node:crypto';
export function newSession({region='in-central',players=[]}={}){return{sessionId:randomUUID(),region,epoch:1,status:'active',players:[...players],owner:`${region}:worker-1`};}
export function reconnectDecision({session,clientEpoch,lastAckTick,historyFloor}){if(clientEpoch!==session.epoch)return{mode:'full-snapshot',reason:'epoch-changed'};if(lastAckTick<historyFloor)return{mode:'full-snapshot',reason:'history-compacted'};return{mode:'delta-resume',fromTick:lastAckTick};}
export function canJoin(session,playerId,maxPlayers=16){return session.status==='active'&&!session.players.includes(playerId)&&session.players.length<maxPlayers;}
