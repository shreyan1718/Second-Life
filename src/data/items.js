// Item knowledge base — universal search (post-Phase-8 enhancement).
// ------------------------------------------------------------------
// Every entry describes a common household item: its best pathway and why,
// the sensible options, practical tips, safety notes and related guides
// from the library. The Explore search matches against these so that any
// everyday item gets a reasonable, actionable answer.

export const ITEMS = [
  /* ------------------------------------------------------------- Electronics */
  {
    keys: ['phone', 'mobile', 'smartphone', 'old phone', 'mobile phone', 'handset'],
    name: 'Mobile phone',
    category: 'Electronics',
    best: {
      pathway: 'donate',
      why: 'A working phone is the single most valuable thing you can pass on — charity and digital-inclusion programs put them straight into hands that need them.',
    },
    options: [
      { pathway: 'reuse', text: 'Turn it into a security camera, a dedicated music player, or an alarm clock with a big screen.' },
      { pathway: 'donate', text: 'Factory-reset it first, then hand it on — ideally with its charger.' },
      { pathway: 'recycle', text: 'Dead or damaged phones go to authorised e-waste recyclers; they hold recoverable gold, silver and copper.' },
    ],
    tips: [
      'Back up photos and contacts, then sign out of ALL accounts before letting it go.',
      'A degraded battery is replaceable for a fraction of a new phone’s cost.',
    ],
    safety: 'Swollen or hot battery — stop using it and recycle it immediately.',
    related: ['phone-donate', 'old-phone-security-cam', 'ewaste-sorting'],
  },
  {
    keys: ['laptop', 'notebook', 'computer', 'pc', 'desktop'],
    name: 'Laptop or computer',
    category: 'Electronics',
    best: {
      pathway: 'repair',
      why: 'Most “slow and useless” laptops are revived by dusting the fans, adding an SSD and extra RAM — three cheap upgrades.',
    },
    options: [
      { pathway: 'repair', text: 'Dust the fans, swap in an SSD, add RAM — often a 3–5 year life extension.' },
      { pathway: 'donate', text: 'Securely wipe the drive, reinstall the OS, and a school or NGO gets a working machine.' },
      { pathway: 'recycle', text: 'Truly dead units go to authorised e-waste collection — never the household bin.' },
    ],
    tips: [
      'SSD + RAM upgrades cost a fraction of a new machine and need only a screwdriver.',
      'Wiping data properly matters more than the hardware decision — see our guide.',
    ],
    related: ['laptop-revival', 'hard-drive-erase', 'ewaste-sorting'],
  },
  {
    keys: ['tv', 'television', 'led tv', 'smart tv'],
    name: 'Television',
    category: 'Electronics',
    best: {
      pathway: 'donate',
      why: 'Working TVs are in demand at schools, community centres and shelter common rooms.',
    },
    options: [
      { pathway: 'donate', text: 'Test it with a few inputs first and describe any faults honestly.' },
      { pathway: 'recycle', text: 'Broken TVs — especially old heavy CRTs — must go to authorised e-waste handlers; they hold leaded glass and charged components.' },
    ],
    tips: ['CRT TVs are heavy and hold a charge — let professionals move and process them.'],
    safety: 'Never dismantle a TV yourself; CRT tubes can hold a dangerous charge for years.',
    related: ['ewaste-sorting'],
  },
  {
    keys: ['headphones', 'earphones', 'earbuds', 'headset', 'earphone'],
    name: 'Headphones or earbuds',
    category: 'Electronics',
    best: {
      pathway: 'recycle',
      why: 'Small electronics are the most commonly binned e-waste — they belong in e-waste collection, and working pairs can be passed on.',
    },
    options: [
      { pathway: 'donate', text: 'Clean and sanitise working pairs — many people are happy with them.' },
      { pathway: 'repair', text: 'Frayed cables and worn pads are fixable; pads are cheap replaceable parts.' },
      { pathway: 'recycle', text: 'Dead units go to e-waste or brand take-back bins at electronics stores.' },
    ],
    tips: ['Worn ear pads and tips are replaceable — a ₹200 part, not a new pair.'],
    related: ['ewaste-sorting', 'cable-repair-heatshrink'],
  },
  {
    keys: ['charger', 'adapter', 'wall charger', 'phone charger', 'adapter plug'],
    name: 'Charger / adapter',
    category: 'Electronics',
    best: {
      pathway: 'reuse',
      why: 'A working charger outlives the device it came with — keep one, pass the spares on.',
    },
    options: [
      { pathway: 'reuse', text: 'USB chargers are universal — keep one in your travel bag or the car.' },
      { pathway: 'donate', text: 'Charities refurbishing phones need chargers desperately.' },
      { pathway: 'recycle', text: 'Faulty chargers (or ones that spark or heat) go to e-waste collection.' },
    ],
    tips: ['One box of labelled chargers saves every future device search.'],
    safety: 'Stop using any charger that buzzes, sparks, or gets hot.',
    related: ['ewaste-sorting', 'cable-organiser-rolls'],
  },
  {
    keys: ['cable', 'cables', 'wire', 'wires', 'usb cable', 'charging cable', 'cord'],
    name: 'Cables and wires',
    category: 'Electronics',
    best: {
      pathway: 'recycle',
      why: 'Cables are nearly pure copper — among the most recyclable and valuable e-waste there is.',
    },
    options: [
      { pathway: 'reuse', text: 'Coil working cables over a toilet roll and label them — the drawer of doom becomes a drawer of order.' },
      { pathway: 'recycle', text: 'Dead cables go to e-waste or scrap collection; the copper is too valuable to landfill.' },
    ],
    tips: ['Test before storing: a cheap USB tester tells you which cables still deliver power.'],
    safety: 'Frayed outer sheaths are repairable with heat-shrink; exposed inner copper means replace.',
    related: ['cable-organiser-rolls', 'cable-repair-heatshrink', 'ewaste-sorting'],
  },
  {
    keys: ['power bank', 'powerbank', 'battery pack', 'portable charger'],
    name: 'Power bank',
    category: 'Electronics',
    best: {
      pathway: 'reuse',
      why: 'Even a weak power bank still tops up a phone during a blackout or trip — demote it, don’t dump it.',
    },
    options: [
      { pathway: 'reuse', text: 'Emergency kit keeper, blackout router backup (if it runs on 5 V USB), or power for a USB LED lamp.' },
      { pathway: 'recycle', text: 'When the cells truly give up: tape the ports and hand it to authorised e-waste or battery collection.' },
    ],
    tips: ['Measure what it still holds, write it on tape with the date — expectations managed.'],
    safety: 'Swollen, hot or smelly — stop using it immediately and recycle it. Never puncture or dismantle.',
    related: ['power-bank-second-life', 'ewaste-sorting'],
  },
  {
    keys: ['camera', 'dslr', 'digital camera', 'camcorder'],
    name: 'Camera',
    category: 'Electronics',
    best: {
      pathway: 'donate',
      why: 'Working cameras go to school media programs and budding photographers who can’t afford one.',
    },
    options: [
      { pathway: 'donate', text: 'Include the charger, cable and any lenses you have.' },
      { pathway: 'reuse', text: 'Old cameras make great dedicated scanners for documents and old photos.' },
      { pathway: 'recycle', text: 'Dead units — e-waste collection, as with all electronics.' },
    ],
    tips: ['Wipe any stored photos and reset before passing on.'],
    related: ['ewaste-sorting', 'hard-drive-erase'],
  },
  {
    keys: ['printer', 'scanner', 'printer scanner'],
    name: 'Printer / scanner',
    category: 'Electronics',
    best: {
      pathway: 'donate',
      why: 'Schools and small NGOs constantly need working printers.',
    },
    options: [
      { pathway: 'donate', text: 'Include half-used ink cartridges and the cable — it works out of the box for them.' },
      { pathway: 'recycle', text: 'Dead printers to e-waste; unused cartridges often have their own take-back schemes.' },
    ],
    tips: ['Many “broken” printers just need a printhead clean — try that before deciding.'],
    related: ['ewaste-sorting'],
  },
  {
    keys: ['router', 'modem', 'wifi router', 'wi-fi router'],
    name: 'Router / modem',
    category: 'Electronics',
    best: {
      pathway: 'reuse',
      why: 'An old router still has two great lives: a Wi-Fi extender, or a wired switch for a study corner.',
    },
    options: [
      { pathway: 'reuse', text: 'Reflash as an access point or extender — 15 minutes of setup.' },
      { pathway: 'recycle', text: 'Truly dead units go to e-waste collection.' },
    ],
    tips: ['Reset to factory settings before reusing or passing on.'],
    related: ['ewaste-sorting'],
  },
  {
    keys: ['keyboard', 'mouse', 'computer accessories', 'webcam'],
    name: 'Keyboard / mouse / webcam',
    category: 'Electronics',
    best: {
      pathway: 'donate',
      why: 'Refurbishing programs assembling computers for students need exactly these peripherals.',
    },
    options: [
      { pathway: 'donate', text: 'Clean them, coil the cable around them, and they’ll be snapped up.' },
      { pathway: 'recycle', text: 'Dead units — e-waste collection.' },
    ],
    tips: ['A keyboard deep-clean (keycaps off, shake, wipe) makes a tired one feel new.'],
    related: ['ewaste-sorting', 'donation-box-prep'],
  },
  {
    keys: ['console', 'game console', 'playstation', 'xbox', 'video game'],
    name: 'Game console',
    category: 'Electronics',
    best: {
      pathway: 'donate',
      why: 'Children’s homes and hospital wards genuinely prize working consoles.',
    },
    options: [
      { pathway: 'donate', text: 'Wipe your account, include controllers and cables if you can.' },
      { pathway: 'recycle', text: 'Dead consoles — e-waste collection.' },
    ],
    tips: ['Sign out of your store account and factory-reset before donating.'],
    related: ['ewaste-sorting', 'hard-drive-erase'],
  },
  {
    keys: ['remote', 'remote control', 'tv remote'],
    name: 'Remote control',
    category: 'Electronics',
    best: {
      pathway: 'reuse',
      why: 'Universal remotes cost money — an old one often still works with fresh batteries.',
    },
    options: [
      { pathway: 'reuse', text: 'Pair it with the device it came with when you pass that on.' },
      { pathway: 'recycle', text: 'Dead remotes are small e-waste — collect them with batteries drop-off.' },
    ],
    tips: ['Remove batteries before storing or donating any device.'],
    related: ['ewaste-sorting'],
  },
  {
    keys: ['tablet', 'ipad', 'tab'],
    name: 'Tablet',
    category: 'Electronics',
    best: {
      pathway: 'donate',
      why: 'Tablets are ideal donation items — reading devices for seniors, learning devices for kids.',
    },
    options: [
      { pathway: 'donate', text: 'Reset, sign out, and include the charger.' },
      { pathway: 'reuse', text: 'A retired tablet becomes a digital photo frame, a recipe station, or a smart-home dashboard.' },
      { pathway: 'recycle', text: 'Dead tablets — e-waste collection.' },
    ],
    tips: ['A slow tablet often just needs a storage clear-out and a battery replacement.'],
    related: ['phone-donate', 'ewaste-sorting'],
  },
  {
    keys: ['monitor', 'screen', 'display', 'computer screen'],
    name: 'Monitor / screen',
    category: 'Electronics',
    best: {
      pathway: 'donate',
      why: 'Working monitors complete donated computer setups for students.',
    },
    options: [
      { pathway: 'donate', text: 'Include its power and video cables.' },
      { pathway: 'reuse', text: 'A monitor plus a retired laptop makes an excellent home study station.' },
      { pathway: 'recycle', text: 'Dead screens — e-waste collection (they contain mercury in older CCFL backlights).' },
    ],
    tips: ['Dead pixels vs. loose cable: reseat the cable before writing off a monitor.'],
    related: ['ewaste-sorting', 'laptop-revival'],
  },
  {
    keys: ['speaker', 'speakers', 'bluetooth speaker', 'sound system', 'home theatre'],
    name: 'Speakers / sound system',
    category: 'Electronics',
    best: {
      pathway: 'donate',
      why: 'Community centres, dance academies and shelter common rooms love working audio.',
    },
    options: [
      { pathway: 'donate', text: 'Test all channels first and note any crackle honestly.' },
      { pathway: 'reuse', text: 'Old bookshelf speakers plus a cheap amplifier board make a DIY bluetooth system.' },
      { pathway: 'recycle', text: 'Dead units — e-waste collection.' },
    ],
    tips: ['Crackling is often just dirty potentiometers — a spray of contact cleaner fixes it.'],
    related: ['ewaste-sorting'],
  },
  {
    keys: ['smartwatch', 'fitness band', 'fitness tracker'],
    name: 'Smartwatch / fitness band',
    category: 'Electronics',
    best: {
      pathway: 'recycle',
      why: 'Tiny, battery-packed devices — if the battery is degraded, e-waste is the responsible end.',
    },
    options: [
      { pathway: 'donate', text: 'Working units with healthy batteries make fine first watches for kids.' },
      { pathway: 'recycle', text: 'Battery-worn units go to e-waste or battery collection.' },
    ],
    tips: ['Unpair from your phone and factory-reset before passing on.'],
    safety: 'Swollen watch backs — stop wearing it and recycle it.',
    related: ['ewaste-sorting'],
  },

  /* ---------------------------------------------------- Clothing & Textiles */
  {
    keys: ['jeans', 'denim', 'jean'],
    name: 'Jeans / denim',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'reuse',
      why: 'Denim is the toughest fabric in your wardrobe — it upcycles into totes, aprons, patches and plant hangers.',
    },
    options: [
      { pathway: 'reuse', text: 'Sew a tote bag (the pockets are built in), cut cleaning rags, or patch other jeans.' },
      { pathway: 'donate', text: 'Wearable pairs are donation gold — wash before giving.' },
      { pathway: 'recycle', text: 'Shredded denim becomes insulation and house insulation filler via textile recyclers.' },
    ],
    tips: ['Even irreparable denim has value — cut it into a rag drawer stack.'],
    related: ['denim-tote', 'visible-mending', 'coat-donate'],
  },
  {
    keys: ['t-shirt', 'tshirt', 't shirt', 'shirt', 'tee'],
    name: 'T-shirts / shirts',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'donate',
      why: 'Clean, wearable everyday clothing is the most-requested donation category there is.',
    },
    options: [
      { pathway: 'donate', text: 'Wash, fold, bag by type — charities distribute it fastest that way.' },
      { pathway: 'reuse', text: 'No-sew produce bags, braided rugs, or cleaning rags that outlast paper towels.' },
      { pathway: 'recycle', text: 'Unwearable cotton goes to textile recycling or rag traders.' },
    ],
    tips: ['Missing buttons or small tears? Five minutes of mending doubles donation value.'],
    related: ['tshirt-rug', 'tshirt-produce-bags', 'donation-box-prep'],
  },
  {
    keys: ['saree', 'sari', 'sarees'],
    name: 'Saree',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'reuse',
      why: 'Sarees carry beautiful fabric and heritage — they deserve transformation, not disposal.',
    },
    options: [
      { pathway: 'reuse', text: 'Silk and cotton sarees become kurtas, dupattas, cushion covers, table runners or gift wraps.' },
      { pathway: 'donate', text: 'NGOs and temple collections pass wearable sarees to women who need formal clothing.' },
    ],
    tips: ['A tailor can convert an old saree into a fresh outfit for a fraction of new-fabric cost.'],
    related: ['donation-box-prep'],
  },
  {
    keys: ['kurta', 'salwar', 'ethnic wear', 'lehenga', 'sherwani'],
    name: 'Ethnic wear',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'donate',
      why: 'Festival clothing in good condition is in steady demand at NGO drives before wedding and festive seasons.',
    },
    options: [
      { pathway: 'donate', text: 'Donate before festivals — that’s when drives actively look for ethnic wear.' },
      { pathway: 'reuse', text: 'Heavy embroidered pieces become cushion covers, potli bags or wall art.' },
    ],
    tips: ['Dry-clean before donating; note any missing hooks or borders.'],
    related: ['donation-box-prep', 'coat-donate'],
  },
  {
    keys: ['dress', 'frock', 'gown', 'skirt'],
    name: 'Dresses / skirts',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'donate',
      why: 'Children’s and women’s everyday dresses are among the fastest-moving donation items.',
    },
    options: [
      { pathway: 'donate', text: 'Check zips and buttons, wash, and donate.' },
      { pathway: 'reuse', text: 'Pretty fabric becomes hair accessories, tote linings or kids’ dress-up pieces.' },
    ],
    tips: ['Stained hems can often be hemmed up an inch into a “new” dress.'],
    related: ['donation-box-prep'],
  },
  {
    keys: ['jacket', 'coat', 'blazer', 'windcheater', 'hoodie', 'sweater', 'sweatshirt', 'woolen', 'woollens'],
    name: 'Jackets, coats & sweaters',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'donate',
      why: 'Warm clothing is THE most time-sensitive donation — shelters need it in autumn and winter, not spring.',
    },
    options: [
      { pathway: 'donate', text: 'Wash, empty pockets, and give early in the cold season.' },
      { pathway: 'reuse', text: 'Worn sweaters become cushion covers, mittens, or pet-bed liners.' },
    ],
    tips: ['One missing button stops a donation — sew it on first.'],
    related: ['coat-donate', 'donation-box-prep'],
  },
  {
    keys: ['socks', 'sock', 'odd socks'],
    name: 'Socks',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'reuse',
      why: 'Odd and worn socks are absurdly useful around the house — stop matching and start using.',
    },
    options: [
      { pathway: 'reuse', text: 'Door draft stoppers (filled with rice), dusting mitts, shoe shapers, soap savers.' },
      { pathway: 'donate', text: 'New or like-new sock pairs are welcome; worn singles are not.' },
    ],
    tips: ['Clean single socks make excellent cleaning rags that fit over your hand.'],
    related: ['sock-draft-stopper'],
  },
  {
    keys: ['shoes', 'shoe', 'sneakers', 'sandals', 'footwear', 'chappals', 'boots'],
    name: 'Footwear',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'donate',
      why: 'Gently worn footwear is genuinely needed — but only clean, intact pairs.',
    },
    options: [
      { pathway: 'donate', text: 'Clean them, tie pairs together, and donate — many drives specifically request footwear.' },
      { pathway: 'reuse', text: 'Old sneakers become garden shoes; worn-out soles make great jar openers (rubber grips).' },
      { pathway: 'recycle', text: 'Some sportswear brands collect worn-out athletic shoes for rubber recycling.' },
    ],
    tips: ['Smelly doesn’t mean dead: baking soda overnight fixes most odours.'],
    related: ['donation-box-prep'],
  },
  {
    keys: ['bedsheet', 'bed sheet', 'bedsheets', 'bed linen', 'duvet cover', 'pillowcase', 'pillow case'],
    name: 'Bed linen',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'donate',
      why: 'Shelters and disaster-relief drives consistently list bed sheets among their top needs.',
    },
    options: [
      { pathway: 'donate', text: 'Wash and fold — sheets are used as-is at shelters.' },
      { pathway: 'reuse', text: 'Worn sheets become the best cleaning rags in the house, or backing fabric for quilts.' },
    ],
    tips: ['A faded sheet is fine; a torn one becomes rags — both beat landfill.'],
    related: ['donation-box-prep', 'tshirt-rug'],
  },
  {
    keys: ['curtain', 'curtains', 'drapes', 'cushion', 'cushion cover', 'pillow', 'bolster'],
    name: 'Curtains, cushions & pillows',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'donate',
      why: 'Soft furnishings in clean condition directly furnish transitional housing.',
    },
    options: [
      { pathway: 'donate', text: 'Wash and bag; note curtain sizes on the bag — it saves the charity measuring.' },
      { pathway: 'reuse', text: 'Old curtains become drop cloths, plant frost covers, or picnic mats; pillow stuffing refreshes pet beds.' },
    ],
    tips: ['Sun-faded curtains still work in north-facing rooms — mention the fading.'],
    related: ['donation-box-prep'],
  },
  {
    keys: ['towel', 'towels', 'napkins', 'handkerchief'],
    name: 'Towels',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'donate',
      why: 'Animal shelters and veterinary clinics need old towels more than almost anyone.',
    },
    options: [
      { pathway: 'donate', text: 'Washed towels — any condition — are welcomed by animal shelters and NGOs.' },
      { pathway: 'reuse', text: 'Cut into cleaning cloths; old towels are the workshop rag of choice.' },
    ],
    tips: ['Towels too far gone for people are perfect for pets — never bin them.'],
    related: ['donation-box-prep'],
  },
  {
    keys: ['blanket', 'quilt', 'comforter', 'razai', 'dohar'],
    name: 'Blankets & quilts',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'donate',
      why: 'In cold regions a spare blanket is literally a life-saving donation in winter.',
    },
    options: [
      { pathway: 'donate', text: 'Sun-air and bag blankets before winter drives — early donations get used.' },
      { pathway: 'reuse', text: 'Worn quilts become pet bedding, car boot mats, or picnic pads.' },
    ],
    tips: ['A small tear is worth stitching — blankets are expensive for shelters to buy.'],
    related: ['donation-box-prep', 'coat-donate'],
  },
  {
    keys: ['bag', 'bags', 'backpack', 'handbag', 'purse', 'school bag', 'luggage', 'suitcase'],
    name: 'Bags & luggage',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'donate',
      why: 'School bags in usable condition are one of the most requested items in education drives.',
    },
    options: [
      { pathway: 'donate', text: 'Wash or wipe, fix straps if you can, and donate to school-supply drives.' },
      { pathway: 'reuse', text: 'A worn backpack becomes a gardening tool carrier or car emergency kit bag.' },
    ],
    tips: ['Broken zips are the most common bag fault — a cobbler fixes them cheaply.'],
    related: ['donation-box-prep'],
  },
  {
    keys: ['scarf', 'dupatta', 'shawl', 'stole'],
    name: 'Scarves & dupattas',
    category: 'Clothing & Textiles',
    best: {
      pathway: 'reuse',
      why: 'Beautiful lengths of fabric with endless second lives — gift wrap, wall art, bag straps.',
    },
    options: [
      { pathway: 'reuse', text: 'Furoshiki-style gift wrapping, table runners, or headbands — zero-waste habits start here.' },
      { pathway: 'donate', text: 'Clean, intact pieces are welcome at clothing drives.' },
    ],
    tips: ['A silk scarf makes any plain bag look new — try it before donating the bag.'],
    related: ['newspaper-gift-wrap'],
  },

  /* ------------------------------------------------------ Furniture & Wood */
  {
    keys: ['chair', 'chairs', 'stool', 'bench', 'office chair'],
    name: 'Chairs & stools',
    category: 'Furniture & Wood',
    best: {
      pathway: 'repair',
      why: 'The classic wobbly chair is the classic repair — re-glue the joints and it outlives you.',
    },
    options: [
      { pathway: 'repair', text: 'Re-glue loose joints, tighten bolts, or replace a worn seat weave.' },
      { pathway: 'donate', text: 'Sturdy chairs are snapped up by hostels, PGs and community spaces.' },
      { pathway: 'reuse', text: 'A broken chair becomes a plant stand, a wall shelf (seat as the shelf), or firewood-adjacent wood waste only as a last resort.' },
    ],
    tips: ['“Wobbly” is a 100-rupee glue-and-clamp fix, not a disposal reason.'],
    related: ['wobbly-chair', 'donation-box-prep'],
  },
  {
    keys: ['table', 'desk', 'study table', 'dining table', 'coffee table'],
    name: 'Tables & desks',
    category: 'Furniture & Wood',
    best: {
      pathway: 'donate',
      why: 'Solid tables are the furniture item charities and schools need most.',
    },
    options: [
      { pathway: 'repair', text: 'Wobbly legs and scratched tops are simple fixes — see the sticky-drawer and sanding guides.' },
      { pathway: 'donate', text: 'Measure it, photograph it, and offer it to schools or give-away groups — large items find takers fast.' },
      { pathway: 'reuse', text: 'An old table becomes a potting bench, a workshop bench, or a desk with a fresh coat of paint.' },
    ],
    tips: ['Two people, one measuring tape, one message with dimensions — that’s how furniture gets rehomed.'],
    related: ['pallet-coffee-table', 'sticky-drawer-fix'],
  },
  {
    keys: ['mattress', 'futon', 'mattresses'],
    name: 'Mattress',
    category: 'Furniture & Wood',
    best: {
      pathway: 'donate',
      why: 'A clean, undamaged mattress is urgently needed by shelters — but hygiene standards are strict, so condition decides everything.',
    },
    options: [
      { pathway: 'donate', text: 'Only clean, stain-free, structurally sound mattresses — call ahead, many places can’t accept them.' },
      { pathway: 'reuse', text: 'Old mattress foam becomes pet beds, floor cushions, or kneeling pads for gardening.' },
      { pathway: 'recycle', text: 'Truly dead mattresses: ask your municipality about bulk pickup; the steel springs and foam are recoverable.' },
    ],
    tips: ['Sun the mattress for a full day before donating — it refreshes and disinfects.'],
    safety: 'Stained, soggy or infested mattresses can’t be donated — don’t hand shelters a problem.',
    related: ['donation-box-prep'],
  },
  {
    keys: ['sofa', 'couch', 'divan', 'settee', 'diwan'],
    name: 'Sofa / divan',
    category: 'Furniture & Wood',
    best: {
      pathway: 'donate',
      why: 'Upholstered seating in decent condition is highly sought by community centres and shelters.',
    },
    options: [
      { pathway: 'repair', text: 'Sagging seats are usually just worn foam or webbing — a fraction of replacement cost.' },
      { pathway: 'donate', text: 'Clean it, photograph it, and measure doorways — then offer it to charities or give-away groups.' },
      { pathway: 'reuse', text: 'A tired sofa with a good frame becomes a garden bench with outdoor fabric.' },
    ],
    tips: ['A washable sofa cover often decides whether a donation is accepted.'],
    related: ['donation-box-prep'],
  },
  {
    keys: ['bed', 'cot', 'bed frame', 'bunk bed'],
    name: 'Bed / cot',
    category: 'Furniture & Wood',
    best: {
      pathway: 'donate',
      why: 'Bed frames are sturdy, always in demand, and almost never worth throwing away.',
    },
    options: [
      { pathway: 'donate', text: 'Disassemble it for transport and include the bolts in a taped bag.' },
      { pathway: 'reuse', text: 'Old cot frames become trellises, drying racks, or firewood racks.' },
    ],
    tips: ['Label parts as you disassemble — future-you will thank present-you.'],
    related: ['donation-box-prep'],
  },
  {
    keys: ['wardrobe', 'cupboard', 'almirah', 'closet', 'cabinet', 'dresser', 'chest of drawers', 'drawer'],
    name: 'Wardrobes & cupboards',
    category: 'Furniture & Wood',
    best: {
      pathway: 'donate',
      why: 'Storage furniture moves fastest in give-away groups — people need it more than they need chairs.',
    },
    options: [
      { pathway: 'donate', text: 'Empty it, fix sticky drawers if you can, and list it — cupboards find homes within days.' },
      { pathway: 'reuse', text: 'Orphaned drawers become wall shelves and shadow boxes.' },
      { pathway: 'recycle', text: 'Broken beyond use: municipal bulky waste — the wood and metal are recoverable.' },
    ],
    tips: ['Sticky drawers are usually a wax-and-tighten fix — see the guide.'],
    related: ['sticky-drawer-fix', 'drawer-shelf'],
  },
  {
    keys: ['bookshelf', 'bookcase', 'shelf', 'shelves', 'rack'],
    name: 'Shelving',
    category: 'Furniture & Wood',
    best: {
      pathway: 'donate',
      why: 'School libraries and community reading rooms constantly need shelving.',
    },
    options: [
      { pathway: 'donate', text: 'Schools, libraries and anganwadis — call and ask; shelving is always on their list.' },
      { pathway: 'reuse', text: 'A tired shelf becomes a kitchen herb wall or a shoe rack with a coat of paint.' },
    ],
    tips: ['Anchor tall shelves to the wall wherever they end up.'],
    related: ['ladder-shelf', 'book-swap'],
  },
  {
    keys: ['ladder'],
    name: 'Ladder',
    category: 'Furniture & Wood',
    best: {
      pathway: 'reuse',
      why: 'A retired wooden ladder is a design classic waiting to happen — leaning bookshelf, blanket rack, plant display.',
    },
    options: [
      { pathway: 'reuse', text: 'Sand, oil, lean against a wall, done — the beloved ladder-shelf.' },
      { pathway: 'donate', text: 'Sound ladders are welcomed by community workshops and theatre groups.' },
    ],
    tips: ['Check stiles and rungs for cracks before any use — safety first, shelving second.'],
    safety: 'Only climb a ladder judged structurally sound; otherwise it’s decor-only.',
    related: ['ladder-shelf'],
  },
  {
    keys: ['pallet', 'wooden crate', 'packing wood', 'wood planks', 'wood'],
    name: 'Pallets & scrap wood',
    category: 'Furniture & Wood',
    best: {
      pathway: 'reuse',
      why: 'Pallets are free hardwood disguised as packaging — furniture, planters, compost bays.',
    },
    options: [
      { pathway: 'reuse', text: 'Coffee tables, vertical gardens, kindling boxes — the internet runs on pallet projects.' },
      { pathway: 'donate', text: 'Carpenters and workshops often collect clean pallets for firewood or projects.' },
    ],
    tips: ['Only use HT-stamped (heat-treated) pallets indoors — never MB (fumigated).'],
    safety: 'Wear gloves — pallet nails and splinters bite.',
    related: ['pallet-coffee-table', 'rain-bucket'],
  },

  /* -------------------------------------------------------------- Household */
  {
    keys: ['jar', 'jars', 'glass jar', 'mason jar', 'jam jar', 'bottle', 'glass bottle', 'wine bottle'],
    name: 'Glass jars & bottles',
    category: 'Household',
    best: {
      pathway: 'reuse',
      why: 'The single most reusable object in any kitchen — airtight, free, plastic-free storage forever.',
    },
    options: [
      { pathway: 'reuse', text: 'Pantry storage, overnight oats, spice jars, vases, desk organisers, lantern holders.' },
      { pathway: 'recycle', text: 'Chipped or cracked glass: wrap, label, and recycle — never donate damaged glass.' },
    ],
    tips: ['Soak labels off with warm soapy water; baking soda removes the glue.'],
    safety: 'Check rims for chips before reusing jars for food.',
    related: ['jar-storage', 'glass-recycling'],
  },
  {
    keys: ['plastic bottle', 'water bottle', 'pet bottle', 'cold drink bottle'],
    name: 'Plastic bottles',
    category: 'Household',
    best: {
      pathway: 'recycle',
      why: 'PET bottles are among the most successfully recyclable plastics — but reuse first where you can.',
    },
    options: [
      { pathway: 'reuse', text: 'Cut into self-watering planters, bird feeders, or drip irrigators for pots.' },
      { pathway: 'recycle', text: 'Rinse, crush, cap separate if your local rules say so — PET has real market value.' },
    ],
    tips: ['A bottle planter with a wick is a genuinely good first gardening project for kids.'],
    related: ['bottle-planters', 'can-cash'],
  },
  {
    keys: ['tin', 'tins', 'can', 'cans', 'tin can', 'aluminium can', 'aluminum can'],
    name: 'Tins & cans',
    category: 'Household',
    best: {
      pathway: 'recycle',
      why: 'Metal recycles forever and pays by weight — aluminium is the flagship recycling material.',
    },
    options: [
      { pathway: 'reuse', text: 'Washed tins become pen pots, utensil holders, or herb planters (file the rim first).' },
      { pathway: 'recycle', text: 'Rinse, crush, and sell/drop at scrap — metals are the most valuable dry recyclable.' },
    ],
    tips: ['One magnet sorts your metals: steel sticks (scrap), aluminium doesn’t (higher value).'],
    safety: 'File cut edges before reusing tins by hand.',
    related: ['tin-can-organisers', 'can-cash'],
  },
  {
    keys: ['newspaper', 'newspapers', 'magazine', 'magazines', 'paper', 'books', 'book', 'textbook', 'novel', 'notebook'],
    name: 'Paper, books & magazines',
    category: 'Household',
    best: {
      pathway: 'donate',
      why: 'Books spread knowledge house-to-house; clean paper is the easiest thing in the house to keep out of landfill.',
    },
    options: [
      { pathway: 'donate', text: 'Books to libraries, school drives and book-swap shelves; textbooks to junior students.' },
      { pathway: 'reuse', text: 'Newspaper becomes gift wrap, drawer liners, and compost carbon (shredded).' },
      { pathway: 'recycle', text: 'Paper and cardboard sell by the kilo to kabadiwalas and RRR centres.' },
    ],
    tips: ['Start a “take one, leave one” shelf where you work or study.'],
    related: ['book-swap', 'newspaper-gift-wrap', 'compost-caddy'],
  },
  {
    keys: ['toys', 'toy', 'stuffed animal', 'dolls', 'board game', 'puzzle', 'lego', 'playing cards'],
    name: 'Toys & games',
    category: 'Household',
    best: {
      pathway: 'donate',
      why: 'Children’s homes and hospital paediatric wards need complete, safe, working toys — quality beats quantity.',
    },
    options: [
      { pathway: 'donate', text: 'Clean them, bag sets together with all pieces — a complete game is worth five incomplete ones.' },
      { pathway: 'reuse', text: 'Loose Lego and blocks become organiser filler or math counters for younger kids.' },
    ],
    tips: ['Battery-operated toys: include working batteries or remove dead ones before donating.'],
    safety: 'No broken sharp edges, no button batteries within reach of small children.',
    related: ['donation-box-prep'],
  },
  {
    keys: ['crockery', 'plates', 'bowls', 'mugs', 'cups', 'cuttery', 'cutlery', 'utensils', 'kitchen utensils', 'pots', 'pans', 'cookware'],
    name: 'Crockery, cutlery & cookware',
    category: 'Household',
    best: {
      pathway: 'donate',
      why: 'Complete kitchen sets are how shelters furnish “new home kits” for families starting over.',
    },
    options: [
      { pathway: 'donate', text: 'Unchipped, clean items — box by type (plates / cups / utensils).' },
      { pathway: 'reuse', text: 'Chipped mugs become pen pots and planters; worn pans become workshop trinket bowls.' },
      { pathway: 'recycle', text: 'Metal cookware is scrap metal; broken ceramics usually aren’t recyclable — wrap and landfill only as last resort.' },
    ],
    tips: ['A “kitchen starter box” (plates, bowls, one pan, cutlery) is the most-requested donation format.'],
    safety: 'Wrap broken ceramics in newspaper and label the bag.',
    related: ['donation-box-prep', 'glass-recycling'],
  },
  {
    keys: ['mixer', 'mixer grinder', 'blender', 'juicer', 'food processor'],
    name: 'Mixer grinder / blender',
    category: 'Household',
    best: {
      pathway: 'repair',
      why: 'Mixers usually die from worn couplers, carbon brushes or jammed blades — all cheap, known fixes.',
    },
    options: [
      { pathway: 'repair', text: 'A local appliance shop revives most mixers for a few hundred rupees.' },
      { pathway: 'donate', text: 'Working units help families setting up new kitchens.' },
      { pathway: 'recycle', text: 'Dead units — e-waste collection (motor copper is recoverable).' },
    ],
    tips: ['Jammed blade = food wrap around the shaft, not a dead motor. Unplug and check first.'],
    safety: 'Always unplug before poking at blades.',
    related: ['ewaste-sorting'],
  },
  {
    keys: ['fan', 'table fan', 'ceiling fan', 'pedestal fan'],
    name: 'Fans',
    category: 'Household',
    best: {
      pathway: 'repair',
      why: 'Fans are repaired, not replaced — a bearing clean and oil fixes most noise.',
    },
    options: [
      { pathway: 'repair', text: 'Noisy or slow fans usually need bearing lubrication or a capacitor swap — cheap fixes.' },
      { pathway: 'donate', text: 'Working fans are summer essentials at shelters.' },
      { pathway: 'recycle', text: 'Dead fans — e-waste; the motor windings are valuable copper.' },
    ],
    tips: ['A wobbly ceiling fan needs blade balancing, not replacement — a coin of tape does it.'],
    safety: 'Ceiling fan work means heights and spinning blades — get help, isolate the power.',
    related: ['ewaste-sorting'],
  },
  {
    keys: ['washing machine', 'refrigerator', 'fridge', 'microwave', 'oven', 'air conditioner', 'ac', 'geyser', 'water heater', 'toaster', 'kettle', 'iron', 'appliance', 'vacuum', 'cooler'],
    name: 'Large appliances',
    category: 'Household',
    best: {
      pathway: 'repair',
      why: 'Appliances are expensive, repairable, and environmentally costly to manufacture — repair is almost always the right first call.',
    },
    options: [
      { pathway: 'repair', text: 'Call a technician before deciding — most appliance faults are single worn parts.' },
      { pathway: 'donate', text: 'Working appliances transform a shelter kitchen; some refurbishers even collect free.' },
      { pathway: 'recycle', text: 'Dead appliances MUST go to authorised e-waste recyclers — refrigerant gases and insulation make dumping them hazardous.' },
    ],
    tips: ['Buyers of second-hand appliances exist in every city — a working old machine has real resale value.'],
    safety: 'Never dismantle refrigerators or ACs yourself — refrigerant handling is licensed work.',
    related: ['ewaste-sorting'],
  },
  {
    keys: ['bucket', 'mug', 'basin', 'tub', 'dustbin', 'trash can'],
    name: 'Buckets, tubs & bins',
    category: 'Household',
    best: {
      pathway: 'reuse',
      why: 'A cracked-free bucket has infinite uses — storage, laundry, gardening, construction.',
    },
    options: [
      { pathway: 'reuse', text: 'Compost caddy (drill a few holes), mop bucket, tool carrier, planter.' },
      { pathway: 'donate', text: 'Household-setup kits welcome buckets and mugs.' },
      { pathway: 'recycle', text: 'Cracked buckets — rigid plastic is recyclable where facilities exist.' },
    ],
    tips: ['A lidded bucket with air holes is the easiest kitchen-compost starter there is.'],
    related: ['compost-caddy', 'rain-bucket'],
  },
  {
    keys: ['battery', 'batteries', 'aa', 'aaa', 'dry cell', 'cell'],
    name: 'Batteries',
    category: 'Household',
    best: {
      pathway: 'recycle',
      why: 'Batteries are hazardous waste, full stop — they never belong in any household bin.',
    },
    options: [
      { pathway: 'recycle', text: 'Tape the terminals and drop at battery collection points (electronics stores, municipal centres).' },
      { pathway: 'reuse', text: 'Partially drained AA cells still run clocks and remotes for months — squeeze the last of them.' },
    ],
    tips: ['Switching rechargeables eliminates this entire waste stream.'],
    safety: 'Tape lithium terminals — loose batteries can short and catch fire.',
    related: ['ewaste-sorting'],
  },
  {
    keys: ['bulb', 'light bulb', 'cfl', 'tube light', 'led bulb', 'lamp', 'table lamp'],
    name: 'Bulbs & lamps',
    category: 'Household',
    best: {
      pathway: 'recycle',
      why: 'CFLs and tube lights contain mercury — they need special handling, never the bin.',
    },
    options: [
      { pathway: 'recycle', text: 'CFLs/tubes: municipal hazardous waste or lamp-specific collection.' },
      { pathway: 'repair', text: 'Lamps (the furniture kind) are classic repairs: rewiring a plug or switch is beginner-level.' },
      { pathway: 'donate', text: 'Working lamps furnish shelters and student housing.' },
    ],
    tips: ['A lamp with a broken shade but working wiring is still donatable — say which it is.'],
    safety: 'Handle broken CFLs with gloves, ventilate the room, and never vacuum the fragments.',
    related: ['ewaste-sorting'],
  },
  {
    keys: ['toothbrush', 'toothpaste tube', 'cosmetic bottle', 'shampoo bottle', 'makeup', 'cosmetics'],
    name: 'Bathroom & cosmetics items',
    category: 'Household',
    best: {
      pathway: 'reuse',
      why: 'These small items are the stealth waste stream — reuse where possible, recycle the rest properly.',
    },
    options: [
      { pathway: 'reuse', text: 'Old toothbrushes are precision cleaning tools (bike chains, taps, grout). Pump bottles refill from bulk soap.' },
      { pathway: 'recycle', text: 'Rigid plastic bottles recycle; mixed-material pumps usually don’t — separate what you can.' },
    ],
    tips: ['One “cleaning toothbrush” cup in the kitchen saves buying small brushes ever again.'],
    related: ['ewaste-sorting'],
  },
  {
    keys: ['cardboard', 'box', 'boxes', 'carton', 'packaging', 'egg carton', 'egg tray', 'thermocol', 'bubble wrap'],
    name: 'Boxes & packaging',
    category: 'Household',
    best: {
      pathway: 'recycle',
      why: 'Clean cardboard is recycling royalty — and egg cartons have a bonus second life.',
    },
    options: [
      { pathway: 'reuse', text: 'Cardboard sheet-mulches weeds; egg cartons become seed starters; boxes organise everything first.' },
      { pathway: 'recycle', text: 'Flatten boxes and sell/drop with paper — cardboard has steady scrap value.' },
    ],
    tips: ['Keep 2–3 good boxes flat behind a cupboard — future-you moving or gifting will be grateful.'],
    related: ['egg-carton-seed-starters', 'newspaper-gift-wrap'],
  },
  {
    keys: ['cd', 'cds', 'dvd', 'cassette', 'floppy', 'vinyl'],
    name: 'CDs, DVDs & cassettes',
    category: 'Household',
    best: {
      pathway: 'reuse',
      why: 'Discs and tapes are weirdly craftable — and their data era deserves a creative farewell.',
    },
    options: [
      { pathway: 'reuse', text: 'Discs become reflective garden bird-deterrents, coasters or mosaic pieces; cassette tape is sculptural material.' },
      { pathway: 'recycle', text: 'Mixed plastics — e-waste collection takes them.' },
      { pathway: 'donate', text: 'Complete music/film collections still find homes among collectors and community libraries.' },
    ],
    tips: ['Rip anything you love before letting the media go.'],
    related: ['ewaste-sorting'],
  },
  {
    keys: ['medicine', 'medicines', 'expired medicine', 'pills', 'syrup'],
    name: 'Old medicines',
    category: 'Household',
    best: {
      pathway: 'recycle',
      why: 'Expired medicines are hazardous waste — flushing or binning them poisons water and soil.',
    },
    options: [
      { pathway: 'donate', text: 'UNOPENED, unexpired medicines can go to medical-camp NGOs — but only exactly that.' },
      { pathway: 'recycle', text: 'Expired/expired-or-opened: pharmacy take-back schemes, or hand to a municipal hazardous-waste drive.' },
    ],
    tips: ['Keep the original strip/box so expiry dates are verifiable.'],
    safety: 'Never flush medicines or throw loose pills in household waste.',
    related: [],
  },

  /* --------------------------------------------------------- Garden & Outdoor */
  {
    keys: ['flower pot', 'flowerpot', 'planter', 'terracotta', 'plant pot', 'pots'],
    name: 'Flower pots & planters',
    category: 'Garden & Outdoor',
    best: {
      pathway: 'reuse',
      why: 'Every gardener always needs more pots — chipped ones included.',
    },
    options: [
      { pathway: 'reuse', text: 'Chipped pots become crocks (drainage layer), or broken shards become mosaic plant labels.' },
      { pathway: 'donate', text: 'School gardens and community green projects collect pots of any state.' },
    ],
    tips: ['Sterilise used pots with a dilute bleach soak before replanting — it stops disease transfer.'],
    related: ['pot-mosaic-labels', 'bottle-planters'],
  },
  {
    keys: ['garden tool', 'spade', 'trowel', 'rake', 'hoe', 'shears', 'secateurs'],
    name: 'Garden tools',
    category: 'Garden & Outdoor',
    best: {
      pathway: 'donate',
      why: 'Community gardens run on donated tools — and old steel tools sharpen back to life.',
    },
    options: [
      { pathway: 'repair', text: 'Rusty steel tools revive with wire-brushing, oiling and a sharpening stone.' },
      { pathway: 'donate', text: 'Working tools go to school gardens and neighborhood green projects.' },
    ],
    tips: ['A broken handle is a handle replacement, not a tool funeral.'],
    related: [],
  },
  {
    keys: ['hose', 'hose pipe', 'watering can', 'sprinkler'],
    name: 'Hose pipes & watering gear',
    category: 'Garden & Outdoor',
    best: {
      pathway: 'reuse',
      why: 'A leaky hose is full of useful parts — and small leaks are repairable with a ₹50 connector kit.',
    },
    options: [
      { pathway: 'repair', text: 'Cut out the leak and rejoin with a brass/plastic coupler — five-minute fix.' },
      { pathway: 'reuse', text: 'Old hose becomes soaker irrigation (pin-prick the length) or blade covers in the tool shed.' },
    ],
    tips: ['Coil hoses in loose loops; tight kinking is what kills them.'],
    related: ['rain-bucket'],
  },
  {
    keys: ['seeds', 'seed packet', 'plants', 'cuttings', 'sapling', 'soil', 'compost'],
    name: 'Seeds, plants & soil',
    category: 'Garden & Outdoor',
    best: {
      pathway: 'donate',
    why: 'The gardening community runs on swaps — your surplus is someone’s starter garden.',
    },
    options: [
      { pathway: 'donate', text: 'Seed libraries, school gardens and gardening WhatsApp groups actively trade seeds and cuttings.' },
      { pathway: 'reuse', text: 'Save seeds from your own veg — tomatoes and chillies are the classic starters.' },
    ],
    tips: ['Store seeds dry, dark and labelled — most stay viable 1–3 years.'],
    related: ['egg-carton-seed-starters', 'compost-caddy'],
  },
]
