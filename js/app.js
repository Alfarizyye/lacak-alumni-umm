// 🔐 CEK LOGIN
if (localStorage.getItem('isAuthenticated') !== 'true') {
    window.location.href = 'login.html';
}

//  DATABASE
let alumni = JSON.parse(localStorage.getItem("alumni")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

let chart = null;

// 💾 SIMPAN DATA
function simpan() {
    try {
        localStorage.setItem("alumni", JSON.stringify(alumni));
        localStorage.setItem("history", JSON.stringify(history));
    } catch (e) {
        alert("Storage penuh! Hapus sebagian data.");
        console.error(e);
    }
}

// 🔍 === FITUR UTAMA: LACAK ALUMNI ===
function lacakAlumni() {

    let nama = document.getElementById("searchNama").value;
    let nim = document.getElementById("searchNIM").value;
    let tahunMasuk = document.getElementById("searchTahunMasuk").value;
    let tanggalLulus = document.getElementById("searchTanggalLulus").value;
    let fakultas = document.getElementById("searchFakultas").value;
    let prodi = document.getElementById("searchProdi").value;

    if (!nama) {
        alert("Nama wajib diisi!");
        return;
    }

    let data = {
        nama_lengkap: nama,
        nim: nim,
        tahun_masuk: tahunMasuk,
        tahun_lulus: tanggalLulus,
        fakultas: fakultas,
        prodi: prodi,

        email: "",
        nohp: "",
        linkedin: "",
        ig: "",
        fb: "",
        tiktok: "",
        tempat_kerja: "",
        alamat_kerja: "",
        posisi: "",
        jenis_pekerjaan: "",
        sosmed_kerja: "",

        status: "Belum Dilacak",
        confidence: 0
    };

    alumni.push(data);

    // langsung track data baru yang dimasukkan
    let index = alumni.length - 1;
    track(index);
}


function trackUlang(i){

    let a = alumni[i];

    document.getElementById("panelQuery").innerText = a.nama_lengkap;

    document.getElementById("panelTracking").innerHTML =
        "• Re-tracking data...";

    document.getElementById("panelScore").innerText = "Processing...";

    setTimeout(() => {

        let score = Math.floor(Math.random() * 40) + 60;
        a.confidence = score;
        a.status = score > 70 ? "Teridentifikasi" : "Perlu Verifikasi";

        document.getElementById("panelScore").innerText = score + "%";

        tampil();
        updateStat();
        grafik();

    }, 1000);
}

// 🧠 TRACKING ENGINE (SIMULASI)
function track(i) {

    let a = alumni[i];

    // 🔍 QUERY GENERATOR
    let query = `${a.nama_lengkap} ${a.nim || ""} ${a.prodi || ""} ${a.fakultas || ""} UMM ${a.tahun_lulus || ""}`;
document.getElementById("panelQuery").innerText = query;
    // 🌐 TRACKING SOURCE
    let hasil = [
        "LinkedIn ditemukan",
        "Instagram ditemukan",
        "Facebook tidak ditemukan"
    ];

    document.getElementById("panelTracking").innerHTML =
        hasil.map(h => "• " + h).join("<br>");

    // ⏳ SIMULASI DELAY (BIAR REALISTIS)
    setTimeout(() => {

        let namaClean = a.nama_lengkap.toLowerCase().replace(/[^a-z]/g, '');
        let namaDepan = a.nama_lengkap.split(' ')[0].toLowerCase();

        let perusahaan = ["PT Astra", "Bank Mandiri", "Telkom", "Shopee", "Gojek"];
        let posisi = ["Staff", "Manager", "Engineer", "Admin"];

        let randomPT = perusahaan[Math.floor(Math.random() * perusahaan.length)];
        let randomPosisi = posisi[Math.floor(Math.random() * posisi.length)];

        // isi otomatis
        a.email = namaDepan + "@gmail.com";
        a.nohp = "08" + Math.floor(1000000000 + Math.random() * 9000000000);
        a.linkedin = "linkedin.com/in/" + namaClean;
        a.ig = "@" + namaClean;
        a.fb = "facebook.com/" + namaClean;
        a.tiktok = "@" + namaClean + "official";
        a.alamat_kerja = "Jl. Sudirman No " + Math.floor(Math.random() * 100) + ", Jakarta";
        a.sosmed_kerja = "@" + randomPT.toLowerCase().replace(/[^a-z]/g, '');
        a.tempat_kerja = randomPT;
        a.posisi = randomPosisi;
        a.jenis_pekerjaan = "Swasta";

        // 🎯 SCORING
        let score = Math.floor(Math.random() * 40) + 60;

        a.confidence = score;
        a.status = score > 70 ? "Teridentifikasi" : "Perlu Verifikasi";

        document.getElementById("panelScore").innerText = score + "%";

        // 🕒 HISTORY
        history.push({
            name: a.nama_lengkap,
            status: a.status,
            score: score,
            tanggal: new Date().toLocaleDateString()
        });

        simpan();
        tampilTracking(i);

    }, 1500);
}

// 📋 TAMPILKAN TABLE (SATU BARIS SAAT TRACKING)
function tampilTracking(index) {

    let a = alumni[index];
    let i = index;

    let html = `
        <tr>
            <td>${a.nama_lengkap}</td>
            <td>${a.prodi}</td>
            <td>${a.tahun_lulus}</td>
            <td>${a.email || '-'}</td>
            <td>${a.nohp || '-'}</td>
            <td>
                <small>
                    LI: ${a.linkedin || '-'}<br>
                    IG: ${a.ig || '-'}
                </small>
            </td>
            <td>${a.tempat_kerja || '-'}</td>
            <td>${a.posisi || '-'}</td>
            <td>${a.jenis_pekerjaan || '-'}</td>
            <td>${a.status}</td>

            <td style="width:180px">
                <div class="progress" style="height:20px;">
                    <div class="progress-bar bg-success" 
                        style="width:${a.confidence}%">
                        ${a.confidence}%
                    </div>
                </div>
            </td>

            <td>
                <button onclick="trackUlang(${i})"
                class="btn btn-danger btn-sm">
                    Track
                </button>
            </td>
        </tr>
    `;

    document.getElementById("tableAlumni").innerHTML = html;

    updateStat();
    grafik();
}

// 📋 TAMPILKAN TABLE
function tampil() {

    let html = "";

    alumni.forEach((a, i) => {

        html += `
        <tr>
            <td>${a.nama_lengkap}</td>
            <td>${a.prodi}</td>
            <td>${a.tahun_lulus}</td>
            <td>${a.email || '-'}</td>
            <td>${a.nohp || '-'}</td>
            <td>
                <small>
                    LI: ${a.linkedin || '-'}<br>
                    IG: ${a.ig || '-'}
                </small>
            </td>
            <td>${a.tempat_kerja || '-'}</td>
            <td>${a.posisi || '-'}</td>
            <td>${a.jenis_pekerjaan || '-'}</td>
            <td>${a.status}</td>

            <td style="width:180px">
                <div class="progress" style="height:20px;">
                    <div class="progress-bar bg-success" 
                        style="width:${a.confidence}%">
                        ${a.confidence}%
                    </div>
                </div>
            </td>

            <td>
                <button onclick="trackUlang(${i})"
                class="btn btn-danger btn-sm">
                    Track
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById("tableAlumni").innerHTML = html;

    updateStat();
    grafik();
}

// 🗑️ HAPUS
function hapusAlumni(i) {
    if (confirm("Yakin hapus data?")) {
        alumni.splice(i, 1);
        simpan();
        tampil();
    }
}

// 📊 STATISTIK
function updateStat() {

    document.getElementById("totalAlumni").innerText = alumni.length;

    let found = alumni.filter(a => a.status === "Teridentifikasi").length;
    let verify = alumni.filter(a => a.status === "Perlu Verifikasi").length;

    document.getElementById("foundAlumni").innerText = found;
    document.getElementById("notFound").innerText = verify;
}

// 📈 GRAFIK
function grafik() {

    let found = alumni.filter(a => a.status === "Teridentifikasi").length;
    let verify = alumni.filter(a => a.status === "Perlu Verifikasi").length;

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("chartAlumni"), {
        type: "bar",
        data: {
            labels: ["Teridentifikasi", "Perlu Verifikasi"],
            datasets: [{
                label: "Statistik Alumni",
                data: [found, verify]
            }]
        }
    });
}

// 📥 IMPORT EXCEL (TETAP ADA)
function prosesImportExcel(event) {

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        let json = XLSX.utils.sheet_to_json(sheet);

        json.slice(0, 300).forEach(row => {

            let nama = row["Nama"] || row["nama"] || "";
            let nim = row["NIM"] || row["nim"] || "";
            let prodi = row["Prodi"] || "-";
            let fakultas = row["Fakultas"] || "-";
            let tahun = row["Tahun Lulus"] || "-";

            if (nama) {
                alumni.push({
    nama_lengkap: nama,
    nim: nim,
    prodi: prodi,
    fakultas: fakultas,
    tahun_lulus: tahun,

    email: "",
    nohp: "",
    linkedin: "",
    ig: "",
    fb: "",
    tiktok: "",
    tempat_kerja: "",
    alamat_kerja: "",
    posisi: "",
    jenis_pekerjaan: "",
    sosmed_kerja: "",

    status: "Belum Dilacak",
    confidence: 0
});
            }
        });

        alert("Import berhasil!");
        simpan();
        tampil();
    };

    reader.readAsArrayBuffer(file);
}

// 🚀 INIT
tampil();