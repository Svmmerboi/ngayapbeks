/* ════════════════════════════════════════════════
   CARTOGRAM
════════════════════════════════════════════════ */
const CARTO = {
  kota: {
    cols: 4, title: 'Kota Bekasi · 12 Kecamatan · 56 Kelurahan',
    tiles: [
      { id:'medan-satria',  name:'Medan Satria',  x:0, y:0 },
      { id:'bekasi-utara',  name:'Bekasi Utara',  x:1, y:0 },
      { id:'bekasi-barat',  name:'Bekasi Barat',  x:0, y:1 },
      { id:'bekasi-timur',  name:'Bekasi Timur',  x:1, y:1 },
      { id:'mustikajaya',   name:'Mustikajaya',   x:2, y:1 },
      { id:'pondokgede',    name:'Pondokgede',    x:0, y:2 },
      { id:'bekasi-selatan',name:'Bekasi Selatan',x:1, y:2 },
      { id:'rawalumbu',     name:'Rawalumbu',     x:2, y:2 },
      { id:'bantargebang',  name:'Bantargebang',  x:3, y:2 },
      { id:'pondokmelati',  name:'Pondokmelati',  x:0, y:3 },
      { id:'jatiasih',      name:'Jatiasih',      x:1, y:3 },
      { id:'jatisampurna',  name:'Jatisampurna',  x:2, y:3 }
    ]
  },
  kabupaten: {
    cols: 6, title: 'Kabupaten Bekasi · 23 Kecamatan',
    tiles: [
      { id:'muaragembong',  name:'Muaragembong',  x:1, y:0 },
      { id:'tarumajaya',    name:'Tarumajaya',    x:0, y:1 },
      { id:'babelan',       name:'Babelan',       x:1, y:1 },
      { id:'sukawangi',     name:'Sukawangi',     x:2, y:1 },
      { id:'sukakarya',     name:'Sukakarya',     x:3, y:1 },
      { id:'cabangbungin',  name:'Cabangbungin',  x:4, y:1 },
      { id:'pebayuran',     name:'Pebayuran',     x:5, y:1 },
      { id:'tambun-utara',  name:'Tambun Utara',  x:0, y:2 },
      { id:'tambun-selatan',name:'Tambun Selatan',x:1, y:2 },
      { id:'sukatani',      name:'Sukatani',      x:2, y:2 },
      { id:'tambelang',     name:'Tambelang',     x:3, y:2 },
      { id:'kedungwaringin',name:'Kedungwaringin',x:4, y:2 },
      { id:'cibitung',      name:'Cibitung',      x:0, y:3 },
      { id:'cikarang-barat',name:'Cikarang Barat',x:1, y:3 },
      { id:'cikarang-utara',name:'Cikarang Utara',x:2, y:3 },
      { id:'karangbahagia', name:'Karangbahagia', x:3, y:3 },
      { id:'serang-baru',   name:'Serang Baru',   x:4, y:3 },
      { id:'setu',          name:'Setu',          x:0, y:4 },
      { id:'cikarang-selatan',name:'Cikarang Selatan',x:1, y:4 },
      { id:'cikarang-pusat',name:'Cikarang Pusat',x:2, y:4 },
      { id:'cikarang-timur',name:'Cikarang Timur',x:3, y:4 },
      { id:'cibarusah',     name:'Cibarusah',     x:0, y:5 },
      { id:'bojongmangu',   name:'Bojongmangu',   x:1, y:5 }
    ]
  }
};

const REGION_COLOR = {
  timur:'#E8331A', barat:'#0078DC', selatan:'#14B450', utara:'#9632C8',
  cikarang:'#00B4A0', tambun:'#6450C8', cibitung:'#C8641E', tarumajaya:'#00A078'
};

/* ════════════════════════════════════════════════
   KELURAHAN
════════════════════════════════════════════════ */
const KELURAHAN = {
  'medan-satria':  ['Harapan Mulya','Kali Baru','Medan Satria','Pejuang'],
  'bekasi-utara':  ['Harapan Baru','Harapan Jaya','Kaliabang Tengah','Marga Mulya','Perwira','Teluk Pucung'],
  'bekasi-timur':  ['Aren Jaya','Bekasi Jaya','Duren Jaya','Margahayu'],
  'rawalumbu':     ['Bojong Menteng','Bojong Rawalumbu','Pengasinan','Sepanjang Jaya'],
  'mustikajaya':   ['Cimuning','Mustikajaya','Mustikasari','Padurenan'],
  'bantargebang':  ['Bantargebang','Cikiwul','Ciketing Udik','Sumur Batu'],
  'bekasi-barat':  ['Bintara','Bintara Jaya','Jakasampurna','Kota Baru','Kranji'],
  'bekasi-selatan':['Jakamulya','Jakasetia','Kayuringin Jaya','Margajaya','Pekayon Jaya'],
  'jatiasih':      ['Jatiasih','Jatikramat','Jatiluhur','Jatimekar','Jatirasa','Jatisari'],
  'pondokmelati':  ['Jatimelati','Jatimurni','Jatirahayu','Jatiwarna'],
  'jatisampurna':  ['Jatikarya','Jatiraden','Jatirangga','Jatiranggon','Jatisampurna'],
  'pondokgede':    ['Jatibening','Jatibening Baru','Jaticempaka','Jatimakmur','Jatiwaringin']
};

/* ════════════════════════════════════════════════
   REGION & HERO DATA
════════════════════════════════════════════════ */
const DATA = {
  kota: {
    tabs: ['timur','barat','selatan','utara'],
    labels: { timur:'Bekasi Timur', barat:'Bekasi Barat', selatan:'Bekasi Selatan', utara:'Bekasi Utara' },
    hero: {
      eyebrow: 'Kota Bekasi, Jawa Barat',
      title: `Tempat Lahir<br>Para <span class="accent">Perantau</span><br>Sejati.`,
      subtitle: 'Bekasi bukan sekadar penyangga Jakarta — ini kota yang punya jiwa sendiri. Kuliner, budaya, dan semangat warganya membentuk identitas yang unik dan tak tergantikan.',
      stats: [
        { val:'2<span>.6</span>M', label:'Penduduk Kota' },
        { val:'12', label:'Kecamatan' },
        { val:'56', label:'Kelurahan' },
        { val:'210<span>km²</span>', label:'Luas Wilayah' }
      ]
    },
    regions: {
      timur: {
        colorClass:'timur', tag:'Bekasi Timur', kecs:['bekasi-timur'],
        heading:'Pusat Administratif & Simpul Transportasi',
        desc:'Bekasi Timur menaungi Terminal Induk Bekasi, Stasiun Bekasi Timur, dan Klenteng Hok Lay Kiong. Kecamatan seluas 14,64 km² ini punya 4 kelurahan: Bekasi Jaya, Margahayu, Duren Jaya, dan Aren Jaya.',
        highlights:[
          { icon:'worship', title:'Klenteng Hok Lay Kiong', loc:'Kec. Bekasi Timur · Kel. Margahayu', body:'Tempat ibadah Khonghucu, Buddha, dan Taoisme di Jl. Kenari I, Margahayu — destinasi religi yang sarat sejarah.' },
          { icon:'bus', title:'Terminal Induk Bekasi', loc:'Kec. Bekasi Timur · Kel. Margahayu', body:'Terminal Tipe A di Kelurahan Margahayu, seluas sekitar 1,3 ha, dengan trayek ke Cikarang, Tarumajaya, dan Babelan.' },
          { icon:'train', title:'Stasiun Bekasi Timur', loc:'Kec. Bekasi Timur · Kel. Duren Jaya', body:'Stasiun KRL lintas Bekasi–Cikarang di kawasan Duren Jaya, juga dilewati kereta jarak jauh.' },
          { icon:'landmark', title:'Pusat Kecamatan', loc:'Kec. Bekasi Timur · Kel. Bekasi Jaya', body:'Pusat administrasi kecamatan berada di Bekasi Jaya. Sekitar 273,7 ribu jiwa tinggal di sini (estimasi pertengahan 2023).' }
        ],
        food:[
          { emoji:'bowl', name:'Soto Mie Bekasi', desc:'Kuah bening gurih dengan mi kuning, daging, dan risol — ciri khas Bekasi.' },
          { emoji:'fish', name:'Gabus Pucung', desc:'Ikan gabus masak hitam bumbu pucung — kuliner Betawi Bekasi yang langka.' },
          { emoji:'cookie', name:'Kue Cucur', desc:'Kue tradisional dari tepung beras gula merah yang legit dan harum.' },
          { emoji:'skewer', name:'Sate Maranggi', desc:'Sate khas dengan bumbu kecap manis dan sambal tomat.' }
        ]
      },
      barat: {
        colorClass:'barat', tag:'Bekasi Barat', kecs:['bekasi-barat'],
        heading:'Gerbang Kranji',
        desc:'Bekasi Barat berbatasan dengan Jakarta, dilayani Stasiun Kranji, dan dekat dengan Grand Mall Bekasi serta Pasar Kranji. Kecamatan ini punya 5 kelurahan (Bintara, Bintara Jaya, Jakasampurna, Kota Baru, Kranji) dan luas 14,93 km².',
        highlights:[
          { icon:'train', title:'Stasiun Kranji', loc:'Kec. Bekasi Barat · Kel. Kranji', body:'Stasiun KRL layang lintas Cikarang yang menjadi pintu masuk komuter dari sisi barat Bekasi.' },
          { icon:'cart', title:'Grand Mall Bekasi', loc:'Kec. Bekasi Barat · kawasan Kranji (perkiraan, belum terverifikasi)', body:'Mal besar dan lega di kawasan Kranji, dikenal dengan tenant elektronik yang lengkap.' },
          { icon:'store', title:'Pasar Kranji', loc:'Kec. Bekasi Barat · sekitar Kel. Kranji', body:'Pasar ramai di sekitar stasiun; kemacetan jam sibuk menjadi tantangan khas kawasan ini.' },
          { icon:'users', title:'Kepadatan Penduduk', loc:'Kec. Bekasi Barat · seluruh 5 kelurahan', body:'Sekitar 285 ribu jiwa tinggal di 14,93 km² (estimasi pertengahan 2022).' }
        ],
        food:[
          { emoji:'pot', name:'Sayur Asem Betawi', desc:'Sayur asem segar dengan melinjo, jagung muda, dan labu — sajian wajib makan siang.' },
          { emoji:'pot', name:'Semur Jengkol', desc:'Jengkol dimasak kecap manis berbumbu rempah — kontroversial tapi dicinta warga.' },
          { emoji:'salad', name:'Asinan Bekasi', desc:'Sayur asin segar disiram kuah pedas asam dengan kacang goreng dan kerupuk.' },
          { emoji:'bento', name:'Nasi Ulam Betawi', desc:'Nasi campur berbumbu kelapa parut dengan lauk serundeng dan empal tipis.' }
        ]
      },
      selatan: {
        colorClass:'selatan', tag:'Bekasi Selatan', kecs:['bekasi-selatan'],
        heading:'Pusat Belanja Kota',
        desc:'Bekasi Selatan adalah tempat berkumpulnya mal-mal besar Kota Bekasi, dari Metropolitan Mall sejak 1993 hingga Pakuwon Mall, plus Hutan Kota Patriot Bina Bangsa dan Stasiun LRT Bekasi Barat di kawasan Revo Town. Kelurahannya: Jakamulya, Jakasetia, Kayuringin Jaya, Margajaya, Pekayon Jaya.',
        highlights:[
          { icon:'bag', title:'Tujuh Mal Besar', loc:'Kec. Bekasi Selatan · tersebar di beberapa kelurahan (Pekayon Jaya, Jakasetia, dll.)', body:'Grand Metropolitan, Metropolitan Mall, Pakuwon Mall, Revo Town, Mega Bekasi Hypermall, Lagoon Avenue, dan Grand Galaxy Park.' },
          { icon:'tree', title:'Hutan Kota Patriot Bina Bangsa', loc:'Kec. Bekasi Selatan · kelurahan belum tercatat', body:'Ruang hijau di kawasan GOR dan Stadion Patriot dengan taman bermain dan area kebugaran.' },
          { icon:'train', title:'Akses LRT', loc:'Kec. Bekasi Selatan · Kel. Pekayon Jaya', body:'Stasiun LRT Bekasi Barat di kawasan Revo Town terhubung dengan BISKITA Trans Bekasi Patriot.' },
          { icon:'park', title:'Taman Kota Bekasi', loc:'Kec. Bekasi Selatan · kelurahan belum tercatat', body:'Taman hijau di Jl. Jenderal Ahmad Yani yang dekat dengan pusat kota.' }
        ],
        food:[
          { emoji:'utensils', name:'Kuliner Fusion Modern', desc:'Banyak restoran fusion dan kafe estetik di sekitar mal-mal besar.' },
          { emoji:'skewer', name:'Tongseng Kambing', desc:'Tongseng berkuah kental berbumbu rempah, banyak warung legendaris.' },
          { emoji:'cake', name:'Kafe Artisan', desc:'Kedai kopi spesialti dan bakeri artisan yang mengikuti tren warga muda.' },
          { emoji:'bowl', name:'Bakmi Betawi', desc:'Mie telur dengan kaldu ayam bening dan sayuran segar khas Betawi.' }
        ]
      },
      utara: {
        colorClass:'utara', tag:'Bekasi Utara', kecs:['bekasi-utara'],
        heading:'Kota Mandiri & Kampung Kota',
        desc:'Bekasi Utara menampung kawasan Summarecon Bekasi dengan mal, danau, dan hunian terencana, berdampingan dengan permukiman padat seperti Kaliabang Nangka. Kecamatan ini punya 6 kelurahan, termasuk Marga Mulya.',
        highlights:[
          { icon:'city', title:'Summarecon Bekasi', loc:'Kec. Bekasi Utara · Kel. Marga Mulya', body:'Kota mandiri di Jl. Boulevard Ahmad Yani dengan Summarecon Mal Bekasi, apartemen, dan area kuliner The Downtown Walk.' },
          { icon:'wave', title:'Danau Summarecon', loc:'Kec. Bekasi Utara · kawasan Summarecon', body:'Danau di dalam kawasan Summarecon untuk jalan sore dan bersantai.' },
          { icon:'bus', title:'Halte BTS Mall Summarecon', loc:'Kec. Bekasi Utara · kawasan Summarecon', body:'Titik awal BISKITA Trans Bekasi Patriot menuju Revo Mall dan Vida Bantar Gebang.' },
          { icon:'road', title:'Kaliabang Nangka', loc:'Kec. Bekasi Utara · kawasan Kaliabang (kemungkinan Kel. Kaliabang Tengah, perlu cek)', body:'Wilayah yang dilewati trayek angkot K.15 dari Terminal Bekasi menuju Tarumajaya.' }
        ],
        food:[
          { emoji:'drumstick', name:'Ayam Goreng Betawi', desc:'Ayam goreng berbumbu rempah dengan sambal terasi dan lalapan.' },
          { emoji:'plate', name:'Nasi Goreng Gila', desc:'Nasi goreng dengan bahan super banyak dari warung pinggir jalan.' },
          { emoji:'pot', name:'Pindang Bandeng', desc:'Bandeng kuah asam pedas dengan belimbing wuluh — sajian acara keluarga.' },
          { emoji:'coffee', name:'Kopi Tubruk Teko', desc:'Kopi hitam diseduh dari teko di warung kopi tua — ritual pagi pekerja.' }
        ]
      }
    }
  },
  kabupaten: {
    tabs: ['cikarang','tambun','cibitung','tarumajaya'],
    labels: { cikarang:'Cikarang', tambun:'Tambun', cibitung:'Cibitung', tarumajaya:'Tarumajaya' },
    hero: {
      eyebrow: 'Kabupaten Bekasi, Jawa Barat',
      title: `Denyut Industri<br>dan <span class="accent">Bumi</span><br>Subur.`,
      subtitle: 'Kabupaten Bekasi adalah kawasan yang menyangga ekonomi nasional — dari Cikarang sebagai kota industri terbesar ASEAN hingga kawasan pesisir yang masih terjaga.',
      stats: [
        { val:'3<span>.1</span>M', label:'Penduduk Kabupaten' },
        { val:'23', label:'Kecamatan' },
        { val:'1.274<span>km²</span>', label:'Luas Wilayah' }
      ]
    },
    regions: {
      cikarang: {
        colorClass:'cikarang', tag:'Cikarang', kecs:['cikarang-utara','cikarang-barat','cikarang-pusat','cikarang-selatan','cikarang-timur'],
        heading:'Pusat Industri Terbesar ASEAN',
        desc:'Cikarang adalah mesin ekonomi yang menggerakkan jutaan tenaga kerja: kota industri terpadu, ujung lintas KRL Bekasi–Cikarang, dan tuan rumah AEON Mall Deltamas.',
        highlights:[
          { icon:'factory', title:'Jababeka Industrial City', loc:'Kec. Cikarang Utara (perlu cek)', body:'Kawasan industri seluas 5.600 ha dengan lebih dari 1.650 perusahaan dari 30 negara — salah satu yang terbesar di ASEAN.' },
          { icon:'city', title:'MM2100 Industrial Town', loc:'Kec. Cikarang Barat (perlu cek)', body:'Kota industri mandiri dengan perumahan, komersial, dan pabrik dalam satu kawasan terencana.' },
          { icon:'cap', title:'President University', loc:'Kec. Cikarang Utara (perlu cek)', body:'Universitas internasional di dalam kawasan industri yang mencetak SDM industri global.' },
          { icon:'sparkle', title:'Delta Silicon Industrial Park', loc:null, body:'Kawasan industri modern dengan infrastruktur berstandar internasional untuk industri hi-tech.' }
        ],
        food:[
          { emoji:'bowl', name:'Soto Kuning Cikarang', desc:'Soto berbumbu kunyit kaya rempah dengan potongan daging sapi dan jeroan.' },
          { emoji:'fish', name:'Ikan Bakar Citarik', desc:'Ikan segar bakar bumbu kecap dari warga sekitar sungai Citarik.' },
          { emoji:'flame', name:'Seblak Cikarang', desc:'Kerupuk aci kuah pedas dengan aneka topping — favorit pekerja pabrik.' },
          { emoji:'coffee', name:'Warung Kopi Jababeka', desc:'Kopi susu khas warung tenda yang jadi ritual pagi buruh pabrik.' }
        ]
      },
      tambun: {
        colorClass:'tambun', tag:'Tambun', kecs:['tambun-selatan','tambun-utara'],
        heading:'Permukiman, Grand Wisata & LRT Jatimulya',
        desc:'Tambun Selatan menjadi rumah bagi township Grand Wisata dengan Go! Wet Waterpark, serta Stasiun KRL Tambun dan ujung LRT Jabodebek di Jatimulya.',
        highlights:[
          { icon:'home', title:'Grand Wisata', loc:'Kec. Tambun Selatan', body:'Township premium di Tambun Selatan dengan Go! Wet Waterpark di Jl. Southern Boulevard.' },
          { icon:'train', title:'Stasiun Tambun & LRT Jatimulya', loc:'Kec. Tambun Selatan · LRT di Kel. Jatimulya', body:'Dua simpul kereta: KRL lintas Cikarang dan ujung lintas LRT Jabodebek Bekasi.' },
          { icon:'bus', title:'BISKITA Trans Wibawa Mukti', loc:'Lintas kecamatan: Tambun Selatan → Cikarang Utara', body:'Feeder yang menyambungkan LRT Jatimulya sampai Stasiun KRL Cikarang.' },
          { icon:'wheat', title:'Tambun Utara', loc:'Kec. Tambun Utara', body:'Bagian utara Tambun yang lebih lengang dibanding Tambun Selatan.' }
        ],
        food:[
          { emoji:'flame', name:'Sambal Oncom', desc:'Sambal khas Betawi-Sunda dari fermentasi kacang dengan cabai rawit pedas.' },
          { emoji:'rice', name:'Nasi Liwet Tambun', desc:'Nasi dimasak santan dengan lauk ikan asin dan sambal terasi.' },
          { emoji:'pot', name:'Gulai Kodok', desc:'Kodok sawah dimasak gulai kuning — makanan tradisional sekitar sawah.' },
          { emoji:'wheat', name:'Jagung Bakar Muda', desc:'Jagung muda dibakar dan dilumuri margarin — camilan sore legendaris.' }
        ]
      },
      cibitung: {
        colorClass:'cibitung', tag:'Cibitung', kecs:['cibitung'],
        heading:'Kawasan Logistik & Pangan',
        desc:'Cibitung merupakan simpul distribusi dan logistik penting dengan Stasiun KRL Cibitung dan gerbang tol yang terhubung ke jaringan Trans Jawa.',
        highlights:[
          { icon:'box', title:'Kawasan Logistik Cibitung', loc:'Kec. Cibitung (perlu cek)', body:'Pusat distribusi dengan banyak gudang modern dan fasilitas cold chain untuk produk pangan.' },
          { icon:'leaf', title:'Pertanian Organik', loc:null, body:'Beberapa kelompok tani mulai mengembangkan pertanian organik untuk pasokan sayuran ke Jakarta.' },
          { icon:'crane', title:'Industri Kimia & Material', loc:null, body:'Kawasan industri kimia dan material bangunan pemasok kebutuhan konstruksi Jabodetabek.' },
          { icon:'road', title:'Akses Tol Cibitung', loc:'Kec. Cibitung (perlu cek)', body:'Gerbang tol Cibitung menghubungkan kawasan ini dengan jaringan tol Trans Jawa.' }
        ],
        food:[
          { emoji:'cookie', name:'Pisang Sale Cibitung', desc:'Pisang kepok dikeringkan dan digoreng — oleh-oleh renyah manis.' },
          { emoji:'skewer', name:'Empal Gentong', desc:'Daging sapi kuah santan berbumbu ketumbar dan jinten, disantap dengan nasi hangat.' },
          { emoji:'seafood', name:'Udang Galah Goreng', desc:'Udang galah dari tambak lokal digoreng crispy dengan tepung berbumbu.' },
          { emoji:'cookie', name:'Tempe Gembus', desc:'Tempe dari ampas tahu berbumbu ketumbar — makanan rakyat kaya protein.' }
        ]
      },
      tarumajaya: {
        colorClass:'tarumajaya', tag:'Tarumajaya', kecs:['tarumajaya','muaragembong','babelan'],
        heading:'Pesisir Utara & Mangrove',
        desc:'Kawasan pesisir utara Kabupaten Bekasi yang mencakup Tarumajaya, Babelan, dan Muaragembong. Muaragembong terkenal dengan hutan mangrovenya dan akses perairan.',
        highlights:[
          { icon:'leaf', title:'Hutan Mangrove Muara Gembong', loc:'Kec. Muaragembong · Desa Pantai Bahagia', body:'Wisata mangrove di Desa Pantai Bahagia, Kecamatan Muaragembong.' },
          { icon:'ferry', title:'Akses Lewat Air', loc:'Kec. Muaragembong', body:'Muaragembong disebut lebih cepat dijangkau naik kapal daripada sepeda motor.' },
          { icon:'bus', title:'Angkot K.15 & K.09', loc:'Lintas kecamatan: Tarumajaya (K.15) · Babelan (K.09), dari Terminal Bekasi', body:'Trayek dari Terminal Bekasi: K.15 menuju Tarumajaya dan K.09 menuju Babelan.' }
        ],
        food:[
          { emoji:'seafood', name:'Kepiting Soka Goreng', desc:'Kepiting cangkang lunak digoreng crispy — hidangan laut khas pesisir.' },
          { emoji:'seafood', name:'Udang Rebon Pepes', desc:'Udang rebon dibungkus daun pisang dan dikukus dengan bumbu rempah.' },
          { emoji:'seafood', name:'Cumi Bakar Lada Hitam', desc:'Cumi segar dibakar dengan bumbu lada hitam dan kecap manis.' },
          { emoji:'pot', name:'Pindang Ikan Tenggiri', desc:'Tenggiri kuah asam pedas dengan belimbing wuluh dan tomat.' }
        ]
      }
    }
  }
};

