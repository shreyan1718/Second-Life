import { Shirt, Plug, Armchair, Package, Sprout } from 'lucide-react'

// Icons shown on idea cards, keyed by category.
export const CATEGORY_META = {
  'Clothing & Textiles': { icon: Shirt },
  Electronics: { icon: Plug },
  'Furniture & Wood': { icon: Armchair },
  Household: { icon: Package },
  'Garden & Outdoor': { icon: Sprout },
}

export const CATEGORIES = Object.keys(CATEGORY_META)

// The starter idea library. Every entry includes a complete guide:
// materials, numbered steps and safety precautions.
export const IDEAS = [
  {
    id: 'denim-tote',
    title: 'Turn Old Jeans Into a Tote Bag',
    blurb:
      'Stitch hard-wearing denim into a sturdy everyday tote — the pockets are already built in.',
    category: 'Clothing & Textiles',
    pathways: ['reuse'],
    difficulty: 'Beginner',
    time: '~45 min',
    impact: '~0.7 kg diverted',
    tags: ['denim', 'sewing', 'bags'],
    materials: [
      'One old pair of jeans (washed)',
      'Sturdy thread and sewing needles — or a sewing machine',
      'Fabric scissors',
      'Pins',
      'Measuring tape or ruler',
    ],
    steps: [
      {
        title: 'Prepare the jeans',
        detail:
          'Wash and fully dry the jeans so the bag stays clean and the fabric is easy to cut.',
      },
      {
        title: 'Cut off the legs',
        detail:
          'Cut straight across both legs just below the crotch. The seat and waistband become the body of the bag — the waistband is your opening.',
      },
      {
        title: 'Close the bottom',
        detail:
          'Turn the body inside out, pin the cut edge flat, and stitch across it twice for strength. A backstitch by hand or a straight machine stitch both work.',
      },
      {
        title: 'Make the straps',
        detail:
          'Cut two strips about 50 cm long from a leg. Fold each strip in half lengthwise with edges tucked in, press, and stitch along the open side.',
      },
      {
        title: 'Attach the straps',
        detail:
          'Sew each strap to the inside of the waistband, stitching a square with an X through it so the handle can’t tear out under load.',
      },
      {
        title: 'Finish and load it up',
        detail:
          'Trim loose threads, turn right side out — and enjoy the built-in pockets as internal compartments.',
      },
    ],
    safety: [
      'Keep fingers clear of scissors and the sewing machine needle — go slowly on thick seams.',
      'Denim is tough: use a strong needle and thimble when hand-sewing.',
    ],
  },
  {
    id: 'tshirt-rug',
    title: 'Braid Old T-Shirts Into a Rug',
    blurb:
      'Cut stretchy cotton into strips, braid and coil them into a washable bathroom rug — no sewing machine needed.',
    category: 'Clothing & Textiles',
    pathways: ['reuse'],
    difficulty: 'Intermediate',
    time: '~2 hrs',
    impact: '~1.2 kg diverted',
    tags: ['t-shirts', 'no-sew', 'braiding'],
    materials: [
      '8–12 old t-shirts',
      'Fabric scissors',
      'Ruler or measuring tape',
      'A large blunt needle and strong thread (or a sewing machine)',
    ],
    steps: [
      {
        title: 'Cut the shirts into loops',
        detail:
          'Cut across each shirt body from side seam to side seam in 3–4 cm strips, so each strip forms a continuous loop.',
      },
      {
        title: 'Join the loops',
        detail:
          'Loop two strips through each other and pull tight to connect them end-to-end without knots. Build three long continuous strands.',
      },
      {
        title: 'Braid tightly',
        detail:
          'Braid the three strands together, keeping even tension. Add new loops before a strand runs short so the joins stay hidden inside the braid.',
      },
      {
        title: 'Coil the braid',
        detail:
          'Starting from the centre, coil the braid into a flat spiral. This is the shape of your rug.',
      },
      {
        title: 'Stitch as you go',
        detail:
          'Hand-stitch (or machine-stitch) across the underside of the spiral every few centimetres so the coils can’t shift apart.',
      },
      {
        title: 'Finish the edge',
        detail:
          'Tuck the braid’s end under itself, stitch it down securely, and trim any loose threads. Your rug is machine-washable.',
      },
    ],
    safety: [
      'Take breaks — cutting and braiding for long stretches is hard on the wrists.',
      'Keep scissors closed and out of reach when not in use.',
    ],
  },
  {
    id: 'jar-storage',
    title: 'Glass Jars as Pantry Storage',
    blurb:
      'Washed jam and sauce jars become airtight, plastic-free storage for grains, spices and leftovers.',
    category: 'Household',
    pathways: ['reuse'],
    difficulty: 'Beginner',
    time: '~15 min',
    impact: 'Cuts plastic waste',
    tags: ['jars', 'kitchen', 'zero-waste'],
    materials: [
      'Clean glass jars with lids',
      'Warm soapy water',
      'Baking soda (for stubborn smells)',
      'Labels and a marker',
    ],
    steps: [
      {
        title: 'Soak off the labels',
        detail:
          'Submerge the jars in warm soapy water for 20 minutes, then peel the labels off. Scrub any glue residue.',
      },
      {
        title: 'Deodorise if needed',
        detail:
          'For lingering smells, rub the inside with a baking soda paste, rinse well and dry completely.',
      },
      {
        title: 'Dry fully',
        detail:
          'Air-dry upside down so no moisture is trapped — damp jars spoil dry goods quickly.',
      },
      {
        title: 'Fill and label',
        detail:
          'Decant grains, pulses, spices or leftovers, and label each jar with its contents and the date.',
      },
    ],
    safety: [
      'Check every jar for chips and cracks — damaged glass can fail suddenly. Recycle damaged jars instead.',
      'Sweep up broken glass with a dustpan — never with bare hands.',
    ],
  },
  {
    id: 'ladder-shelf',
    title: 'Lean an Old Ladder Into a Bookshelf',
    blurb:
      'A retired wooden ladder becomes rustic leaning shelving after a quick sand and a coat of oil.',
    category: 'Furniture & Wood',
    pathways: ['reuse'],
    difficulty: 'Intermediate',
    time: '~1 hr',
    impact: 'Extends the wood’s life',
    tags: ['ladder', 'shelving', 'furniture'],
    materials: [
      'An old wooden ladder',
      'Sandpaper (120 and 180 grit)',
      'Wood wax, oil or paint',
      'Paintbrush',
      'A wall strap or bracket, screws and a drill',
    ],
    steps: [
      {
        title: 'Inspect the ladder',
        detail:
          'Check every rung and rail for cracks or rot. Only structurally sound ladders should become shelving.',
      },
      {
        title: 'Sand the surfaces',
        detail:
          'Sand with 120 grit to remove old finish, then 180 grit for smoothness. Wipe away all dust.',
      },
      {
        title: 'Finish the wood',
        detail:
          'Apply wax or oil (or paint) in thin coats, following the grain. Two coats with drying time between looks best.',
      },
      {
        title: 'Lean it in place',
        detail:
          'Set the ladder against the wall at a slight angle (10–15°) with the feet firmly on the floor.',
      },
      {
        title: 'Secure it to the wall',
        detail:
          'Fix the top to a wall stud with a strap or bracket. This step is not optional — see safety notes.',
      },
      {
        title: 'Style and load evenly',
        detail:
          'Place heavier items on the lower rungs and distribute weight evenly across each shelf.',
      },
    ],
    safety: [
      'Always anchor the ladder to the wall — an unsecured leaning shelf can tip over, especially around children.',
      'If the old paint might predate the 1980s, wet-sand only and wear a mask, or seal and repaint without sanding dry.',
      'Wear a dust mask and work in a ventilated space while sanding.',
    ],
  },
  {
    id: 'wobbly-chair',
    title: 'Fix a Wobbly Chair',
    blurb:
      'Re-glue loose joints, tighten bolts and clamp overnight — a classic repair anyone can master.',
    category: 'Furniture & Wood',
    pathways: ['repair'],
    difficulty: 'Beginner',
    time: '~1 hr + drying',
    impact: 'Saves buying new',
    tags: ['chair', 'joints', 'glue', 'repair'],
    materials: [
      'Wood glue (PVA)',
      'One or two clamps',
      'Rubber mallet',
      'Damp cloth',
      'Masking tape (to protect surfaces)',
    ],
    steps: [
      {
        title: 'Find the loose joint',
        detail:
          'Rock the chair gently and watch each joint. Mark the ones that move — usually a leg-to-seat joint.',
      },
      {
        title: 'Separate the joint',
        detail:
          'Tap the loose part out with the mallet. If it won’t budge, you may only need to work glue into the gap.',
      },
      {
        title: 'Clean old glue',
        detail:
          'Scrape or sand off dried glue from both surfaces. New glue can’t bond to old glue.',
      },
      {
        title: 'Glue and reassemble',
        detail:
          'Apply glue generously to both surfaces, slide the joint back together and tap it home with the mallet.',
      },
      {
        title: 'Clamp and wait',
        detail:
          'Wipe away squeezed-out glue with the damp cloth, clamp the joint, and leave it a full 24 hours.',
      },
      {
        title: 'Test it',
        detail:
          'Remove the clamp and rock the chair again. Zero movement means the repair is done.',
      },
    ],
    safety: [
      'Don’t sit on the chair until the glue has fully cured (24 hours).',
      'Keep wood glue off skin and eyes, and wash hands after use.',
    ],
  },
  {
    id: 'laptop-revival',
    title: 'Revive a Slow Laptop',
    blurb:
      'Dust the fans, swap in an SSD and add RAM — three upgrades that make an old laptop feel new.',
    category: 'Electronics',
    pathways: ['repair'],
    difficulty: 'Intermediate',
    time: '~90 min',
    impact: 'Extends life 3–5 yrs',
    tags: ['laptop', 'ssd', 'ram', 'upgrade'],
    materials: [
      'Precision screwdriver set',
      'Can of compressed air',
      'Replacement SSD and/or RAM (check your model’s limits first)',
      'USB enclosure (if cloning the old drive)',
      'Small bowl for screws',
    ],
    steps: [
      {
        title: 'Back up everything',
        detail:
          'Copy important files to cloud storage or an external drive before you open anything.',
      },
      {
        title: 'Open it up safely',
        detail:
          'Power off, unplug, and remove the battery if possible. Ground yourself by touching bare metal before handling parts.',
      },
      {
        title: 'Dust the fans',
        detail:
          'Use short bursts of compressed air to clear dust from fans and vents. Hold fans still so they don’t overspin.',
      },
      {
        title: 'Install RAM and SSD',
        detail:
          'Swap the memory modules and 2.5-inch drive (or M.2 stick) per your model’s guide. Never force a connector.',
      },
      {
        title: 'Restore the system',
        detail:
          'Either clone the old drive using the USB enclosure, or install a fresh OS and copy your files back.',
      },
      {
        title: 'Tidy the software',
        detail:
          'Update the OS and drivers, then remove startup programs you don’t use. Enjoy the speed.',
      },
    ],
    safety: [
      'Static electricity can destroy components — ground yourself before touching internals.',
      'If the laptop is under warranty, check whether opening it affects coverage first.',
      'Never work on a plugged-in device, and don’t puncture or press on batteries.',
    ],
  },
  {
    id: 'phone-donate',
    title: 'Donate Your Old Phone',
    blurb:
      'Working phones power charity and digital-inclusion programs — just factory-reset your data first.',
    category: 'Electronics',
    pathways: ['donate'],
    difficulty: 'Beginner',
    time: '~20 min',
    impact: 'Reuse beats recycling',
    tags: ['phone', 'charity', 'data-wipe'],
    materials: [
      'The old phone (and its charger, if you still have it)',
      'Your account passwords (needed to sign out)',
    ],
    steps: [
      {
        title: 'Back up photos and contacts',
        detail:
          'Sync to cloud storage or copy files to a computer. Check they’re actually there before moving on.',
      },
      {
        title: 'Sign out of everything',
        detail:
          'Sign out of Google/Apple accounts, messaging apps and banking apps. This disables anti-theft locks.',
      },
      {
        title: 'Unpair accessories',
        detail: 'Forget paired smartwatches, earbuds and cars in Bluetooth settings.',
      },
      {
        title: 'Factory reset',
        detail:
          'Erase all content in Settings. This is the single most important step — see safety notes.',
      },
      {
        title: 'Remove cards and SIMs',
        detail: 'Take out the SIM card, SD card and any case.',
      },
      {
        title: 'Donate',
        detail:
          'Hand it to a charity program, digital-inclusion scheme or a certified refurbisher — ideally with the charger.',
      },
    ],
    safety: [
      'Always factory reset before donating — your photos, messages and accounts live on that phone.',
      'Never donate a phone with a swollen or damaged battery; take it to e-waste recycling instead.',
    ],
  },
  {
    id: 'book-swap',
    title: 'Start a Book Swap Shelf',
    blurb:
      'Set up a “take one, leave one” shelf at school, work or your local café and watch it travel.',
    category: 'Household',
    pathways: ['donate'],
    difficulty: 'Beginner',
    time: '~30 min',
    impact: 'Spreads knowledge',
    tags: ['books', 'community', 'swap'],
    materials: [
      'A shelf, crate or sturdy box',
      'A sign or label card (“Take a book, leave a book”)',
      '10–15 books to seed it',
    ],
    steps: [
      {
        title: 'Pick a spot with permission',
        detail:
          'Ask before placing it. Good spots: school corridors, office kitchens, cafés, community centres.',
      },
      {
        title: 'Source the shelf',
        detail:
          'A small bookshelf, wooden crate or even a strong carton works. Clean it up first.',
      },
      {
        title: 'Add a clear sign',
        detail:
          'Write “Take a book, leave a book — bring one back whenever you like” where everyone can see it.',
      },
      {
        title: 'Seed it with books',
        detail:
          'Start with 10–15 good titles. A shelf that’s half empty looks unloved.',
      },
      {
        title: 'Check in monthly',
        detail:
          'Tidy, rotate stock and make sure no water damage is creeping in. That’s the whole maintenance plan.',
      },
    ],
    safety: [
      'If the shelf is tall, fix it to the wall so it can’t tip.',
      'Never block fire exits, walkways or electrical panels.',
    ],
  },
  {
    id: 'bottle-planters',
    title: 'Plastic Bottles Into Planters',
    blurb:
      'Halve bottles, add drainage holes and hang a vertical herb garden on any sunny wall.',
    category: 'Garden & Outdoor',
    pathways: ['reuse'],
    difficulty: 'Beginner',
    time: '~30 min',
    impact: 'Grows food at home',
    tags: ['bottles', 'herbs', 'vertical-garden'],
    materials: [
      'Clean 2-litre plastic bottles',
      'Craft knife or scissors',
      'Marker pen',
      'Sandpaper (to smooth cut edges)',
      'String or wire for hanging',
      'Small stones, potting soil and herb seedlings',
    ],
    steps: [
      {
        title: 'Clean and mark',
        detail:
          'Peel the label, wash the bottle, and draw a line around its middle where you’ll cut.',
      },
      {
        title: 'Cut the bottle in half',
        detail:
          'Pierce carefully at the line with the craft knife, then finish the cut with scissors. Cut away from your body.',
      },
      {
        title: 'Smooth the edges',
        detail: 'Run sandpaper along the cut rim so no sharp edges remain.',
      },
      {
        title: 'Add drainage',
        detail:
          'Poke 4–6 small holes in the base half for drainage. A warm nail held with pliers melts clean holes easily.',
      },
      {
        title: 'Plant it up',
        detail:
          'Add a layer of small stones, fill with potting soil, and plant one seedling per bottle.',
      },
      {
        title: 'Hang and water',
        detail:
          'Suspend the planters with string on a sunny wall and water gently — herbs hate soggy roots.',
      },
    ],
    safety: [
      'Always cut away from your hands, and keep craft knives away from children.',
      'If melting drainage holes with a warm nail, hold it with pliers and ventilate the room.',
      'Smooth every cut edge with sandpaper before handling planted bottles.',
    ],
  },
  {
    id: 'ewaste-sorting',
    title: 'Sort E-Waste the Right Way',
    blurb:
      'Cables, chargers and batteries each belong to different bins — a simple sorting system for your drawer of doom.',
    category: 'Electronics',
    pathways: ['recycle'],
    difficulty: 'Beginner',
    time: '~20 min',
    impact: 'Recovers precious metals',
    tags: ['cables', 'batteries', 'e-waste', 'power bank'],
    materials: [
      'Three or four labelled boxes or bags',
      'Masking tape (for battery terminals)',
      'Marker pen',
    ],
    steps: [
      {
        title: 'Collect everything',
        detail:
          'Gather dead electronics from around the house into one place — the famous drawer of doom.',
      },
      {
        title: 'Sort into four groups',
        detail:
          'Group 1: still works → donate. Group 2: cables and chargers → cable recycling. Group 3: batteries → battery drop-off. Group 4: broken devices → e-waste collection.',
      },
      {
        title: 'Tape the batteries',
        detail:
          'Put masking tape over every battery terminal — see safety notes for why this matters.',
      },
      {
        title: 'Wipe anything with storage',
        detail:
          'Factory reset phones, tablets and laptops before they leave the house.',
      },
      {
        title: 'Find your drop-off points',
        detail:
          'Check your municipal website or retailer take-back schemes for e-waste and battery collection near you.',
      },
    ],
    safety: [
      'Tape lithium battery terminals — loose batteries can short-circuit and catch fire.',
      'Never bin batteries in household waste, and never burn them.',
      'Old CRT TVs are heavy and hold electrical charge — get help or hire a professional.',
    ],
  },
  {
    id: 'coat-donate',
    title: 'Donate Winter Coats',
    blurb:
      'Gently worn winter wear finds instant takers at shelters when the cold season starts.',
    category: 'Clothing & Textiles',
    pathways: ['donate'],
    difficulty: 'Beginner',
    time: '~15 min',
    impact: 'Direct local impact',
    tags: ['coats', 'winter', 'shelter'],
    materials: [
      'Gently worn coats and jackets',
      'Washing machine or dry cleaner (per the care label)',
      'A bag for the donation',
    ],
    steps: [
      {
        title: 'Check the condition',
        detail:
          'Zips should run, buttons present, no major stains or tears. Items beyond repair belong in textile recycling instead.',
      },
      {
        title: 'Clean everything',
        detail:
          'Wash or dry-clean per the label. Shelters can’t process dirty donations.',
      },
      {
        title: 'Empty every pocket',
        detail: 'Check for keys, receipts, headphones and forgotten cash.',
      },
      {
        title: 'Small repairs help',
        detail:
          'Sew on a loose button or fix a pulled hem — five minutes that doubles the coat’s value.',
      },
      {
        title: 'Donate at the right time',
        detail:
          'Shelters need coats most in autumn and early winter. Ask ahead about what they can accept.',
      },
    ],
    safety: [
      'Always wash donations — hygiene protects both recipients and volunteers.',
    ],
  },
  {
    id: 'drawer-shelf',
    title: 'Dresser Drawers as Wall Storage',
    blurb:
      'Orphaned drawers mount as shadow boxes, spice racks or floating bedside shelves.',
    category: 'Furniture & Wood',
    pathways: ['reuse'],
    difficulty: 'Intermediate',
    time: '~1 hr',
    impact: 'Saves quality wood',
    tags: ['drawer', 'wall-storage', 'upcycle'],
    materials: [
      'A spare dresser drawer',
      'Sandpaper (120 and 180 grit)',
      'Paint or wood wax',
      'Paintbrush',
      'Heavy-duty wall brackets (or a French cleat), screws and wall plugs',
      'Drill and spirit level',
    ],
    steps: [
      {
        title: 'Clean and sand',
        detail: 'Clean the drawer, then sand it smooth — start with 120 grit, finish with 180.',
      },
      {
        title: 'Paint or wax',
        detail:
          'Apply two thin coats of paint or wax, letting each dry fully. Painter’s tape keeps lines crisp.',
      },
      {
        title: 'Attach the brackets',
        detail:
          'Fix heavy-duty brackets to the drawer’s back rail, level and square.',
      },
      {
        title: 'Find the studs',
        detail:
          'Locate wall studs (or use rated wall plugs for masonry). Mark your drill holes and check level.',
      },
      {
        title: 'Mount and load',
        detail:
          'Screw the drawer to the wall, test with light items first, then style it as a shadow box or shelf.',
      },
    ],
    safety: [
      'Use brackets rated for well above the weight you’ll place on the shelf.',
      'Mount into studs or rated anchors — plasterboard alone won’t hold a loaded drawer.',
      'Get help lifting the drawer while you level and fix it.',
    ],
  },
  {
    id: 'compost-caddy',
    title: 'Bucket Into a Compost Caddy',
    blurb:
      'Drill a few holes in a lidded bucket and start collecting kitchen scraps for a garden compost heap.',
    category: 'Garden & Outdoor',
    pathways: ['reuse'],
    difficulty: 'Beginner',
    time: '~20 min',
    impact: 'Feeds your garden',
    tags: ['compost', 'kitchen', 'bucket'],
    materials: [
      'A lidded bucket, 10–20 litres',
      'Drill with a small bit (4–6 mm)',
      'Brown paper bags or newspaper (as liners)',
    ],
    steps: [
      {
        title: 'Clean the bucket',
        detail: 'Wash it well — you’re about to store food in it daily.',
      },
      {
        title: 'Drill airflow holes',
        detail:
          'Drill 8–10 holes in the lid (or around the top rim) so the caddy breathes without attracting flies.',
      },
      {
        title: 'Line it',
        detail:
          'Fold a brown paper bag to fit the bottom — it soaks up moisture and composts with the scraps.',
      },
      {
        title: 'Collect scraps',
        detail:
          'Fruit and veggie peels, coffee grounds and eggshells are perfect. Skip meat, dairy and cooked food.',
      },
      {
        title: 'Empty every 2–3 days',
        detail:
          'Tip the caddy into your compost heap or bin, rinse, re-line and carry on.',
      },
    ],
    safety: [
      'Clamp the bucket or have someone hold it while drilling.',
      'Wash hands after handling food waste.',
    ],
  },
  {
    id: 'can-cash',
    title: 'Recycle Aluminium Cans',
    blurb:
      'Rinse, crush and drop cans at buy-back centres — aluminium recycles forever and pays by weight.',
    category: 'Household',
    pathways: ['recycle'],
    difficulty: 'Beginner',
    time: '~10 min',
    impact: 'Infinitely recyclable',
    tags: ['cans', 'aluminium', 'buy-back'],
    materials: [
      'Aluminium drink cans',
      'A rinse basin',
      'A storage bag or box',
      'Gloves (optional, for crushing)',
    ],
    steps: [
      {
        title: 'Rinse the cans',
        detail:
          'A quick rinse removes sugar that attracts pests and contaminates recycling batches.',
      },
      {
        title: 'Check local rules',
        detail:
          'Some collections want cans crushed; reverse-vending machines often want them whole. Check before you crush.',
      },
      {
        title: 'Crush if allowed',
        detail:
          'Crush lengthwise so sharp edges point inward and the cans take up far less space.',
      },
      {
        title: 'Store dry',
        detail: 'Keep cans in a dry bag or box until you have a worthwhile load.',
      },
      {
        title: 'Cash them in',
        detail:
          'Drop them at a buy-back centre or scrap dealer — aluminium is bought by weight, forever recyclable.',
      },
    ],
    safety: [
      'Crushed can edges are sharp — wear gloves or handle them carefully.',
      'Never crush aerosol cans; they’re pressurised and belong to hazardous collection.',
    ],
  },
  {
    id: 'sock-draft-stopper',
    title: 'Odd Socks Into Door Draft Stoppers',
    blurb: 'Fill mismatched socks with scraps or rice and block the draught under any door.',
    category: 'Clothing & Textiles',
    pathways: ['reuse'],
    difficulty: 'Beginner',
    time: '~30 min',
    impact: 'Cuts heating draughts',
    tags: ['socks', 'no-sew', 'insulation'],
    materials: [
      'Two odd socks or one leg of tights',
      'Stuffing: fabric scraps, rice or lentils',
      'Needle and thread',
      'Scissors',
    ],
    steps: [
      {
        title: 'Wash and pair up',
        detail: 'Wash the socks so your stopper starts fresh, and pick a long one for the filling.',
      },
      {
        title: 'Fill the sock',
        detail:
          'Stuff it with fabric scraps or rice until it’s snugly full but still flexible enough to hug the floor.',
      },
      {
        title: 'Stitch it closed',
        detail: 'Sew the opening with a tight whip stitch — go slow, this seam takes the strain.',
      },
      {
        title: 'Add a washable cover',
        detail:
          'Slide the filled sock into a second sock or a tied-off leg of tights so you can wash the cover later.',
      },
      {
        title: 'Lay it down',
        detail: 'Place it along the bottom of the draughty door and enjoy the warmer room.',
      },
    ],
    safety: [
      'Keep needles and pins in a box when you pause — never in your mouth or on the floor.',
      'Store the stopper away from heaters; rice filling is flammable.',
    ],
  },
  {
    id: 'tshirt-produce-bags',
    title: 'Old T-Shirts Into No-Sew Produce Bags',
    blurb: 'Ten minutes per bag: cut, knot, done — and never take a plastic produce bag again.',
    category: 'Clothing & Textiles',
    pathways: ['reuse'],
    difficulty: 'Beginner',
    time: '~20 min',
    impact: 'Cuts single-use plastic',
    tags: ['t-shirts', 'no-sew', 'groceries'],
    materials: ['Old t-shirts', 'Fabric scissors', 'Marker pen (for sizing)'],
    steps: [
      {
        title: 'Cut the handles',
        detail:
          'Lay the shirt flat and cut both sleeves off just outside the seams — the shoulders and neckline become the bag’s handles.',
      },
      {
        title: 'Deepen the neckline',
        detail: 'Cut a smooth scoop below the collar to open the bag wide.',
      },
      {
        title: 'Cut the fringe',
        detail:
          'Cut fringes about 8 cm long and 2 cm wide up from the bottom hem, through both layers at once.',
      },
      {
        title: 'Knot it shut',
        detail:
          'Turn the shirt inside out and tightly knot each front-and-back fringe pair together.',
      },
      {
        title: 'Close the gaps',
        detail:
          'Tie each fringe to its neighbour in a second row of knots, then turn right side out — done.',
      },
    ],
    safety: [
      'Tug-test every knot with a firm pull before loading the bag with shopping.',
    ],
  },
  {
    id: 'visible-mending',
    title: 'Patch Jeans With Visible Mending',
    blurb: 'Turn tears into decoration with a needle, floss and a bold patch of scrap fabric.',
    category: 'Clothing & Textiles',
    pathways: ['repair'],
    difficulty: 'Intermediate',
    time: '~1 hr',
    impact: 'Extends clothing life',
    tags: ['denim', 'mending', 'embroidery'],
    materials: [
      'Jeans with a hole or thin spot',
      'Scrap denim or contrast fabric',
      'Embroidery floss',
      'Needle, scissors and pins',
      'Fabric chalk (optional)',
    ],
    steps: [
      {
        title: 'Prepare the area',
        detail: 'Trim loose threads, then iron the jeans flat around the damage.',
      },
      {
        title: 'Place the patch',
        detail:
          'Cut a patch 3–4 cm larger than the hole and pin it behind the worn area, centred.',
      },
      {
        title: 'Stitch a grid',
        detail:
          'Work rows of running stitch across the patch in one direction, then cross them at right angles — the grid is the repair.',
      },
      {
        title: 'Keep it relaxed',
        detail:
          'Drape the fabric over your hand or a darning mushroom as you stitch so the patch doesn’t pucker.',
      },
      {
        title: 'Make it yours',
        detail:
          'Add a few decorative stitches in a contrast colour — visible mending is meant to be seen.',
      },
    ],
    safety: ['Work in good light to avoid eye strain and missed stitches.'],
  },
  {
    id: 'cable-organiser-rolls',
    title: 'Toilet Rolls Into Cable Organisers',
    blurb: 'End the drawer of tangled cables — one roll per cable, labelled and standing to attention.',
    category: 'Electronics',
    pathways: ['reuse'],
    difficulty: 'Beginner',
    time: '~15 min',
    impact: 'Tames the cable drawer',
    tags: ['cables', 'storage', 'quick'],
    materials: [
      'Toilet-paper rolls',
      'Washi or decorative tape (optional)',
      'Marker pen',
      'A shoebox or drawer (optional)',
    ],
    steps: [
      {
        title: 'Unplug everything',
        detail: 'Coil only cables that are unplugged at both ends.',
      },
      {
        title: 'Coil loosely',
        detail:
          'Loop each cable into a loose coil — tight bends damage wires over time.',
      },
      {
        title: 'Roll and label',
        detail: 'Slide each coil into a roll and write the device name on it.',
      },
      {
        title: 'Decorate and store',
        detail:
          'Wrap rolls in tape for colour if you like, then stand them in a box so you can see every label.',
      },
    ],
    safety: [
      'Never coil a cable around a charger that’s plugged in — heat needs to escape.',
      'Keep paper rolls away from heaters and sockets.',
    ],
  },
  {
    id: 'cable-repair-heatshrink',
    title: 'Fix a Frayed Cable With Heat Shrink',
    blurb: 'A professional-looking repair for outer-sheath damage — for a fraction of a replacement.',
    category: 'Electronics',
    pathways: ['repair'],
    difficulty: 'Intermediate',
    time: '~30 min',
    impact: 'Prevents e-waste',
    tags: ['cables', 'heat-shrink', 'safety'],
    materials: [
      'Heat-shrink tubing (slightly wider than the cable)',
      'Heat gun or hair dryer',
      'Electrical tape',
      'Isopropyl alcohol and a cloth',
      'Scissors',
    ],
    steps: [
      {
        title: 'Unplug both ends',
        detail: 'Always unplug from the wall AND the device before touching a damaged cable.',
      },
      {
        title: 'Thread the tubing',
        detail: 'Slide a 3–4 cm piece of heat-shrink onto the cable, past the damage.',
      },
      {
        title: 'Rebuild the insulation',
        detail:
          'Clean the frayed area with isopropyl alcohol, then wrap it smoothly with electrical tape.',
      },
      {
        title: 'Shrink it',
        detail:
          'Slide the tubing over the repair and apply heat evenly, rotating until it hugs the cable.',
      },
      {
        title: 'Test the flex',
        detail: 'Let it cool fully, then gently flex the repaired spot — it should stay firm.',
      },
    ],
    safety: [
      'This repair is for OUTER sheath damage only — if the inner insulation or copper is exposed, replace the cable.',
      'Keep heat guns away from flammables and skin.',
      'Never work on a live cable.',
    ],
  },
  {
    id: 'old-phone-security-cam',
    title: 'Turn an Old Phone Into a Security Camera',
    blurb: 'A free baby-monitor, pet-cam or door camera from the phone in your drawer.',
    category: 'Electronics',
    pathways: ['reuse'],
    difficulty: 'Intermediate',
    time: '~45 min',
    impact: 'Reuses a whole device',
    tags: ['phone', 'camera', 'smart-home'],
    materials: [
      'Old smartphone with its charger',
      'A trusted free security-camera app',
      'Phone stand or wall mount',
      'Wi-Fi and a nearby power socket',
    ],
    steps: [
      {
        title: 'Reset the phone',
        detail: 'Factory-reset it and sign in with a fresh account used only for the camera.',
      },
      {
        title: 'Install the app pair',
        detail:
          'Install the same security-camera app on the old phone (camera) and your main phone (viewer).',
      },
      {
        title: 'Position it',
        detail:
          'Mount the phone pointing at the area you want to watch, close to power and within Wi-Fi range.',
      },
      {
        title: 'Configure alerts',
        detail: 'Enable motion detection and notifications; adjust sensitivity to avoid spam.',
      },
      {
        title: 'Check in monthly',
        detail:
          'Glance at the battery every few weeks — if it ever swells, retire the camera and recycle the phone.',
      },
    ],
    safety: [
      'Stop using the phone immediately if the battery swells or gets hot — recycle it as e-waste.',
      'Only point cameras at your own spaces, and tell everyone in the home where they are.',
    ],
  },
  {
    id: 'hard-drive-erase',
    title: 'Wipe Your Data Before Donating a Computer',
    blurb: 'The five-step checklist that makes donating a laptop safe for you and useful for them.',
    category: 'Electronics',
    pathways: ['donate'],
    difficulty: 'Beginner',
    time: '~40 min',
    impact: 'Makes donation safe',
    tags: ['laptop', 'data', 'security'],
    materials: [
      'The computer',
      'External drive or cloud storage for backups',
      'A USB stick for a fresh OS (optional)',
    ],
    steps: [
      {
        title: 'Back up and verify',
        detail: 'Copy documents and photos to cloud or external storage — then open the backup to check it works.',
      },
      {
        title: 'Sign out everywhere',
        detail: 'Sign out of email, cloud and app accounts, and deauthorise any software licences.',
      },
      {
        title: 'Use the built-in secure erase',
        detail:
          'On Windows use Reset with “clean the drive”; on macOS use Erase All Content and Settings.',
      },
      {
        title: 'Extra pass for old drives',
        detail:
          'For vintage spinning drives, run a free disk-erase tool that overwrites the entire disk.',
      },
      {
        title: 'Reinstall the OS',
        detail: 'Leave a fresh operating system on it so the charity receives a working machine.',
      },
    ],
    safety: [
      'Dragging files to the trash does NOT erase them — a full secure erase is the only safe route.',
      'Remove SD cards, SIM trays and USB dongles before handing it over.',
    ],
  },
  {
    id: 'power-bank-second-life',
    title: 'Give an Old Power Bank a Second Life',
    blurb:
      'Test what it can still hold, give it a backup job — emergency kit, router or USB light — and retire it safely when the cells give up.',
    category: 'Electronics',
    pathways: ['reuse', 'recycle'],
    difficulty: 'Beginner',
    time: '~20 min',
    impact: 'Prevents battery e-waste',
    tags: ['power bank', 'powerbank', 'battery', 'batteries', 'charger', 'backup', 'e-waste'],
    materials: [
      'The old power bank and a working USB cable',
      'A phone or other USB device (for testing)',
      'Masking tape and a marker pen',
      'Optional: a USB LED light, or a router that accepts 5 V USB power',
    ],
    steps: [
      {
        title: 'Test what it can still hold',
        detail:
          'Charge the power bank full, then drain it into a phone and note the result — “half a phone charge, Nov 2026”. Write it on tape on the side.',
      },
      {
        title: 'Judge the result',
        detail:
          'Still delivers a decent charge? It deserves a second job. Barely holds anything? Skip to the safe-retirement steps at the end.',
      },
      {
        title: 'Job: emergency-kit keeper',
        detail:
          'A weak power bank still tops up a phone in a blackout or on a trip. Store it at about half charge with its cable, and top it up every few months.',
      },
      {
        title: 'Job: keep the internet alive',
        detail:
          'Some routers and ONTs accept 5 V USB power — during a power cut, a power bank keeps your Wi-Fi running for hours. (Only if your router genuinely runs on 5 V USB — check the label first.)',
      },
      {
        title: 'Job: light and small projects',
        detail:
          'Plug in a USB LED light for an instant load-shedding lamp, or use it to power a Raspberry Pi, fairy lights or a small fan.',
      },
      {
        title: 'Store it kindly',
        detail:
          'Keep it cool and dry, away from sunlight and hot cars. Heat is what kills lithium cells fastest — and always charge it on a hard surface, never on a bed.',
      },
      {
        title: 'Retire it safely when done',
        detail:
          'When it truly gives up, tape over the ports, and hand it to an authorised e-waste recycler or a battery drop-off — never the household bin, and never the kabadiwala’s general scrap.',
      },
    ],
    safety: [
      'Stop using it immediately — and recycle it — if it is swollen, hot, or smells strange. Swollen lithium cells are a fire risk.',
      'Never puncture it, dismantle it, or short its ports; don’t open it to salvage the cells inside.',
      'Only charge with an undamaged cable and a standard charger, on a non-flammable surface.',
    ],
  },
  {
    id: 'pallet-coffee-table',
    title: 'Shipping Pallet Into a Coffee Table',
    blurb: 'Free hardwood disguised as packaging — dismantle, sand, oil, assemble.',
    category: 'Furniture & Wood',
    pathways: ['reuse'],
    difficulty: 'Intermediate',
    time: '~3 hrs',
    impact: 'Saves quality timber',
    tags: ['pallet', 'table', 'carpentry'],
    materials: [
      'A pallet stamped HT (heat-treated)',
      'Claw hammer and pry bar',
      'Sandpaper: 80, 120 and 180 grit',
      'Wood oil or paint and a brush',
      'Screws, drill and (optional) castors',
    ],
    steps: [
      {
        title: 'Pick a safe pallet',
        detail:
          'Only use pallets stamped HT (heat-treated). Never ones stamped MB — they were fumigated with chemicals.',
      },
      {
        title: 'Dismantle it',
        detail:
          'Work the hammer and pry bar along each joint, pulling every nail out completely as you go.',
      },
      {
        title: 'Sand progressively',
        detail: 'Sand every board with 80, then 120, then 180 grit until the wood feels smooth.',
      },
      {
        title: 'Build the top',
        detail:
          'Screw the cleanest boards side by side onto a simple frame; add sturdy legs or castors.',
      },
      {
        title: 'Finish',
        detail: 'Apply two coats of oil or paint, letting each dry fully before the table enters the house.',
      },
    ],
    safety: [
      'Wear gloves and goggles — pallet nails bite and old wood splinters.',
      'Work outdoors or in a ventilated space when oiling.',
      'Check for protruding nails before running your hand along any board.',
    ],
  },
  {
    id: 'sticky-drawer-fix',
    title: 'Fix a Sticky Drawer',
    blurb: 'Ninety percent of sticky drawers are cured by a screwdriver, a candle and five minutes.',
    category: 'Furniture & Wood',
    pathways: ['repair'],
    difficulty: 'Beginner',
    time: '~25 min',
    impact: 'Saves furniture',
    tags: ['drawer', 'runners', 'wax'],
    materials: [
      'A candle stub or block of beeswax',
      'Sandpaper (120 grit)',
      'Screwdriver',
      'Brush or vacuum',
    ],
    steps: [
      {
        title: 'Inspect the runners',
        detail:
          'Pull the drawer fully out and look for debris, swelling or loose screws on the runners.',
      },
      {
        title: 'Tighten up',
        detail: 'Snug down any loose runner screws on both the drawer and the cabinet.',
      },
      {
        title: 'Smooth the swelling',
        detail: 'Lightly sand any rough or swollen patches — a few passes is usually enough.',
      },
      {
        title: 'Wax the slides',
        detail: 'Rub candle wax generously along every surface the drawer slides on.',
      },
      {
        title: 'Glide test',
        detail: 'Re-insert the drawer and pull it a few times; add wax anywhere it still drags.',
      },
    ],
    safety: [
      'Sand lightly — removing too much wood leaves the drawer wobbly in its runners.',
    ],
  },
  {
    id: 'frame-to-tray',
    title: 'Picture Frame Into a Serving Tray',
    blurb: 'That orphan frame in the loft is one afternoon away from being a stylish tray.',
    category: 'Furniture & Wood',
    pathways: ['reuse'],
    difficulty: 'Beginner',
    time: '~40 min',
    impact: 'Decorative reuse',
    tags: ['frame', 'tray', 'upcycle'],
    materials: [
      'A sturdy wooden picture frame',
      'Cork board or thick cardboard',
      'Decorative fabric or paper',
      'Craft glue and scissors',
      'Two drawer handles with screws',
    ],
    steps: [
      {
        title: 'Empty the frame',
        detail: 'Remove the glass and backing, and give the frame a wipe-down.',
      },
      {
        title: 'Make the base',
        detail:
          'Cut cork or cardboard to fit the frame opening and glue fabric over it, folding edges to the back.',
      },
      {
        title: 'Fix the base in',
        detail: 'Clip the covered board into the frame like a picture.',
      },
      {
        title: 'Add handles',
        detail:
          'Drill pilot holes and screw a handle onto each short side of the frame.',
      },
      {
        title: 'Protect surfaces',
        detail: 'Stick felt pads under the corners so the tray is kind to tables.',
      },
    ],
    safety: [
      'Wrap removed glass in newspaper before disposing of it.',
      'Drill pilot holes before screwing handles — forcing screws splits thin frames.',
    ],
  },
  {
    id: 'tin-can-organisers',
    title: 'Tin Cans Into Desk Organisers',
    blurb: 'Washed, de-burred and painted — tins make the best pen pots in the house.',
    category: 'Household',
    pathways: ['reuse'],
    difficulty: 'Beginner',
    time: '~30 min',
    impact: 'Diverts metal waste',
    tags: ['tins', 'storage', 'desk'],
    materials: [
      'Clean tin cans',
      'Metal file or sandpaper',
      'Pliers',
      'Paint or decorative tape',
      'Glue and a cardboard base (optional)',
    ],
    steps: [
      {
        title: 'Wash and dry',
        detail: 'Peel labels, wash the tins and let them dry completely.',
      },
      {
        title: 'Make edges safe',
        detail:
          'File the rim until smooth, then press down any jagged inner lid with pliers.',
      },
      {
        title: 'Decorate',
        detail: 'Paint or wrap with tape — bright colours hide dents beautifully.',
      },
      {
        title: 'Group them',
        detail:
          'Glue tins onto a cardboard base for a desktop set, or use them singly.',
      },
      {
        title: 'Fill up',
        detail: 'Pens, brushes, utensils, tools — they’ll be organised within the hour.',
      },
    ],
    safety: [
      'Tin edges cut skin easily — file every rim and press down lids before decorating.',
      'An adult should check the edges before children use the organisers.',
    ],
  },
  {
    id: 'newspaper-gift-wrap',
    title: 'Newspaper Into Gift Wrap & Tags',
    blurb: 'The comics page beats printed wrapping paper — and it’s already in your recycling.',
    category: 'Household',
    pathways: ['reuse'],
    difficulty: 'Beginner',
    time: '~20 min',
    impact: 'Cuts wrapping waste',
    tags: ['newspaper', 'gifts', 'paper'],
    materials: [
      'Old newspaper (comics and colour pages are best)',
      'Twine or ribbon',
      'Scissors and a hole punch',
      'Card scraps for tags',
    ],
    steps: [
      {
        title: 'Choose your pages',
        detail: 'Pick clean, colourful pages — comic sections wrap brilliantly.',
      },
      {
        title: 'Flatten them',
        detail: 'Smooth out creases with your hands, or a warm (not hot) iron for crisp paper.',
      },
      {
        title: 'Wrap with style',
        detail:
          'Wrap as usual, folding sharp corners; secure with as little tape as possible, or twine.',
      },
      {
        title: 'Make matching tags',
        detail:
          'Punch shapes or rectangles from card scraps, punch a hole and tie on with the twine.',
      },
    ],
    safety: ['Keep the iron at low heat and away from children.'],
  },
  {
    id: 'donation-box-prep',
    title: 'Prepare a Perfect Donation Box',
    blurb: 'The difference between “here’s a bag of stuff” and a donation charities genuinely thank you for.',
    category: 'Household',
    pathways: ['donate'],
    difficulty: 'Beginner',
    time: '~45 min',
    impact: 'Maximises donation value',
    tags: ['donation', 'charity', 'checklist'],
    materials: [
      'Cardboard boxes or strong bags',
      'Cleaning supplies',
      'Marker pen and labels',
      'Phone (to call ahead)',
    ],
    steps: [
      {
        title: 'One category per box',
        detail: 'Sort into clothes, kitchen, books and electronics — and label each box.',
      },
      {
        title: 'Test electricals',
        detail: 'Plug in and test every device; attach a note describing any known faults.',
      },
      {
        title: 'Clean everything',
        detail: 'Wipe, wash and dry items — charities cannot process dirty donations.',
      },
      {
        title: 'Check what they take',
        detail:
          'Call or check the charity’s website for what they currently accept — needs change seasonally.',
      },
      {
        title: 'Drop off properly',
        detail: 'Deliver during opening hours, and take back anything they can’t accept.',
      },
    ],
    safety: [
      'Never donate damaged electricals, recalled items or car seats with unknown history.',
      'Lift heavy boxes with bent knees, straight back — or ask for help.',
    ],
  },
  {
    id: 'glass-recycling',
    title: 'Recycle Glass the Right Way',
    blurb: 'Glass recycles forever — but one wrong item can ruin an entire furnace batch.',
    category: 'Household',
    pathways: ['recycle'],
    difficulty: 'Beginner',
    time: '~15 min',
    impact: 'Infinitely recyclable',
    tags: ['glass', 'bottles', 'recycling'],
    materials: ['A rinse basin', 'A storage box or crate'],
    steps: [
      {
        title: 'Rinse, don’t scrub',
        detail: 'A quick rinse removes food residue — labels can stay on.',
      },
      {
        title: 'Separate the lids',
        detail: 'Metal and plastic lids go into their own recycling streams.',
      },
      {
        title: 'Know what’s accepted',
        detail:
          'Bottles and jars yes — window glass, mirrors, Pyrex, drinking glasses and light bulbs no.',
      },
      {
        title: 'Loose, never bagged',
        detail: 'Place glass loosely in the bin or take it to a bottle bank — never in plastic bags.',
      },
      {
        title: 'Claim deposits',
        detail: 'Where deposit-return schemes exist, take bottles back for the refund.',
      },
    ],
    safety: [
      'Wrap broken glass in newspaper, label it, and place it beside — never inside — the bin.',
      'Different glasses melt at different temperatures: one Pyrex dish can spoil a whole batch.',
    ],
  },
  {
    id: 'egg-carton-seed-starters',
    title: 'Egg Cartons Into Seed Starters',
    blurb: 'Twelve free seed pots that go straight into the soil — carton and all.',
    category: 'Garden & Outdoor',
    pathways: ['reuse'],
    difficulty: 'Beginner',
    time: '~25 min',
    impact: 'Grows from waste',
    tags: ['egg-carton', 'seeds', 'spring'],
    materials: [
      'Cardboard (not foam) egg cartons',
      'Seed-starting soil',
      'Seeds',
      'Scissors',
      'A tray for drip-catching',
    ],
    steps: [
      {
        title: 'Cardboard only',
        detail: 'Use paper-pulp cartons — foam never breaks down in soil.',
      },
      {
        title: 'Make the tray',
        detail: 'Cut the lid off and slide it underneath as a drip tray.',
      },
      {
        title: 'Sow',
        detail: 'Fill each cup with soil and press in one or two seeds at the packet’s depth.',
      },
      {
        title: 'Keep them cosy',
        detail: 'Water gently and keep the carton in a warm, bright spot.',
      },
      {
        title: 'Plant the whole pot',
        detail:
          'When seedlings are ready, cut the cups apart and plant them whole — the cardboard composts away.',
      },
    ],
    safety: [
      'Label each cup when you sow — future-you will not remember which row was basil.',
      'Keep seedling cartons away from curious pets.',
    ],
  },
  {
    id: 'pot-mosaic-labels',
    title: 'Broken Pots Into Mosaic Plant Labels',
    blurb: 'Every shattered terracotta pot is a set of weatherproof labels waiting to happen.',
    category: 'Garden & Outdoor',
    pathways: ['reuse'],
    difficulty: 'Intermediate',
    time: '~1 hr',
    impact: 'Creative reuse',
    tags: ['terracotta', 'labels', 'mosaic'],
    materials: [
      'Broken terracotta or ceramic pieces',
      'Metal file',
      'Paint pen or permanent marker',
      'Clear outdoor varnish',
      'Gloves and safety goggles',
    ],
    steps: [
      {
        title: 'Sort and smooth',
        detail: 'Choose shard shapes you like and file any razor edges smooth.',
      },
      {
        title: 'Name them',
        detail: 'Write plant names on the smooth side with a paint pen.',
      },
      {
        title: 'Decorate (optional)',
        detail: 'Glue smaller shards into a mosaic border on a large piece.',
      },
      {
        title: 'Weather-proof',
        detail: 'Seal with a coat of clear outdoor varnish so names survive the rain.',
      },
      {
        title: 'Plant them',
        detail: 'Push each label into the soil, writing side out, buried edge down.',
      },
    ],
    safety: [
      'Wear gloves and goggles while filing — ceramic dust and shards are sharp.',
      'Never snap shards with bare hands.',
    ],
  },
  {
    id: 'rain-bucket',
    title: 'Bucket Into a Rainwater Collector',
    blurb: 'Catch free water from your roof for the garden — mesh included, mosquitoes not.',
    category: 'Garden & Outdoor',
    pathways: ['reuse'],
    difficulty: 'Intermediate',
    time: '~1 hr',
    impact: 'Saves water',
    tags: ['rainwater', 'bucket', 'garden'],
    materials: [
      'A large lidded bucket or bin',
      'Drill with a small bit',
      'Fine mesh (mosquito net or tulle)',
      'Cable ties or tape',
      'A tap or ladle (optional)',
    ],
    steps: [
      {
        title: 'Position it',
        detail:
          'Place the bucket on stable ground beneath a downpipe outlet or the roof’s drip line.',
      },
      {
        title: 'Cut the inlet',
        detail: 'Cut an opening where the water enters, sized to catch the flow.',
      },
      {
        title: 'Mesh every opening',
        detail:
          'Cover the inlet AND drill a small overflow hole near the top, meshed too — standing water breeds mosquitoes.',
      },
      {
        title: 'Add access',
        detail: 'Fit a tap near the bottom, or use a ladle through a meshed lid flap.',
      },
      {
        title: 'Water the garden',
        detail: 'Use collected water for plants only — never for drinking or cooking.',
      },
    ],
    safety: [
      'Mesh every opening — mosquitoes breed in still water within days.',
      'Never drink or cook with collected rainwater.',
      'Secure tall buckets so they can’t tip over on children or pets.',
    ],
  },
]
