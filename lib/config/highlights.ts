export type HighlightCopy = {
  en: string;
  id: string;
};

export type ModelHighlight = {
  label: HighlightCopy;
  description: HighlightCopy;
};

export const MODEL_HIGHLIGHTS: Record<string, ModelHighlight[]> = {
  "mclaren-720s": [
    {
      label: { en: "Digital instrument cluster", id: "Panel instrumen digital" },
      description: {
        en: "A high-resolution active display providing real-time telemetry, advanced navigation overlays, and customizable driving modes directly in your line of sight.",
        id: "Layar aktif beresolusi tinggi yang menyajikan telemetri real-time, overlay navigasi, dan mode berkendara yang dapat disesuaikan tepat pada jarak pandang pengemudi.",
      },
    },
    {
      label: { en: "Premium cabin materials", id: "Material interior premium" },
      description: {
        en: "Hand-stitched Alcantara leather and aerospace-grade carbon fiber trim offer unmatched tactile luxury and weight reduction.",
        id: "Lapisan kulit Alcantara jahitan tangan berpadu dengan aksen serat karbon berkualitas aerospace, memberikan kemewahan taktil dan peredaman bobot.",
      },
    },
    {
      label: { en: "Active safety systems", id: "Sistem keselamatan aktif" },
      description: {
        en: "Continuous monitoring via radar and optical sensors to enable collision avoidance, lane keeping, and automated emergency braking.",
        id: "Pemantauan terus-menerus melalui sensor radar dan optik untuk fitur penghindar tabrakan, penjaga lajur, serta pengereman darurat otomatis.",
      },
    },
    {
      label: { en: "Adaptive suspension", id: "Suspensi adaptif" },
      description: {
        en: "Proactive damping systems that instantly adjust to road conditions, delivering track-level stiffness or highway comfort at the push of a button.",
        id: "Sistem peredaman proaktif yang langsung beradaptasi dengan kondisi jalan; menawarkan kestabilan ala sirkuit atau kenyamanan meluncur di jalan tol.",
      },
    },
    {
      label: { en: "7-speed gearbox", id: "Transmisi 7-percepatan" },
      description: {
        en: "A lightning-fast dual-clutch transmission providing seamless gear changes in milliseconds, ensuring uninterrupted power delivery.",
        id: "Transmisi kopling ganda super cepat yang memberikan perpindahan gigi dalam hitungan milidetik, menjamin penyaluran tenaga tanpa henti.",
      },
    },
    {
      label: { en: "Carbon-ceramic brakes", id: "Rem karbon-keramik" },
      description: {
        en: "Massive rotors designed to resist heat fade under extreme conditions, offering immediate and predictable stopping power.",
        id: "Cakram rem berukuran masif yang dirancang khusus untuk menahan panas ekstrem, menawarkan daya henti seketika dan dapat diprediksi.",
      },
    },
    {
      label: { en: "Active aerodynamics", id: "Aerodinamika aktif" },
      description: {
        en: "Deployable spoilers and dynamic air intakes that adjust automatically to optimize downforce, cooling, and straight-line speed.",
        id: "Spoiler yang dapat ditarik dan asupan udara dinamis yang menyesuaikan diri otomatis untuk mengoptimalkan downforce, pendinginan, dan kecepatan.",
      },
    },
    {
      label: { en: "LED Matrix headlights", id: "Lampu LED Matrix" },
      description: {
        en: "Intelligent illumination that dynamically shapes the light beam to avoid dazzling oncoming traffic while maximizing visibility.",
        id: "Pencahayaan cerdas yang secara dinamis membentuk sorotan cahaya agar tidak menyilaukan lalu lintas berlawanan sambil memaksimalkan jarak pandang.",
      },
    },
  ],
  "ferrari-488-gtb": [
    {
      label: { en: "Twin-turbo V8", id: "V8 twin-turbo" },
      description: {
        en: "A 3.9-liter powerplant producing 660 horsepower with near-zero turbo lag, sprinting to 100 km/h in just 3.0 seconds.",
        id: "Mesin 3,9 liter berdaya 660 tenaga kuda dengan turbo lag hampir nol, melesat ke 100 km/jam hanya dalam 3,0 detik.",
      },
    },
    {
      label: { en: "Racing-grade aero", id: "Aerodinamika kelas balap" },
      description: {
        en: "Front splitter, side air intakes, and rear diffuser engineered to pin the car to the road at high speed.",
        id: "Splitter depan, asupan udara samping, dan diffuser belakang yang dirancang untuk menempelkan mobil ke jalan pada kecepatan tinggi.",
      },
    },
    {
      label: { en: "Carbon-ceramic brakes", id: "Rem karbon-keramik" },
      description: {
        en: "Huge drilled rotors and six-piston calipers deliver fade-free stopping power lap after lap.",
        id: "Cakram borir besar dan kaliper enam piston menghadirkan daya henti tanpa paham meski dipacu terus.",
      },
    },
    {
      label: { en: "Electronic differential", id: "Diferensial elektronik" },
      description: {
        en: "Torque vectoring that keeps the chassis planted and sharp through every corner.",
        id: "Pengarah torsi yang menjaga sasis tetap stabil dan presisi di setiap tikungan.",
      },
    },
    {
      label: { en: "Racing seats", id: "Jok balap" },
      description: {
        en: "Lightweight bucket seats wrapped in hand-stitched leather with firm lateral support.",
        id: "Jok bucket ringan berbalut kulit jahitan tangan dengan penyangga samping yang kokoh.",
      },
    },
    {
      label: { en: "Driver telemetry", id: "Telemetri pengemudi" },
      description: {
        en: "An 8.4-inch display showing lap times, g-forces, and real-time engine telemetry.",
        id: "Layar 8,4 inci yang menampilkan waktu putaran, gaya-g, dan telemetri mesin real-time.",
      },
    },
    {
      label: { en: "Bose sound system", id: "Sistem audio Bose" },
      description: {
        en: "A tuned eight-speaker setup that complements the V8 soundtrack with studio clarity.",
        id: "Konfigurasi delapan speaker yang melengkapi suara V8 dengan kejernihan studio.",
      },
    },
    {
      label: { en: "Dual-zone climate", id: "AC dua zona" },
      description: {
        en: "Independent temperature zones keep driver and passenger perfectly comfortable.",
        id: "Zona suhu independen menjaga kenyamanan pengemudi dan penumpang secara terpisah.",
      },
    },
  ],
  "bmw-m3-2013": [
    {
      label: { en: "High-revving V8", id: "V8 putaran tinggi" },
      description: {
        en: "A 4.0-liter naturally aspirated V8 that revs to 8,300 rpm and sings at every gear change.",
        id: "V8 4,0 liter tanpa turbo yang berputar hingga 8.300 rpm dan berbunyi merdu di setiap pergantian gigi.",
      },
    },
    {
      label: { en: "Carbon-fiber roof", id: "Atap serat karbon" },
      description: {
        en: "A lightweight carbon roof lowers the center of gravity and sharpens turn-in response.",
        id: "Atap karbon ringan menurunkan titik gravitasi dan mempertajam respons belok.",
      },
    },
    {
      label: { en: "Torque-vectoring diff", id: "Diferensial pengarah torsi" },
      description: {
        en: "An active M differential distributes power precisely to keep the tail composed.",
        id: "Diferensial M aktif menyalurkan tenaga secara presisi agar bagian belakang tetap stabil.",
      },
    },
    {
      label: { en: "Six airbags", id: "Enam airbag" },
      description: {
        en: "Front, side, and curtain airbags, plus adaptive braking for all-road confidence.",
        id: "Airbag depan, samping, dan tirai, plus pengereman adaptif untuk kepercayaan diri di semua jalan.",
      },
    },
    {
      label: { en: "M sport interior", id: "Interior sport M" },
      description: {
        en: "Full leather sport seats with heating and an M-specific instrument cluster.",
        id: "Jok sport kulit penuh dengan pemanas dan panel instrumen khas M.",
      },
    },
    {
      label: { en: "iDrive navigation", id: "Navigasi iDrive" },
      description: {
        en: "An 8.8-inch screen with intuitive rotary control and real-time traffic guidance.",
        id: "Layar 8,8 inci dengan kontrol putar intuitif dan panduan lalu lintas real-time.",
      },
    },
    {
      label: { en: "Harman Kardon audio", id: "Audio Harman Kardon" },
      description: {
        en: "A 16-speaker surround system tuned for crisp, balanced playback.",
        id: "Sistem surround 16 speaker yang disetel untuk pemutaran jernih dan seimbang.",
      },
    },
    {
      label: { en: "Adaptive M suspension", id: "Suspensi M adaptif" },
      description: {
        en: "Electronically controlled dampers switch between comfort and track modes instantly.",
        id: "Peredam yang dikendalikan elektronik berpindah antara mode nyaman dan sirkuit seketika.",
      },
    },
  ],
  "mustang-shelby-gt500": [
    {
      label: { en: "Supercharged V8", id: "V8 supercharged" },
      description: {
        en: "A 5.8-liter supercharged V8 producing a tire-shredding 662 horsepower.",
        id: "V8 supercharged 5,8 liter yang menghasilkan 662 tenaga kuda yang menggigit aspal.",
      },
    },
    {
      label: { en: "Racing stripes", id: "Stripping balap" },
      description: {
        en: "Iconic Shelby stripes and a vented hood that signals the muscle underneath.",
        id: "Stripping Shelby ikonik dan kap berventilasi yang mengisyaratkan kekuatan mesin di baliknya.",
      },
    },
    {
      label: { en: "Brembo brakes", id: "Rem Brembo" },
      description: {
        en: "Six-piston front calipers with large vented rotors for confident high-speed braking.",
        id: "Kaliper depan enam piston dengan cakram berongga besar untuk pengereman kecepatan tinggi yang mantap.",
      },
    },
    {
      label: { en: "Launch control", id: "Launch control" },
      description: {
        en: "Optimized clutch and throttle mapping for repeatable full-throttle starts.",
        id: "Pemetaan kopling dan gas yang dioptimalkan untuk start gas penuh yang konsisten.",
      },
    },
    {
      label: { en: "Recaro leather seats", id: "Jok kulit Recaro" },
      description: {
        en: "Sport bucket seats with contrast stitching and embossed Shelby logos.",
        id: "Jok bucket sport dengan jahitan kontras dan logo Shelby timbul.",
      },
    },
    {
      label: { en: "Apple CarPlay", id: "Apple CarPlay" },
      description: {
        en: "Touchscreen infotainment with seamless smartphone mirroring and navigation.",
        id: "Infotainment layar sentuh dengan mirroring ponsel dan navigasi yang mulus.",
      },
    },
    {
      label: { en: "12-speaker audio", id: "Audio 12-speaker" },
      description: {
        en: "A punchy 12-speaker system that keeps up with the V8 soundtrack.",
        id: "Sistem 12 speaker bertenaga yang mengimbangi suara V8.",
      },
    },
    {
      label: { en: "Track-ready cooling", id: "Pendinginan siap sirkuit" },
      description: {
        en: "Dedicated transmission and differential coolers for sustained high-speed driving.",
        id: "Pendingin transmisi dan diferensial khusus untuk berkendara kecepatan tinggi yang berkelanjutan.",
      },
    },
  ],
  "range-rover-evoque": [
    {
      label: { en: "Terrain Response", id: "Terrain Response" },
      description: {
        en: "Selectable driving modes adapt to grass, gravel, snow, and mud with one touch.",
        id: "Mode berkendara yang dapat dipilih menyesuaikan medan rumput, kerikil, salju, dan lumpur dengan sekali sentuh.",
      },
    },
    {
      label: { en: "All-wheel drive", id: "Penggerak semua roda" },
      description: {
        en: "Intelligent AWD distributes torque for surefooted grip in any weather.",
        id: "AWD cerdas menyalurkan torsi untuk cengkeraman mantap di segala cuaca.",
      },
    },
    {
      label: { en: "Panoramic roof", id: "Atap panorama" },
      description: {
        en: "A fixed glass roof floods the cabin with light for an airy, premium feel.",
        id: "Atap kaca tetap membanjiri kabin dengan cahaya, menghadirkan nuansa premium nan lega.",
      },
    },
    {
      label: { en: "Collision assist", id: "Bantuan tabrakan" },
      description: {
        en: "Radar-based autonomous emergency braking and lane departure warnings.",
        id: "Pengereman darurat otomatis berbasis radar dan peringatan keluar lajur.",
      },
    },
    {
      label: { en: "Premium leather", id: "Kulit premium" },
      description: {
        en: "Soft-touch leather upholstery with heated front seats and memory settings.",
        id: "Jok kulit lembut dengan jok depan berpemanas dan pengaturan memori.",
      },
    },
    {
      label: { en: "Meridian sound", id: "Audio Meridian" },
      description: {
        en: "A surround-sound system with rich, room-filling clarity.",
        id: "Sistem surround dengan kejernihan kaya yang memenuhi ruang kabin.",
      },
    },
    {
      label: { en: "Touchscreen infotainment", id: "Infotainment layar sentuh" },
      description: {
        en: "An intuitive touchscreen with smartphone connectivity and navigation.",
        id: "Layar sentuh intuitif dengan konektivitas ponsel dan navigasi.",
      },
    },
    {
      label: { en: "Slim LED lighting", id: "Lampu LED ramping" },
      description: {
        en: "Signature slim LED headlights and tail lights give a sharp modern face.",
        id: "Lampu LED depan-belakang ramping khas memberi tampilan modern yang tajam.",
      },
    },
  ],
};

export function getModelHighlights(modelId: string): ModelHighlight[] {
  return MODEL_HIGHLIGHTS[modelId] ?? MODEL_HIGHLIGHTS[Object.keys(MODEL_HIGHLIGHTS)[0]];
}
