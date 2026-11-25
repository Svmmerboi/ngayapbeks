/* ════════════════════════════════════════════════
   DATA ITEMS
════════════════════════════════════════════════ */
/* I(type, name, badge, badgeText, loc, note, kecs, kel)
   kecs: id kecamatan terkait (lihat CARTO); [] = kecamatan belum terverifikasi
   kel : nama kelurahan bila sudah tercatat (opsional)
   B(agama, jenis, name, alamat, kel, note, kecs): tambah data HANYA kalau alamatnya sudah dicek.
   Data tambahan rumah ibadah juga dibaca dari data/ibadah.json (opsional). */
const I = (type, name, badge, badgeText, loc, note, kecs, kel) => ({ type, name, badge, badgeText, loc, note, kecs, kel: kel || null });
const B = (agama, jenis, name, addr, kel, note, kecs) => ({
  type:'ibadah', agama, jenis, name,
  badge: 'ib-' + agama, badgeText: jenis,
  loc: addr, note, kecs, kel: kel || null
});

const K = (name, badgeText, loc, note, kecs, kel) => I('kopi', name, 'kopi', badgeText, loc, note, kecs, kel);

const ITEMS = [
  /* ── STASIUN ── */
  I('stasiun','Stasiun Kranji','krl','KRL','Kranji, Kec. Bekasi Barat','KRL Commuter Line lintas Cikarang, stasiun layang menuju Manggarai dan Jakarta Kota.',['bekasi-barat'],'Kranji'),
  I('stasiun','Stasiun Bekasi','krl','KRL','Jl. Ir. H. Juanda, dekat Terminal Bekasi','Stasiun utama Kota Bekasi dengan 5 jalur. Lokasi administratifnya ditulis berbeda antar sumber (Marga Mulya/Bekasi Utara atau Bekasi Timur), karena dekat batas kecamatan.',['bekasi-timur','bekasi-utara']),
  I('stasiun','Stasiun Bekasi Timur','krl','KRL','Kawasan Duren Jaya, Kec. Bekasi Timur','KRL lintas Bekasi–Cikarang, antara Stasiun Bekasi dan Stasiun Tambun. Juga dilewati KA jarak jauh.',['bekasi-timur'],'Duren Jaya'),
  I('stasiun','Stasiun Tambun','krl','KRL','Kec. Tambun Selatan, Kab. Bekasi','KRL lintas Cikarang, setelah Stasiun Bekasi Timur.',['tambun-selatan']),
  I('stasiun','Stasiun Cibitung','krl','KRL','Kec. Cibitung, Kab. Bekasi','KRL lintas Cikarang, antara Stasiun Tambun dan Stasiun Metland Telaga Murni.',['cibitung']),
  I('stasiun','Stasiun Metland Telaga Murni','krl','KRL','Kec. Cikarang Barat, Kab. Bekasi','KRL lintas Cikarang, antara Stasiun Cibitung dan Stasiun Cikarang.',['cikarang-barat']),
  I('stasiun','Stasiun Cikarang','krl','KRL','Kec. Cikarang Utara, Kab. Bekasi','Stasiun ujung KRL Commuter Line lintas Bekasi–Cikarang.',['cikarang-utara']),
  I('stasiun','Stasiun LRT Jatibening Baru','lrt','LRT','Lintas Bekasi, LRT Jabodebek','Satu dari 5 stasiun LRT Jabodebek di wilayah Bekasi.',['pondokgede'],'Jatibening Baru'),
  I('stasiun','Stasiun LRT Cikunir 1','lrt','LRT','Lintas Bekasi, LRT Jabodebek','Satu dari 5 stasiun LRT Jabodebek di wilayah Bekasi. Kecamatannya belum terverifikasi.',[]),
  I('stasiun','Stasiun LRT Cikunir 2','lrt','LRT','Lintas Bekasi, LRT Jabodebek','Satu dari 5 stasiun LRT Jabodebek di wilayah Bekasi. Kecamatannya belum terverifikasi.',[]),
  I('stasiun','Stasiun LRT Bekasi Barat','lrt','LRT','Kawasan Revo Town, Pekayon Jaya','Titik integrasi dengan BISKITA Trans Bekasi Patriot. Kuartal I 2026: 455.688 penumpang (naik 21,1% yoy). Meski bernama Bekasi Barat, letaknya di kawasan Revo Town yang beralamat di Bekasi Selatan.',['bekasi-selatan'],'Pekayon Jaya'),
  I('stasiun','Stasiun LRT Jatimulya','lrt','LRT','Kel. Jatimulya, Kec. Tambun Selatan','Ujung lintas LRT Bekasi saat ini. Kuartal I 2026: 417.662 penumpang (naik 18,2% yoy).',['tambun-selatan'],'Jatimulya'),
  I('stasiun','Stasiun LRT Bekasi Timur','plan','Rencana','Kota Bekasi','Masih rencana lintas Cawang–Bekasi Timur, belum beroperasi. Lintas yang aktif berakhir di Jatimulya.',['bekasi-timur']),

  /* ── HALTE ── */
  I('halte','Trans Patriot Koridor 1: Terminal Bekasi – Harapan Indah','brt','BRT','Jl. HM Joyo Martono, Cut Meutia, A. Yani, Sudirman, Sultan Agung','Beroperasi sejak 2018 dengan 34 halte dua arah; arah pulang lewat Sultan Agung dan Ir. H. Djuanda. Koridor 2 dan 3 sempat ada lalu ditutup karena penumpang turun. Status bisa berubah, cek Dishub.',['bekasi-timur','medan-satria']),
  I('halte','Halte Cut Meutia','halte','Halte','Jl. Cut Meutia','Halte Trans Patriot yang dikunjungi dalam peliputan awal operasi.',['bekasi-timur']),
  I('halte','Halte Jl. Chairil Anwar','halte','Halte','Jl. Chairil Anwar','Halte Trans Patriot yang dipakai saat uji coba gratis November 2018.',['bekasi-timur']),
  I('halte','Halte Bulak Kapal','halte','Halte','Kawasan Bulak Kapal','Berdampingan dengan halte Transjakarta agar tidak memicu kemacetan.',['bekasi-timur']),
  I('halte','BISKITA Trans Bekasi Patriot: Summarecon – Vida Bantar Gebang','brt','BTS','Via Revo Mall (Stasiun LRT Bekasi Barat)','Diresmikan 3 Maret 2024. Total 47 halte/bus stop (21 arah Summarecon–Vida, 26 arah sebaliknya). Rencana jam operasi 05.00–21.00, headway sekitar 10 menit.',['bekasi-utara','bekasi-selatan','bantargebang']),
  I('halte','Halte BTS Mall Summarecon Bekasi','halte','Halte','Summarecon Bekasi','Lokasi peresmian BISKITA Trans Bekasi Patriot oleh Menhub.',['bekasi-utara']),
  I('halte','BISKITA Trans Wibawa Mukti','brt','BTS','Stasiun LRT Jatimulya – Stasiun KRL Cikarang','Layanan Kab. Bekasi yang menyambungkan LRT Jatimulya sampai Stasiun Cikarang.',['tambun-selatan','cikarang-utara']),

  /* ── NON-HALTE ── */
  I('nonhalte','Terminal Induk Bekasi (Tipe A)','terminal','Terminal','Kel. Margahayu, Kec. Bekasi Timur','Luas sekitar 1,3 ha, terminal bus utama Kota Bekasi dan bersebelahan dengan Stasiun Bekasi.',['bekasi-timur'],'Margahayu'),
  I('nonhalte','Titik henti Trans Patriot (plang biru)','nonhalte','Non-halte','Sepanjang rute Koridor 1','Dari 34 titik, sebagian hanya penanda plang biru Bus Trans Patriot tanpa bangunan halte.',['bekasi-timur']),
  I('nonhalte','Angkot ruas Cut Meutia – A. Yani – Sudirman','angkot','Angkot','Pusat Kota Bekasi','Rute Trans Patriot juga dilalui angkot yang naik-turun di tepi jalan tanpa halte resmi.',['bekasi-timur']),
  I('nonhalte','Trayek K.01.A Terminal Bekasi – Cikarang','angkot','Angkot','Terminal Bekasi menuju Cikarang','Trayek dengan armada terbanyak di Terminal Bekasi, sekitar 226 kendaraan (data riset terminal).',['bekasi-timur']),
  I('nonhalte','Trayek K.15 Terminal Bekasi – Kaliabang Nangka – Tarumajaya','angkot','Angkot','Bekasi Timur – Bekasi Utara – Tarumajaya','Sekitar 99 kendaraan (data riset terminal). Akses angkutan umum utama ke Tarumajaya.',['bekasi-timur','bekasi-utara','tarumajaya']),
  I('nonhalte','Trayek K.09 Terminal Bekasi – Babelan','angkot','Angkot','Terminal Bekasi menuju Babelan','Sekitar 61 kendaraan (data riset terminal).',['bekasi-timur','babelan']),
  I('nonhalte','Angkot Kranji – Jl. Sultan Agung – Jenderal Sudirman','angkot','Angkot','Kranji menuju pusat kota','Dilaporkan sebagai penyambung dari Stasiun Kranji; naik-turun di tepi jalan. Belum diverifikasi ke Dishub.',['bekasi-barat']),
  I('nonhalte','Bus K30 Kranji – Taman Harapan Indah','angkot','Bus','Kranji menuju Harapan Indah','Dilaporkan oleh panduan kawasan; cek trayek aktif ke Dishub sebelum dipakai.',['bekasi-barat','medan-satria']),

  /* ── MAL ── */
  I('mall','Summarecon Mal Bekasi','mal','Mal','Sentra Summarecon, Jl. Boulevard Ahmad Yani, Bekasi Utara (17142)','Berdiri di lahan sekitar 80.000 m² dan dirancang sebagai pusat kuliner utama (The Downtown Walk, Food Hall). Beberapa media menulis kecamatannya Bekasi Selatan; alamat pos tercatat Bekasi Utara.',['bekasi-utara'],'Marga Mulya'),
  I('mall','Grand Metropolitan Bekasi','mal','Mal','Jl. KH Noer Ali, Bekasi Selatan','Enam lantai dan dua basement, bagian dari Metland. Disebut pusat belanja terbesar di Bekasi dengan lebih dari 125.000 m² luas lantai.',['bekasi-selatan']),
  I('mall','Metropolitan Mall Bekasi','mal','Mal','Jl. KH Noer Ali, Bekasi Selatan','Salah satu mal tertua di Bekasi, berdiri sejak 1993; berdekatan dengan Grand Metropolitan.',['bekasi-selatan']),
  I('mall','Pakuwon Mall Bekasi','mal','Mal','Jl. Raya Pekayon No. 002, Bekasi Selatan','Mal di superblok Pakuwon Bekasi; disebut yang pertama menghadirkan tenant internasional di Kota Bekasi.',['bekasi-selatan']),
  I('mall','Revo Town Bekasi','mal','Mal','Jl. Ahmad Yani, Pekayon Jaya, Bekasi Selatan','Dulunya bernama Bekasi Square. Punya wahana Revo Town Snow World dan terhubung ke Stasiun LRT Bekasi Barat.',['bekasi-selatan'],'Pekayon Jaya'),
  I('mall','Mega Bekasi Hypermall','mal','Mal','Jl. Jend. Ahmad Yani No. 1, Bekasi Selatan (17141)','Dibuka 2003, tiga lantai, dengan tenant fashion, elektronik, dan kuliner.',['bekasi-selatan']),
  I('mall','Lagoon Avenue Mall (Lave)','mal','Mal','Kawasan Grand Kamala Lagoon, Jl. Chandrabhaga, Pekayon Jaya, Bekasi Selatan','Mal yang terhubung langsung dengan kompleks apartemen.',['bekasi-selatan'],'Pekayon Jaya'),
  I('mall','Grand Galaxy Park','mal','Mal','Jl. Grand Galaxy Boulevard, Jaka Setia, Bekasi Selatan','Mal untuk warga kawasan Grand Galaxy City dengan konsep go green dan area taman outdoor.',['bekasi-selatan'],'Jakasetia'),
  I('mall','Grand Mall Bekasi','mal','Mal','Jl. Jend. Sudirman, kawasan Kranji','Mal berukuran besar dan lega, dikenal dengan tenant elektronik lengkap. Lokasi kecamatan ditempatkan di Bekasi Barat berdasarkan kedekatan dengan Kranji (perkiraan, belum terverifikasi).',['bekasi-barat']),
  I('mall','AEON Mall Deltamas','mal','Mal','Jl. Ganesha Boulevard, Kota Deltamas, Cikarang Pusat','Diresmikan Maret 2024 di kawasan Kota Deltamas; toko AEON ke-8 di Indonesia.',['cikarang-pusat']),
  I('mall','Lippo Mall Cikarang','mal','Mal','Jl. MH Thamrin, Lippo Cikarang, Cikarang Selatan','Pusat belanja di kota mandiri Lippo Cikarang.',['cikarang-selatan']),

  /* ── RUMAH IBADAH ── */
  B('islam','Masjid','Masjid Agung Al-Barkah','Kel. Margajaya, Kota Bekasi (alamat jalan belum terverifikasi)','Margajaya','Masjid dengan kapasitas sekitar 1.000 jamaah; dipakai untuk salat Jumat pada masa adaptasi normal baru Mei 2020 (CNBC Indonesia).',['bekasi-selatan']),
  B('islam','Masjid','Masjid At-Tijaroh','Mega Bekasi Hypermall, Jl. Jend. Ahmad Yani No. 1, Bekasi Selatan',null,'Masjid di dalam mal. Dibahas dalam penelitian yang dimuat NU Online (2019) tentang masjid di pusat perbelanjaan Kota Bekasi.',['bekasi-selatan']),
  B('islam','Mushala','Mushala Grand Metropolitan','Grand Metropolitan Bekasi, Jl. KH Noer Ali, Bekasi Selatan',null,'Mushala mal; dibahas dalam penelitian yang sama (NU Online, 2019).',['bekasi-selatan']),
  B('katolik','Paroki','Gereja Santo Albertus Agung (Kota Harapan Indah)','Kota Harapan Indah, Jl. Boulevard Raya Kav. 23, RT 005/RW 010, Kel. Pejuang, Kec. Medan Satria, Kota Bekasi 17131','Pejuang','Paroki di Dekenat Bekasi. Alamat menurut daftar lokasi Misa Paskah 2025 (Tirto).',['medan-satria']),
  B('katolik','Paroki','Gereja Katolik Santa Clara','Bekasi Utara, Kota Bekasi 17123 (alamat jalan belum terverifikasi)',null,'Paroki di Bekasi Utara; peresmian gereja pada Agustus 2019 diberitakan Jakarta Post.',['bekasi-utara']),
  B('katolik','Paroki','Gereja Santo Mikael (Kranji)','Jl. Bintara Raya No. 38, Gg. Strada, Kranji, Kota Bekasi',null,'Alamat dari penelitian desain interior gereja ini. Kecamatan diperkirakan Bekasi Barat karena Kranji dan Bintara sama-sama kelurahan di Bekasi Barat.',['bekasi-barat']),
  B('katolik','Paroki','Gereja Katolik Santo Bartolomeus (Paroki Taman Galaxy)','Kawasan Taman Galaxy, Bekasi Selatan 17147 (alamat jalan belum terverifikasi)',null,'Paroki di Dekenat Bekasi. Lokasi menurut daftar Misa Paskah 2025 (Tirto).',['bekasi-selatan']),
  B('katolik','Paroki','Gereja Santo Servatius (Kampung Sawah)','Kampung Sawah, Pondokmelati, Kota Bekasi 17415 (alamat jalan belum terverifikasi)',null,'Paroki di Dekenat Bekasi. Lokasi menurut daftar Misa Paskah 2025 (Tirto).',['pondokmelati']),
  B('katolik','Paroki','Gereja Santo Yohanes Paulus II (Rawalumbu)','Rawalumbu, Kota Bekasi 17117 (alamat jalan belum terverifikasi)',null,'Lokasi menurut daftar Misa Paskah 2025 (Tirto).',['rawalumbu']),
  B('katolik','Paroki','Gereja Santo Arnoldus Janssen (Paroki Bekasi)','Kota Bekasi (alamat dan kecamatan belum terverifikasi)',null,'Gereja Paroki Bekasi di Dekenat Bekasi. Misa Requiem Paus Fransiskus April 2025 dihadiri sekitar 2.000 umat (Metro TV).',[]),
  B('katolik','Stasi','Gereja Stasi Santo Stanislaus Kostka','Kota Bekasi (alamat dan kecamatan belum terverifikasi)',null,'Disebut sebagai salah satu gereja Katolik di Kota Bekasi oleh Ketua Dekenat Bekasi (Metro TV, 2024).',[]),
  B('khonghucu','Klenteng','Klenteng Hok Lay Kiong','Jl. Kenari I, Margahayu, Bekasi Timur','Margahayu','Tempat ibadah umat Khonghucu, Buddha, dan Taoisme.',['bekasi-timur']),

  /* ── WISATA ── */
  I('wisata','Klenteng Hok Lay Kiong','religi','Religi','Jl. Kenari I, Margahayu, Bekasi Timur','Tempat ibadah umat Khonghucu, Buddha, dan Taoisme yang sarat sejarah, ramai dikunjungi sebagai objek wisata budaya.',['bekasi-timur'],'Margahayu'),
  I('wisata','Hutan Kota Patriot Bina Bangsa','taman','Taman','Kawasan GOR / Stadion Patriot Candrabhaga','Ruang hijau dengan taman bermain, area kebugaran, dan spot piknik.',['bekasi-selatan']),
  I('wisata','Taman Kota Bekasi','taman','Taman','Jl. Jenderal Ahmad Yani, dekat pusat kota','Taman hijau di tengah kota untuk bersantai dan piknik keluarga.',['bekasi-selatan']),
  I('wisata','Danau Summarecon','air','Danau','Kawasan Summarecon Bekasi, Bekasi Utara','Danau di dalam kawasan kota mandiri Summarecon.',['bekasi-utara']),
  I('wisata','Transera Waterpark','air','Waterpark','Bantar Gebang, Kota Bekasi','Taman air keluarga yang populer di Kota Bekasi.',['bantargebang']),
  I('wisata','Taman Rusa Kemang Pratama','taman','Taman','Kemang Pratama, Rawalumbu','Taman Rusa Kemang, favorit keluarga di Rawalumbu.',['rawalumbu']),
  I('wisata','Danau Marakas','air','Danau','Perumahan Pesona Ungu, Jl. Sejahtera, Bahagia, Babelan','Danau buatan sejak 1992 dengan area pancing, kolam renang, taman, dan warung. Alamat dikoreksi ke Babelan (Mamikos, Moladin, Popmama); satu sumber sebelumnya menulis Rawalumbu.',['babelan']),
  I('wisata','Go! Wet Waterpark','air','Waterpark','Jl. Southern Boulevard Kav. 1, Grand Wisata, Tambun Selatan','Disebut taman air terbesar di Bekasi, berlokasi di kawasan Grand Wisata.',['tambun-selatan']),
  I('wisata','WaterBoom Lippo Cikarang','air','Waterpark','Lippo Cikarang, Cikarang Selatan','Waterpark dengan taman, area duduk teduh, dan jajanan.',['cikarang-selatan']),
  I('wisata','Hutan Mangrove Muara Gembong','alam','Alam','Desa Pantai Bahagia, Kec. Muaragembong','Wisata mangrove di pesisir utara Kab. Bekasi. Muaragembong disebut lebih cepat dijangkau naik kapal daripada sepeda motor.',['muaragembong']),

  /* ── COFFEESHOP & NONGKRONG ──
     Sumber: Dealls (Des 2024), JawaPos, Shopee, Popmama, Orami, Tripadvisor, daftar outlet Bank Mega.
     Alamat/jam disalin dari sumber, belum dicek langsung ke lokasi. Kecamatan [] = sumber tidak menyebut. */

  /* Bekasi Selatan */
  K('Kopi Tuku (Pekayon)','Coffee shop','Jl. Pulo Ribung, RT 002/RW 017, Pekayon Jaya, Bekasi Selatan','Menu andalan es kopi susu tetangga. Jam 08.00–22.00 (Dealls).',['bekasi-selatan'],'Pekayon Jaya'),
  K('Sudo Brew Galaxy','Coffee shop','Jl. Pulo Sirih Boulevard, Blok FE 374, Pekayon, Bekasi Selatan','Dua lantai dengan area indoor ber-AC dan area outdoor; Wi-Fi dan stopkontak di tiap meja, menu kopi Rp40.000–45.000. Jam 07.30–21.00 (Dealls).',['bekasi-selatan']),
  K('Kopi Kedubes','Coffee shop','Grand Galaxy Park, Bekasi Selatan','Di dalam Grand Galaxy Park, nuansa industrial-vintage dengan Wi-Fi dan stopkontak. Jam Sen–Jum 10.00–24.00, Sab–Min 08.00–24.00 (Dealls).',['bekasi-selatan'],'Jakasetia'),
  K('Moeda Coffee & Space','Coffee shop','Jl. Raya Pekayon No. 27, Bekasi Selatan','Lantai 1 bebas rokok ber-AC, lantai 2 area merokok semi-outdoor. Jam 08.00–23.00 (Dealls).',['bekasi-selatan']),
  K('Eight Coffee','Coffee shop','Grand Galaxy City, Jl. Pulo Siri Barat Raya Blok FE No. 425B (17147)','Coffee shop minimalis untuk WFC; menu kopi klasik dan smoothie bowl. Jam 09.00–21.00 (Dealls).',['bekasi-selatan']),
  K('Dyamond Caffe and Resto','Kafe','Jl. Boulevard Raya Barat Blok RGA No. 28, Ruko Grand Galaxy, Jaka Setia (17147)','Kafe dan resto dengan area indoor dan outdoor. Jam 10.00–22.00 (Dealls).',['bekasi-selatan'],'Jakasetia'),
  K('Janjian Coffee House Point','Coffee shop','Jl. Pondok Timur Mas Blok A/4, RT 001/RW 014, Jaka Setia','Area outdoor asri. Jam 08.00–23.00 (Dealls).',['bekasi-selatan'],'Jakasetia'),
  K('Kedai Maniac','Kafe','Jl. Pulo Sirih Utama, RT 001/RW 019, Jaka Setia (17147)','Ada live music. Jam 10.30–22.30 (Dealls).',['bekasi-selatan'],'Jakasetia'),
  K('Kopi Tala Galaxy','Coffee shop','Jl. Gardenia Utara Kav. 21–24, RT 005/RW 019, Jaka Setia (17148)','Dua lantai dengan rooftop dan ruang sunyi; menu Rp20.000–30.000. Jam 09.00–23.00 (Dealls).',['bekasi-selatan'],'Jakasetia'),
  K('Sunyi Coffee','Coffee shop','Ruko Sentra Niaga 1 No. 57, RT 001/RW 018, Jaka Setia','Masuk daftar cafe untuk work from cafe (Popmama).',['bekasi-selatan'],'Jakasetia'),
  K('Saya Kopi Nuansa','Coffee shop','Jl. Irigasi No. 9A, Pekayon Jaya (17148)','Interior kayu dan tanaman; menu dari kopi sampai makanan berat. Jam 07.00–23.00 (Dealls).',['bekasi-selatan'],'Pekayon Jaya'),
  K('Dusty Coffee','Coffee shop','Jl. Raya Pekayon, RT 004/RW 001, Pekayon Jaya','Awalnya sudah ada di Bogor, lalu buka di Bekasi; menu pastry, snack, kopi, dan non-kopi (Popmama).',['bekasi-selatan'],'Pekayon Jaya'),
  K('Namdua House','Coffee shop','Pekayon Jaya (alamat jalan belum terverifikasi)','Area indoor dan outdoor luas dengan taman. Jam 12.00–21.00, akhir pekan mulai 07.00 (Dealls).',['bekasi-selatan'],'Pekayon Jaya'),
  K('Loopline Coffee','Coffee shop','Kawasan Grand Galaxy (alamat detail belum terverifikasi)','Konsep kereta ala Jepang, ada colokan, bisa bayar QRIS atau debit (JawaPos). Kecamatan mengikuti lokasi Grand Galaxy di data NgayapBeks.',['bekasi-selatan']),

  /* Bekasi Utara */
  K('Kopi Nako (Summarecon)','Coffee shop','Jl. Boulevard BCBD Blok KB/008/10E Kav. D–E, Summarecon Bekasi','Interior modern dan area outdoor luas. Jam Sen–Jum 08.00–24.00, Sab–Min 07.00–24.00 (Dealls).',['bekasi-utara'],'Marga Mulya'),
  K('Simetri Coffee Roasters','Coffee shop','Bekasi CBD, La Spezia, Summarecon Bekasi, Bekasi Utara (No. 56A–B)','Pemandangan Danau Summarecon (Shopee).',['bekasi-utara']),
  K('Peleton Bike & Cafe','Kafe','Bekasi CBD, La Spezia, Summarecon Bekasi','Berada di kawasan Summarecon Bekasi (Popmama, Shopee).',['bekasi-utara']),

  /* Bekasi Timur */
  K('Temu Kamu Coffee & Eatery','Kafe','Bekasi Timur (alamat jalan belum terverifikasi)','Indoor dan outdoor, Wi-Fi, parkir lega, ruang VIP untuk meeting kecil, kadang ada live music (JawaPos).',['bekasi-timur']),
  K('Koma Junkyard Cafe','Kafe','Jl. Baru Patal Bekasi, RT 006/RW 007, Selama Jaya, Bekasi Timur','Konsep retro-industrial; buka sore sampai malam, 17.00–24.00 (Dealls).',['bekasi-timur']),

  /* Medan Satria */
  K('Kedai Kopi Tjan','Coffee shop','Ruko Emerald, Jl. Harapan Indah Raya No. 7 Blok EB 1 (17132)','Buka sejak 07.00, colokan di tiap meja, lantai dua untuk pertemuan. Jam 07.00–22.00 (Dealls).',['medan-satria']),
  K('Cafe Titik Beku','Kafe','Ruko Regency Blok BF No. 20, Jl. Harapan Indah, Pejuang (17131)','Pemandangan senja dari lantai atas dan banyak spot foto. Jam 10.00–22.00 (Dealls).',['medan-satria'],'Pejuang'),

  /* Rawalumbu */
  K('Keppo Coffee','Coffee shop','Ruko Gardenia 11, Jl. Gardenia Raya, Rawalumbu (17116)','Area merokok dan non-merokok terpisah, Wi-Fi dan colokan. Jam 15.00–21.00 (Dealls).',['rawalumbu']),
  K('Cafe Tutur','Kafe','Sepanjang Jaya, Rawalumbu (alamat jalan belum terverifikasi)','Kesan estetik dan tenang. Buka tiap hari 10.00–21.00 (JawaPos).',['rawalumbu'],'Sepanjang Jaya'),

  /* Pondokgede */
  K('Dailio Specialty Coffee','Coffee shop','Jl. Jati Makmur No. 5, RT 9/RW 9, Jatimakmur (17413)','Interior putih-cokelat; kopi mulai Rp15.000, sering ada event. Jam 10.00–22.30 (Dealls).',['pondokgede'],'Jatimakmur'),
  K('Nara Coffee','Coffee shop','Easton, Jl. Jati Bening No. 225, Jatibening (17412)','Ruang coworking di lantai 2 dan 3, bisa disewa per dua jam dengan minimal order. Jam 08.00–21.00 (Dealls).',['pondokgede'],'Jatibening'),
  K('Cotta Coffee','Coffee shop','Jl. Kemang Raya No. 19B, Jaticempaka (17416)','Punya area taman. Jam 07.00–23.45 (Dealls).',['pondokgede'],'Jaticempaka'),

  /* Pondokmelati, Jatisampurna, Mustikajaya, Bantargebang */
  K('MHTM Coffee','Coffee shop','Jl. Pajajaran X No. 5 Blok T, RT 008/RW 007, Jatimurni (17431)','Konsep ala Jogja, ada tempat duduk perorangan. Jam 13.00–22.00 (Dealls).',['pondokmelati'],'Jatimurni'),
  K('Jiwan Coffee & Things','Coffee shop','Jatisampurna (alamat jalan belum terverifikasi)','Dibahas sebagai cafe unik di Jatisampurna (Shopee).',['jatisampurna']),
  K('Kopi Tuku (Vida Bekasi)','Coffee shop','Vida Bekasi, RT 002/RW 001, Padurenan','Cabang kedua Kopi Tuku di Bekasi. Jam 08.00–22.00 (Dealls).',['mustikajaya'],'Padurenan'),
  K('Little Talk Coffee','Coffee shop','Insitu, Bumiwedari, Vida Bekasi, RT 001/RW 008, Bantargebang (17151)','Indoor dan outdoor, ada ruang rapat yang bisa direservasi. Jam 07.00–22.00 (Dealls).',['bantargebang'],'Bantargebang'),

  /* Kecamatan belum disebut sumber */
  K('Higround Coffee','Coffee shop','Ruko Cemara U7 No. 25 (kecamatan tidak disebut sumber)','Menu burger dan kopi, sering ada event. Jam 09.00–22.00, akhir pekan mulai 07.00 (Dealls).',[]),
  K('Sir Coffee House','Coffee shop','Jl. Cut Meutia No. 140 (kecamatan tidak disebut sumber)','Vibes ala Bali dengan area indoor dan outdoor. Jam 10.00–23.00 (Dealls).',[]),

  /* Kabupaten Bekasi */
  K('The Raffa Cafe And Coffee','Kafe','Grand Wisata, Ruko Celebration, Blok AA12','Tercatat di daftar cafe Bekasi (Shopee).',['tambun-selatan']),
  K('Old Town White Coffee','Coffee shop','Jl. MH Thamrin, Cikarang Selatan','Menu bervariasi dengan harga terjangkau (Orami, 2024).',['cikarang-selatan']),
  K('Mokka Coffee Cabana (Lippo Mall Cikarang)','Coffee shop','Lippo Mall Cikarang, GF Lobi Utama, Jl. MH Thamrin, Cibatu, Cikarang Selatan','Salah satu outlet Mokka Coffee Cabana (daftar outlet Bank Mega).',['cikarang-selatan']),
  K('Throwback Coffee + Kitchen','Coffee shop','Jl. Cilemah Abang Raya, Cikarang (kecamatan belum terverifikasi)','Variasi menu dinilai kurang banyak untuk ukuran coffee shop (Orami, 2024).',[]),
  K('Kawan Senja Coffee','Coffee shop','Jl. Gardenia Raya No. 4, Cikarang 17530 (kecamatan belum terverifikasi)','Tercatat sebagai kafe di Cikarang (Tripadvisor).',[]),
  K('Yellowhammer Coffee','Coffee shop','Cikarang (alamat jalan belum terverifikasi)','Masuk daftar tempat nongkrong Cikarang (Orami, Tripadvisor).',[]),

  /* ── TAMBAHAN KAB. BEKASI (okt 2026) ── */
  K('Charcoal Coffee and Eatery','Kafe','Kawasan Jababeka, Cikarang (alamat jalan belum terverifikasi)','Menu andalan Charcoal Coffee, Irish Coffee, Matcha Latte, Ayam Mertua, dan Kaya Toast; sekitar Rp25.000–50.000 per orang (Industry.co.id, Mei 2026).',[]),
  K('Neph Coffee and Eatery','Coffee shop','Hollywood Boulevard, kawasan Jababeka, Cikarang','Buka sejak awal 2023, konsep minimalis, indoor ber-AC dan outdoor ala tribun, Wi-Fi dan stopkontak. Jam 08.00–23.00; kopi mulai sekitar Rp20.000; andalannya kopi susu gula aren (Industry.co.id, Mei 2026).',[]),
  K('Beka Coffee & Space','Kafe','Kota Jababeka, Cikarang (alamat jalan belum terverifikasi)','Modern minimalis dominan krem, area outdoor dengan tribun bermural dan lapangan futsal, plus indoor ber-AC (Industry.co.id, Mei 2026).',[]),
  K('Kopi Kenangan (Living Plaza Jababeka)','Coffee shop','Living Plaza Jababeka, Cikarang','Menu kopi dan makanan ringan mulai Rp18.000. Jam 10.00–22.00 (Industry.co.id, Mei 2026).',[]),
  K('Vilo Gelato Jababeka','Kafe','Kawasan D\'Khayangan, Cikarang Timur','Kafe gelato artisan yang tenang; gelato klasik sampai premium, makanan berat, dan kopi mulai sekitar Rp35.000; ada area bermain anak (Industry.co.id, Mei 2026).',['cikarang-timur']),
  K('Hemera Coffee','Coffee shop','Cikarang (alamat jalan belum terverifikasi)','Tercatat di daftar kafe Cikarang Tripadvisor, rating 4,3 dari 5.',[]),
  K('Bunker Terrace Cafe','Kafe','Cikarang (alamat jalan belum terverifikasi)','Tercatat di daftar kafe Cikarang Tripadvisor, rating 5 dari 5 (jumlah ulasan belum dicek).',[]),
  K('Aj Brandon Coffee & Resto','Kafe','Cikarang (alamat jalan belum terverifikasi)','Tercatat di daftar Coffee & Tea Cikarang Tripadvisor, rating 5 dari 5.',[]),
  K('Gogo Kopi','Coffee shop','Cikarang (alamat jalan belum terverifikasi)','Tercatat di daftar Coffee & Tea Cikarang Tripadvisor.',[]),

  B('islam','Masjid','Masjid Besar Al Mukarromah Cikarang','Jl. Martadinata No. 5, Cikarang Kota, Cikarang Utara 17530',null,'Salah satu masjid ikonik Cikarang (Popbela, Ramadan 2026).',['cikarang-utara']),
  B('islam','Masjid','Masjid Jami Baiturrahman','Karangraharja, Cikarang Utara 17530 (alamat jalan belum terverifikasi)','Karangraharja','Masjid ikonik Cikarang menurut Popbela (2026).',['cikarang-utara']),
  B('islam','Masjid','Masjid Raya Al Azhar Jababeka','Simpangan, Cikarang Utara 17530 (alamat jalan belum terverifikasi)','Simpangan','Berada di kawasan Jababeka (Popbela, 2026).',['cikarang-utara']),
  B('islam','Masjid','Masjid Agung Nurul Hikmah Cikarang','Sukamahi, Cikarang 17530 (kecamatan belum terverifikasi)','Sukamahi','Masjid agung di Cikarang menurut Popbela (2026).',[]),
  B('islam','Masjid','Masjid Lippo Cikarang 2','Jl. Gn. Tangkuban Perahu, Cibatu, Cikarang Selatan','Cibatu','Dibangun PT Lippo Cikarang di lahan sekitar 2.000 m2 di kawasan Lippo Cikarang; pembangunan dimulai 2023 (Liputan6). Status selesai atau belum belum diverifikasi.',['cikarang-selatan']),
  B('katolik','Paroki','Gereja Katolik Ibu Teresa (Paroki Cikarang)','Kawasan Lippo Cikarang, Desa Cibatu, Cikarang Selatan (alamat jalan belum terverifikasi)','Cibatu','Paroki resmi sejak 2004, pemekaran dari Paroki St. Arnoldus Bekasi; lama beribadah di aula sekolah. Pembangunan gedung dimulai 2024 (Antara, Untar). Status selesai belum diverifikasi.',['cikarang-selatan']),

  I('wisata','Taman Buaya Indonesia Jaya','alam','Alam','Jl. Raya Cikarang–Cibarusah No. 18, Serang Baru','Penangkaran buaya yang disebut terbesar di Asia (Liputan6, Popmama).',['serang-baru']),
  I('wisata','Taman Sehati','taman','Taman','Area Stadion Wibawa Mukti, Sertajaya, Cikarang Timur','Ruang publik hijau favorit warga Cikarang untuk olahraga pagi dan bersantai (Liputan6, Moladin).',['cikarang-timur'],'Sertajaya'),
  I('wisata','Danau Cibeureum','air','Danau','Lambangjaya, Tambun Selatan','Danau buatan di Kab. Bekasi (Popmama, Moladin).',['tambun-selatan'],'Lambangjaya'),
  I('wisata','Museum Bekasi','mal','Museum','Jl. Sultan Hasanudin No. 39, Setiadarma, Tambun Selatan','Museum sejarah dan budaya Bekasi, bersebelahan dengan Stasiun Tambun di tepi Jl. Pantura (GNFI, 2023).',['tambun-selatan'],'Setiadarma'),
  I('wisata','Venetian Water Carnaval','air','Wahana air','Villa Mutiara Gading 2, Jl. Agus Salim, Karangsatria, Tambun Utara','Wisata air bertema Venesia (Mamikos, Liputan6).',['tambun-utara'],'Karangsatria'),
  I('wisata','Taman Alamanda Regency','taman','Taman','Jl. Alamanda Regency Raya, Karangsatria','Taman kota di kompleks perumahan. Kecamatan mengikuti Karangsatria di Tambun Utara (perkiraan, belum terverifikasi).',['tambun-utara'],'Karangsatria'),
  I('wisata','Danau Elysium','air','Danau','Cluster Ellysium, Lippo Cikarang, Desa Cibatu, Cikarang Selatan','Danau buatan di kawasan Lippo Cikarang untuk nongkrong dan jalan santai (Orami, Auto2000).',['cikarang-selatan'],'Cibatu'),
  I('wisata','Hutan Pinus Edukasi Cikarang','alam','Alam','Kec. Sukakarya, sekitar 20 km dari pusat Cikarang','Wisata edukasi di area hutan pinus (Auto2000). Alamat jalan belum terverifikasi.',['sukakarya']),

  /* ── RUMAH SAKIT KOTA BEKASI (okt 2026) ── */
  I('rs','RSUD dr. Chasbullah Abdulmadjid','rs','RSUD','Jl. Pramuka No. 55, Marga Jaya, Bekasi Selatan (17112)','RS umum daerah milik Pemkot Bekasi dan rujukan utama kota; berdiri 1956 sebagai RSUD Kabupaten Bekasi, diserahkan ke Kota Bekasi 1999. Ada layanan gawat darurat (Perwali, HelloSehat, Kumparan).',['bekasi-selatan'],'Margajaya'),
  I('rs','Siloam Hospitals Bekasi Timur','rs','RS swasta','Jl. Chairil Anwar, Margahayu, Bekasi Timur','Rumah sakit swasta jaringan Siloam (HelloSehat, daftar rekanan Prudential).',['bekasi-timur'],'Margahayu'),
  I('rs','RS Mitra Keluarga Bekasi Timur','rs','RS swasta','Jl. Pengasinan, Rawa Semut, Margahayu, Bekasi Timur (17113)','Beroperasi sejak 2004; layanan unggulan laparoskopi, artroskopi, angiografi, MRI, dan klinik diabetes (Halodoc, Kumparan).',['bekasi-timur'],'Margahayu'),
  I('rs','RS Sentosa Bekasi (Siloam)','rs','RS swasta','Jl. Pahlawan No. 60, Duren Jaya, Bekasi Timur (17111)','Tercatat sebagai Rumah Sakit Sentosa Siloam Bekasi (Kumparan; daftar rekanan Prudential).',['bekasi-timur'],'Duren Jaya'),
  I('rs','RS Mitra Keluarga Bekasi','rs','RS swasta','Kayuringin Jaya, Bekasi Selatan (17144); alamat jalan lengkap belum terverifikasi','Terakreditasi paripurna KARS dengan kapasitas hampir 200 tempat tidur (HelloSehat, Alodokter).',['bekasi-selatan'],'Kayuringin Jaya'),
  I('rs','Primaya Hospital Bekasi Barat','rs','RS swasta','Jl. KH. Noer Ali, Kayuringin Jaya, Bekasi Selatan (17144)','Meski bernama Bekasi Barat, alamatnya di Bekasi Selatan. Sebelumnya bernama RS Awal Bros (nama Primaya dipakai sejak April 2020) (HelloSehat, Kumparan).',['bekasi-selatan'],'Kayuringin Jaya'),
  I('rs','RS Hermina Bekasi','rs','RS swasta','Jl. Kemakmuran No. 39, Marga Jaya, Bekasi Selatan (17141)','Rumah sakit jaringan Hermina; memiliki fasilitas NICU (Kumparan).',['bekasi-selatan'],'Margajaya'),
  I('rs','RS EMC Pekayon','rs','RS swasta','Jl. Pulo Ribung, Pekayon Jaya, Bekasi Selatan (17148)','Rumah sakit jaringan EMC di Pekayon (HelloSehat, Kumparan).',['bekasi-selatan'],'Pekayon Jaya'),
  I('rs','RS Karunia Kasih','rs','RS swasta','Pondok Gede, Kota Bekasi (alamat jalan belum terverifikasi)','Dulu bernama RS Karunia Bunda (2008), jadi Karunia Kasih sejak 2013 setelah bergabung dengan Kasih Group (HelloSehat).',['pondokgede']),
  I('rs','RSUD Tipe D Bekasi Utara','rs','RSUD','Kelurahan Teluk Pucung, Bekasi Utara (nama resmi belum terverifikasi)','Disebut Wali Kota Bekasi sebagai RSUD tipe D ketiga milik Kota Bekasi (BPK Jabar, 2021).',['bekasi-utara'],'Teluk Pucung'),
  I('rs','RSUD Tipe D Jatisampurna','rs','RSUD','Kec. Jatisampurna (nama, alamat, dan kelurahan belum terverifikasi)','Disebut sebagai RSUD tipe D yang lebih dulu beroperasi di Jatisampurna (BPK Jabar, 2021).',['jatisampurna']),

  /* ── PENDIDIKAN KAB. BEKASI (okt 2026) ── */
  I('pendidikan','President University','edu','Kampus','Jl. Ki Hajar Dewantara, Kota Jababeka, Cikarang Baru (17550), Cikarang Utara','Kampus swasta berbahasa pengantar Inggris di Jababeka Education Park; berstatus universitas resmi sejak 16 April 2004 (situs President University, Masterstudies).',['cikarang-utara']),
  I('pendidikan','Universitas Pelita Bangsa','edu','Kampus','Jl. Inspeksi Kalimalang No. 9, Cibatu, Cikarang Selatan','Tercatat di daftar universitas di Cikarang (Rumah123).',['cikarang-selatan'],'Cibatu'),
  I('pendidikan','Universitas Medika Suherman','edu','Kampus','Jl. Raya Industri Pasir Gombong, Jababeka, Pasirgombong, Cikarang Utara','Awalnya STIKES Medika Cikarang, berkembang menjadi Universitas Medika Suherman pada 2021 (Rumah123).',['cikarang-utara'],'Pasirgombong'),
  I('pendidikan','Institut STIAMI Cikarang','edu','Kampus','Jl. Raya Industri 69, Mekarmukti, Cikarang Utara','Tercatat di daftar universitas di Cikarang (Rumah123).',['cikarang-utara'],'Mekarmukti'),
  I('pendidikan','STMIK MIC Cikarang','edu','Kampus','Jl. Bugelsalam, Desa Sertajaya, Cikarang Timur','Tercatat di daftar universitas di Cikarang (Rumah123).',['cikarang-timur'],'Sertajaya'),
  I('pendidikan','Universitas Paramadina Kampus Cikarang','edu','Kampus','Cibatu, Cikarang Selatan (alamat jalan belum terverifikasi)','Kampus Cikarang dari Universitas Paramadina (Rumah123).',['cikarang-selatan'],'Cibatu')
];
const NEW_SET = new Set(ITEMS.slice(ITEMS.findIndex(i => i.name === 'Charcoal Coffee and Eatery')).map(i => i.type + '|' + i.name));

