let alumni = JSON.parse(localStorage.getItem("alumni")) || []
let history = JSON.parse(localStorage.getItem("history")) || []

let chart=null

function simpan(){

localStorage.setItem("alumni",JSON.stringify(alumni))
localStorage.setItem("history",JSON.stringify(history))

}

function tambahAlumni(){

let nama=document.getElementById("nama").value
let prodi=document.getElementById("prodi").value
let fakultas=document.getElementById("fakultas").value
let tahun=document.getElementById("tahun").value
let kota=document.getElementById("kota").value

if(!nama){
alert("Nama harus diisi")
return
}

let namaDepan=nama.split(" ")[0]

let variasi_nama=[
nama,
namaDepan+".",
namaDepan+" "+prodi
]

let keyword_afiliasi=[
"Universitas Muhammadiyah Malang",
"UMM",
prodi,
fakultas
]

let keyword_konteks=[
prodi,
kota,
tahun
]

let data={

nama_lengkap:nama,
prodi:prodi,
fakultas:fakultas,
tahun_lulus:tahun,
kota_asal:kota,

variasi_nama:variasi_nama,
keyword_afiliasi:keyword_afiliasi,
keyword_konteks:keyword_konteks,

status:"Belum Dilacak",
confidence:0

}

alumni.push(data)

simpan()

tampil()

}

function tampil(){

let html=""

alumni.forEach((a,i)=>{

html+=`

<tr>

<td>${a.nama_lengkap}</td>
<td>${a.prodi}</td>
<td>${a.fakultas}</td>
<td>${a.tahun_lulus}</td>
<td>${a.kota_asal}</td>
<td>${a.status}</td>

<td>

<div class="progress">

<div class="progress-bar bg-success"
style="width:${a.confidence}%">

${a.confidence}%

</div>

</div>

</td>

<td>

<button onclick="track(${i})"
class="btn btn-danger btn-sm">
Track
</button>

</td>

</tr>

`

})

document.getElementById("tableAlumni").innerHTML=html

updateStat()

grafik()

}

function track(i){

let a = alumni[i]

// Query generator
let queries = generateQuery(a)
a.queries = queries

// Tracking source
let hasil = tracking()
a.tracking = hasil

// Scoring
let score = scoring()

if(score>100) score=100
if(score<0) score=0

a.confidence = score

if(score>=70)
a.status="Teridentifikasi"

else if(score>=40)
a.status="Perlu Verifikasi"

else
a.status="Belum Ditemukan"

// tampilkan panel

document.getElementById("panelQuery").innerHTML =
queries.join("<br>")

document.getElementById("panelTracking").innerHTML =
hasil.map(h=>h.source || h).join("<br>")

document.getElementById("panelScore").innerHTML =
score+"%"

// simpan history

history.push({

name:a.nama_lengkap,
status:a.status,
score:score,
tanggal:new Date().toLocaleDateString()

})

simpan()

tampil()

}

function updateStat(){

document.getElementById("totalAlumni").innerText=alumni.length

let found=alumni.filter(a=>a.status=="Teridentifikasi").length
let notfound=alumni.filter(a=>a.status=="Belum Ditemukan").length

document.getElementById("foundAlumni").innerText=found
document.getElementById("notFound").innerText=notfound

}

function grafik(){

let found=alumni.filter(a=>a.status=="Teridentifikasi").length
let notfound=alumni.filter(a=>a.status=="Belum Ditemukan").length
let verify=alumni.filter(a=>a.status=="Perlu Verifikasi").length

if(chart) chart.destroy()

chart = new Chart(document.getElementById("chartAlumni"),{

type:"bar",

data:{

labels:[
"Teridentifikasi",
"Perlu Verifikasi",
"Belum Ditemukan"
],

datasets:[{

label:"Statistik Alumni",

data:[found,verify,notfound],

backgroundColor:[
"green",
"orange",
"red"
]

}]

}

})

}

tampil()