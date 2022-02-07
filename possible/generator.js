fs=require('fs');
base = 28*0x01010101; // Everyone start at 28 and 128 trigger the end, making it easier checked
function unpack(x) {
  x-=base;
  return String.fromCharCode(x&255,(x>>8)&255,(x>>16)&255,(x>>24)&255);
  }
A=[new Set([base])];B=[];
a=[];for(i=0;i<26;i++)for(j=0;j<26;j++)for(k=0;k<26;++k)if(0<=(l=26-i-j-k)&&l<26&&(i>12|j>12|k>12|l>12))a.push(i<<24|j<<16|k<<8|l)
for(i=0;i<4;++i)a.push((i-0?26:0)<<24|(i-1?26:0)<<16|(i-2?26:0)<<8|(i-3?26:0)) 
for(i=1; i<17; ++i) {
  b=new Set([]);
  c=new Set([]);
  for(j of A[i-1]) {
    for (k of a) {
      l = j+k;
      if (l&0x80808080) {
        c.add(l);
      } else {
        b.add(l);
      }
    }
  }
  A[i] = b;
  B[i] = c;
  console.log(i,b.size,c.size);
  fs.writeFile(`Playing${i}.txt`,[...b].map(unpack).join``,{encoding:'latin1'},(i=>_=>console.log(`Playing${i}.txt`))(i));
  fs.writeFile(`Ended${i}.txt`,[...c].map(unpack).join``,{encoding:'latin1'},(i=>_=>console.log(`Ended${i}.txt`))(i));
  delete A[i-1];
  delete B[i-1];
}
