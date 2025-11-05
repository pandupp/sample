/* =================================
SKRIP JS LENGKAP - UNDANGAN DIGITAL
=================================
*/

// 'DOMContentLoaded' memastikan semua elemen HTML
// sudah dimuat sebelum JavaScript ini berjalan.
document.addEventListener("DOMContentLoaded", function() {

    // --- BAGIAN 1: FUNGSI TOMBOL "BUKA UNDANGAN" ---
    
    // 1. Ambil elemen-elemen yang kita butuhkan dari HTML
    const bukaUndanganButton = document.getElementById("buka-undangan");
    const coverSection = document.getElementById("cover");
    const mainContent = document.getElementById("main-content");
    
    // Kita cari <audio> di HTML. Pastikan Anda sudah menambahkannya!
    const audio = document.getElementById("background-music");

    // 2. Tambahkan "pendengar" ke tombol. 
    //    Fungsi ini akan berjalan SAAT tombol di-klik.
    bukaUndanganButton.addEventListener("click", function() {
        
        // 3. Mainkan musik (jika ada elemen audio)
        if (audio) {
            audio.play().catch(error => {
                console.log("Autoplay musik dicegah oleh browser.");
            });
        } else {
            console.log("Elemen audio tidak ditemukan. Lupa menambahkannya di HTML?");
        }

        // 4. Beri 'cover' efek transisi fade-out yang halus
        coverSection.style.transition = "opacity 1s ease-out, transform 1s ease-out";
        coverSection.style.opacity = 0;
        coverSection.style.transform = "translateY(-100%)"; // Bergeser ke atas
        
        // 5. Tampilkan konten utama (Frame 2, 3, 4)
        mainContent.style.display = "block";

        // 6. Setelah animasi selesai (1 detik), sembunyikan 'cover' total
        setTimeout(() => {
            coverSection.style.display = "none";
        }, 1000); // 1000 milidetik = 1 detik
    });


    // --- BAGIAN 2: FUNGSI COUNTDOWN TIMER ---

    // ==========================================================
    // !!! PENTING: Ganti tanggal ini dengan tanggal pernikahan Anda !!!
    // Format: "Bulan Hari, Tahun Jam:Menit:Detik"
    // Contoh: "August 18, 2026 09:00:00"
    // ==========================================================
    const tanggalPernikahan = "December 31, 2025 09:00:00";


    // Ambil elemen-elemen span untuk angka
    const daysSpan = document.getElementById("days");
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");

    // Buat fungsi untuk memformat angka (misal: 7 -> "07")
    function formatAngka(angka) {
        return angka < 10 ? "0" + angka : angka;
    }

    // Fungsi 'updateCountdown' akan kita jalankan setiap detik
    function updateCountdown() {
        const targetTime = new Date(tanggalPernikahan).getTime();
        const now = new Date().getTime();
        const selisih = targetTime - now;

        if (selisih < 0) {
            clearInterval(timerInterval); // Hentikan hitung mundur
            daysSpan.innerText = "00";
            hoursSpan.innerText = "00";
            minutesSpan.innerText = "00";
            secondsSpan.innerText = "00";
            return;
        }

        const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
        const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
        const detik = Math.floor((selisih % (1000 * 60)) / 1000);

        daysSpan.innerText = formatAngka(hari);
        hoursSpan.innerText = formatAngka(jam);
        minutesSpan.innerText = formatAngka(menit);
        secondsSpan.innerText = formatAngka(detik);
    }
    
    // Hanya jalankan countdown jika elemennya ada di halaman
    if (daysSpan && hoursSpan && minutesSpan && secondsSpan) {
        updateCountdown(); // Jalankan sekali saat memuat
        var timerInterval = setInterval(updateCountdown, 1000); // Ulangi setiap detik
    }

});