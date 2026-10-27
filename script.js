/* Jelajah ID — UTS Pemrograman Web
   Fitur: katalog destinasi Indonesia, DOM, event, search/filter/sort,
   Smart Destination Finder (mencari dari katalog), detail dialog,
   wishlist/localStorage + estimasi biaya per orang, trip planner & validasi.
   Foto destinasi dicari berdasarkan judul melalui Wikipedia API.
*/
"use strict";

const rawDestinations = [
["Pantai Kuta","Bali","Pantai","Pantai populer dengan garis pasir panjang, suasana matahari terbenam, dan beragam aktivitas."],
["Pantai Sanur","Bali","Pantai","Pantai dengan suasana lebih tenang dan pemandangan matahari terbit."],
["Uluwatu","Bali","Budaya","Kawasan tebing laut dengan Pura Uluwatu dan pertunjukan Kecak."],
["Tegallalang","Bali","Alam","Lanskap sawah berundak yang dikenal dengan panorama hijau."],
["Nusa Penida","Bali","Alam","Pulau dengan tebing dramatis, pantai, dan panorama laut."],
["Nusa Lembongan","Bali","Pantai","Pulau kecil dengan pantai, laguna, dan kegiatan bahari."],
["Pura Besakih","Bali","Budaya","Kompleks pura penting di lereng Gunung Agung."],
["Danau Batur","Bali","Alam","Danau kaldera dengan panorama pegunungan Kintamani."],
["Pantai Pandawa","Bali","Pantai","Pantai bertebing kapur dengan akses jalan yang ikonik."],
["Taman Nasional Bali Barat","Bali","Taman Nasional","Kawasan konservasi darat dan laut di bagian barat Bali."],
["Raja Ampat","Papua Barat Daya","Alam","Kepulauan dengan pulau karst, perairan jernih, dan biodiversitas laut."],
["Wayag","Papua Barat Daya","Alam","Panorama gugusan karst Raja Ampat yang ikonik."],
["Piaynemo","Papua Barat Daya","Alam","Titik pandang gugusan pulau kecil di perairan Raja Ampat."],
["Pulau Misool","Papua Barat Daya","Pantai","Pulau dengan laguna, pantai, dan lanskap karst."],
["Pantai Pasir Timbul","Papua Barat Daya","Pantai","Hamparan pasir yang muncul ketika kondisi pasang surut memungkinkan."],
["Taman Nasional Teluk Cenderawasih","Papua Barat","Taman Nasional","Kawasan laut luas dengan terumbu karang dan satwa laut."],
["Danau Sentani","Papua","Alam","Danau luas dengan pulau-pulau kecil dan budaya setempat."],
["Lembah Baliem","Papua Pegunungan","Alam","Lembah pegunungan dengan lanskap dan tradisi masyarakat lokal."],
["Pantai Base-G","Papua","Pantai","Pantai pesisir Jayapura dengan panorama laut Pasifik."],
["Taman Nasional Lorentz","Papua","Taman Nasional","Kawasan konservasi besar dengan ekosistem dari pesisir hingga pegunungan."],
["Gunung Bromo","Jawa Timur","Gunung","Gunung berapi dengan lautan pasir dan panorama matahari terbit."],
["Kawah Ijen","Jawa Timur","Gunung","Kawah vulkanik dan danau asam dengan fenomena api biru pada kondisi tertentu."],
["Taman Nasional Baluran","Jawa Timur","Taman Nasional","Kawasan savana yang sering dijuluki Africa van Java."],
["Taman Nasional Meru Betiri","Jawa Timur","Taman Nasional","Kawasan konservasi hutan, pantai, dan habitat satwa."],
["Pantai Klayar","Jawa Timur","Pantai","Pantai Pacitan dengan formasi batuan dan ombak Samudra Hindia."],
["Pantai Papuma","Jawa Timur","Pantai","Pantai dengan batu karang dan pemandangan pesisir."],
["Air Terjun Tumpak Sewu","Jawa Timur","Alam","Air terjun lebar yang mengalir di dinding lembah hijau."],
["Gunung Semeru","Jawa Timur","Gunung","Gunung tertinggi di Pulau Jawa; kunjungan wajib mengikuti aturan keselamatan."],
["Kawah Putih","Jawa Barat","Alam","Danau kawah dengan warna air dan lanskap vulkanik yang khas."],
["Tangkuban Perahu","Jawa Barat","Gunung","Kawasan gunung berapi dengan kawah yang dapat diamati dari area wisata."],
["Pantai Pangandaran","Jawa Barat","Pantai","Pantai populer untuk rekreasi dan menikmati panorama pesisir."],
["Green Canyon Pangandaran","Jawa Barat","Alam","Sungai dan tebing hijau yang membentuk lanskap ngarai."],
["Taman Nasional Ujung Kulon","Banten","Taman Nasional","Kawasan konservasi penting di ujung barat Pulau Jawa."],
["Pantai Sawarna","Banten","Pantai","Kawasan pantai dengan batuan, ombak, dan pemandangan alam."],
["Candi Borobudur","Jawa Tengah","Budaya","Candi Buddha monumental dengan relief dan arsitektur bersejarah."],
["Candi Prambanan","DI Yogyakarta","Budaya","Kompleks candi Hindu dengan arsitektur menjulang."],
["Keraton Yogyakarta","DI Yogyakarta","Budaya","Kompleks istana yang menjadi pusat tradisi Kesultanan Yogyakarta."],
["Malioboro","DI Yogyakarta","Budaya","Kawasan jalan dan belanja yang ramai di pusat Yogyakarta."],
["Pantai Parangtritis","DI Yogyakarta","Pantai","Pantai selatan dengan bentang pasir dan panorama senja."],
["Gunung Merapi","DI Yogyakarta","Gunung","Gunung berapi aktif; akses wisata mengikuti status resmi dan aturan keselamatan."],
["Dieng Plateau","Jawa Tengah","Alam","Dataran tinggi dengan telaga, kawah, dan kompleks candi."],
["Karimunjawa","Jawa Tengah","Taman Nasional","Kepulauan dengan terumbu karang, pantai, dan kehidupan laut."],
["Lawang Sewu","Jawa Tengah","Budaya","Bangunan bersejarah dengan arsitektur kolonial di Semarang."],
["Kota Lama Semarang","Jawa Tengah","Budaya","Kawasan bangunan bersejarah dan jalan kota bernuansa kolonial."],
["Pantai Menganti","Jawa Tengah","Pantai","Pantai dengan perbukitan hijau dan panorama laut selatan."],
["Gunung Slamet","Jawa Tengah","Gunung","Gunung tertinggi di Jawa Tengah; pendakian memerlukan persiapan dan izin."],
["Taman Nasional Gunung Gede Pangrango","Jawa Barat","Taman Nasional","Kawasan hutan pegunungan dengan jalur pendakian resmi."],
["Taman Nasional Gunung Halimun Salak","Jawa Barat","Taman Nasional","Kawasan hutan hujan dan keanekaragaman hayati."],
["Kota Tua Jakarta","DKI Jakarta","Budaya","Kawasan bersejarah dengan museum dan bangunan peninggalan kolonial."],
["Kepulauan Seribu","DKI Jakarta","Pantai","Gugusan pulau untuk wisata pantai dan kegiatan laut."],
["Danau Toba","Sumatera Utara","Alam","Danau vulkanik besar dengan Pulau Samosir di tengahnya."],
["Pulau Samosir","Sumatera Utara","Budaya","Pulau di Danau Toba yang kaya lanskap dan budaya Batak."],
["Bukit Lawang","Sumatera Utara","Alam","Kawasan wisata alam dan pintu masuk pengamatan orangutan secara bertanggung jawab."],
["Air Terjun Sipiso-piso","Sumatera Utara","Alam","Air terjun tinggi dengan panorama dataran tinggi Karo."],
["Taman Nasional Gunung Leuser","Aceh","Taman Nasional","Kawasan hutan penting bagi orangutan Sumatra dan satwa liar lainnya."],
["Pantai Iboih","Aceh","Pantai","Pantai Pulau Weh yang dikenal dengan kejernihan air."],
["Masjid Raya Baiturrahman","Aceh","Budaya","Landmark bersejarah dan arsitektur religius di Banda Aceh."],
["Danau Maninjau","Sumatera Barat","Alam","Danau kaldera dengan jalan berkelok dan pemandangan perbukitan."],
["Lembah Harau","Sumatera Barat","Alam","Lembah dengan tebing granit dan lanskap hijau."],
["Jam Gadang","Sumatera Barat","Budaya","Menara jam ikonik di pusat Kota Bukittinggi."],
["Kepulauan Mentawai","Sumatera Barat","Pantai","Kepulauan yang dikenal dengan budaya lokal dan ombak selancar."],
["Pantai Air Manis","Sumatera Barat","Pantai","Pantai Padang yang berkaitan dengan legenda Malin Kundang."],
["Danau Singkarak","Sumatera Barat","Alam","Danau besar di antara perbukitan Sumatera Barat."],
["Jembatan Ampera","Sumatera Selatan","Budaya","Jembatan ikonik yang melintasi Sungai Musi di Palembang."],
["Pulau Kemaro","Sumatera Selatan","Budaya","Pulau di Sungai Musi dengan pagoda dan tradisi lokal."],
["Gunung Dempo","Sumatera Selatan","Gunung","Gunung di kawasan Pagar Alam dengan kebun teh dan udara sejuk."],
["Pantai Panjang","Bengkulu","Pantai","Pantai panjang di Kota Bengkulu untuk menikmati suasana pesisir."],
["Danau Ranau","Lampung","Alam","Danau di kawasan perbukitan dengan panorama Gunung Seminung."],
["Taman Nasional Way Kambas","Lampung","Taman Nasional","Kawasan konservasi gajah Sumatra dan satwa liar."],
["Pantai Tanjung Setia","Lampung","Pantai","Pantai yang dikenal di kalangan peselancar."],
["Pulau Pahawang","Lampung","Pantai","Pulau dengan spot snorkeling dan perairan tropis."],
["Pantai Tanjung Tinggi","Kepulauan Bangka Belitung","Pantai","Pantai dengan batu granit besar dan pasir putih."],
["Pantai Tanjung Kelayang","Kepulauan Bangka Belitung","Pantai","Pantai dengan batuan granit dan pulau-pulau kecil."],
["Danau Kaolin","Kepulauan Bangka Belitung","Alam","Bekas area tambang dengan warna air dan tanah yang kontras."],
["Pulau Lengkuas","Kepulauan Bangka Belitung","Pantai","Pulau kecil dengan mercusuar dan perairan jernih."],
["Batam Waterfront","Kepulauan Riau","Pantai","Kawasan pesisir dan rekreasi di sekitar Batam."],
["Pulau Bintan","Kepulauan Riau","Pantai","Pulau dengan pantai, resort, dan wisata budaya."],
["Lagoi Bay","Kepulauan Riau","Pantai","Kawasan pantai dan rekreasi di Bintan."],
["Pulau Penyengat","Kepulauan Riau","Budaya","Pulau bersejarah dengan peninggalan Kesultanan Riau-Lingga."],
["Gunung Kerinci","Jambi","Gunung","Gunung tertinggi di Sumatra yang berada di kawasan Kerinci."],
["Danau Kaco","Jambi","Alam","Danau hutan dengan air jernih di kawasan Kerinci."],
["Candi Muaro Jambi","Jambi","Budaya","Kompleks percandian bersejarah di tepian Sungai Batanghari."],
["Taman Nasional Bukit Duabelas","Jambi","Taman Nasional","Kawasan hutan tropis yang menjadi habitat komunitas Orang Rimba."],
["Taman Nasional Tanjung Puting","Kalimantan Tengah","Taman Nasional","Kawasan konservasi orangutan dan hutan rawa gambut."],
["Taman Nasional Betung Kerihun","Kalimantan Barat","Taman Nasional","Kawasan hutan hujan dan pegunungan di pedalaman Kalimantan."],
["Danau Sentarum","Kalimantan Barat","Taman Nasional","Lahan basah musiman dan habitat keanekaragaman hayati."],
["Pantai Pasir Panjang Singkawang","Kalimantan Barat","Pantai","Pantai kota dengan area rekreasi dan pemandangan laut."],
["Bukit Kelam","Kalimantan Barat","Alam","Formasi batu raksasa dengan lanskap hutan di sekitarnya."],
["Taman Nasional Kayan Mentarang","Kalimantan Utara","Taman Nasional","Kawasan konservasi luas di wilayah perbatasan Kalimantan."],
["Kepulauan Derawan","Kalimantan Timur","Pantai","Kepulauan dengan pantai, penyu, dan kehidupan bawah laut."],
["Pulau Kakaban","Kalimantan Timur","Alam","Pulau yang dikenal dengan danau ubur-ubur."],
["Pulau Maratua","Kalimantan Timur","Pantai","Pulau dengan laguna, pantai, dan lokasi menyelam."],
["Sungai Mahakam","Kalimantan Timur","Alam","Sungai besar yang menjadi bagian penting kehidupan masyarakat setempat."],
["Taman Nasional Wakatobi","Sulawesi Tenggara","Taman Nasional","Kawasan laut dengan terumbu karang dan keanekaragaman hayati."],
["Taman Nasional Bunaken","Sulawesi Utara","Taman Nasional","Kawasan laut terkenal untuk menyelam dan snorkeling."],
["Danau Linow","Sulawesi Utara","Alam","Danau vulkanik dekat Tomohon dengan perubahan warna air."],
["Gunung Lokon","Sulawesi Utara","Gunung","Gunung berapi dekat Tomohon; aktivitas wisata harus mengikuti status resmi."],
["Pantai Losari","Sulawesi Selatan","Pantai","Kawasan tepi laut dan ruang publik ikonik di Makassar."],
["Taman Nasional Bantimurung Bulusaraung","Sulawesi Selatan","Taman Nasional","Kawasan karst, gua, air terjun, dan habitat kupu-kupu."],
["Tana Toraja","Sulawesi Selatan","Budaya","Wilayah dengan arsitektur tongkonan dan tradisi budaya Toraja."],
["Pulau Labengki","Sulawesi Tenggara","Pantai","Pulau dengan perairan jernih dan lanskap karst."],
["Kepulauan Togean","Sulawesi Tengah","Taman Nasional","Kepulauan dengan ekosistem laut dan desa pesisir."],
["Danau Poso","Sulawesi Tengah","Alam","Danau luas dengan air jernih dan pegunungan di sekitarnya."],
["Pantai Dato","Sulawesi Barat","Pantai","Pantai Majene dengan formasi batuan dan panorama laut."],
["Taman Nasional Komodo","Nusa Tenggara Timur","Taman Nasional","Kawasan konservasi komodo dengan pulau dan ekosistem laut."],
["Labuan Bajo","Nusa Tenggara Timur","Alam","Kota gerbang menuju wisata pulau dan laut Taman Nasional Komodo."],
["Pulau Padar","Nusa Tenggara Timur","Alam","Pulau dengan jalur pandang ke teluk-teluk berlekuk."],
["Pantai Pink Komodo","Nusa Tenggara Timur","Pantai","Pantai dengan pasir bernuansa merah muda di kawasan Komodo."],
["Danau Kelimutu","Nusa Tenggara Timur","Alam","Danau kawah berwarna di puncak Gunung Kelimutu."],
["Desa Wae Rebo","Nusa Tenggara Timur","Budaya","Desa pegunungan dengan rumah adat berbentuk kerucut."],
["Gunung Rinjani","Nusa Tenggara Barat","Gunung","Gunung dengan kaldera dan Danau Segara Anak; pendakian wajib mengikuti aturan resmi."],
["Gili Trawangan","Nusa Tenggara Barat","Pantai","Pulau wisata dengan pantai, snorkeling, dan suasana santai."],
["Pantai Selong Belanak","Nusa Tenggara Barat","Pantai","Pantai berpasir cerah dengan teluk yang lebar."],
["Desa Sade","Nusa Tenggara Barat","Budaya","Desa adat Sasak dengan rumah tradisional dan kerajinan."],
["Air Terjun Mata Jitu","Nusa Tenggara Barat","Alam","Air terjun bertingkat di Pulau Moyo."],
["Taman Nasional Manusela","Maluku","Taman Nasional","Kawasan hutan dan pegunungan di Pulau Seram."],
["Pantai Ora","Maluku","Pantai","Pantai dengan perairan jernih dan pemandangan pegunungan."],
["Benteng Belgica","Maluku","Budaya","Benteng bersejarah peninggalan kolonial di Pulau Banda Neira."],
["Pulau Morotai","Maluku Utara","Pantai","Pulau dengan pantai, sejarah Perang Dunia II, dan wisata bahari."],
["Kepulauan Kei","Maluku","Pantai","Kepulauan dengan pantai berpasir putih dan perairan jernih."],
["Taman Nasional Aketajawe-Lolobata","Maluku Utara","Taman Nasional","Kawasan hutan tropis dan habitat satwa endemik."],
["Danau Tolire","Maluku Utara","Alam","Danau vulkanik dekat Ternate dengan panorama hijau."],
["Gunung Gamalama","Maluku Utara","Gunung","Gunung berapi yang membentuk lanskap Pulau Ternate."],
["Pantai Natsepa","Maluku","Pantai","Pantai di Ambon yang dikenal dengan kuliner rujak khas."],
["Pantai Ngurbloat","Maluku","Pantai","Pantai Kei dengan pasir halus dan garis pantai panjang."]
].map(([name, province, category, description], index) => ({id:index+1,name,province,category,description}));

const categories = ["Semua","Pantai","Gunung","Budaya","Alam","Taman Nasional"];
const WISHLIST_KEY = "jelajahID_wishlist_v1";
const PHOTO_CACHE_KEY = "jelajahID_photo_cache_v2";
const state = {category:"Semua", query:"", sort:"featured", visible:16};
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const byName = name => rawDestinations.find(item => item.name === name);
function placeholderPhoto(name){
  const safe=String(name||"Foto destinasi").replace(/[&<>"']/g," ").slice(0,48);
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dcece2"/><stop offset="1" stop-color="#f4eee0"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><circle cx="950" cy="150" r="70" fill="#fff" opacity=".55"/><path d="M0 560 Q220 420 430 550 T850 510 T1200 500 V700 H0Z" fill="#b5d1c0"/><text x="600" y="365" text-anchor="middle" font-family="Arial,sans-serif" font-size="42" fill="#245f47">${safe}</text><text x="600" y="420" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" fill="#49695a">Foto lokasi belum tersedia</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

let wishlist = loadWishlist();
let toastTimer;

function loadWishlist(){
  try {
    const saved = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
    return Array.isArray(saved) ? [...new Set(saved.filter(name => byName(name)))] : [];
  } catch { return []; }
}
function persistWishlist(){
  try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); }
  catch { showToast("Browser tidak dapat menyimpan wishlist."); }
}
function showToast(message){
  const toast=$("#toast"); toast.textContent=message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2400);
}
function isFavorite(name){ return wishlist.includes(name); }
function toggleWishlist(name){
  if(isFavorite(name)){ wishlist=wishlist.filter(item=>item!==name); showToast("Destinasi dihapus dari wishlist."); }
  else { wishlist.push(name); showToast("Destinasi ditambahkan ke wishlist."); }
  persistWishlist(); renderDestinations(); renderWishlist(); syncLiveFavorites();
}
function photoMarkup(destination, className="destination-photo"){
  return `<img class="${className}" data-photo-title="${escapeHTML(destination.name)}" alt="Foto ${escapeHTML(destination.name)}" loading="lazy" src="${placeholderPhoto(destination.name)}">`;
}
function cardMarkup(destination){
  const favorite=isFavorite(destination.name);
  return `<article class="destination-card">
    <div class="destination-image-wrap">${photoMarkup(destination)}<span class="category-badge">${escapeHTML(destination.category)}</span>
    <button class="favorite-button ${favorite?"is-favorite":""}" type="button" data-action="favorite" data-name="${escapeHTML(destination.name)}" aria-label="${favorite?"Hapus dari":"Tambah ke"} wishlist: ${escapeHTML(destination.name)}" aria-pressed="${favorite}">${favorite?"♥":"♡"}</button></div>
    <div class="destination-card-content"><h3>${escapeHTML(destination.name)}</h3><p class="destination-location">⌖ ${escapeHTML(destination.province)}</p>
    <p class="destination-description">${escapeHTML(destination.description)}</p>
    <div class="card-actions"><button class="card-button primary" type="button" data-action="detail" data-name="${escapeHTML(destination.name)}">Lihat detail</button><button class="card-button" type="button" data-action="favorite" data-name="${escapeHTML(destination.name)}">${favorite?"♥ Tersimpan":"♡ Wishlist"}</button></div></div></article>`;
}
function getFilteredDestinations(){
  let list=rawDestinations.filter(item=>{
    const haystack=`${item.name} ${item.province} ${item.category} ${item.description}`.toLocaleLowerCase("id");
    return haystack.includes(state.query.toLocaleLowerCase("id")) && (state.category==="Semua"||item.category===state.category);
  });
  if(state.sort==="az") list.sort((a,b)=>a.name.localeCompare(b.name,"id"));
  if(state.sort==="za") list.sort((a,b)=>b.name.localeCompare(a.name,"id"));
  return list;
}
function renderDestinations(){
  const all=getFilteredDestinations(), visible=all.slice(0,state.visible);
  $("#destinationGrid").innerHTML=visible.map(cardMarkup).join("");
  $("#destinationCount").textContent=all.length;
  $("#destinationEmpty").hidden=all.length>0;
  $("#loadMore").hidden=all.length<=state.visible;
  $("#filterSummary").textContent=`Menampilkan ${visible.length} dari ${all.length} destinasi`;
  loadMatchingPhotos($("#destinationGrid"));
}
function renderWishlist(){
  wishlist=wishlist.filter(name=>byName(name));
  $("#wishlistCount").textContent=wishlist.length;
  $("#navWishlistCount").textContent=wishlist.length;
  $("#wishlistGrid").innerHTML=wishlist.map(name=>cardMarkup(byName(name))).join("");
  $("#wishlistEmpty").hidden=wishlist.length>0;
  loadMatchingPhotos($("#wishlistGrid"));
  renderWishlistEstimate();
}
function populateDestinationSelect(id){
  const select=$("#"+id); if(!select) return;
  select.innerHTML=rawDestinations.map(item=>`<option value="${escapeHTML(item.name)}">${escapeHTML(item.name)} — ${escapeHTML(item.province)}</option>`).join("");
}
function populateRecommendationSuggestions(){
  const list=$("#recommendationDestinations");
  if(!list) return;
  list.innerHTML=rawDestinations.map(item=>`<option value="${escapeHTML(item.name)}">${escapeHTML(item.province)}</option>`).join("");
}
function openDetail(name){
  const item=byName(name); if(!item)return;
  const favorite=isFavorite(name);
  $("#dialogContent").innerHTML=`${photoMarkup(item,"dialog-image")}<div class="dialog-body"><p class="eyebrow">${escapeHTML(item.category.toUpperCase())}</p><h2>${escapeHTML(item.name)}</h2><p>⌖ ${escapeHTML(item.province)}, Indonesia</p><p>${escapeHTML(item.description)}</p><p>Rencanakan kunjungan dengan memeriksa informasi resmi, cuaca, jam buka, aturan konservasi, serta akses transportasi sebelum berangkat.</p><div class="dialog-actions"><button class="button button-primary" type="button" data-action="favorite" data-name="${escapeHTML(item.name)}">${favorite?"♥ Hapus dari Wishlist":"♡ Tambah ke Wishlist"}</button><button class="button button-outline" type="button" data-action="plan" data-name="${escapeHTML(item.name)}">Rencanakan perjalanan</button><a class="button button-outline" href="https://www.google.com/search?q=${encodeURIComponent(item.name+" "+item.province+" Indonesia wisata")}" target="_blank" rel="noopener">Info lebih lanjut ↗</a></div></div>`;
  const dialog=$("#destinationDialog");
  if(typeof dialog.showModal==="function") dialog.showModal(); else dialog.setAttribute("open","");
  loadMatchingPhotos($("#dialogContent"));
}
function closeDetail(){const dialog=$("#destinationDialog");if(dialog.open)dialog.close();else dialog.removeAttribute("open");}
function updateRecommendationLinks(){
  const input=$("#recommendationDestination");
  const typed=(input?.value||"").trim();
  const normalized=typed.toLocaleLowerCase("id");
  const match=rawDestinations.find(item=>item.name.toLocaleLowerCase("id")===normalized);
  const place=match ? `${match.name}, ${match.province}, Indonesia` : (typed ? `${typed}, Indonesia` : "Indonesia");
  $$(".recommendation-link").forEach(link=>{
    const query=[link.dataset.service,place].filter(Boolean).join(" ");
    link.href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(query);
    link.textContent=typed ? (link.dataset.labelWithPlace || link.dataset.defaultLabel || link.textContent) : (link.dataset.defaultLabel || link.textContent);
    link.setAttribute("aria-label",`${link.textContent.replace(/ ↗$/,'')} — ${place}`);
  });
  const hint=$(".recommendation-hint");
  if(hint) hint.textContent=typed ? `Pencarian layanan diarahkan ke ${place}. Pilih kategori yang dibutuhkan; hasil dan ketersediaan ditentukan oleh Google Maps.` : "Ketik nama destinasi atau kota agar tautan layanan mengarah ke lokasi yang kamu pilih. Jika dikosongkan, pencarian menggunakan Indonesia secara umum.";
}
function formatRupiah(value){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(value);}
function setError(id,message){$("#"+id).textContent=message;}
function makeTripPlan(event){
  event.preventDefault();
  ["destinationError","daysError","budgetError"].forEach(id=>setError(id,""));
  $("#tripResult").hidden=true;
  const name=$("#tripDestination").value.trim(), days=Number($("#tripDays").value), budget=Number($("#tripBudget").value);
  let valid=true;
  if(name.length<2){setError("destinationError","Masukkan nama destinasi minimal 2 karakter.");valid=false;}
  if(!Number.isInteger(days)||days<1||days>30){setError("daysError","Masukkan angka bulat antara 1 dan 30.");valid=false;}
  if(!Number.isFinite(budget)||budget<100000||budget>100000000){setError("budgetError","Anggaran harus Rp100.000–Rp100.000.000.");valid=false;}
  if(!valid)return;
  const item=byName(name)||{name,province:"Indonesia",category:"Destinasi pilihan",description:"Destinasi yang dicari pengguna"};
  const lodging=Math.round(budget*.35), food=Math.round(budget*.25), transport=Math.round(budget*.25), activities=budget-lodging-food-transport;
  const itinerary=Array.from({length:days},(_,index)=>{
    const day=index+1;
    let text;
    if(days===1) text="Eksplorasi destinasi, menikmati kuliner lokal, dan bersantai.";
    else if(day===1) text="Perjalanan menuju lokasi, check-in, dan menjelajahi area sekitar.";
    else if(day===days) text="Menikmati waktu terakhir, membeli oleh-oleh, lalu perjalanan pulang.";
    else text="Mengunjungi daya tarik utama, mencoba kuliner lokal, dan beristirahat.";
    return `<li><strong>Hari ${day}:</strong> ${text}</li>`;
  }).join("");
  $("#tripResult").innerHTML=`<h3>Rencana ke ${escapeHTML(item.name)}</h3><p><strong>Lokasi:</strong> ${escapeHTML(item.province)}, Indonesia · <strong>Durasi:</strong> ${days} hari</p><h4>Gambaran itinerary</h4><ol>${itinerary}</ol><h4>Simulasi pembagian anggaran</h4><ul><li>Penginapan (35%): ${formatRupiah(lodging)}</li><li>Makan (25%): ${formatRupiah(food)}</li><li>Transportasi (25%): ${formatRupiah(transport)}</li><li>Tiket/aktivitas (15%): ${formatRupiah(activities)}</li></ul><p class="budget-total">Total anggaran: ${formatRupiah(budget)} per orang</p><p>Ini adalah simulasi untuk membantu perencanaan awal, bukan harga aktual. Periksa harga, cuaca, tiket, dan ketersediaan layanan sebelum berangkat.</p><button class="button button-primary" type="button" data-action="favorite" data-name="${escapeHTML(item.name)}">♡ Simpan destinasi ke Wishlist</button>`;
  $("#tripResult").hidden=false;
  $("#tripResult").scrollIntoView({behavior:"smooth",block:"nearest"});
}

/* Pencarian foto sesuai judul destinasi.
   Sumber: Wikipedia API; foto cadangan dipakai bila hasil tidak ditemukan.
   Foto eksternal membutuhkan koneksi internet. */
const photoCache=new Map();
function loadPersistentPhotoCache(){
  try{
    const cache=JSON.parse(localStorage.getItem(PHOTO_CACHE_KEY)||"{}");
    Object.entries(cache).forEach(([key,value])=>photoCache.set(key,value));
  }catch{/* cache bisa diabaikan */}
}
function savePhotoCache(){
  try{localStorage.setItem(PHOTO_CACHE_KEY,JSON.stringify(Object.fromEntries(photoCache)));}catch{/* optional cache */}
}
function normalizeWords(text){
  return String(text||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();
}
function relevanceScore(title, placeName, province){
  const t=normalizeWords(title), n=normalizeWords(placeName), p=normalizeWords(province);
  const tokens=n.split(" ").filter(w=>w.length>2 && !["pantai","gunung","pulau","taman","nasional","dan","danau","air","terjun","pura","desa","bukit","kota"].includes(w));
  let score=0;
  if(t.includes(n)) score+=100;
  for(const token of tokens) if(t.includes(token)) score+=18;
  if(p && t.includes(p)) score+=8;
  if(/map|location map|peta|district|regency|administrative|logo|flag|coat of arms|map of/i.test(title)) score-=100;
  if(/beach|pantai|mount|gunung|island|pulau|temple|pura|waterfall|air terjun|lake|danau|park|taman|village|desa|landscape|landmark/i.test(title)) score+=5;
  return score;
}
async function findMatchingPhoto(placeName, province){
  if(photoCache.has(placeName))return photoCache.get(placeName);
  const queries=[`"${placeName}" ${province} Indonesia`,`"${placeName}" Indonesia`,`${placeName} ${province}`];
  try{
    for(const query of queries){
      const url="https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(query)+"&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json&origin=*";
      const response=await fetch(url);
      if(!response.ok)continue;
      const data=await response.json();
      const files=Object.values(data.query?.pages||{}).map(page=>({title:page.title.replace(/^File:/,""),url:page.imageinfo?.[0]?.thumburl||page.imageinfo?.[0]?.url})).filter(x=>x.url);
      files.sort((a,b)=>relevanceScore(b.title,placeName,province)-relevanceScore(a.title,placeName,province));
      const best=files[0];
      if(best && relevanceScore(best.title,placeName,province)>=25){
        photoCache.set(placeName,best.url);savePhotoCache();return best.url;
      }
    }
    // Fallback ke foto halaman Wikipedia yang judulnya paling relevan, bukan foto kategori generik.
    const url="https://id.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent('"'+placeName+'" '+province)+"&gsrnamespace=0&gsrlimit=10&prop=pageimages&piprop=thumbnail&pithumbsize=1000&format=json&origin=*";
    const response=await fetch(url);
    if(response.ok){
      const data=await response.json();
      const pages=Object.values(data.query?.pages||{}).map(p=>({title:p.title,url:p.thumbnail?.source})).filter(p=>p.url);
      pages.sort((a,b)=>relevanceScore(b.title,placeName,province)-relevanceScore(a.title,placeName,province));
      const best=pages[0];
      if(best && relevanceScore(best.title,placeName,province)>=25){photoCache.set(placeName,best.url);savePhotoCache();return best.url;}
    }
  }catch(error){console.warn("Pencarian foto destinasi gagal:",placeName,error);}
  photoCache.set(placeName,null);savePhotoCache();return null;
}

async function loadMatchingPhotos(root=document){
  if(!root)return;
  const images=$$("img[data-photo-title]",root);
  for(const img of images){
    if(img.dataset.photoRequested==="true")continue;
    img.dataset.photoRequested="true";
    const item=byName(img.dataset.photoTitle);
    if(!item)continue;
    const image=await findMatchingPhoto(item.name,item.province);
    if(!img.isConnected)continue;
    if(image){
      img.onerror=()=>{img.onerror=null;img.src=placeholderPhoto(item.name);};
      img.src=image;
    }
  }
}


let activeLiveDestination=null;
let liveSearchTimer=null;
let liveResults=[];
const LIVE_LIMIT=12;

/* ===== Smart Destination Finder: mencari dari katalog "Destinasi Pilihan Indonesia" ===== */
function searchCatalog(query){
  const q=normalizeWords(query);
  if(!q)return [];
  const tokens=q.split(" ").filter(Boolean);
  const run=prefix=>rawDestinations.map(item=>{
    const name=normalizeWords(item.name), prov=normalizeWords(item.province), cat=normalizeWords(item.category), desc=normalizeWords(item.description);
    const words=`${name} ${prov} ${cat} ${desc}`.split(" ");
    const hit=token=>prefix?words.some(w=>w.startsWith(token)):words.includes(token);
    if(!tokens.every(hit))return null;
    let score=0;
    if(name===q)score+=200; else if(name.startsWith(q))score+=120; else if(name.includes(q))score+=90;
    tokens.forEach(token=>{
      if(name.includes(token))score+=30;
      if(prov.includes(token))score+=15;
      if(cat.includes(token))score+=10;
      if(desc.includes(token))score+=4;
    });
    return {item,score};
  }).filter(Boolean).sort((a,b)=>b.score-a.score||a.item.name.localeCompare(b.item.name,"id")).map(entry=>entry.item);
  // Cocokkan kata utuh dulu ("bali" tidak memunculkan "Baliem"); jika kosong, longgarkan ke awalan kata (saat mengetik).
  const exact=run(false);
  return exact.length?exact:run(true);
}
function liveCardMarkup(item){
  const favorite=isFavorite(item.name);
  return `<article class="live-result-card">${photoMarkup(item,"live-result-photo")}<div class="live-result-content"><span class="live-result-tag">${escapeHTML(item.category)}</span><h3>${escapeHTML(item.name)}</h3><p class="destination-location">⌖ ${escapeHTML(item.province)}</p><p>${escapeHTML(item.description)}</p><div class="live-result-actions"><button type="button" class="button button-primary button-small" data-live-name="${escapeHTML(item.name)}">Detail & estimasi →</button><button type="button" class="button button-outline button-small live-fav" data-action="favorite" data-name="${escapeHTML(item.name)}">${favorite?"♥ Tersimpan":"♡ Wishlist"}</button></div></div></article>`;
}
function searchAnyDestination(query){
  const status=$("#liveSearchStatus"), results=$("#liveSearchResults"), detail=$("#liveDestinationDetail"), estimate=$("#estimatePanel");
  const text=String(query||"").trim();
  if(text.length<2){status.textContent="Ketik minimal 2 karakter untuk mencari destinasi.";results.innerHTML="";return;}
  detail.hidden=true;estimate.hidden=true;activeLiveDestination=null;
  const found=searchCatalog(text);
  liveResults=found.slice(0,LIVE_LIMIT);
  if(!found.length){
    status.textContent="Destinasi belum ada di katalog Destinasi Pilihan Indonesia.";
    results.innerHTML=`<p class="empty-state">Tidak menemukan “${escapeHTML(text)}” di katalog. Coba nama tempat lain, nama provinsi, atau kategori (Pantai, Gunung, Budaya, Alam, Taman Nasional). <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/${encodeURIComponent(text+" tempat wisata Indonesia")}">Cari di Google Maps ↗</a></p>`;
    return;
  }
  status.textContent=found.length>LIVE_LIMIT
    ? `Ditemukan ${found.length} destinasi di katalog; menampilkan ${LIVE_LIMIT} teratas. Persempit kata kunci untuk hasil yang lebih spesifik.`
    : `Ditemukan ${found.length} destinasi di katalog. Pilih salah satu untuk melihat detail dan menghitung estimasi biaya.`;
  results.innerHTML=liveResults.map(liveCardMarkup).join("");
  loadMatchingPhotos(results);
}
function selectLiveDestination(item){
  activeLiveDestination=item;
  const detail=$("#liveDestinationDetail"), estimate=$("#estimatePanel");
  const favorite=isFavorite(item.name);
  detail.innerHTML=`${photoMarkup(item,"live-detail-photo")}<div class="live-detail-copy"><p class="eyebrow">${escapeHTML(item.category.toUpperCase())}</p><h3>${escapeHTML(item.name)}</h3><p class="destination-location">⌖ ${escapeHTML(item.province)}, Indonesia</p><p>${escapeHTML(item.description)}</p><div class="live-detail-actions"><a class="button button-outline" href="https://www.google.com/search?q=${encodeURIComponent(item.name+" "+item.province+" Indonesia wisata")}" target="_blank" rel="noopener">Info lebih lanjut ↗</a><button class="button button-primary" type="button" id="addLiveWishlist" data-action="favorite" data-name="${escapeHTML(item.name)}">${favorite?"♥ Tersimpan di Wishlist":"♡ Simpan ke Wishlist"}</button></div></div>`;
  detail.hidden=false;estimate.hidden=false;
  $("#estimateTitle").textContent="Estimasi ke "+item.name;
  $("#liveMapsLink").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(item.name+", "+item.province+", Indonesia");
  $("#tripDestination").value=item.name;
  loadMatchingPhotos(detail);
  calculateEstimate();
  estimate.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function syncLiveFavorites(){
  $$("#liveSearchResults .live-fav").forEach(button=>{button.textContent=isFavorite(button.dataset.name)?"♥ Tersimpan":"♡ Wishlist";});
  const add=$("#addLiveWishlist");
  if(add)add.textContent=isFavorite(add.dataset.name)?"♥ Tersimpan di Wishlist":"♡ Simpan ke Wishlist";
}

/* ===== Perhitungan estimasi biaya (dipakai Finder dan Wishlist) ===== */
const STYLE_DAILY={hemat:250000,standard:500000,nyaman:900000};
const TRANSPORT_BASE={lokal:75000,mobil:250000,antarkota:450000,pesawat:1200000};
function estimateCosts(days,people,style,transport){
  const dailyBase=STYLE_DAILY[style], transportBase=TRANSPORT_BASE[transport];
  const lodging=Math.round(dailyBase*.35*days*people);
  const food=Math.round(dailyBase*.25*days*people);
  const localTransport=Math.round((dailyBase*.15+transportBase/days)*days*people);
  const activities=Math.round(dailyBase*.25*days*people);
  return {lodging,food,transport:localTransport,activities,total:lodging+food+localTransport+activities};
}
function validDaysPeople(days,people){return Number.isInteger(days)&&days>=1&&days<=30&&Number.isInteger(people)&&people>=1&&people<=20;}
function breakdownMarkup(c){
  const fmt=formatRupiah;
  return `<div class="estimate-breakdown"><div><small>Penginapan</small><strong>${fmt(c.lodging)}</strong></div><div><small>Makan</small><strong>${fmt(c.food)}</strong></div><div><small>Transportasi</small><strong>${fmt(c.transport)}</strong></div><div><small>Tiket & aktivitas</small><strong>${fmt(c.activities)}</strong></div></div>`;
}
const ESTIMATE_NOTE="Perhitungan memakai asumsi biaya harian berdasarkan gaya perjalanan dan jenis transportasi. Belum termasuk tarif aktual, musim liburan, tiket pesawat pergi-pulang spesifik, dan biaya tak terduga. Cek harga di penyedia resmi sebelum berangkat.";
function calculateEstimate(event){
  if(event)event.preventDefault();
  const days=Number($("#estimateDays").value), people=Number($("#estimatePeople").value), style=$("#estimateStyle").value, transport=$("#estimateTransport").value;
  const result=$("#estimateResult");
  if(!validDaysPeople(days,people)){result.hidden=false;result.innerHTML="<p>Masukkan durasi 1–30 hari dan jumlah orang 1–20.</p>";return;}
  const c=estimateCosts(days,people,style,transport);
  result.innerHTML=`<h4>Estimasi untuk ${people} orang · ${days} hari</h4><div class="estimate-total">${formatRupiah(c.total)}</div><p>Per orang: <strong>${formatRupiah(Math.ceil(c.total/people))}</strong></p>${breakdownMarkup(c)}<p class="estimate-disclaimer">${ESTIMATE_NOTE}</p>`;
  result.hidden=false;
  if(activeLiveDestination)$("#estimateTitle").textContent="Estimasi ke "+activeLiveDestination.name;
}

/* ===== Estimasi biaya untuk seluruh destinasi di My Travel Wishlist ===== */
function renderWishlistEstimate(event){
  if(event)event.preventDefault();
  const panel=$("#wishlistEstimatePanel"), result=$("#wishlistEstimateResult");
  if(!panel||!result)return;
  panel.hidden=wishlist.length===0;
  if(!wishlist.length){result.hidden=true;return;}
  const days=Number($("#wishDays").value), people=Number($("#wishPeople").value), style=$("#wishStyle").value, transport=$("#wishTransport").value;
  if(!validDaysPeople(days,people)){result.hidden=false;result.innerHTML="<p>Masukkan durasi 1–30 hari dan jumlah orang 1–20.</p>";return;}
  const per=estimateCosts(days,people,style,transport), count=wishlist.length;
  const grand={lodging:per.lodging*count,food:per.food*count,transport:per.transport*count,activities:per.activities*count,total:per.total*count};
  const rows=wishlist.map(name=>{const item=byName(name);return `<tr><td><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.province)}</small></td><td>${days} hari</td><td>${formatRupiah(per.total)}</td><td>${formatRupiah(Math.ceil(per.total/people))}</td></tr>`;}).join("");
  result.innerHTML=`<h4>Estimasi ${count} destinasi · ${people} orang · ${days} hari per destinasi</h4><div class="estimate-total">${formatRupiah(grand.total)}</div><p>Per orang: <strong>${formatRupiah(Math.ceil(grand.total/people))}</strong> · Total durasi: <strong>${days*count} hari</strong></p>${breakdownMarkup(grand)}<div class="wishlist-estimate-table-wrap"><table class="wishlist-estimate-table"><thead><tr><th>Destinasi</th><th>Durasi</th><th>Total (${people} orang)</th><th>Per orang</th></tr></thead><tbody>${rows}</tbody></table></div><p class="estimate-disclaimer">${ESTIMATE_NOTE} Setiap destinasi dihitung sebagai perjalanan terpisah dengan durasi, jumlah orang, gaya, dan transportasi yang sama.</p>`;
  result.hidden=false;
}
function populateLiveSuggestions(){
  const list=$("#liveDestinationSuggestions");
  if(list)list.innerHTML=rawDestinations.map(item=>`<option value="${escapeHTML(item.name)}">${escapeHTML(item.province)}</option>`).join("");
}

function init(){
  $("#currentYear").textContent=new Date().getFullYear();
  populateDestinationSelect("tripDestinationSuggestions");
  populateRecommendationSuggestions();populateLiveSuggestions();
  renderDestinations();renderWishlist();updateRecommendationLinks();
  // Hero search: pencarian bebas memakai Smart Destination Finder yang sama.
  const heroForm = $("#heroSearchForm");
  heroForm.addEventListener("submit", event => {
    event.preventDefault();
    const query = $("#heroDestinationInput").value.trim();
    const category = $("#heroCategory").value;
    if (category) {
      state.category = category;
      state.query = query;
      state.visible = 16;
      $("#searchInput").value = query;
      $$(".filter-chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === category));
      renderDestinations();
      $("#destinations").scrollIntoView({behavior:"smooth"});
    } else if (query) {
      $("#liveDestinationInput").value = query;
      $("#liveSearchForm").requestSubmit();
      $("#live-finder").scrollIntoView({behavior:"smooth"});
    } else {
      $("#liveDestinationInput").focus();
      $("#live-finder").scrollIntoView({behavior:"smooth"});
      showToast("Ketik nama destinasi atau pilih kategori wisata.");
    }
  });
  $$("[data-hero-category]").forEach(button => button.addEventListener("click", () => {
    const category = button.dataset.heroCategory;
    state.category = category; state.query = ""; state.visible = 16;
    $("#searchInput").value = "";
    $$(".filter-chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === category));
    renderDestinations();
    $("#destinations").scrollIntoView({behavior:"smooth"});
  }));
  loadPersistentPhotoCache();loadMatchingPhotos(document);
  $("#searchInput").addEventListener("input",event=>{state.query=event.target.value.trim();state.visible=16;renderDestinations();});
  $("#categoryFilters").addEventListener("click",event=>{
    const button=event.target.closest("[data-category]");if(!button)return;
    state.category=button.dataset.category;
    $$(".filter-chip").forEach(chip=>chip.classList.toggle("active",chip===button));
    state.visible=16;renderDestinations();
  });
  $("#sortSelect").addEventListener("change",event=>{state.sort=event.target.value;state.visible=16;renderDestinations();});
  $("#resetFilters").addEventListener("click",()=>{
    state.category="Semua";state.query="";state.sort="featured";state.visible=16;
    $("#searchInput").value="";$("#sortSelect").value="featured";
    $$(".filter-chip").forEach(chip=>chip.classList.toggle("active",chip.dataset.category==="Semua"));
    renderDestinations();
  });
  $("#loadMore").addEventListener("click",()=>{state.visible+=16;renderDestinations();});
  document.addEventListener("click",event=>{
    const button=event.target.closest("[data-action]");if(!button)return;
    const {action,name}=button.dataset;
    if(action==="favorite")toggleWishlist(name);
    if(action==="detail")openDetail(name);
    if(action==="plan"){
      closeDetail();$("#tripDestination").value=name;$("#trip-planner").scrollIntoView({behavior:"smooth"});$("#tripDays").focus();
    }
  });
  $("#clearWishlist").addEventListener("click",()=>{
    if(!wishlist.length){showToast("Wishlist sudah kosong.");return;}
    if(confirm("Hapus semua destinasi dari wishlist?")){wishlist=[];persistWishlist();renderWishlist();renderDestinations();showToast("Wishlist berhasil dikosongkan.");}
  });
  $("#tripForm").addEventListener("submit",makeTripPlan);
  $("#recommendationDestination").addEventListener("input",updateRecommendationLinks);
  $("#liveSearchForm").addEventListener("submit",event=>{event.preventDefault();searchAnyDestination($("#liveDestinationInput").value);});
  $("#liveDestinationInput").addEventListener("input",event=>{clearTimeout(liveSearchTimer);const value=event.target.value.trim();if(value.length>=2)liveSearchTimer=setTimeout(()=>searchAnyDestination(value),650);});
  $("#liveSearchResults").addEventListener("click",event=>{const button=event.target.closest("[data-live-name]");if(!button)return;const item=byName(button.dataset.liveName);if(item)selectLiveDestination(item);});
  $("#estimateForm").addEventListener("submit",calculateEstimate);
  $("#wishlistEstimateForm").addEventListener("submit",renderWishlistEstimate);
  $("#wishlistEstimateForm").addEventListener("input",()=>renderWishlistEstimate());
  $("#wishlistEstimateForm").addEventListener("change",()=>renderWishlistEstimate());
  $("#sendToPlanner").addEventListener("click",()=>{$("#tripDestination").value=activeLiveDestination?.name||$("#liveDestinationInput").value.trim();$("#trip-planner").scrollIntoView({behavior:"smooth"});$("#tripDays").focus();});
  $("#clearRecommendationSearch").addEventListener("click",()=>{$("#recommendationDestination").value="";updateRecommendationLinks();$("#recommendationDestination").focus();});
  $("#closeDialog").addEventListener("click",closeDetail);
  $("#destinationDialog").addEventListener("click",event=>{if(event.target===$("#destinationDialog"))closeDetail();});
  $("#menuToggle").addEventListener("click",()=>{
    const nav=$("#mainNav"),open=nav.classList.toggle("open");
    $("#menuToggle").setAttribute("aria-expanded",String(open));
    $("#menuToggle").textContent=open?"×":"☰";
  });
  $$("#mainNav a").forEach(link=>link.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");$("#menuToggle").textContent="☰";}));
}
document.addEventListener("DOMContentLoaded",init);
