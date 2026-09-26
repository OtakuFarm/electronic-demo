import type { Product } from './types';
import { reviews } from './reviews';

export const products: Product[] = [
  {
    id: 'p-001',
    slug: 'air-pro',
    sku: 'PLS-AIR-PRO-01',
    name: 'PULSE Air Pro',
    tagline: 'Adaptive noise cancelling, tuned in-house',
    category: 'audio',
    price: 349,
    compareAtPrice: 399,
    description:
      'Over-ear wireless headphones with a 40mm bio-cellulose driver, adaptive hybrid ANC and a 60-hour battery that comfortably outlasts a long-haul week.',
    story:
      'The Air Pro began with a stubborn question: why does most noise cancelling feel like pressure? We rebuilt the cancellation loop around a feed-forward array that updates 48,000 times a second, and retuned the driver against our own reference curve rather than a generic target. The result is silence without the cabin-pressure sensation, and a soundstage that stays open at low volume.',
    images: [
      '/products/air-pro-1.svg',
      '/products/air-pro-2.svg',
      '/products/air-pro-3.svg',
      '/products/air-pro-4.svg',
    ],
    rating: 4.8,
    reviewCount: 2841,
    reviews: reviews['air-pro'],
    specs: [
      {
        group: 'Audio',
        items: [
          { label: 'Driver', value: '40mm bio-cellulose dynamic' },
          { label: 'Frequency response', value: '5Hz – 40kHz' },
          { label: 'Codecs', value: 'AAC, SBC, aptX Adaptive, LDAC' },
          { label: 'Microphones', value: '6 beamforming MEMS' },
        ],
      },
      {
        group: 'Power & Battery',
        items: [
          { label: 'Battery life', value: '60h ANC on, 80h off' },
          { label: 'Case', value: '+30h, USB-C and Qi charging' },
          { label: 'Fast charge', value: '10 min = 7h playback' },
        ],
      },
      {
        group: 'Build',
        items: [
          { label: 'Weight', value: '254g' },
          { label: 'Materials', value: 'Aluminium, recycled nylon, protein leather' },
          { label: 'Water resistance', value: 'IPX4 (sweat and rain resistant)' },
        ],
      },
    ],
    features: [
      'Adaptive hybrid ANC with transparency mode',
      '60-hour battery with a 7-hour quick boost',
      'Multipoint Bluetooth connecting to two devices at once',
      'Spatial audio with head tracking',
      'Folds flat into the included hard case',
      'Replaceable ear cushions and battery serviceable by design',
    ],
    compatibility: ['iOS 16 or later', 'Android 12 or later', 'macOS 13 or later', 'Windows 10/11', 'Bluetooth 5.3 devices', 'USB-C and 3.5mm audio'],
    whatsInTheBox: ['PULSE Air Pro headphones', 'Hard travel case', 'USB-C charging cable', '3.5mm analogue cable', 'Airline adaptor', 'Quick start guide'],
    stock: 'in-stock',
    stockCount: 142,
    warranty: { period: '2 years', summary: 'Two-year limited hardware warranty with accidental damage cover in year one.' },
    colors: [
      { name: 'Midnight Graphite', hex: '#2A3040' },
      { name: 'Glacier', hex: '#E8EDF3' },
      { name: 'Deep Teal', hex: '#1F4E5F' },
    ],
    badges: ['Best seller', 'Save $50'],
    releasedAt: '2025-03-14',
    isNew: false,
    isBestSeller: true,
    compare: {
      batteryLife: '60 h (ANC on)',
      weight: '254 g',
      connectivity: 'Bluetooth 5.3 · USB-C · 3.5 mm',
      waterResistance: 'IPX4',
      warranty: '2 years',
      mainFeature: 'Adaptive hybrid ANC',
    },
  },
  {
    id: 'p-002',
    slug: 'mini',
    sku: 'PLS-MINI-02',
    name: 'PULSE Mini',
    tagline: 'Wireless earbuds that disappear in your ear',
    category: 'audio',
    price: 129,
    description:
      'Compact true wireless earbuds with a 6mm driver, three-mic beamforming for calls and an IPX5 shell that shrugs off a downpour.',
    story:
      'The Mini is the result of shrinking everything we learned from the Air Pro into a housing small enough to forget. Six grams per bud, a vented acoustic chamber to keep voices natural, and a case that fits in a coin pocket.',
    images: ['/products/mini-1.svg', '/products/mini-2.svg', '/products/mini-3.svg', '/products/mini-4.svg'],
    rating: 4.6,
    reviewCount: 3920,
    reviews: reviews['mini'],
    specs: [
      {
        group: 'Audio',
        items: [
          { label: 'Driver', value: '6mm dynamic with vented chamber' },
          { label: 'Frequency response', value: '20Hz – 20kHz' },
          { label: 'Codecs', value: 'AAC, SBC, aptX Adaptive' },
          { label: 'Microphones', value: '3 per bud, beamforming' },
        ],
      },
      {
        group: 'Power & Battery',
        items: [
          { label: 'Battery life', value: '8h buds, 32h with case' },
          { label: 'Fast charge', value: '10 min = 2h playback' },
          { label: 'Wireless charging', value: 'Qi, case only' },
        ],
      },
      {
        group: 'Build & Fit',
        items: [
          { label: 'Weight', value: '6.1g per bud, 42g with case' },
          { label: 'Water resistance', value: 'IPX5 buds, IPX4 case' },
          { label: 'Tip sizes', value: 'XS / S / M / L silicone' },
        ],
      },
    ],
    features: [
      '6mm dynamic driver with tuned EQ presets',
      '8 hours per charge, 32 hours total',
      'Three-mic beamforming for clear calls in wind',
      'IPX5 sweat and rain resistance',
      'Wear detection that pauses when you remove a bud',
      'Wireless Qi charging case',
    ],
    compatibility: ['iOS 15 or later', 'Android 11 or later', 'macOS 12 or later', 'Windows 10', 'Bluetooth 5.2 devices'],
    whatsInTheBox: ['PULSE Mini earbuds', 'Charging case', 'Four tip sizes', 'USB-C cable', 'Quick start guide'],
    stock: 'in-stock',
    stockCount: 311,
    warranty: { period: '2 years', summary: 'Two-year limited hardware warranty covering manufacturing defects.' },
    colors: [
      { name: 'Pearl White', hex: '#EDF1F5' },
      { name: 'Midnight Graphite', hex: '#2A3040' },
      { name: 'Seafoam', hex: '#9FD5C4' },
    ],
    badges: ['Best seller'],
    releasedAt: '2024-11-02',
    isNew: false,
    isBestSeller: true,
    compare: {
      batteryLife: '8 h (32 h with case)',
      weight: '6.1 g per bud',
      connectivity: 'Bluetooth 5.2',
      waterResistance: 'IPX5',
      warranty: '2 years',
      mainFeature: 'Compact true wireless fit',
    },
  },
  {
    id: 'p-003',
    slug: 'watch-one',
    sku: 'PLS-W1-03',
    name: 'PULSE Watch One',
    tagline: 'Six-day battery health and sleep tracking',
    category: 'smart-devices',
    price: 279,
    compareAtPrice: 319,
    description:
      'A titanium-cased health watch with a sapphire-coated always-on display, continuous heart-rate and HRV, and a battery that genuinely lasts six days.',
    story:
      'Every fitness tracker we tested failed the same way: accurate for a week, then quietly wrong. Watch One spends its power budget on the things that matter and drops the rest. A single sentence each morning replaces a wall of graphs, because a number you never read is not a health feature.',
    images: ['/products/watch-one-1.svg', '/products/watch-one-2.svg', '/products/watch-one-3.svg', '/products/watch-one-4.svg'],
    rating: 4.7,
    reviewCount: 1655,
    reviews: reviews['watch-one'],
    specs: [
      {
        group: 'Display',
        items: [
          { label: 'Size', value: '1.43" LTPO AMOLED, 466 × 466' },
          { label: 'Brightness', value: '1500 nits peak, always-on at 200' },
          { label: 'Protection', value: 'Sapphire-coated glass' },
          { label: 'Refresh', value: '1–60Hz variable' },
        ],
      },
      {
        group: 'Sensors',
        items: [
          { label: 'Optical heart rate', value: '8-path green LED' },
          { label: 'Other', value: 'SpO₂, skin temperature, accelerometer, gyroscope' },
          { label: 'Water resistance', value: '5 ATM + EN13319' },
        ],
      },
      {
        group: 'Power & Body',
        items: [
          { label: 'Battery life', value: '6 days typical, 12 in low mode' },
          { label: 'Charging', value: 'Magnetic dock, 0–100% in 65 min' },
          { label: 'Weight', value: '41g with band' },
          { label: 'Case', value: 'Grade 5 titanium, 42mm' },
        ],
      },
    ],
    features: [
      'Six-day typical battery life with always-on display',
      'Continuous heart rate, HRV, SpO₂ and skin temperature',
      'Sapphire-coated display readable in direct sunlight',
      '50+ workout modes with automatic activity detection',
      'On-device storage for 14 days of workouts',
      '5 ATM water resistance for swimming and diving',
    ],
    compatibility: ['iOS 15 or later', 'Android 9 or later', 'Bluetooth 5.2 devices', 'Standard 22mm quick-release bands'],
    whatsInTheBox: ['PULSE Watch One', 'Titanium case with fluoroelastomer band', 'Magnetic charging dock', 'Quick start guide'],
    stock: 'in-stock',
    stockCount: 87,
    warranty: { period: '2 years', summary: 'Two-year limited hardware warranty; battery guaranteed to hold 80% capacity for two years.' },
    colors: [
      { name: 'Slate Titanium', hex: '#3A4250' },
      { name: 'Silver Titanium', hex: '#C9CFD8' },
    ],
    badges: ['Save $40', 'New'],
    releasedAt: '2025-09-19',
    isNew: true,
    isBestSeller: false,
    compare: {
      batteryLife: '6 days typical',
      weight: '41 g',
      connectivity: 'Bluetooth 5.2',
      waterResistance: '5 ATM',
      warranty: '2 years',
      mainFeature: 'Six-day battery life',
    },
  },
  {
    id: 'p-004',
    slug: 'home-hub',
    sku: 'PLS-HH-04',
    name: 'PULSE Home Hub',
    tagline: 'A local-first brain for your home',
    category: 'smart-devices',
    price: 199,
    description:
      'A fanless home hub that runs your lights, sensors and locks locally over Matter and Thread — no cloud dependency, no monthly fee.',
    story:
      'We built the Hub after getting tired of lights that stopped working when an internet provider did. Every automation lives on the device, executes in under 20 milliseconds, and keeps working with the router unplugged. If you want to take your home back, this is the first box you buy.',
    images: ['/products/home-hub-1.svg', '/products/home-hub-2.svg', '/products/home-hub-3.svg'],
    rating: 4.5,
    reviewCount: 874,
    reviews: reviews['home-hub'],
    specs: [
      {
        group: 'Connectivity',
        items: [
          { label: 'Wireless', value: 'Wi-Fi 6, Thread border router, Matter controller' },
          { label: 'Wired', value: '10/100 Ethernet (1 Gbps optional adapter)' },
          { label: 'Bluetooth', value: '5.3 for commissioning and sensors' },
        ],
      },
      {
        group: 'Performance',
        items: [
          { label: 'Processor', value: 'Quad-core 1.8GHz with hardware security enclave' },
          { label: 'Automation latency', value: '< 20 ms local execution' },
          { label: 'Storage', value: '32GB eMMC, encrypted at rest' },
          { label: 'Cooling', value: 'Completely fanless aluminium body' },
        ],
      },
      {
        group: 'Power',
        items: [
          { label: 'Input', value: 'USB-C, 12V 2A' },
          { label: 'Power loss', value: 'Restores state within 3 seconds' },
        ],
      },
    ],
    features: [
      'Matter and Thread support for broad device compatibility',
      'Automations run locally — the internet is optional',
      'Fanless aluminium chassis, completely silent',
      'Hardware security enclave with encrypted local storage',
      'One-button device pairing with auto-discovery',
      'No subscription: every feature is included at purchase',
    ],
    compatibility: ['Matter 1.3 devices', 'Thread devices', 'Zigbee (via bridge)', 'Wi-Fi 6 routers', 'PULSE Smart Lamp and sensors'],
    whatsInTheBox: ['PULSE Home Hub', 'USB-C power adapter', 'Wall mount plate', 'Ethernet patch cable', 'Quick start guide'],
    stock: 'in-stock',
    stockCount: 64,
    warranty: { period: '3 years', summary: 'Three-year limited hardware warranty, the longest in the PULSE range.' },
    colors: [{ name: 'Graphite', hex: '#333A49' }],
    badges: [],
    releasedAt: '2025-01-22',
    isNew: false,
    isBestSeller: true,
    compare: {
      batteryLife: 'Mains powered (USB-C)',
      weight: '480 g',
      connectivity: 'Wi-Fi 6 · Thread · Matter · Ethernet',
      waterResistance: 'Indoor use only',
      warranty: '3 years',
      mainFeature: 'Local-first Matter automations',
    },
  },
  {
    id: 'p-005',
    slug: 'soundbar-x',
    sku: 'PLS-SBX-05',
    name: 'PULSE Soundbar X',
    tagline: 'Dialogue you can hear at midnight',
    category: 'audio',
    price: 499,
    description:
      'A 4.4-channel soundbar with wireless subwoofer, Dolby-style spatial processing and a dedicated dialogue channel that keeps speech intelligible at low volume.',
    story:
      'Most soundbars are tuned for showroom volume, which means late-night listening is all explosions and no words. Soundbar X puts a dedicated centre of its own budget behind the dialogue channel, so you can watch at a whisper and still follow the plot.',
    images: ['/products/soundbar-x-1.svg', '/products/soundbar-x-2.svg', '/products/soundbar-x-3.svg'],
    rating: 4.7,
    reviewCount: 1120,
    reviews: reviews['soundbar-x'],
    specs: [
      {
        group: 'Audio',
        items: [
          { label: 'Channels', value: '4.4ch with 2 up-firing height drivers' },
          { label: 'Output', value: '320W RMS' },
          { label: 'Drivers', value: '4× 65mm mid-bass, 2× 25mm tweeter' },
          { label: 'Subwoofer', value: 'Wireless, 6.5" driver, 200W' },
          { label: 'Processing', value: 'RoomSense calibration, dialogue lift' },
        ],
      },
      {
        group: 'Connectivity',
        items: [
          { label: 'Wired', value: 'HDMI eARC, optical, 3.5mm' },
          { label: 'Wireless', value: 'Wi-Fi 6, Bluetooth 5.3, AirPlay 2, Cast' },
          { label: 'Dolby', value: 'Dolby Atmos and DTS:X decoding' },
        ],
      },
      {
        group: 'Physical',
        items: [
          { label: 'Dimensions', value: '980 × 65 × 110 mm (bar)' },
          { label: 'Weight', value: '4.1 kg bar, 6.4 kg subwoofer' },
          { label: 'Mounting', value: 'Wall bracket and stand included' },
        ],
      },
    ],
    features: [
      'Dedicated dialogue channel for intelligible speech at low volume',
      'Wireless 6.5" subwoofer that pairs automatically',
      'HDMI eARC for a single-cable setup with your TV',
      'RoomSense calibration measures your room in 30 seconds',
      'AirPlay 2, Chromecast and Bluetooth 5.3',
      'Dolby Atmos and DTS:X decoding',
    ],
    compatibility: ['Any TV with HDMI eARC or ARC', 'Optical audio out', 'AirPlay 2 speakers', 'Chromecast built-in', 'Bluetooth 5.3 devices', 'PULSE Home Hub for multi-room'],
    whatsInTheBox: ['PULSE Soundbar X', 'Wireless subwoofer', 'Wall bracket', 'HDMI 2.1 cable', 'Optical cable', 'Remote control'],
    stock: 'low-stock',
    stockCount: 9,
    warranty: { period: '2 years', summary: 'Two-year limited hardware warranty including the subwoofer and remote.' },
    colors: [{ name: 'Graphite', hex: '#2C3340' }],
    badges: ['Only 9 left', 'Save $100'],
    releasedAt: '2025-05-08',
    isNew: false,
    isBestSeller: true,
    compare: {
      batteryLife: 'Mains powered (wall socket)',
      weight: '4.1 kg (bar only)',
      connectivity: 'HDMI eARC · Wi-Fi 6 · BT 5.3 · Optical',
      waterResistance: 'Indoor use only',
      warranty: '2 years',
      mainFeature: 'Dedicated dialogue channel',
    },
  },
  {
    id: 'p-006',
    slug: 'portable-speaker',
    sku: 'PLS-PSP-06',
    name: 'PULSE Portable Speaker',
    tagline: 'Built to be thrown in a bag',
    category: 'audio',
    price: 179,
    description:
      'A rugged 360° portable speaker with IP67 dust and water sealing, 20-hour battery and stereo pairing between two units.',
    story:
      'We took the speaker our engineers carry to the workshop and made it better. Machined aluminium end caps survive drops, a fully sealed body survives dust, and the strap is load-rated well beyond anything you will hang off it.',
    images: ['/products/portable-speaker-1.svg', '/products/portable-speaker-2.svg', '/products/portable-speaker-3.svg'],
    rating: 4.6,
    reviewCount: 2044,
    reviews: reviews['portable-speaker'],
    specs: [
      {
        group: 'Audio',
        items: [
          { label: 'Drivers', value: '2× 45mm full-range + 2 passive radiators' },
          { label: 'Output', value: '40W RMS' },
          { label: 'Pattern', value: '360° with passive bass radiators' },
          { label: 'Pairing', value: 'Stereo pair and dual-device stereo' },
        ],
      },
      {
        group: 'Power & Durability',
        items: [
          { label: 'Battery life', value: '20 h at 50% volume' },
          { label: 'Charging', value: 'USB-C, 2.5h to full' },
          { label: 'Water resistance', value: 'IP67 — submersible to 1m for 30 min' },
          { label: 'Impact', value: '1.2m drop tested onto hardwood' },
        ],
      },
      {
        group: 'Physical',
        items: [
          { label: 'Dimensions', value: '190 × 90 × 90 mm' },
          { label: 'Weight', value: '660 g' },
          { label: 'Strap', value: 'Load-rated woven nylon, 15kg' },
        ],
      },
    ],
    features: [
      'IP67 sealed — fully waterproof and dustproof',
      '20-hour battery at half volume',
      'Stereo pairing between two speakers',
      'Physical volume and playback controls, no app required',
      'Drop tested to 1.2 metres onto hardwood',
      'Load-rated woven carry strap included',
    ],
    compatibility: ['Bluetooth 5.3 devices', 'Any AUX input (3.5mm)', 'PULSE Portable Speaker for stereo pairing', 'Any USB-C charger'],
    whatsInTheBox: ['PULSE Portable Speaker', 'Woven carry strap', 'USB-C charging cable', 'Aux cable', 'Rubber base ring'],
    stock: 'in-stock',
    stockCount: 203,
    warranty: { period: '2 years', summary: 'Two-year limited hardware warranty; the battery is covered for two years as well.' },
    colors: [
      { name: 'Ember Orange', hex: '#E2622F' },
      { name: 'Slate', hex: '#3C4553' },
      { name: 'Moss', hex: '#5A7355' },
    ],
    badges: ['Best seller'],
    releasedAt: '2024-09-30',
    isNew: false,
    isBestSeller: true,
    compare: {
      batteryLife: '20 h',
      weight: '660 g',
      connectivity: 'Bluetooth 5.3 · AUX',
      waterResistance: 'IP67',
      warranty: '2 years',
      mainFeature: 'IP67 waterproof and dustproof',
    },
  },
  {
    id: 'p-007',
    slug: 'powerbank-20k',
    sku: 'PLS-PB20K-07',
    name: 'PULSE PowerBank 20K',
    tagline: '20000mAh at 100W, airline-legal',
    category: 'accessories',
    price: 79,
    description:
      'A 20000mAh power bank with 100W USB-C PD, a digital charge readout and enough headroom to charge a laptop — not just a phone.',
    story:
      'Most 20000mAh packs are built for phones. This one negotiates 100W over USB-C Power Delivery, so the same cable that charges your laptop tops it up. The digital readout tells you the real remaining percentage rather than a vague four-LED approximation.',
    images: ['/products/powerbank-20k-1.svg', '/products/powerbank-20k-2.svg', '/products/powerbank-20k-3.svg'],
    rating: 4.8,
    reviewCount: 3487,
    reviews: reviews['powerbank-20k'],
    specs: [
      {
        group: 'Capacity & Output',
        items: [
          { label: 'Capacity', value: '20000mAh / 74Wh' },
          { label: 'Total output', value: '100W USB-C PD' },
          { label: 'Ports', value: '1× USB-C (in/out), 1× USB-A' },
          { label: 'USB-A', value: '22.5W, QC 3.0' },
        ],
      },
      {
        group: 'Build',
        items: [
          { label: 'Display', value: 'Digital percentage readout' },
          { label: 'Weight', value: '355 g' },
          { label: 'Dimensions', value: '142 × 68 × 24 mm' },
          { label: 'Cell chemistry', value: 'Li-Po with multi-layer protection' },
        ],
      },
      {
        group: 'Safety & Travel',
        items: [
          { label: 'Protection', value: 'Overcharge, over-discharge, thermal, short circuit' },
          { label: 'Airline', value: 'Under 100Wh — permitted in cabin baggage' },
          { label: 'Recharge time', value: '2.5h with 100W charger' },
        ],
      },
    ],
    features: [
      '100W USB-C Power Delivery — charges laptops and tablets',
      '20000mAh capacity in a slim 24mm body',
      'Accurate digital percentage display',
      'Charge-through: refill the pack while it charges your device',
      'Airline cabin-legal under the 100Wh rule',
      'Multi-layer cell protection with temperature monitoring',
    ],
    compatibility: ['Any USB-C device', 'Any USB-A device', 'USB-C PD laptops and tablets', 'Airline cabin baggage', 'Any 100W USB-C charger for recharge'],
    whatsInTheBox: ['PULSE PowerBank 20K', 'USB-C to USB-C cable', 'Protective sleeve', 'Airline travel card', 'Quick start guide'],
    stock: 'in-stock',
    stockCount: 476,
    warranty: { period: '2 years', summary: 'Two-year limited warranty with a 500-cycle battery capacity guarantee.' },
    colors: [
      { name: 'Graphite', hex: '#333A49' },
      { name: 'Silver', hex: '#C6CCD5' },
    ],
    badges: ['Best seller'],
    releasedAt: '2024-06-12',
    isNew: false,
    isBestSeller: true,
    compare: {
      batteryLife: '20000mAh / 74Wh',
      weight: '355 g',
      connectivity: 'USB-C PD 100W · USB-A QC',
      waterResistance: 'Not rated',
      warranty: '2 years',
      mainFeature: '100W laptop charging',
    },
  },
  {
    id: 'p-008',
    slug: 'smart-lamp',
    sku: 'PLS-SL-08',
    name: 'PULSE Smart Lamp',
    tagline: 'Circadian light that reads your day',
    category: 'smart-devices',
    price: 149,
    description:
      'A flicker-free desk and bedside lamp with 16-million-colour accuracy, adaptive circadian shifting and a seamless aluminium base.',
    story:
      'Artificial light at the wrong colour temperature is why 4pm feels like 4am. The Smart Lamp tracks your actual schedule and shifts from neutral daylight to deep amber, so your evenings wind down without you touching anything.',
    images: ['/products/smart-lamp-1.svg', '/products/smart-lamp-2.svg', '/products/smart-lamp-3.svg'],
    rating: 4.4,
    reviewCount: 612,
    reviews: reviews['smart-lamp'],
    specs: [
      {
        group: 'Light',
        items: [
          { label: 'Output', value: '900 lumens full brightness' },
          { label: 'Colour temperature', value: '1800K – 6500K' },
          { label: 'Colour accuracy', value: 'CRI 95+ across the range' },
          { label: 'Flicker', value: '< 1% flicker at all dim levels' },
        ],
      },
      {
        group: 'Smart Features',
        items: [
          { label: 'Circadian mode', value: 'Scheduled colour temperature shift' },
          { label: 'Scenes', value: '8 presets, 16M custom colours' },
          { label: 'Scheduling', value: 'Local timers, works without the hub' },
          { label: 'Control', value: 'Matter, app, and a physical dial' },
        ],
      },
      {
        group: 'Physical',
        items: [
          { label: 'Height', value: '420mm, adjustable to 30°' },
          { label: 'Weight', value: '1.9 kg weighted base' },
          { label: 'Power', value: 'USB-C, 18W adapter included' },
        ],
      },
    ],
    features: [
      'Circadian mode shifts colour temperature to match your schedule',
      'CRI 95+ so colours stay accurate at every brightness',
      'Flicker-free dimming that is safe for photos and video calls',
      '16 million colours plus 8 curated scene presets',
      'Physical control dial for brightness without an app',
      'Works standalone or as part of a PULSE Home Hub system',
    ],
    compatibility: ['PULSE Home Hub', 'Matter controllers', 'iOS 15 or later', 'Android 11 or later', 'Works standalone with the physical dial'],
    whatsInTheBox: ['PULSE Smart Lamp', '18W USB-C adapter', 'Anti-glare diffuser', 'Cable management clips', 'Quick start guide'],
    stock: 'in-stock',
    stockCount: 128,
    warranty: { period: '2 years', summary: 'Two-year limited warranty including the LED module.' },
    colors: [
      { name: 'Silver', hex: '#C6CCD5' },
      { name: 'Charcoal', hex: '#363D4B' },
    ],
    badges: ['New'],
    releasedAt: '2025-10-30',
    isNew: true,
    isBestSeller: false,
    compare: {
      batteryLife: 'Mains powered (USB-C)',
      weight: '1.9 kg',
      connectivity: 'Matter · USB-C',
      waterResistance: 'Indoor use only',
      warranty: '2 years',
      mainFeature: 'Circadian colour shifting',
    },
  },
  {
    id: 'p-009',
    slug: 'mechanical-keyboard',
    sku: 'PLS-KB75-09',
    name: 'PULSE Mechanical Keyboard',
    tagline: 'Gasket-mounted, hot-swappable, near-silent',
    category: 'accessories',
    price: 229,
    description:
      'A 75% gasket-mounted mechanical keyboard with a CNC aluminium case, south-facing hot-swap sockets, tri-mode wireless and pre-lubed stabilisers.',
    story:
      'The hollow ping that gives cheap boards away comes from the case resonating. A gasket mount with a silicone isolation layer and a dense aluminium body kills almost all of it, leaving the low, muted thock that serious builders spend hours chasing.',
    images: ['/products/mechanical-keyboard-1.svg', '/products/mechanical-keyboard-2.svg', '/products/mechanical-keyboard-3.svg'],
    rating: 4.9,
    reviewCount: 1489,
    reviews: reviews['mechanical-keyboard'],
    specs: [
      {
        group: 'Build',
        items: [
          { label: 'Case', value: 'CNC-machined 6063 aluminium, gasket mount' },
          { label: 'Plate', value: '1.5mm aluminium with silicone isolation' },
          { label: 'Layout', value: '75% with function row and arrows' },
          { label: 'Weight', value: '1.6 kg' },
          { label: 'Keycaps', value: 'Double-shot PBT, Cherry profile' },
        ],
      },
      {
        group: 'Switches',
        items: [
          { label: 'Type', value: 'Hot-swappable, 5-pin MX compatible' },
          { label: 'Orientation', value: 'South-facing for shine-through legends' },
          { label: 'Included switches', value: 'Factory-lubed linear, hot-swap ready' },
          { label: 'Stabilisers', value: 'PCB-mounted, pre-lubed, screw-in' },
        ],
      },
      {
        group: 'Connectivity',
        items: [
          { label: 'Wired', value: 'USB-C, detachable braided cable' },
          { label: 'Wireless', value: '2.4GHz and Bluetooth 5.3, 3 device pairing' },
          { label: 'Battery', value: '4000mAh, up to 3 months standby' },
          { label: 'Polling', value: '1000Hz wired, 125Hz wireless' },
        ],
      },
    ],
    features: [
      'Gasket-mounted aluminium case for a soft, deep typing feel',
      'Hot-swappable 5-pin sockets — change switches without soldering',
      'South-facing sockets so shine-through legends line up',
      'Tri-mode: USB-C, 2.4GHz and Bluetooth 5.3',
      'Factory-lubed switches and stabilisers, ready out of the box',
      'Double-shot PBT keycaps that will not shine with use',
    ],
    compatibility: ['Windows 10/11', 'macOS 13 or later', 'Linux (X11)', 'Any USB-C host', 'Any standard 5-pin MX switches', 'Any standard 5-pin stabilisers'],
    whatsInTheBox: ['PULSE Mechanical Keyboard', 'Factory-lubed linear switches (spare set)', 'Detachable braided USB-C cable', 'Switch puller and keycap puller', 'Coiled USB-C cable', 'Protective case'],
    stock: 'in-stock',
    stockCount: 95,
    warranty: { period: '2 years', summary: 'Two-year limited warranty on the case, PCB and battery.' },
    colors: [
      { name: 'Graphite', hex: '#343B4A' },
      { name: 'Silver', hex: '#C4CAD3' },
    ],
    badges: ['Best seller', 'New'],
    releasedAt: '2025-11-12',
    isNew: true,
    isBestSeller: true,
    compare: {
      batteryLife: '4000mAh (weeks)',
      weight: '1.6 kg',
      connectivity: 'USB-C · 2.4GHz · BT 5.3',
      waterResistance: 'Not rated',
      warranty: '2 years',
      mainFeature: 'Gasket-mounted hot-swap build',
    },
  },
  {
    id: 'p-010',
    slug: 'wireless-mouse',
    sku: 'PLS-MS-10',
    name: 'PULSE Wireless Mouse',
    tagline: '70-day battery and a glass-trackable sensor',
    category: 'accessories',
    price: 89,
    description:
      'A low-latency wireless mouse with a 26,000 DPI sensor that tracks on glass, a 70-day battery and switches between three machines.',
    story:
      'The mouse is the device you touch most and think about least, so it should simply never need charging. Seventy days means you charge it roughly four times a year, and the sensor tracks on a bare glass table with no surface switch.',
    images: ['/products/wireless-mouse-1.svg', '/products/wireless-mouse-2.svg', '/products/wireless-mouse-3.svg'],
    rating: 4.5,
    reviewCount: 1392,
    reviews: reviews['wireless-mouse'],
    specs: [
      {
        group: 'Sensor',
        items: [
          { label: 'Resolution', value: '26,000 DPI, 5 preset levels' },
          { label: 'Tracking', value: 'Works on glass and bare surfaces' },
          { label: 'Polling', value: '1000Hz wireless (125Hz eco mode)' },
          { label: 'Speed', value: '70 h battery at 1000Hz polling' },
        ],
      },
      {
        group: 'Build & Controls',
        items: [
          { label: 'Weight', value: '78 g' },
          { label: 'Buttons', value: '6 programmable, silent-click main switches' },
          { label: 'Scroll', value: 'MagSpeed with detents' },
          { label: 'Shape', value: 'Symmetrical, claw-grip focused' },
        ],
      },
      {
        group: 'Connectivity & Power',
        items: [
          { label: 'Wireless', value: '2.4GHz dongle and Bluetooth 5.3' },
          { label: 'Device switching', value: '3 paired devices, one button' },
          { label: 'Charging', value: 'USB-C, full charge in 1 hour' },
          { label: 'Battery life', value: 'Up to 70 days on a single charge' },
        ],
      },
    ],
    features: [
      '26,000 DPI sensor that tracks on glass and bare surfaces',
      'Up to 70 days of battery per charge',
      'Silent-click main switches for shared workspaces',
      'Switches between three paired devices with one button',
      'Hand-tuned PTFE feet for smooth, low-drag gliding',
      'On-board DPI profiles stored without software',
    ],
    compatibility: ['Windows 10/11', 'macOS 12 or later', 'Linux (X11)', 'Bluetooth 5.3 hosts', 'Any 2.4GHz receiver'],
    whatsInTheBox: ['PULSE Wireless Mouse', '2.4GHz receiver', 'USB-C charging cable', 'DPI button tool'],
    stock: 'in-stock',
    stockCount: 256,
    warranty: { period: '2 years', summary: 'Two-year limited warranty including the sensor and battery.' },
    colors: [
      { name: 'Graphite', hex: '#343B4A' },
      { name: 'Bone', hex: '#DDE1E6' },
    ],
    badges: [],
    releasedAt: '2025-02-11',
    isNew: false,
    isBestSeller: false,
    compare: {
      batteryLife: '70 days',
      weight: '78 g',
      connectivity: '2.4GHz · BT 5.3 · USB-C',
      waterResistance: 'Not rated',
      warranty: '2 years',
      mainFeature: '70-day battery life',
    },
  },
  {
    id: 'p-011',
    slug: 'usb-c-hub',
    sku: 'PLS-HUB-11',
    name: 'PULSE USB-C Hub',
    tagline: 'Nine ports, one cable, dual 4K',
    category: 'accessories',
    price: 69,
    description:
      'A 9-in-1 aluminium hub with dual 4K60 display output, gigabit ethernet, HDMI, SD and microSD over a single USB-C connection.',
    story:
      'Modern laptops gave you two ports and a dongle ecosystem. This is the escape hatch: one cable brings back a full desk setup, and an aluminium shell small enough to live in the laptop sleeve rather than the bag.',
    images: ['/products/usb-c-hub-1.svg', '/products/usb-c-hub-2.svg', '/products/usb-c-hub-3.svg'],
    rating: 4.6,
    reviewCount: 2013,
    reviews: reviews['usb-c-hub'],
    specs: [
      {
        group: 'Ports',
        items: [
          { label: 'Video out', value: '2× HDMI, each 4K60' },
          { label: 'Data', value: '2× USB-A 3.2, 1× USB-C 3.2' },
          { label: 'Memory', value: 'SD and microSD, UHS-II' },
          { label: 'Network', value: 'Gigabit ethernet' },
          { label: 'Power', value: 'USB-C PD pass-through 100W' },
        ],
      },
      {
        group: 'Performance',
        items: [
          { label: 'Display', value: 'Dual 4K60 / dual 1080p120, mirror or extend' },
          { label: 'Chipset', value: 'Dual-controller design, no shared bandwidth' },
          { label: 'Thermal', value: 'Passive, runs cool under sustained 4K' },
          { label: 'Power draw', value: '1.2W typical, bus-powered' },
        ],
      },
      {
        group: 'Build',
        items: [
          { label: 'Body', value: 'CNC aluminium, 98 × 42 × 14 mm' },
          { label: 'Weight', value: '58 g' },
          { label: 'Cable', value: '15cm braided, tethered' },
        ],
      },
    ],
    features: [
      'Dual 4K60 HDMI output — mirror or extend two displays',
      '9-in-1: dual HDMI, 3× USB, SD, microSD, gigabit ethernet, PD',
      '100W pass-through charging keeps your laptop full while plugged in',
      'Passive cooling stays silent under sustained 4K streaming',
      'Pocketable 98mm aluminium body',
      'No driver installation on any major OS',
    ],
    compatibility: ['macOS 12 or later', 'Windows 10/11', 'Linux 5.x', 'ChromeOS', 'Any USB-C host with DP Alt Mode', 'USB-C docks and displays'],
    whatsInTheBox: ['PULSE USB-C Hub', 'Protective travel pouch', 'Quick start guide'],
    stock: 'in-stock',
    stockCount: 388,
    warranty: { period: '2 years', summary: 'Two-year limited warranty on the hub and both controllers.' },
    colors: [
      { name: 'Silver', hex: '#C6CCD5' },
      { name: 'Graphite', hex: '#333A49' },
    ],
    badges: ['Best seller'],
    releasedAt: '2024-04-18',
    isNew: false,
    isBestSeller: true,
    compare: {
      batteryLife: 'Bus-powered, 100W pass-through',
      weight: '58 g',
      connectivity: 'USB-C · 2× HDMI · 3× USB · Ethernet',
      waterResistance: 'Not rated',
      warranty: '2 years',
      mainFeature: 'Dual 4K60 over one cable',
    },
  },
  {
    id: 'p-012',
    slug: 'charging-station',
    sku: 'PLS-CS-12',
    name: 'PULSE Charging Station',
    tagline: 'Six devices, zero cables on show',
    category: 'accessories',
    price: 119,
    description:
      'A weighted 6-device charging station with Qi, Apple-watch-style pucks, USB-C PD and a soft fabric top that will not scratch screens.',
    story:
      'The nightstand became a nest of cables and we decided that was a solvable engineering problem. One slab, six charging positions, each with the right protocol negotiated automatically, and a weighted base that does not slide when you pull a phone off it.',
    images: ['/products/charging-station-1.svg', '/products/charging-station-2.svg', '/products/charging-station-3.svg'],
    rating: 4.5,
    reviewCount: 764,
    reviews: reviews['charging-station'],
    specs: [
      {
        group: 'Charging',
        items: [
          { label: 'Qi positions', value: '3× 15W wireless pads' },
          { label: 'Watch pucks', value: '1× fast wireless watch dock' },
          { label: 'Wired', value: '2× USB-C PD (65W), 1× USB-A 18W' },
          { label: 'Total output', value: '103W across all positions' },
        ],
      },
      {
        group: 'Build',
        items: [
          { label: 'Body', value: 'Weighted aluminium base with fabric deck' },
          { label: 'Weight', value: '1.2 kg' },
          { label: 'Surface', value: 'Soft-touch microfibre, non-scratching' },
          { label: 'Dimensions', value: '230 × 150 × 28 mm' },
        ],
      },
      {
        group: 'Safety',
        items: [
          { label: 'Protection', value: 'Foreign object detection, thermal cutoff' },
          { label: 'Foreign objects', value: 'Detects and blocks cards, coins and keys' },
          { label: 'Power', value: 'Wall adapter, 100W USB-C included' },
        ],
      },
    ],
    features: [
      'Charges six devices simultaneously with protocol negotiation',
      '3× Qi wireless pads, a watch dock and three wired ports',
      'Weighted 1.2kg base that will not slide when you grab a phone',
      'Microfibre deck that will not scratch screens or cases',
      'Foreign object detection blocks cards, coins and keys',
      'Works as a bedside clock with a non-distracting amber mode',
    ],
    compatibility: ['Qi-certified phones and earbuds', 'Qi-compatible smartwatches', 'Any USB-C device', 'Any USB-A device', 'PULSE Watch One fast charging', 'Any 100W USB-C wall adapter'],
    whatsInTheBox: ['PULSE Charging Station', '100W USB-C power adapter', 'Braided 1.5m cable', 'Cable clips', 'Quick start guide'],
    stock: 'low-stock',
    stockCount: 6,
    warranty: { period: '2 years', summary: 'Two-year limited warranty covering all six charging positions.' },
    colors: [
      { name: 'Charcoal', hex: '#2F3644' },
      { name: 'Sand', hex: '#C9BDAA' },
    ],
    badges: ['Only 6 left', 'New'],
    releasedAt: '2025-11-20',
    isNew: true,
    isBestSeller: false,
    compare: {
      batteryLife: 'Mains powered (100W adapter)',
      weight: '1.2 kg',
      connectivity: '3× Qi · 2× USB-C PD · USB-A',
      waterResistance: 'Indoor use only',
      warranty: '2 years',
      mainFeature: '6-device charging, zero clutter',
    },
  },
];

/** Fetches a single product by slug. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((product) => product.category === category);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((p) => p.isBestSeller).slice(0, limit);
}

export function getNewProducts(limit = 4): Product[] {
  return products
    .filter((p) => p.isNew)
    .sort((a, b) => +new Date(b.releasedAt) - +new Date(a.releasedAt))
    .slice(0, limit);
}

/** Cheap "you might also like" logic: same category first, then anything else. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  const others = products.filter(
    (p) => p.category !== product.category && p.id !== product.id,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** Highest rated, verified, most-substantive reviews for the social proof sections. */
export function getTopReviews(limit = 6) {
  return products
    .flatMap((product) =>
      product.reviews.map((review) => ({
        ...review,
        productName: product.name,
        productSlug: product.slug,
        rating: review.rating,
      })),
    )
    .filter((review) => review.rating >= 4 && review.verified)
    .sort((a, b) => b.body.length - a.body.length)
    .slice(0, limit);
}

export { reviews };
