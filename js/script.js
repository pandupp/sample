document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SETUP AUDIO & SCROLL LOCK ---
    const openBtn = document.getElementById("openBtn");
    const audio = new Audio("images/music.mp3"); // Pastikan file ada
    audio.loop = true;
    let musicPlayed = false;

    // Pastikan scroll terkunci di awal (fallback jika CSS gagal)
    document.body.classList.add("lock");

    openBtn.addEventListener("click", () => {
        // A. Buka Kunci Scroll
        document.body.classList.remove("lock");

        // B. Scroll Halus ke Frame 2
        document.querySelector(".frame-2").scrollIntoView({ behavior: "smooth" });

        // C. Play Music
        if (!musicPlayed) {
            audio.play().then(() => {
                console.log("Audio playing");
            }).catch(error => {
                console.log("Audio play failed (browser policy):", error);
            });
            musicPlayed = true;
        }
    });

    // --- 2. COUNTDOWN TIMER LOGIC ---
    // Set Tanggal Acara: Bulan (Inggris), Tanggal, Tahun, Jam:Menit:Detik
    const targetDate = new Date("December 12, 2025 08:00:00").getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Rumus Waktu
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update HTML (tambah angka 0 di depan jika satuan)
        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

        // Jika waktu habis
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "<p style='font-weight:bold; color:#8B5A2B;'>Acara Telah Dimulai!</p>";
        }
    }, 1000);

});

// --- FUNGSI COPY REKENING ---
function copyText(elementId) {
    // 1. Ambil teks dari elemen ID
    var textToCopy = document.getElementById(elementId).innerText;

    // 2. Gunakan API Clipboard modern
    navigator.clipboard.writeText(textToCopy).then(function() {
        alert("Nomor berhasil disalin!");
    }, function(err) {
        console.error('Gagal menyalin: ', err);
    });
}

// --- FUNGSI TAMBAH KOMENTAR (SIMULASI) ---
function addComment() {
    // 1. Ambil nilai dari input
    const name = document.getElementById("guestName").value;
    const msg = document.getElementById("guestMessage").value;
    const status = document.getElementById("attendance").value;

    // 2. Validasi (Cek apakah kosong)
    if (name === "" || msg === "") {
        alert("Mohon isi nama dan ucapan Anda.");
        return;
    }

    // 3. Buat elemen HTML baru untuk komentar
    const newCommentHTML = `
        <div class="comment-item">
            <div class="comment-header">
                <span class="c-name">${name}</span>
                <span class="c-badge ${status === 'Hadir' ? 'present' : 'absent'}">${status}</span>
            </div>
            <p class="c-message">${msg}</p>
            <small class="c-time">Baru saja</small>
        </div>
    `;

    // 4. Masukkan ke dalam list (di paling atas container baru)
    const container = document.getElementById("newComments");
    container.insertAdjacentHTML('afterbegin', newCommentHTML);

    // 5. Reset input form
    document.getElementById("guestName").value = "";
    document.getElementById("guestMessage").value = "";
    
    alert("Terima kasih atas ucapan Anda!");
}