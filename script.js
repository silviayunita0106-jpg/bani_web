/* =========================================
   EXPLORE LOMBOK
   ALERT, PENCARIAN, DAN MODAL DETAIL
========================================= */

/* =========================================
   1. ALERT SELAMAT DATANG
========================================= */

window.onload = function () {
    alert(
        "Selamat Datang di NUANSA INDONESIA\nAyo berkunjung ke lombok."
    );
};


/* =========================================
   2. FITUR PENCARIAN
========================================= */

function cariData() {

    const input = document.getElementById("searchInput");
    const keyword = input.value.toLowerCase().trim();

    const cards = document.querySelectorAll(".card");

    let jumlahDitemukan = 0;

    cards.forEach(function (card) {
        const isiCard = card.textContent.toLowerCase();

        if (keyword === "") {
            card.style.display = "";

        } else if (isiCard.includes(keyword)) {
            card.style.display = "";
            jumlahDitemukan++;

        } else {
            card.style.display = "none";
        }

    });

    if (keyword === "") {
        alert("Silakan masukkan kata kunci pencarian!");
    } else if (jumlahDitemukan > 0) {
        alert("Ditemukan " + jumlahDitemukan + " hasil pencarian.");
    } else {
        alert("Maaf, data yang Anda cari tidak ditemukan.");
    }
}

/* =========================================
   3. FITUR ENTER PADA PENCARIAN
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                cariData();
            }
        });
    }
});

/* =========================================
   4. MEMBUAT TOMBOL SELENGKAPNYA OTOMATIS
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const semuaCard = document.querySelectorAll(".card");
    semuaCard.forEach(function (card) {
        const tombolAda = card.querySelector(".btn-detail");

        if (!tombolAda) {
            const tombol = document.createElement("button");

            tombol.type = "button";
            tombol.className = "btn-detail";
            tombol.textContent = "Selengkapnya";

            card.appendChild(tombol);
        }
    });
});


/* =========================================
   5. MODAL DETAIL CARD
========================================= */


document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("detailModal");
    const tombolTutup = document.getElementById("closeModal");
    const gambar = document.getElementById("modalImage");
    const kategori = document.getElementById("modalCategory");
    const judul = document.getElementById("modalTitle")
    const lokasi = document.getElementById("modalLocation");
    const deskripsi = document.getElementById("modalDescription");

    // Memastikan semua elemen modal tersedia
    if (!modal || !tombolTutup || !gambar ||
        !kategori || !judul || !lokasi || !deskripsi) {

        console.error("Elemen modal tidak ditemukan!");
        return;
    }

    /* =====================================
       FUNGSI MEMBUKA MODAL
    ===================================== */

    function bukaModal(card) {

        // Mengambil isi HTML asli dari card
        const gambarCard = card.querySelector("img");
        const judulCard = card.querySelector("h3");
        const paragrafCard = card.querySelector("p");

        // Mengambil judul

        judul.textContent = judulCard
            ? judulCard.textContent.trim()
            : "Informasi Lombok";


        // Mengambil seluruh teks paragraf HTML
        // Tidak dibatasi oleh tampilan CSS card


        deskripsi.textContent = paragrafCard
            ? paragrafCard.textContent.trim()
            : "Belum ada deskripsi.";


        // Mengambil gambar


        if (gambarCard) {
            gambar.src = gambarCard.src;
            gambar.alt = gambarCard.alt;
            gambar.style.display = "block";
        } else {
            gambar.style.display = "none";
        }

        // Mengambil kategori dari section

        const section = card.closest(".content-menu");
        let namaKategori = "EXPLORE BALI";
        if (section) {
            const judulSection = section.querySelector("h2");
            if (judulSection) {
                namaKategori = judulSection.textContent.trim();
            }
        }

        kategori.textContent = namaKategori;

        // Mengambil lokasi jika tersedia pada card

        const lokasiCard = card.querySelector(".card-location");

        lokasi.textContent = lokasiCard
            ? lokasiCard.textContent.trim()
            : "Lombok";

        // Menampilkan modal

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    /* =====================================
       KLIK TOMBOL SELENGKAPNYA
    ===================================== */


    document.addEventListener("click", function (event) {

        const tombol = event.target.closest(".btn-detail");

        if (!tombol) return;

        // Mempertahankan tombol navigasi yang memiliki link

        if (tombol.querySelector("a")) return;

        if (event.target.closest("a")) return;

        const card = tombol.closest(".card");

        if (!card) return;

        event.preventDefault();

        bukaModal(card);

    });


    /* =====================================
       FUNGSI MENUTUP MODAL
    ===================================== */

    function tutupModal() {

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }

    // Klik tombol X

    tombolTutup.addEventListener("click", tutupModal);

    // Klik area luar modal

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            tutupModal();
        }

    });


    // Tombol Escape

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            tutupModal();

        }

    });

});
// KONFIGURASI EMAILJS
(function () {
    emailjs.init({
        publicKey: "SLMcZftuN7T6uE_tb"
    });
})();

// FORM KONTAK KAMI
document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Konfirmasi pengiriman
    const konfirmasi = confirm("Apakah Anda yakin ingin mengirim pesan ini?");

    if (!konfirmasi) {
        alert("Pengiriman pesan dibatalkan.");
        return;
    }

    const tombol = this.querySelector("button[type='submit']");
    tombol.disabled = true;
    tombol.textContent = "Mengirim...";

    try {
        // Mengirim pesan ke email admin
        await emailjs.sendForm(
            "service_kvnz6o2",
            "template_b73lcku",
            this
        );

        alert("Terima kasih! Pesan Anda berhasil dikirim ke admin Explore lombok.");

        this.reset();

    } catch (error) {
        console.error("Gagal mengirim pesan:", error);

        alert("Maaf, pesan gagal dikirim. Silakan coba kembali.");

    } finally {
        tombol.disabled = false;
        tombol.textContent = "Kirim Pesan";
    }
});
