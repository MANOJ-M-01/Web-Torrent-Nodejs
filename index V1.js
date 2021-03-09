const WebTorrent=require('webtorrent-hybrid');
const fs=require('fs');
const torrentId=process.argv[2];
console.group("Torrent Id:-\t"+torrentId);
const client=new WebTorrent();
client.add(torrentId,torrent=>{
  const files=torrent.files;
  let length=files.length;
  console.log("Number of files:- \t"+length);
  files.forEach(file=>{
    const source=file.createReadStream();
    const destination=fs.createWriteStream(file.name);
    source.on('end',()=>{
      console.log('file: \t\t', file.name);
      length-=1;
      if(!length)process.exit();
    }).pipe(destination);

  })
})