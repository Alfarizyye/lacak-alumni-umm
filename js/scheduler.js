setInterval(()=>{

alumni.forEach((a,i)=>{

if(a.status=="Belum Dilacak" || a.confidence<50){

track(i)

}

})

},604800000)