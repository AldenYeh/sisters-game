(()=>{"use strict";const B=(id,r,c,n,o,target=false)=>({id,row:r,col:c,length:n,orientation:o,target});const base=(extra=[])=>[B('T',1,0,2,'h',true),B('A',1,2,2,'v'),B('B',3,0,2,'h'),B('C',0,3,2,'v'),B('D',0,0,2,'h'),B('E',2,0,2,'h'),...extra];const levels=[
 {name:'第 1 關',blocks:[B('T',1,0,2,'h',true),B('A',1,2,2,'v')]},
 {name:'第 2 關',blocks:[B('T',1,0,2,'h',true),B('A',1,2,2,'v'),B('B',3,0,2,'h')]},
 {name:'第 3 關',blocks:[B('T',1,0,2,'h',true),B('A',1,2,2,'v'),B('B',0,3,2,'v')]},
 {name:'第 4 關',blocks:base()}, {name:'第 5 關',blocks:base()}, {name:'第 6 關',blocks:base()},
 {name:'第 7 關',blocks:base()}, {name:'第 8 關',blocks:base()},
 {name:'第 9 關',blocks:base()}, {name:'第 10 關',blocks:base()},
 {name:'第 11 關',blocks:base()}, {name:'第 12 關',blocks:base()}
];window.SlidingLevels=Object.freeze(levels);})();
