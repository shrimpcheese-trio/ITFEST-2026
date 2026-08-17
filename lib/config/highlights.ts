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
      label: { en: "Twin-turbo V8", id: "V8 twin-turbo" },
      description: {
        en: "A mid-mounted 4.0-litre twin-turbo V8 producing 710 hp and 770 Nm, sprinting from 0-100 km/h in 2.8 seconds.",
        id: "V8 twin-turbo 4,0 liter di tengah sasis dengan tenaga 710 hp dan torsi 770 Nm, melesat 0-100 km/jam hanya dalam 2,8 detik.",
      },
    },
    {
      label: { en: "Folding instrument display", id: "Panel instrumen lipat" },
      description: {
        en: "A retractable digital display that folds into a thin strip in Track mode, keeping the revs in view and your eyes on the road.",
        id: "Layar digital yang dapat ditarik dan mereduksi menjadi strip tipis di mode Track, menjaga putaran mesin terlihat dan fokus pengemudi pada jalan.",
      },
    },
    {
      label: { en: "Proactive Chassis Control II", id: "Suspensi Proactive Chassis Control II" },
      description: {
        en: "Adaptive dampers that read the road in real time, delivering track-level composure or cruising comfort at the push of a button.",
        id: "Peredam adaptif yang membaca kondisi jalan secara real-time, menghadirkan kestabilan ala sirkuit atau kenyamanan meluncur cukup dengan satu sentuhan tombol.",
      },
    },
    {
      label: { en: "Active rear aerodynamics", id: "Aerodinamika belakang aktif" },
      description: {
        en: "A deployable rear wing that optimises downforce and drag on the fly for rock-solid high-speed stability.",
        id: "Spoiler belakang yang dapat digerakkan untuk mengoptimalkan downforce dan hambatan udara demi kestabilan kecepatan tinggi yang mantap.",
      },
    },
    {
      label: { en: "Carbon-ceramic brakes", id: "Rem karbon-keramik" },
      description: {
        en: "Six-piston front and four-piston rear calipers on carbon-ceramic discs for fade-free, instantaneous stopping.",
        id: "Kaliper enam piston di depan dan empat piston di belakang pada cakram karbon-keramik untuk daya henti instan tanpa luntur.",
      },
    },
    {
      label: { en: "7-speed SSG gearbox", id: "Transmisi SSG 7-percepatan" },
      description: {
        en: "A seamless-shift dual-clutch gearbox that swaps cogs in milliseconds with no interruption in power delivery.",
        id: "Transmisi kopling ganda seamless-shift yang berpindah gigi dalam hitungan milidetik tanpa putusnya penyaluran tenaga.",
      },
    },
    {
      label: { en: "Carbon-fibre monocoque", id: "Monokok serat karbon" },
      description: {
        en: "A MonoCage II carbon tub with signature dihedral doors that slice upward to reveal the cockpit.",
        id: "Monokok karbon MonoCage II dengan pintu dihedral khas yang membuka ke atas memperlihatkan kokpit.",
      },
    },
    {
      label: { en: "Premium Alcantara cabin", id: "Kabin Alcantara premium" },
      description: {
        en: "Alcantara and leather upholstery with carbon-fibre trim, wrapped around a pure driver-focused cockpit.",
        id: "Balutan Alcantara dan kulit dengan aksen serat karbon, membungkus kokpit yang murni berfokus pada pengemudi.",
      },
    },
  ],
  "ferrari-488-gtb": [
    {
      label: { en: "Twin-turbo V8", id: "V8 twin-turbo" },
      description: {
        en: "A 3.9-litre twin-turbo V8 delivering 660 hp at 8,000 rpm with near-zero turbo lag, hitting 0-100 km/h in 3.0 seconds.",
        id: "V8 twin-turbo 3,9 liter berdaya 660 hp di 8.000 rpm dengan turbo lag hampir nol, 0-100 km/jam dalam 3,0 detik.",
      },
    },
    {
      label: { en: "Racing-grade aerodynamics", id: "Aerodinamika kelas balap" },
      description: {
        en: "A blown rear spoiler and active diffuser channel air to pin the car to the road at speed.",
        id: "Spoiler belakang blown-spoiler dan diffuser aktif menyalurkan udara untuk menekan mobil ke jalan saat melaju kencang.",
      },
    },
    {
      label: { en: "Carbon-ceramic brakes", id: "Rem karbon-keramik" },
      description: {
        en: "Brembo carbon-ceramic discs with extreme-design calipers cut stopping distances by 9% over the 458.",
        id: "Cakram karbon-keramik Brembo dengan kaliper berdesain ekstrem memangkas jarak pengereman 9% dibanding 458.",
      },
    },
    {
      label: { en: "Side-slip control (SSC2)", id: "Kontrol side-slip (SSC2)" },
      description: {
        en: "Ferrari's second-generation electronics blend F1-Trac and E-Diff to keep the chassis planted and sharp through corners.",
        id: "Elektronik generasi kedua Ferrari memadukan F1-Trac dan E-Diff agar sasis tetap stabil dan presisi di setiap tikungan.",
      },
    },
    {
      label: { en: "Magnetorheological dampers", id: "Peredam magnetorheological" },
      description: {
        en: "SCM3 fluid-based dampers adjust in milliseconds for a flat, confidence-inspiring ride.",
        id: "Peredam SCM3 berbasis fluida yang menyesuaikan dalam milidetik untuk berkendara stabil nan percaya diri.",
      },
    },
    {
      label: { en: "Manettino drive modes", id: "Mode berkendara Manettino" },
      description: {
        en: "A steering-wheel dial switches between Wet, Sport, Race and CT Off to reshape the car's behaviour instantly.",
        id: "Dial di setir memilih mode Wet, Sport, Race, hingga CT Off untuk mengubah perilaku mobil seketika.",
      },
    },
    {
      label: { en: "Racing seats", id: "Jok balap" },
      description: {
        en: "Lightweight bucket seats in leather and Alcantara with firm lateral support.",
        id: "Jok bucket ringan berbalut kulit dan Alcantara dengan penyangga samping yang kokoh.",
      },
    },
    {
      label: { en: "Dual-zone climate control", id: "AC dua zona" },
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
        en: "A 4.0-litre naturally aspirated V8 producing 414 hp at 8,300 rpm, with a soundtrack to match.",
        id: "V8 4,0 liter tanpa turbo berdaya 414 hp di 8.300 rpm, dengan suara mesin yang menggoda.",
      },
    },
    {
      label: { en: "Carbon-fibre roof", id: "Atap serat karbon" },
      description: {
        en: "A lightweight carbon roof lowers the centre of gravity and sharpens turn-in response.",
        id: "Atap karbon ringan menurunkan titik gravitasi dan mempertajam respons belok.",
      },
    },
    {
      label: { en: "Active M differential", id: "Diferensial M aktif" },
      description: {
        en: "An electronically controlled differential routes torque precisely to keep the tail composed.",
        id: "Diferensial elektronik menyalurkan torsi secara presisi agar bagian belakang tetap stabil.",
      },
    },
    {
      label: { en: "Six airbags", id: "Enam airbag" },
      description: {
        en: "Front, side and curtain airbags, plus adaptive braking for all-road confidence.",
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
        id: "Peredam elektronik berpindah antara mode nyaman dan sirkuit seketika.",
      },
    },
  ],
  "mustang-shelby-gt500": [
    {
      label: { en: "Supercharged V8", id: "V8 supercharged" },
      description: {
        en: "A 5.8-litre supercharged V8 producing 662 hp and 855 Nm of tyre-shredding torque.",
        id: "V8 supercharged 5,8 liter yang menghasilkan 662 hp dan 855 Nm torsi yang menggigit aspal.",
      },
    },
    {
      label: { en: "Racing stripes", id: "Stripping balap" },
      description: {
        en: "Iconic Shelby stripes and a vented hood that signal the muscle underneath.",
        id: "Stripping Shelby ikonik dan kap berventilasi yang mengisyaratkan kekuatan mesin di baliknya.",
      },
    },
    {
      label: { en: "Brembo brakes", id: "Rem Brembo" },
      description: {
        en: "Six-piston front calipers with larger vented rotors for confident high-speed braking.",
        id: "Kaliper depan enam piston dengan cakram berongga lebih besar untuk pengereman kecepatan tinggi yang mantap.",
      },
    },
    {
      label: { en: "Launch control", id: "Launch control" },
      description: {
        en: "An RPM-adjustable launch system for repeatable, full-throttle off-the-line starts.",
        id: "Sistem launch dengan RPM yang dapat diatur untuk start gas penuh yang konsisten.",
      },
    },
    {
      label: { en: "Track Apps", id: "Track Apps" },
      description: {
        en: "Instrument-cluster performance tools including a Christmas-tree timer and g-meter readout.",
        id: "Perangkat performa di panel instrumen, termasuk timer lampu start dan pembaca gaya-g.",
      },
    },
    {
      label: { en: "Recaro leather seats", id: "Jok kulit Recaro" },
      description: {
        en: "Sport bucket seats with contrast stitching and an embossed Shelby Cobra logo.",
        id: "Jok bucket sport dengan jahitan kontras dan logo Shelby Cobra timbul.",
      },
    },
    {
      label: { en: "SYNC infotainment", id: "Infotainment SYNC" },
      description: {
        en: "Ford SYNC with voice control, Bluetooth and hands-free calling built around the driver.",
        id: "Ford SYNC dengan kendali suara, Bluetooth, dan panggilan hands-free yang berpusat pada pengemudi.",
      },
    },
    {
      label: { en: "Track-ready cooling", id: "Pendinginan siap sirkuit" },
      description: {
        en: "Dedicated transmission, differential and engine-oil coolers for sustained high-speed driving.",
        id: "Pendingin transmisi, diferensial, dan oli mesin khusus untuk berkendara kecepatan tinggi yang berkelanjutan.",
      },
    },
  ],
  "range-rover-evoque": [
    {
      label: { en: "Terrain Response", id: "Terrain Response" },
      description: {
        en: "Selectable driving modes adapt to grass, gravel, snow and mud with one touch.",
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
      label: { en: "Surround camera system", id: "Kamera 360 derajat" },
      description: {
        en: "A five-camera surround view makes tight parking and urban manoeuvres effortless.",
        id: "Lima kamera 360 derajat membuat parkir di ruang sempit dan manuver perkotaan terasa mudah.",
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
        en: "An 11-speaker Meridian surround system with rich, room-filling clarity.",
        id: "Sistem surround Meridian 11 speaker dengan kejernihan kaya yang memenuhi ruang kabin.",
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
        en: "Signature slim LED headlights and tail lights give a sharp, modern face.",
        id: "Lampu LED depan-belakang ramping khas memberi tampilan modern yang tajam.",
      },
    },
  ],
};

export function getModelHighlights(modelId: string): ModelHighlight[] {
  return MODEL_HIGHLIGHTS[modelId] ?? MODEL_HIGHLIGHTS[Object.keys(MODEL_HIGHLIGHTS)[0]];
}