import { useState } from "react";

const DAYS = [
  {
    day: 1, date: "Sunday, May 10", icon: "✈️", high: 26, low: 23, rain: 0.1,
    title: "Arrival Night",
    tags: [{ label: "Late Arrival", type: "alert" }],
    activities: [
      { time: "5:20 PM PDT", icon: "✈️", main: "Andrei & Larissa depart YVR — AC519", note: "Ref: C898G4 · Seats Economy G" },
      { time: "5:40 PM PDT", icon: "✈️", main: "Gleb, Zoe & Misha depart YVR — AC519", note: "Ref: A5YSL2 · Seats 12F / 12E · Economy Comfort" },
      { time: "8:45 PM HST", icon: "🛬", main: "Land at HNL — Daniel K. Inouye Airport", note: "Both groups land ~8:40–8:50 PM · Clear customs · Collect bags · Meet at shuttle terminal" },
      { time: "9:00 PM", icon: "🚐", main: "Fly Shuttle & Tours departs HNL", note: "Conf #1746120339 · Host Kevin Tran · All 5 together · $87.96 pre-paid" },
      { time: "9:45 PM", icon: "🏨", main: "Check into Grand Waikikian", note: "1811 Ala Moana Blvd · Res #985178033 · 2BR Unit · 8th floor Arrival Lounge if rooms not ready" },
      { time: "10:30 PM", icon: "😴", main: "Misha to sleep — way past bedtime!", note: "Pre-order DoorDash / Instacart basics before flying · No activities tonight · Get settled" },
    ],
    nap: null,
  },
  {
    day: 2, date: "Monday, May 11", icon: "🌤️", high: 26, low: 23, rain: 0.3,
    title: "Costco Run + Ala Moana + Date Night #1",
    tags: [{ label: "🚙 Jeep Day 1", type: "jeep" }, { label: "🏖️ Beach", type: "beach" }, { label: "💤 Stroller Nap 12:30", type: "nap" }, { label: "💜 Date Night", type: "date" }],
    activities: [
      { time: "6:00 AM", icon: "☀️", main: "Misha up — golden morning on Waikiki", note: "Coffees from hotel · Early stroll on the strip · Best time of day — nearly empty beach" },
      { time: "8:00 AM", icon: "🏊", main: "Hotel pool + Waikiki Beach with Baba & Deda", note: "Misha's first real look at the ocean · Grandparents get oriented · Best light for photos" },
      { time: "11:30 AM", icon: "🚶", main: "Pack up, head toward Ala Moana area", note: "Begin walking toward Jeep pickup — stroller ready for nap" },
      { time: "12:30 PM", icon: "💤", main: "💤 NAP — Stroller walk along Ala Moana waterfront path", note: "Baba & Deda push Misha along the flat shaded coastal path · Asleep within 10 min · Gleb walks 12 min to Jeep pickup at 1 PM · Perfect logistics split ✅", type: "nap" },
      { time: "1:00 PM", icon: "🚙", main: "Jeep Wrangler pickup — 1810 Kapiolani Blvd", note: "Jun Lan · 📞 909-979-7672 · Conf booked Dec 22 · 600 miles included · 2024 Wrangler" },
      { time: "1:30 PM", icon: "🛒", main: "Costco Iwilei — 525 Alakawa St", note: "Stock 2BR kitchen: proteins, breakfast items, fruit, Misha food, beer/wine, sunscreen — huge savings vs. Waikiki" },
      { time: "3:00 PM", icon: "🏖️", main: "Ala Moana Beach Park", note: "Reef-protected lagoon · Zero waves · Lifeguards · Shade trees · Perfect for Misha & grandparents" },
      { time: "5:30 PM", icon: "🐟", main: "Dinner pickup — poke on the way home", note: "Foodland Farms Ala Moana · OR Ono Seafood (spicy salmon + shoyu ahi) · OR Poke on Da Run (poke nachos)" },
      { time: "7:30 PM", icon: "😴", main: "Misha to sleep → Baba & Deda on duty" },
      { time: "8:00 PM", icon: "🌙", main: "💜 DATE NIGHT #1 — Gleb & Zoe", note: "Options: Mai Tai Bar at Royal Hawaiian → Duke's · OR Bar Leather Apron → Skull & Crown · OR The Deck rooftop → Off The Wall self-pour", type: "date" },
    ],
    nap: { method: "🛺 Stroller", note: "Ala Moana waterfront path · Baba & Deda push · Misha asleep in 10 min · Gleb splits to pick up Jeep at 1 PM · Perfect logistics split ✅" },
  },
  {
    day: 3, date: "Tuesday, May 12", icon: "🌤️", high: 25, low: 23, rain: 0.3,
    title: "North Shore — Dole · Turtles · Shrimp · Shave Ice",
    tags: [{ label: "🚙 Jeep Day 2", type: "jeep" }, { label: "⏰ Book Hanauma 10AM PDT", type: "alert" }, { label: "💤 Car Nap 12:30 ⭐", type: "nap" }],
    activities: [
      { time: "6:00 AM", icon: "🌅", main: "Misha up — pack cooler, load the Jeep", note: "Costco snacks, water, sunscreen, hats · Leave early to beat crowds" },
      { time: "6:30 AM", icon: "🚙", main: "Depart for North Shore (1.5 hrs)", note: "Route: H-1 W → H-2 N → Kamehameha Hwy · Misha happy as the sun rises" },
      { time: "8:00 AM", icon: "🍍", main: "Dole Plantation", note: "64-1550 Kamehameha Hwy, Wahiawa · Opens 9:30 AM · Pineapple Express train · Famous Dole Whip · Misha's first frozen treat 🍍" },
      { time: "9:55 AM", icon: "⏰", main: "🚨 HANAUMA BAY BOOKING — 10:00 AM PDT SHARP", note: "Pull over or have Zoe on phone · pros.hnl.info/hanauma-bay · 4 adults + 1 infant · Sells out in under 5 minutes!", type: "alert" },
      { time: "10:15 AM", icon: "🐢", main: "Laniakea Beach — Turtle Beach", note: "Hawaiian green sea turtles come ashore mid-morning · Stay behind rope · Misha will lose her mind 🐢 · Allow 60–75 min" },
      { time: "11:30 AM", icon: "🦐", main: "North Shore shrimp lunch", note: "Giovanni's (garlic butter scampi) · Jenny's (spicy garlic — friend says better!) · Seven Brothers (Spencer burger — 'best burger I've ever had')" },
      { time: "12:15 PM", icon: "🍧", main: "Matsumoto's Shave Ice + Hāleʻiwa stroll", note: "66-111 Kamehameha Hwy · Open 10 AM–6 PM · ORDER: Li Hing Mui + ice cream base · Walk the surf shops with Misha" },
      { time: "12:30 PM", icon: "💤", main: "💤 NAP — Car nap · 1.5 hr highway drive back ⭐ BEST NAP OF THE TRIP", note: "Full belly, tired from turtles + beach · Guaranteed deep sleep on the highway · Arrive home with a refreshed, happy baby", type: "nap" },
      { time: "2:00 PM", icon: "🏨", main: "Back at hotel — transfer Misha if still sleeping", note: "Pool or lanai time for grandparents · Gleb & Zoe decompress from big day" },
      { time: "6:00 PM", icon: "🍳", main: "Dinner at home — Costco cook", note: "Everyone happily exhausted from the big North Shore day" },
    ],
    nap: { method: "🚗 Car (Jeep) ⭐ BEST NAP", note: "1.5 hr highway drive home from North Shore · Full belly + tired from turtles & beach = guaranteed deep sleep ⭐" },
  },
  {
    day: 4, date: "Wednesday, May 13", icon: "🌤️", high: 23, low: 22, rain: 0.1,
    title: "Kailua Beach + Special Family Dinner",
    tags: [{ label: "🚙 Jeep Day 3", type: "jeep" }, { label: "🌊 Kailua Beach", type: "beach" }, { label: "💤 Car Nap 12:30", type: "nap" }, { label: "🍽️ Fine Dining", type: "food" }],
    activities: [
      { time: "6:00 AM", icon: "🌅", main: "Misha up — pack cooler, load Jeep", note: "Coolest & clearest day of the trip · Perfect for Kailua · Leave early to beat the crowds" },
      { time: "6:45 AM", icon: "🚙", main: "Depart via Pali Hwy to Kailua (~35 min)", note: "Scenic mountain pass · Light traffic this early · Misha happy as the sun rises" },
      { time: "7:30 AM", icon: "🌊", main: "Kailua Beach Park", note: "One of Oahu's most beautiful beaches · Powder-white sand · Gentle turquoise surf · Arrive before crowds · Misha will love the calm water · Great photos here" },
      { time: "10:30 AM", icon: "🏖️", main: "Optional: Lanikai Beach detour (~10 min away)", note: "Even more secluded · Stunning turquoise water · Easy with the Jeep" },
      { time: "12:00 PM", icon: "🥗", main: "Lunch at Kalapawai Café", note: "750 Kailua Rd · Local favourite · Great sandwiches and salads · Eat outside" },
      { time: "12:30 PM", icon: "💤", main: "💤 NAP — Car nap · Kailua → Waikiki drive (~35 min)", note: "Full belly + beach morning · Misha asleep as soon as the car moves · Transfer to hotel crib if still sleeping on arrival", type: "nap" },
      { time: "2:00 PM", icon: "🏊", main: "Hotel pool / lanai time", note: "Grandparents relax · Gleb & Zoe decompress" },
      { time: "6:30 PM", icon: "🍽️", main: "Special Family Dinner — book in advance!", note: "Stripsteak Waikiki (Michael Mina) · Nobu Waikiki · Pig and the Lady (ahi toast, bo kho pappardelle — book early!) · Rigo (crostini & bolognese)", type: "date" },
    ],
    nap: { method: "🚗 Car (Jeep)", note: "Kailua → Waikiki 35 min drive right after lunch · Full belly + beach morning = easy sleep · Transfer to crib on arrival if still out" },
  },
  {
    day: 5, date: "Thursday, May 14", icon: "🌦️", high: 25, low: 21, rain: 2.1,
    title: "Hanauma Bay + Jeep Return",
    tags: [{ label: "🔑 Jeep Return 1PM HARD", type: "alert" }, { label: "🤿 Snorkel", type: "beach" }, { label: "💤 Car → Crib 12:30", type: "nap" }],
    activities: [
      { time: "5:30 AM", icon: "⏰", main: "Early wake-up — Misha will be up anyway!", note: "Load car in the dark · Pack snorkel gear, beach shade tent, snacks · $3 cash for parking" },
      { time: "6:15 AM", icon: "🚙", main: "Drive to Hanauma Bay (~25 min)", note: "100 Hanauma Bay Rd, Honolulu" },
      { time: "6:45 AM", icon: "🐠", main: "Hanauma Bay Nature Preserve — opens", note: "Show QR code tickets · Watch mandatory reef video (~20 min) · Grandparents + Misha in the sand shallows · Gleb & Zoe snorkel the inner reef · Reef-safe sunscreen required" },
      { time: "11:00 AM", icon: "🧳", main: "Pack up, head to parking lot", note: "Allow 25 min drive back + buffer for hard Jeep deadline" },
      { time: "12:30 PM", icon: "💤", main: "💤 NAP — Car nap in Jeep · Hanauma Bay → hotel", note: "Full morning at the beach · Misha tired, fed, sun-kissed · Perfect carseat sleep on the drive back · Transfer directly to hotel crib on arrival", type: "nap" },
      { time: "1:00 PM", icon: "🔑", main: "🚨 Return Jeep to Jun — HARD DEADLINE", note: "1810 Kapiolani Blvd · Jun Lan · 📞 909-979-7672 · Text ahead to confirm", type: "alert" },
      { time: "1:15 PM", icon: "🏨", main: "Transfer sleeping Misha to hotel crib · Best handoff of the week", note: "She won't notice the swap · Grandparents on watch · Full 2 hrs uninterrupted crib nap" },
      { time: "2:30 PM", icon: "🥞", main: "Brunch — Gleb & Zoe (grandparents with Misha)", note: "Koko Head Café (Korean-Hawaiian — OpenTable) · Rainbow Drive-In (loco moco, since 1940) · Da Bald Guy (kalbi beef, 6AM–2PM only) · Marugame Udon" },
      { time: "4:00 PM", icon: "🏊", main: "Hotel pool afternoon — full family" },
      { time: "6:30 PM", icon: "🍳", main: "Easy dinner at home from Costco", note: "Quiet evening — big fireworks day tomorrow!" },
    ],
    nap: { method: "🚗 Car → Crib ⭐", note: "Car from Hanauma Bay → hotel · Misha sleeps whole ride · Transfer seamlessly to hotel crib · Best handoff of the week · Grandparents receive sleeping baby" },
  },
  {
    day: 6, date: "Friday, May 15", icon: "🌧️", high: 25, low: 21, rain: 5.6,
    title: "Waikiki Day + Friday Fireworks + Date Night #2",
    tags: [{ label: "🎆 Fireworks Night", type: "fireworks" }, { label: "💤 Stroller Nap 12:30", type: "nap" }, { label: "💜 Date Night", type: "date" }],
    activities: [
      { time: "6:00 AM", icon: "🌊", main: "Early Waikiki Beach walk", note: "Golden hour, near-empty sand · Best photos of the whole trip" },
      { time: "8:30 AM", icon: "🍩", main: "Leonard's Bakery — Malasadas", note: "933 Kapahulu Ave · Open 5:30 AM · ORDER: Original + Cinnamon Sugar · Non-negotiable Hawaii stop" },
      { time: "10:00 AM", icon: "🛍️", main: "Ala Moana Shopping Center", note: "World's largest open-air mall · 5 min walk from hotel · Hawaii gifts, souvenirs, kids stuff" },
      { time: "12:00 PM", icon: "🐟", main: "Poke lunch", note: "Foodland Farms Ala Moana · OR Ono Seafood (spicy salmon + shoyu ahi) · OR Musubi Cafe (cucumber + kimchi musubi)" },
      { time: "12:30 PM", icon: "💤", main: "💤 NAP — Stroller walk, Ala Moana beach path → Magic Island loop", note: "Flat, shaded coastal route · Misha asleep in minutes · ~1.5 hr loop · Grandparents take turns · Gleb & Zoe quiet time on the grass", type: "nap" },
      { time: "2:30 PM", icon: "🍺", main: "Afternoon drinks — hotel pool or nearby", note: "The Deck rooftop happy hour 2–6 PM ⭐ · Off The Wall — pour-your-own beer, wine, mimosas" },
      { time: "6:00 PM", icon: "🍳", main: "Early family dinner at home", note: "Get everyone fed and settled before fireworks · Quick Costco meal" },
      { time: "7:45 PM", icon: "🎆", main: "Friday Night Fireworks — Hilton Hawaiian Village", note: "RIGHT at your hotel beach · Whole family including Misha · Watch from the beach or your lanai · Every Friday · Weather permitting" },
      { time: "8:30 PM", icon: "😴", main: "Misha to sleep → Baba & Deda on duty" },
      { time: "9:00 PM", icon: "🌙", main: "💜 DATE NIGHT #2 — Gleb & Zoe", note: "SKY Waikiki (19th floor, DJ, Diamond Head views) · OR House Without a Key (live Hawaiian music, oceanfront) · OR Pig and the Lady / Katsumidori / Da Seafood Cartel", type: "date" },
    ],
    nap: { method: "🛺 Stroller", note: "Ala Moana beach path → Magic Island loop · Flat, shaded, reliable · Gleb & Zoe quiet time on the grass" },
  },
  {
    day: 7, date: "Saturday, May 16", icon: "🌧️", high: 26, low: 21, rain: 6.3,
    title: "Waikiki Morning + Farewell Dinner",
    tags: [{ label: "⚠️ Wettest Day", type: "alert" }, { label: "🏨 Hotel Crib Nap", type: "nap" }, { label: "🥂 Farewell Dinner", type: "food" }],
    activities: [
      { time: "6:00 AM", icon: "☀️", main: "Final Waikiki morning walk + coffees", note: "Golden hour on the strip · Last slow morning as a family · Grab coffees from hotel" },
      { time: "8:00 AM", icon: "🌊", main: "Waikiki Beach — hotel front", note: "No need to go far · Dig in right at the hotel beach · Misha's favourite familiar sand · Grandparents can easily head back with her" },
      { time: "10:00 AM", icon: "🛍️", main: "Ala Moana Shopping Center", note: "5 min walk from hotel · Last chance for Hawaii gifts, souvenirs, macadamia nuts · Foodland Farms poke counter inside for snacks" },
      { time: "11:30 AM", icon: "🐟", main: "Poke lunch nearby", note: "Foodland Farms Ala Moana · OR Ono Seafood (spicy salmon + shoyu ahi) · OR Musubi Cafe (cucumber + kimchi musubi) · OR Rainbow Drive-In (loco moco)" },
      { time: "12:30 PM", icon: "💤", main: "💤 NAP — Hotel crib · Grand Waikikian", note: "Grandparents take Misha up to the room · Full belly + morning beach = easy crib nap · No stroller needed · No car needed · Simple and reliable", type: "nap" },
      { time: "12:30 PM", icon: "🌴", main: "Gleb & Zoe — while Misha naps at hotel", note: "Options: Hotel pool & lanai 🏊 · Walk Ala Moana waterfront path · Bar Leather Apron afternoon drinks · Off The Wall self-pour bar (Ala Moana) · SKY Waikiki for views · Just relax on Waikiki beach, 2 min from hotel", type: "date" },
      { time: "2:30 PM", icon: "🧳", main: "Start packing — last full afternoon", note: "Get ahead of morning checkout · Lay out everything for Misha's bag first" },
      { time: "4:00 PM", icon: "🏊", main: "Full family pool or beach time — last swim!", note: "Hotel pool right there · No logistics · Misha rested and happy · Great final family photos" },
      { time: "6:00 PM", icon: "🥂", main: "Farewell Family Dinner — book in advance!", note: "Orchids at Halekulani (AAA Five Diamond · 808-518-2019) · Taormina Sicilian (relaxed family) · I-Naba Japanese · Pig and the Lady (if not yet used)", type: "date" },
    ],
    nap: { method: "🏨 Hotel Crib", note: "Grand Waikikian — grandparents take Misha up after lunch · No Jeep, no Uber, no stroller needed · Full belly + morning beach = reliable crib nap · Gleb & Zoe free nearby" },
  },
  {
    day: 8, date: "Sunday, May 17", icon: "🌧️", high: 26, low: 22, rain: 4.8,
    title: "Departure Day",
    tags: [{ label: "🛺 Last Stroller Nap 12:30", type: "nap" }, { label: "✈️ Night Flights", type: "alert" }],
    activities: [
      { time: "6:00 AM", icon: "🌅", main: "Last sunrise run (Gleb) + Zoe & Misha last beach walk" },
      { time: "8:00 AM", icon: "🧳", main: "Final packing" },
      { time: "10:00 AM", icon: "🏨", main: "Hotel check-out — store bags in 8th floor Arrival Lounge", note: "Lounge open 8 AM–6 PM · Check-out hard deadline 10 AM" },
      { time: "11:00 AM", icon: "🏖️", main: "Last Waikiki stroll + final lunch", note: "Eggs 'n Things · OR Ramen Bario at STIX Asia (spicy tonkotsu) · OR Liliha Bakery (spam & eggs / oxtail soup) · OR Musubi Cafe (cucumber + kimchi musubi for the road)" },
      { time: "12:30 PM", icon: "💤", main: "💤 NAP — Final stroller walk · Waikiki → Ala Wai canal path", note: "Misha naps · You soak in the very last hour in paradise · Slow, gentle, perfect", type: "nap" },
      { time: "2:30 PM", icon: "🍩", main: "Leonard's Airport Location — One Last Malasada", note: "540 Lagoon Dr · On the way to HNL · Perfect final Hawaii bite 🍩" },
      { time: "3:00 PM", icon: "🚘", main: "Uber to HNL — Daniel K. Inouye Airport", note: "Allow 45 min + buffer · Both groups head to airport together" },
      { time: "3:45 PM", icon: "🛫", main: "Airport check-in · bags · security · Dinner at HNL" },
      { time: "9:55 PM", icon: "✈️", main: "Andrei & Larissa depart — AC518", note: "Ref: C898G4 · Arrives YVR 06:53+1" },
      { time: "10:05 PM", icon: "✈️", main: "Gleb, Zoe & Misha depart — AC518", note: "Ref: A5YSL2 · Arrives YVR 07:00+1 · Aloha 🌺" },
    ],
    nap: { method: "🛺 Stroller", note: "Final stroller walk · Waikiki → Ala Wai canal path · Misha's last nap in paradise · Slow, gentle, bittersweet" },
  },
];

const FOOD_SECTIONS = [
  {
    key: "breakfast", label: "☀️ Breakfast",
    items: [
      { icon: "🍩", badge: "MUST-DO", btype: "must", name: "Leonard's Bakery", where: "933 Kapahulu Ave · Open 5:30 AM", day: "Day 6 + Day 8", orders: ["Original malasada — warm & powdered", "Cinnamon sugar malasada ⭐", "Custard-filled if available"] },
      { icon: "☕", badge: "FRIEND REC", btype: "friend", name: "Island Vintage Coffee", where: "Waikiki · Ala Moana area", day: "Day 6 morning", orders: ["Acai bowl — best of 3 tested ⭐", "Chicken pesto panini", "⚠️ Expect a wait — worth it"] },
      { icon: "🍳", badge: "FRIEND REC", btype: "friend", name: "Da Bald Guy", where: "Honolulu · ⏰ 6 AM–2 PM only", day: "Day 5 brunch", orders: ["Kalbi beef plate ⭐", "⚠️ May sell out — go early!", "Closed for dinner"] },
      { icon: "🥚", badge: "CLASSIC", btype: "classic", name: "Eggs 'n Things", where: "343 Saratoga Rd, Waikiki", day: "Anytime / Day 8", orders: ["Pancakes with whipped cream 🥞", "Eggs any style plates", "Opens early — good with Misha"] },
      { icon: "☕", badge: "FRIEND REC", btype: "friend", name: "Island Brew Coffee Shop", where: "North Shore · Across from Kona Brewing", day: "Day 3 (North Shore)", orders: ["Amazing ocean views ⭐", "Great local coffee", "Morning stop before shrimp trucks"] },
    ]
  },
  {
    key: "poke", label: "🐟 Poke & Quick",
    items: [
      { icon: "🍣", badge: "RELIABLE", btype: "classic", name: "Foodland Farms Poke", where: "1450 Ala Moana Blvd", day: "Days 2, 6", orders: ["Multiple varieties — always fresh", "Mix-and-match bowls", "Eat on the beach lawn next door"] },
      { icon: "🐟", badge: "FRIEND REC", btype: "friend", name: "Ono Seafood", where: "Honolulu", day: "Days 2, 6", orders: ["Spicy salmon poke ⭐", "Shoyu ahi poke ⭐", "Friend's favourite poke spot 🏆"] },
      { icon: "🌮", badge: "FRIEND REC", btype: "friend", name: "Musubi Cafe Iyasume", where: "Waikiki area", day: "Any day / Day 8", orders: ["Cucumber musubi ⭐", "Kimchi musubi ⭐", "Classic spam musubi"] },
      { icon: "🍜", badge: "FRIEND REC", btype: "friend", name: "Marugame Udon", where: "Waikiki · Multiple locations", day: "Day 5 brunch option", orders: ["Nikutama (beef + egg udon) ⭐", "Chicken katsu udon ⭐", "Shrimp tempura"] },
      { icon: "🍚", badge: "ICONIC", btype: "classic", name: "Rainbow Drive-In", where: "3308 Kanaina Ave · Since 1940", day: "Day 5 brunch option", orders: ["Loco moco — classic plate", "Mac salad + 2 scoops rice", "Mixed plate 🥩"] },
      { icon: "🫙", badge: "FRIEND REC", btype: "friend", name: "Poke on Da Run", where: "Multiple locations", day: "Any day", orders: ["Poke nachos — THE standout item ⭐", "Poke bowls", "Ask for spicy options 🔥"] },
      { icon: "🍙", badge: "FRIEND REC", btype: "friend", name: "Liliha Bakery", where: "Honolulu", day: "Day 8 last meal", orders: ["Spam & eggs plate ⭐", "Oxtail soup ⭐", "Iconic local bakery"] },
    ]
  },
  {
    key: "northshore", label: "🌿 North Shore",
    items: [
      { icon: "🦐", badge: "CLASSIC", btype: "classic", name: "Giovanni's Shrimp Truck", where: "Kahuku, North Shore", day: "Day 3 lunch", orders: ["Garlic butter scampi plate 🧄", "Comes with 2 scoops rice", "Legendary · 30+ years ⭐"] },
      { icon: "🦐", badge: "FRIEND REC ⭐", btype: "friend", name: "Jenny's Shrimp Truck", where: "North Shore strip", day: "Day 3 lunch", orders: ["Spicy garlic shrimp ⭐", "Friend says better than Giovanni's 🏆", "Same area — try both if hungry!"] },
      { icon: "🍔", badge: "FRIEND REC ⭐", btype: "friend", name: "Seven Brothers", where: "Multiple North Shore locations", day: "Day 3", orders: ["Spencer burger ⭐", "\"Best burger I've ever had, bun so good\" 🏆", "Local institution"] },
      { icon: "🍧", badge: "ICONIC", btype: "classic", name: "Matsumoto's Shave Ice", where: "66-111 Kamehameha Hwy, Haleiwa", day: "Day 3 afternoon", orders: ["Li Hing Mui flavor ⭐", "Add ice cream base", "Open 10 AM–6 PM"] },
      { icon: "🍍", badge: "MUST-DO", btype: "must", name: "Dole Plantation", where: "64-1550 Kamehameha Hwy, Wahiawa", day: "Day 3 morning", orders: ["Dole Whip 🍍", "Pineapple Express train", "Misha's first frozen treat!"] },
      { icon: "🥧", badge: "FRIEND REC", btype: "friend", name: "Ted's Bakery", where: "Sunset Beach", day: "Day 3 optional", orders: ["Kalbi plate ⭐", "Chocolate haupia pie", "Open daily"] },
    ]
  },
  {
    key: "dinner", label: "🍽️ Dinners",
    items: [
      { icon: "🥢", badge: "BOOK EARLY", btype: "alert", name: "Pig and the Lady", where: "Chinatown · Hard to get reso", day: "Day 4 or 6", orders: ["Marinated ahi toast ⭐", "Burmese tea leaf salad", "Bo kho pappardelle", "Chicken wings + Brussels sprouts"] },
      { icon: "🥩", badge: "OPENTABLE", btype: "classic", name: "Stripsteak Waikiki", where: "International Market Place · Michael Mina", day: "Day 4 option", orders: ["Signature cocktails ⭐", "Dry-aged steaks", "Reserve on OpenTable"] },
      { icon: "🍱", badge: "CLASSIC", btype: "classic", name: "Nobu Waikiki", where: "2233 Helumoa Rd", day: "Day 4 option", orders: ["Black cod miso ⭐", "Yellowtail jalapeño", "Omakase menu"] },
      { icon: "🌟", badge: "FIVE DIAMOND", btype: "must", name: "Orchids at Halekulani", where: "2199 Kalia Rd · 808-518-2019", day: "Day 7 farewell", orders: ["Oceanfront setting ⭐", "AAA Five Diamond", "Tasting menu experience"] },
      { icon: "🍣", badge: "FRIEND REC", btype: "friend", name: "Katsumidori Sushi", where: "Honolulu · Fish from Japan daily", day: "Date night option", orders: ["Omakase ⭐", "Max Holloway's go-to 🏆", "Great date night sushi"] },
      { icon: "🍝", badge: "FRIEND REC", btype: "friend", name: "Rigo", where: "Honolulu", day: "Day 4 option", orders: ["Crostini ⭐", "Bolognese ⭐", "⚠️ Carbonara is very rich per friend"] },
      { icon: "🦀", badge: "FRIEND REC", btype: "friend", name: "Da Seafood Cartel", where: "Honolulu", day: "Date night option", orders: ["Blue crab dip ⭐", "Ceviche ⭐", "Good date night option"] },
      { icon: "🍜", badge: "FRIEND REC", btype: "friend", name: "Ramen Bario at STIX Asia", where: "Honolulu", day: "Day 8 last meal", orders: ["Spicy tonkotsu ⭐", "Great final meal option", "Friend recommendation"] },
    ]
  },
  {
    key: "bars", label: "🍹 Bars",
    items: [
      { icon: "🏙️", badge: "HAPPY HOUR", btype: "hh", name: "The Deck", where: "Rooftop · Waikiki", day: "Happy Hour 2–6 PM", orders: ["Happy hour 2–6 PM ⏰ ⭐", "Great rooftop views", "Friend rec"] },
      { icon: "🍺", badge: "UNIQUE", btype: "classic", name: "Off The Wall", where: "Ala Moana area", day: "Afternoon", orders: ["Pour-your-own beer, cider, wine ⭐", "Mimosa station", "Great afternoon activity"] },
      { icon: "🍹", badge: "ICONIC", btype: "classic", name: "Mai Tai Bar — Royal Hawaiian", where: "Waikiki Beach · Birthplace of the Mai Tai", day: "Date Night #1", orders: ["Original Mai Tai ⭐", "Oceanfront setting", "Follow with Duke's for round 2"] },
      { icon: "🌺", badge: "LIVE MUSIC", btype: "friend", name: "House Without a Key", where: "Halekulani Hotel · Beachfront", day: "Date Night #2", orders: ["Live Hawaiian music nightly ⭐", "Hula dancers", "Open-air oceanfront bar"] },
      { icon: "🌆", badge: "ROOFTOP", btype: "hh", name: "SKY Waikiki", where: "19th floor · DJ nightly", day: "Date Night #2", orders: ["Panoramic Diamond Head views ⭐", "Handcrafted cocktails", "DJ nightly"] },
      { icon: "🥃", badge: "BEST BAR", btype: "friend", name: "Bar Leather Apron", where: "745 Fort St, Honolulu · Intimate", day: "Date Night #1", orders: ["Honolulu's best cocktail bar 🏆", "Craft cocktails ⭐", "Follow with Skull & Crown"] },
      { icon: "💀", badge: "⚠️ CLOSED SUN/MON", btype: "alert", name: "Skull & Crown Trading Co.", where: "Chinatown · Tue–Sat 5–11 PM", day: "Date Night #1 (not Sun/Mon!)", orders: ["Tiki/tropical cocktails ⭐", "⚠️ CLOSED SUNDAY & MONDAY", "Only Tue–Sat 5–11 PM"] },
    ]
  },
];

const BOOKINGS = [
  { icon: "✈️", type: "confirmed", title: "Flights — Gleb, Zoe & Misha", detail: "AC519 · May 10 · YVR 17:40 → HNL 20:50\nReturn AC518 · May 17 · HNL 22:05 → YVR 07:00+1\nSeats 12F / 12E · Economy Comfort", conf: "Ref: A5YSL2" },
  { icon: "✈️", type: "confirmed", title: "Flights — Andrei & Larissa", detail: "AC519 · May 10 · YVR 17:20 → HNL 20:40\nReturn AC518 · May 17 · HNL 21:55 → YVR 06:53+1\nEconomy G", conf: "Ref: C898G4" },
  { icon: "🏨", type: "confirmed", title: "Grand Waikikian — HGV", detail: "1811 Ala Moana Blvd, Honolulu HI\nCheck-in: May 10 at 4:00 PM · Check-out: May 17 at 10:00 AM\n2-Bedroom Resort Unit · 12,000 Club Points\n🎆 Friday fireworks every week!\nValet $89+tax · Self-park $69+tax/day", conf: "Res: #985178033" },
  { icon: "🚐", type: "confirmed", title: "Airport Shuttle — Fly Shuttle & Tours", detail: "May 10 · Departs HNL 9:00 PM → Waikiki\n4 Adults + 1 Infant · $87.96 USD\nHost: Kevin Tran · Free cancel 24h prior", conf: "Conf: #1746120339" },
  { icon: "🚙", type: "confirmed", title: "Turo — Jun's Jeep Wrangler 2024", detail: "Pickup: May 11 at 1:00 PM\nReturn: May 14 at 1:00 PM — HARD DEADLINE ⚠️\n1810 Kapiolani Blvd, Honolulu\n600 miles included · $351.55 charged May 4\nHost: Jun Lan · 📞 909-979-7672", conf: "Booked Dec 22, 2025" },
  { icon: "🐠", type: "alert", title: "Hanauma Bay — BOOK MAY 12 at 10 AM PDT", detail: "Visit: Thu May 14 · Arrive 6:45 AM HST\nBook opens: Tue May 12 at 10:00 AM PDT SHARP\n4 Adults + 1 Infant (Misha FREE) · ~$102 USD\n⚠️ Sells out in under 5 minutes — SET YOUR ALARM", conf: "pros.hnl.info/hanauma-bay" },
];

const CHECKLIST_NOW = [
  "Book farewell dinner (Day 7) — Orchids or Pig & the Lady fills up fast",
  "Book Koko Head Café brunch (Day 5) on OpenTable",
  "Book fine dinner Day 4 — Stripsteak or Pig & the Lady",
  "⏰ Set Hanauma Bay alarm: May 12 at 10:00 AM PDT → pros.hnl.info/hanauma-bay",
  "Confirm shuttle with Kevin Tran — Conf #1746120339",
  "Text Jun Lan to confirm Jeep — 📞 909-979-7672",
];
const CHECKLIST_FLY = [
  "Pre-order DoorDash / Instacart grocery delivery for May 10 arrival night",
  "Download HNL airport map + Air Canada mobile tickets offline",
  "Buy reef-safe sunscreen (required at Hanauma Bay)",
  "Pack snorkel gear or plan to rent at Hanauma Bay ($12/set)",
  "Pack beach shade tent for Misha",
  "Install Turo app + confirm Jun's Jeep pickup details",
  "Confirm Marriott HGV check-in — Grand Waikikian Res #985178033",
  "Bring $3 cash for Hanauma Bay parking",
];
const CHECKLIST_MISHA = [
  "Lightweight travel stroller (perfect for nap walks)",
  "Travel crib / pack-and-play + fitted sheet",
  "Rash guard (UPF 50+) + swim diaper stash",
  "Wide-brim baby sun hat (non-negotiable)",
  "Baby reef-safe SPF 50 sunscreen",
  "White noise machine or app (hotel rooms can be noisy)",
  "Snacks: puffs, pouches, soft crackers for beach days",
  "Car seat for Jeep (Turo — confirm with Jun ahead)",
  "Favourite sleep toy + sound machine backup",
];

const TAG_COLORS = {
  jeep:      { bg: "rgba(251,191,36,0.13)",  color: "#fbbf24", border: "rgba(251,191,36,0.25)" },
  beach:     { bg: "rgba(56,189,248,0.1)",   color: "#38bdf8", border: "rgba(56,189,248,0.22)" },
  nap:       { bg: "rgba(34,197,94,0.1)",    color: "#4ade80", border: "rgba(34,197,94,0.22)" },
  date:      { bg: "rgba(167,139,250,0.1)",  color: "#a78bfa", border: "rgba(167,139,250,0.22)" },
  food:      { bg: "rgba(251,113,133,0.1)",  color: "#fb7185", border: "rgba(251,113,133,0.22)" },
  alert:     { bg: "rgba(239,68,68,0.1)",    color: "#f87171", border: "rgba(239,68,68,0.22)" },
  fireworks: { bg: "rgba(251,191,36,0.13)",  color: "#fbbf24", border: "rgba(251,191,36,0.25)" },
};

const BADGE_COLORS = {
  must:    { bg: "rgba(34,197,94,0.15)",   color: "#4ade80" },
  friend:  { bg: "rgba(251,113,133,0.15)", color: "#fb7185" },
  hh:      { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24" },
  alert:   { bg: "rgba(239,68,68,0.15)",   color: "#f87171" },
  classic: { bg: "rgba(56,189,248,0.12)",  color: "#38bdf8" },
};

function WeatherBadge({ rain }) {
  if (rain < 1) return <span style={{ color: "#4ade80", fontSize: 11, fontWeight: 700 }}>☀ Clear</span>;
  if (rain < 3) return <span style={{ color: "#fbbf24", fontSize: 11, fontWeight: 700 }}>🌦 Light showers</span>;
  return <span style={{ color: "#f87171", fontSize: 11, fontWeight: 700 }}>🌧 Rain</span>;
}

function Checklist({ items, storageKey }) {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch { return []; }
  });
  const toggle = (i) => {
    const next = checked.includes(i) ? checked.filter(x => x !== i) : [...checked, i];
    setChecked(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((item, i) => (
        <label key={i} onClick={() => toggle(i)} style={{
          display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer",
          padding: "10px 12px", borderRadius: 10,
          background: checked.includes(i) ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${checked.includes(i) ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.06)"}`,
          transition: "all 0.2s",
        }}>
          <div style={{
            width: 17, height: 17, borderRadius: 4, flexShrink: 0, marginTop: 2,
            border: `2px solid ${checked.includes(i) ? "#4ade80" : "rgba(255,255,255,0.18)"}`,
            background: checked.includes(i) ? "#4ade80" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", fontSize: 10, color: "#081525", fontWeight: 900,
          }}>{checked.includes(i) ? "✓" : ""}</div>
          <span style={{
            fontSize: 13, lineHeight: 1.5,
            color: checked.includes(i) ? "rgba(255,255,255,0.28)" : "rgba(240,230,211,0.8)",
            textDecoration: checked.includes(i) ? "line-through" : "none",
            transition: "all 0.2s",
          }}>{item}</span>
        </label>
      ))}
      <div style={{ textAlign: "right", fontSize: 11, color: "rgba(255,255,255,0.22)", marginTop: 4 }}>
        {checked.length}/{items.length} done
      </div>
    </div>
  );
}

export default function HawaiiApp() {
  const [tab, setTab] = useState("schedule");
  const [activeDay, setActiveDay] = useState(0);
  const [foodSection, setFoodSection] = useState("breakfast");

  const day = DAYS[activeDay];

  const tabs = [
    { key: "schedule", label: "📅 Schedule" },
    { key: "naps",     label: "💤 Nap Plan" },
    { key: "food",     label: "🍽️ Food" },
    { key: "bookings", label: "📋 Bookings" },
    { key: "checklist",label: "✅ Checklist" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #081525 0%, #0c2340 45%, #081e38 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#f0e6d3",
    }}>
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse at 75% 15%, rgba(251,191,36,0.05) 0%, transparent 55%), radial-gradient(ellipse at 25% 85%, rgba(56,189,248,0.05) 0%, transparent 55%)",
      }} />

      {/* Header */}
      <div style={{
        position: "relative", zIndex: 1, padding: "22px 20px 16px", textAlign: "center",
        background: "rgba(0,0,0,0.25)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(251,191,36,0.12)",
      }}>
        <div style={{ fontSize: 10, letterSpacing: 5, color: "#fbbf24", textTransform: "uppercase", marginBottom: 4 }}>May 10–17 · 2026</div>
        <h1 style={{
          margin: 0, fontSize: 24, fontWeight: 400, letterSpacing: 0.5,
          background: "linear-gradient(135deg, #fde68a, #fbbf24, #f59e0b)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>🌺 Vaguine Family Hawaii</h1>
        <div style={{ fontSize: 11, color: "rgba(240,230,211,0.42)", marginTop: 4 }}>
          👨 Gleb · 👩 Zoe · 👶 Misha (16 mo.) · 👴 Deda Andrei · 👵 Baba Larissa
        </div>
        <div style={{ fontSize: 10, color: "rgba(240,230,211,0.28)", marginTop: 2 }}>Grand Waikikian · Res #985178033</div>
      </div>

      {/* Nav */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(8,21,37,0.97)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(251,191,36,0.1)",
        display: "flex", overflowX: "auto",
      }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, padding: "11px 4px", border: "none", cursor: "pointer",
            background: tab === t.key ? "rgba(251,191,36,0.09)" : "transparent",
            color: tab === t.key ? "#fbbf24" : "rgba(240,230,211,0.38)",
            fontSize: 11, fontFamily: "'Georgia', serif",
            borderBottom: tab === t.key ? "2px solid #fbbf24" : "2px solid transparent",
            transition: "all 0.2s", whiteSpace: "nowrap", fontWeight: tab === t.key ? 700 : 400,
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "16px 14px 48px" }}>

        {/* ── SCHEDULE ── */}
        {tab === "schedule" && (
          <div>
            <div style={{ display: "flex", gap: 5, overflowX: "auto", paddingBottom: 4, marginBottom: 14 }}>
              {DAYS.map((d, i) => (
                <button key={i} onClick={() => setActiveDay(i)} style={{
                  flexShrink: 0, padding: "6px 11px", borderRadius: 16, border: "none", cursor: "pointer",
                  background: activeDay === i ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : "rgba(255,255,255,0.05)",
                  color: activeDay === i ? "#081525" : "rgba(240,230,211,0.5)",
                  fontSize: 11, fontWeight: activeDay === i ? 700 : 400, fontFamily: "'Georgia', serif",
                  transition: "all 0.2s",
                }}>{d.icon} D{d.day}</button>
              ))}
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(251,191,36,0.12)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{
                padding: "15px 17px", borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "linear-gradient(135deg, rgba(251,191,36,0.09), rgba(251,191,36,0.02))",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: "#fbbf24", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>{day.date}</div>
                    <div style={{ fontSize: 17, fontWeight: 400, lineHeight: 1.3, marginBottom: 8 }}>{day.icon} {day.title}</div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {day.tags.map((tag, i) => {
                        const c = TAG_COLORS[tag.type] || TAG_COLORS.beach;
                        return <span key={i} style={{ padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{tag.label}</span>;
                      })}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#fde68a" }}>{day.high}°C</div>
                    <div style={{ fontSize: 10, color: "rgba(240,230,211,0.32)" }}>{day.low}°C low</div>
                    <div style={{ marginTop: 3 }}><WeatherBadge rain={day.rain} /></div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column" }}>
                {day.activities.map((a, i) => {
                  const isNap   = a.type === "nap";
                  const isAlert = a.type === "alert";
                  const isDate  = a.type === "date";
                  const rowBg    = isNap ? "rgba(34,197,94,0.07)" : isAlert ? "rgba(239,68,68,0.07)" : isDate ? "rgba(167,139,250,0.07)" : "transparent";
                  const timeColor = isNap ? "#4ade80" : isAlert ? "#f87171" : isDate ? "#a78bfa" : "#fbbf24";
                  const mainColor = isDate ? "#c4b5fd" : "rgba(240,230,211,0.88)";
                  return (
                    <div key={i} style={{
                      display: "grid", gridTemplateColumns: "66px 20px 1fr", gap: 9,
                      padding: "8px 7px", borderRadius: 8, margin: "2px 0",
                      background: rowBg,
                      borderLeft: (isNap || isAlert || isDate) ? `3px solid ${timeColor}33` : "none",
                      borderTop: (!isNap && !isAlert && !isDate && i > 0) ? "1px solid rgba(255,255,255,0.04)" : "none",
                    }}>
                      <div style={{ fontSize: 10, color: timeColor, fontWeight: 700, paddingTop: 1, lineHeight: 1.4 }}>{a.time}</div>
                      <div style={{ fontSize: 14 }}>{a.icon}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: mainColor, lineHeight: 1.4 }}>{a.main}</div>
                        {a.note && <div style={{ fontSize: 11, color: "rgba(240,230,211,0.42)", marginTop: 3, lineHeight: 1.5 }}>{a.note}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "rgba(240,230,211,0.28)", textTransform: "uppercase", marginBottom: 8 }}>Week at a glance</div>
              <div style={{ display: "flex", gap: 5, overflowX: "auto" }}>
                {DAYS.map((d, i) => (
                  <div key={i} onClick={() => setActiveDay(i)} style={{
                    flexShrink: 0, textAlign: "center", cursor: "pointer", minWidth: 50,
                    padding: "7px 5px", borderRadius: 10,
                    background: activeDay === i ? "rgba(251,191,36,0.1)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${activeDay === i ? "rgba(251,191,36,0.28)" : "rgba(255,255,255,0.05)"}`,
                    transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: 14 }}>{d.icon}</div>
                    <div style={{ fontSize: 9, color: "rgba(240,230,211,0.3)", marginTop: 2 }}>May {9 + i + 1}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#fde68a", marginTop: 1 }}>{d.high}°</div>
                    <div style={{ fontSize: 9, color: "rgba(240,230,211,0.22)" }}>{d.rain}mm</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── NAP PLAN ── */}
        {tab === "naps" && (
          <div>
            <div style={{ fontSize: 13, color: "rgba(240,230,211,0.48)", marginBottom: 14, lineHeight: 1.6 }}>
              Every day has a nap slot at <strong style={{ color: "#4ade80" }}>12:30 PM</strong>. Method depends on where you are that day.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {DAYS.map((d, i) => (
                <div key={i} style={{
                  padding: "13px 15px", borderRadius: 12,
                  background: d.nap ? "rgba(34,197,94,0.05)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${d.nap ? "rgba(34,197,94,0.16)" : "rgba(255,255,255,0.05)"}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, color: "rgba(240,230,211,0.35)", marginBottom: 3 }}>{d.icon} {d.date}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: d.nap ? "#4ade80" : "rgba(240,230,211,0.4)" }}>
                        {d.nap ? d.nap.method : "No dedicated nap — evening arrival"}
                      </div>
                      {d.nap && <div style={{ fontSize: 12, color: "rgba(186,230,253,0.5)", marginTop: 4, lineHeight: 1.5 }}>{d.nap.note}</div>}
                    </div>
                    <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 700, flexShrink: 0 }}>{d.nap ? "12:30 PM" : "—"}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 18, padding: "14px 16px", borderRadius: 12,
              background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.18)",
            }}>
              <div style={{ fontSize: 10, color: "#fbbf24", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>⭐ Best naps of the trip</div>
              <div style={{ fontSize: 13, color: "rgba(240,230,211,0.65)", lineHeight: 1.7 }}>
                <strong style={{ color: "#fde68a" }}>Day 3 — Car Nap ⭐</strong><br />1.5 hr highway drive from North Shore. Full belly + beach tired = guaranteed deep sleep.<br /><br />
                <strong style={{ color: "#fde68a" }}>Day 5 — Car → Crib ⭐</strong><br />Misha sleeps from Hanauma Bay to hotel, transfers seamlessly to crib. Grandparents receive a sleeping baby. 🙌<br /><br />
                <strong style={{ color: "#fde68a" }}>Day 7 — Hotel Crib</strong><br />No Jeep, no Uber, no stroller. Grandparents take Misha up after lunch — simplest nap of the trip. Gleb & Zoe stay close by.
              </div>
            </div>
          </div>
        )}

        {/* ── FOOD ── */}
        {tab === "food" && (
          <div>
            <div style={{ display: "flex", gap: 5, overflowX: "auto", marginBottom: 14, paddingBottom: 4 }}>
              {FOOD_SECTIONS.map(s => (
                <button key={s.key} onClick={() => setFoodSection(s.key)} style={{
                  flexShrink: 0, padding: "6px 11px", borderRadius: 16, border: "none", cursor: "pointer",
                  background: foodSection === s.key ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : "rgba(255,255,255,0.05)",
                  color: foodSection === s.key ? "#081525" : "rgba(240,230,211,0.5)",
                  fontSize: 11, fontWeight: foodSection === s.key ? 700 : 400, fontFamily: "'Georgia', serif",
                  transition: "all 0.2s",
                }}>{s.label}</button>
              ))}
            </div>

            {FOOD_SECTIONS.filter(s => s.key === foodSection).map(section => (
              <div key={section.key} style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {section.items.map((item, i) => {
                  const bc = BADGE_COLORS[item.btype] || BADGE_COLORS.classic;
                  return (
                    <div key={i} style={{ padding: "13px 15px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
                        <div style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 3 }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#fde68a" }}>{item.name}</span>
                            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 20, background: bc.bg, color: bc.color, letterSpacing: 0.4, textTransform: "uppercase" }}>{item.badge}</span>
                          </div>
                          <div style={{ fontSize: 11, color: "rgba(240,230,211,0.36)", marginBottom: 6 }}>📍 {item.where} · 📅 {item.day}</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {item.orders.map((o, j) => <div key={j} style={{ fontSize: 12, color: "rgba(240,230,211,0.62)", lineHeight: 1.4 }}>→ {o}</div>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            <div style={{
              marginTop: 14, padding: "15px 17px", borderRadius: 14,
              background: "linear-gradient(135deg, rgba(251,191,36,0.09), rgba(245,158,11,0.03))",
              border: "1px solid rgba(251,191,36,0.2)",
            }}>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#fbbf24", textTransform: "uppercase", marginBottom: 5 }}>😂 Highest Conviction Wild Card</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#fde68a" }}>🥖 Jersey Mike's</div>
              <div style={{ fontSize: 11, color: "rgba(240,230,211,0.36)", marginBottom: 7 }}>Multiple Honolulu locations · Any day (seriously)</div>
              <div style={{ fontSize: 12, color: "rgba(240,230,211,0.6)", lineHeight: 1.7 }}>
                → Turkey + provolone<br />→ "Mike's Way" — onion, lettuce, tomato<br />→ Add pickles + jalapeños<br />→ 🏆 Friend's single highest-conviction recommendation
              </div>
            </div>
          </div>
        )}

        {/* ── BOOKINGS ── */}
        {tab === "bookings" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {BOOKINGS.map((b, i) => (
                <div key={i} style={{
                  padding: "13px 15px", borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  borderLeft: `4px solid ${b.type === "confirmed" ? "#4ade80" : "#f87171"}`,
                  border: `1px solid ${b.type === "confirmed" ? "rgba(34,197,94,0.14)" : "rgba(239,68,68,0.22)"}`,
                }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 20, flexShrink: 0 }}>{b.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: b.type === "alert" ? "#fca5a5" : "#fde68a", marginBottom: 5 }}>{b.title}</div>
                      <div style={{ fontSize: 12, color: "rgba(240,230,211,0.5)", lineHeight: 1.65, whiteSpace: "pre-line" }}>{b.detail}</div>
                      <div style={{ marginTop: 7, fontSize: 12, fontWeight: 700, color: b.type === "confirmed" ? "#4ade80" : "#fbbf24", fontFamily: "monospace" }}>{b.conf}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "rgba(240,230,211,0.3)", textTransform: "uppercase", marginBottom: 10 }}>Key Contacts</div>
              {[
                { name: "Jun Lan (Turo Jeep)",     val: "📞 909-979-7672" },
                { name: "Kevin Tran (Shuttle)",    val: "Conf #1746120339" },
                { name: "Orchids at Halekulani",   val: "📞 808-518-2019" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: 13, color: "rgba(240,230,211,0.65)" }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "#fbbf24", fontFamily: "monospace" }}>{c.val}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18, padding: "15px 17px", borderRadius: 14, background: "rgba(239,68,68,0.07)", border: "2px solid rgba(239,68,68,0.28)" }}>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#f87171", textTransform: "uppercase", marginBottom: 5 }}>🚨 Critical Alarm</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fca5a5" }}>Set alarm: May 12 at 10:00 AM PDT</div>
              <div style={{ fontSize: 12, color: "rgba(252,165,165,0.6)", marginTop: 5, lineHeight: 1.65 }}>
                Hanauma Bay tickets go live at midnight HST. Sells out in under 5 minutes.<br />
                Book at pros.hnl.info/hanauma-bay · 4 adults + 1 infant (Misha FREE) · ~$102 USD
              </div>
            </div>
          </div>
        )}

        {/* ── CHECKLIST ── */}
        {tab === "checklist" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#f87171", textTransform: "uppercase", marginBottom: 10 }}>🚨 Do Right Now</div>
              <Checklist items={CHECKLIST_NOW} storageKey="hi_now" />
            </div>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#fbbf24", textTransform: "uppercase", marginBottom: 10 }}>📋 Before You Fly</div>
              <Checklist items={CHECKLIST_FLY} storageKey="hi_fly" />
            </div>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#38bdf8", textTransform: "uppercase", marginBottom: 10 }}>👶 Misha's Pack List</div>
              <Checklist items={CHECKLIST_MISHA} storageKey="hi_misha" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
