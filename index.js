const WebTorrent=require('webtorrent-hybrid');
const fs=require('fs');
const torrentId=process.argv[2];
console.group("Torrent Id:-\t"+torrentId);
const client=new WebTorrent();

const cliProgress=require('cli-progress');
const bar=new cliProgress.SingleBar({},cliProgress.Presets.shades_classic);


client.add(torrentId,torrent=>{
  const files=torrent.files;
  let length=files.length;
  console.log("Number of files:- \t"+length);
  
  bar.start(100,0); //full,start

  let interval=setInterval(()=>{
// console.log("progress:"+(torrent.progress*100).toFixed()+ "%");
bar.update((torrent.progress * 100));
  },5000);//5 sec
  
  files.forEach(file=>{
    const source=file.createReadStream();
    const destination=fs.createWriteStream(file.name);
    source.on('end',()=>{
      console.log('file: \t\t', file.name);
      length -=1;
      if(!length){
       
        bar.stop();
        clearInterval(interval);
       
        process.exit();
      }
    }).pipe(destination);

  })
})