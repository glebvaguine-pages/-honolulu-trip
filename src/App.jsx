import { useState } from "react";

// ─── Design tokens ───────────────────────────────────────────────────────────
const C = {
  bg:      "#07101e",
  surface: "rgba(255,255,255,0.04)",
  border:  "rgba(255,255,255,0.08)",
  gold:    "#f0a830",
  green:   "#3dd68c",
  blue:    "#5ba4f5",
  purple:  "#9b7cf8",
  red:     "#f06060",
  text:    "#e8dece",
  t2:      "rgba(232,222,206,0.52)",
  t3:      "rgba(232,222,206,0.28)",
};

const FONT = "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

// ─── Data ────────────────────────────────────────────────────────────────────
const DAYS = [
  {
    day: 1, date: "Sunday, May 10", icon: "✈️", high: 26, low: 23, rain: 0.1,
    title: "Arrival Night",
    tags: [{ label: "Late Arrival", type: "alert" }],
    activities: [
      { time: "5:20 PM PDT", icon: "✈️", main: "Andrei & Larissa depart YVR — AC519", note: "Ref: C898G4 · Economy G" },
      { time: "5:40 PM PDT", icon: "✈️", main: "Gleb, Zoe & Misha depart YVR — AC519", note: "Ref: A5YSL2 · Seats 12F / 12E · Economy Comfort" },
      { time: "8:45 PM HST", icon: "🛬", main: "Land at HNL — Daniel K. Inouye Airport", note: "Clear customs · Collect bags · Meet at shuttle terminal" },
      { time: "9:00 PM", icon: "🚐", main: "Fly Shuttle & Tours departs HNL", note: "Conf #1746120339 · Kevin Tran · All 5 together · $87.96 pre-paid" },
      { time: "9:45 PM", icon: "🏨", main: "Check into Grand Waikikian", note: "1811 Ala Moana Blvd · Res #985178033 · 2BR · 8th floor Lounge if room not ready" },
      { time: "10:30 PM", icon: "😴", main: "Misha to sleep — way past bedtime", note: "Pre-order DoorDash / Instacart basics before flying · No activities tonight" },
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
      { time: "11:30 AM", icon: "🚶", main: "Head toward Ala Moana — stroller ready for nap" },
      { time: "12:30 PM", icon: "💤", main: "NAP — Stroller along Ala Moana waterfront", note: "Baba & Deda push the flat shaded coastal path · Asleep in ~10 min · Gleb walks 12 min to Jeep pickup · 12:30–2:15 PM", type: "nap" },
      { time: "1:00 PM", icon: "🚙", main: "Jeep Wrangler pickup — 1810 Kapiolani Blvd", note: "Jun Lan · 📞 909-979-7672 · 600 miles · 2024 Wrangler" },
      { time: "2:15 PM", icon: "🛒", main: "Costco Iwilei — 525 Alakawa St", note: "Stock 2BR kitchen: proteins, breakfast items, fruit, Misha food, beer/wine, sunscreen" },
      { time: "4:00 PM", icon: "🏖️", main: "Ala Moana Beach Park", note: "Reef-protected lagoon · Zero waves · Lifeguards · Shade trees · Perfect for Misha" },
      { time: "5:30 PM", icon: "🐟", main: "Poke dinner pickup on the way home", note: "Foodland Farms Ala Moana · OR Ono Seafood · OR Poke on Da Run (poke nachos)" },
      { time: "7:30 PM", icon: "😴", main: "Misha to sleep → Baba & Deda on duty" },
      { time: "8:00 PM", icon: "🌙", main: "Date Night #1 — Gleb & Zoe", note: "Mai Tai Bar at Royal Hawaiian → Duke's · OR Bar Leather Apron → Skull & Crown · OR The Deck rooftop", type: "date" },
    ],
    nap: { method: "🛺 Stroller", note: "Ala Moana waterfront path · Baba & Deda push · Misha asleep in ~10 min · 12:30–2:15 PM · Gleb picks up Jeep at 1 PM" },
  },
  {
    day: 3, date: "Tuesday, May 12", icon: "🌤️", high: 25, low: 23, rain: 0.3,
    title: "North Shore — Dole · Turtles · Shrimp · Shave Ice",
    tags: [{ label: "🚙 Jeep Day 2", type: "jeep" }, { label: "⏰ Book Hanauma 10AM PDT", type: "alert" }, { label: "💤 Car Nap 12:30 ⭐", type: "nap" }],
    activities: [
      { time: "6:00 AM", icon: "🌅", main: "Misha up — pack cooler, load the Jeep", note: "Costco snacks, water, sunscreen, hats · Leave early to beat crowds" },
      { time: "6:30 AM", icon: "🚙", main: "Depart for North Shore (1.5 hrs)", note: "H-1 W → H-2 N → Kamehameha Hwy" },
      { time: "8:00 AM", icon: "🍍", main: "Dole Plantation", note: "Opens 9:30 AM · Dole Whip + Pineapple Express train · Misha's first frozen treat 🍍" },
      { time: "9:55 AM", icon: "⏰", main: "HANAUMA BAY BOOKING — 10:00 AM PDT SHARP", note: "Pull over or Zoe on phone · pros.hnl.info/hanauma-bay · 4 adults + 1 infant · Sells out in under 5 min!", type: "alert" },
      { time: "10:15 AM", icon: "🐢", main: "Laniakea Beach — Turtle Beach", note: "Turtles come ashore mid-morning · Stay behind rope · Misha will lose her mind 🐢 · Allow 60–75 min" },
      { time: "11:30 AM", icon: "🦐", main: "North Shore shrimp lunch", note: "Giovanni's (garlic butter scampi) · Jenny's (spicy garlic — friend says better!) · Seven Brothers (Spencer burger)" },
      { time: "12:15 PM", icon: "🍧", main: "Matsumoto's Shave Ice + Hāleʻiwa stroll", note: "ORDER: Li Hing Mui + ice cream base · Walk surf shops with Misha before she naps" },
      { time: "12:30 PM", icon: "💤", main: "NAP — Car nap · 1.5 hr highway drive back ⭐ BEST NAP", note: "Full belly + tired from turtles & beach · Deep sleep on the highway · 12:30–2:00 PM · Arrive home with a refreshed, happy baby", type: "nap" },
      { time: "2:00 PM", icon: "🏨", main: "Back at hotel — transfer Misha if still sleeping", note: "Pool or lanai time for grandparents · Gleb & Zoe decompress" },
      { time: "6:00 PM", icon: "🍳", main: "Dinner at home — Costco cook", note: "Everyone happily exhausted" },
    ],
    nap: { method: "🚗 Car (Jeep) ⭐ BEST NAP", note: "1.5 hr highway drive home from North Shore · Full belly + beach tired = guaranteed deep sleep · 12:30–2:00 PM ⭐" },
  },
  {
    day: 4, date: "Wednesday, May 13", icon: "🌤️", high: 23, low: 22, rain: 0.1,
    title: "Kailua Beach + Pig and the Lady",
    tags: [{ label: "🚙 Jeep Day 3", type: "jeep" }, { label: "🌊 Kailua Beach", type: "beach" }, { label: "💤 Car → Crib 12:30", type: "nap" }, { label: "🐷 P&L 5:15 PM ✓", type: "date" }],
    activities: [
      { time: "6:00 AM", icon: "🌅", main: "Misha up — pack cooler, load Jeep", note: "Coolest & clearest day of the trip · Perfect for Kailua" },
      { time: "6:45 AM", icon: "🚙", main: "Depart via Pali Hwy to Kailua (~35 min)", note: "Scenic mountain pass · Light traffic this early" },
      { time: "7:30 AM", icon: "🌊", main: "Kailua Beach Park", note: "Powder-white sand · Gentle turquoise surf · Misha will love the calm water · Great photos" },
      { time: "10:30 AM", icon: "🏖️", main: "Optional: Lanikai Beach (~10 min away)", note: "Even more secluded · Stunning turquoise water" },
      { time: "11:30 AM", icon: "🥗", main: "Lunch at Kalapawai Café", note: "750 Kailua Rd · Great sandwiches & salads · Eat outside" },
      { time: "12:30 PM", icon: "💤", main: "NAP — Car → Crib · Kailua to hotel (~35 min) then transfer", note: "Full belly + beach morning · Asleep in the car · Transfer to hotel crib on arrival · 12:30–2:15 PM", type: "nap" },
      { time: "2:15 PM", icon: "🏊", main: "Hotel pool / lanai time", note: "Grandparents relax with Misha · Gleb & Zoe decompress from the big beach day" },
      { time: "4:30 PM", icon: "🚿", main: "Get ready — Chinatown dinner tonight" },
      { time: "4:50 PM", icon: "🚕", main: "Uber to Chinatown (~15 min)", note: "Grandparents stay with Misha at hotel" },
      { time: "5:15 PM", icon: "🐷", main: "Pig and the Lady — CONFIRMED RESERVATION", note: "83 N King St, Chinatown · ORDER: Ahi toast ⭐ · Burmese tea leaf salad · Bo kho pappardelle · Chicken wings", type: "date" },
    ],
    nap: { method: "🚗 Car → Crib", note: "35 min Kailua → Waikiki · Misha asleep in the car · Transfer to hotel crib on arrival · 12:30–2:15 PM · Grandparents on duty" },
  },
  {
    day: 5, date: "Thursday, May 14", icon: "🌦️", high: 25, low: 21, rain: 2.1,
    title: "Hanauma Bay + Jeep Return",
    tags: [{ label: "🔑 Jeep Return 1PM HARD", type: "alert" }, { label: "🤿 Snorkel", type: "beach" }, { label: "💤 Car → Crib 12:30", type: "nap" }],
    activities: [
      { time: "5:30 AM", icon: "⏰", main: "Early wake-up — Misha will be up anyway", note: "Pack snorkel gear, beach shade tent, snacks · $3 cash for parking" },
      { time: "6:15 AM", icon: "🚙", main: "Drive to Hanauma Bay (~25 min)", note: "100 Hanauma Bay Rd, Honolulu" },
      { time: "6:45 AM", icon: "🐠", main: "Hanauma Bay Nature Preserve — opens", note: "QR code tickets · Mandatory reef video (~20 min) · Grandparents + Misha in sand shallows · Gleb & Zoe snorkel inner reef · Reef-safe sunscreen required" },
      { time: "11:00 AM", icon: "🧳", main: "Pack up and head to car", note: "Allow 25 min drive + buffer for hard Jeep deadline" },
      { time: "12:30 PM", icon: "💤", main: "NAP — Car → Crib · Hanauma Bay → hotel → transfer", note: "Full morning at the beach · Misha tired, fed, sun-kissed · Asleep in carseat · Transfer to hotel crib on arrival · 12:30–2:15 PM", type: "nap" },
      { time: "1:00 PM", icon: "🔑", main: "Return Jeep to Jun — HARD DEADLINE", note: "1810 Kapiolani Blvd · Jun Lan · 📞 909-979-7672 · Text ahead to confirm", type: "alert" },
      { time: "1:15 PM", icon: "🏨", main: "Transfer sleeping Misha to hotel crib", note: "She won't notice the swap · Grandparents on watch · Sleep through 2:15 PM ✅" },
      { time: "2:30 PM", icon: "🥞", main: "Brunch — Gleb & Zoe (grandparents with Misha)", note: "Koko Head Café (Korean-Hawaiian — OpenTable) · Rainbow Drive-In (loco moco) · Da Bald Guy (kalbi beef, until 2PM) · Marugame Udon" },
      { time: "4:00 PM", icon: "🏊", main: "Hotel pool afternoon — full family" },
      { time: "6:30 PM", icon: "🍳", main: "Easy dinner at home — Costco", note: "Quiet evening · big fireworks day tomorrow!" },
    ],
    nap: { method: "🚗 Car → Crib ⭐", note: "Car from Hanauma Bay → hotel (~25 min) · Misha asleep in carseat · Transfer to hotel crib · Sleep through 2:15 PM · Grandparents receive sleeping baby ✅" },
  },
  {
    day: 6, date: "Friday, May 15", icon: "🌧️", high: 25, low: 21, rain: 5.6,
    title: "Waikiki Day + Friday Fireworks + Date Night #2",
    tags: [{ label: "🎆 Fireworks Night", type: "fireworks" }, { label: "💤 Crib Nap 12:30", type: "nap" }, { label: "💜 Date Night", type: "date" }],
    activities: [
      { time: "6:00 AM", icon: "🌊", main: "Early Waikiki Beach walk", note: "Golden hour, near-empty sand · Best photos of the whole trip" },
      { time: "8:30 AM", icon: "🍩", main: "Leonard's Bakery — Malasadas", note: "933 Kapahulu Ave · Opens 5:30 AM · ORDER: Original + Cinnamon Sugar · Non-negotiable" },
      { time: "10:00 AM", icon: "🛍️", main: "Ala Moana Shopping Center", note: "5 min walk from hotel · Hawaii gifts, souvenirs, kids stuff" },
      { time: "12:00 PM", icon: "🐟", main: "Poke lunch — Ala Moana or hotel area", note: "Foodland Farms Ala Moana · OR Ono Seafood · OR Musubi Cafe" },
      { time: "12:30 PM", icon: "💤", main: "NAP — Hotel crib · Grand Waikikian", note: "Grandparents take Misha up · Full belly + morning out = easy crib nap · 12:30–2:15 PM · Rain day = perfect crib conditions", type: "nap" },
      { time: "12:30 PM", icon: "🌴", main: "Gleb & Zoe — free time while Misha naps", note: "The Deck rooftop happy hour (2–6 PM) ⭐ · Off The Wall self-pour bar · Hotel pool · Just relax nearby", type: "date" },
      { time: "2:30 PM", icon: "🍹", main: "Afternoon drinks — The Deck happy hour starts", note: "2–6 PM happy hour ⭐ · Great rooftop views · OR Off The Wall pour-your-own" },
      { time: "6:00 PM", icon: "🍳", main: "Early family dinner at home", note: "Feed everyone before fireworks · Quick Costco meal" },
      { time: "7:45 PM", icon: "🎆", main: "Friday Night Fireworks — Hilton Hawaiian Village", note: "Right at your hotel beach · Watch from beach or lanai · Every Friday · Weather permitting" },
      { time: "8:30 PM", icon: "😴", main: "Misha to sleep → Baba & Deda on duty" },
      { time: "9:00 PM", icon: "🌙", main: "Date Night #2 — Gleb & Zoe", note: "SKY Waikiki (19th floor, DJ, Diamond Head views) · OR House Without a Key (live Hawaiian, oceanfront) · OR Katsumidori Sushi · Da Seafood Cartel", type: "date" },
    ],
    nap: { method: "🏨 Hotel Crib", note: "Grand Waikikian · Grandparents take Misha up after lunch · 12:30–2:15 PM · Rainy day = ideal crib nap · Gleb & Zoe free nearby" },
  },
  {
    day: 7, date: "Saturday, May 16", icon: "🌧️", high: 26, low: 21, rain: 6.3,
    title: "Waikiki Morning + Farewell Dinner",
    tags: [{ label: "⚠️ Wettest Day", type: "alert" }, { label: "💤 Crib Nap 12:30", type: "nap" }, { label: "🥂 Farewell Dinner", type: "food" }],
    activities: [
      { time: "6:00 AM", icon: "☀️", main: "Final Waikiki morning walk + coffees", note: "Last slow morning as a family · Golden hour on the strip" },
      { time: "8:00 AM", icon: "🌊", main: "Waikiki Beach — hotel front", note: "Dig in right at the hotel · Misha's familiar sand · Grandparents can easily head back with her" },
      { time: "10:00 AM", icon: "🛍️", main: "Ala Moana Shopping Center", note: "Last chance for gifts, souvenirs, macadamia nuts · 5 min walk from hotel" },
      { time: "11:30 AM", icon: "🐟", main: "Poke lunch nearby", note: "Foodland Farms Ala Moana · OR Ono Seafood · OR Musubi Cafe · OR Rainbow Drive-In" },
      { time: "12:30 PM", icon: "💤", main: "NAP — Hotel crib · Grand Waikikian", note: "Grandparents take Misha up · Full belly + morning beach = reliable crib nap · 12:30–2:15 PM · No Jeep, no stroller, no logistics", type: "nap" },
      { time: "12:30 PM", icon: "🌴", main: "Gleb & Zoe — while Misha naps", note: "Hotel pool & lanai · Bar Leather Apron · Off The Wall · SKY Waikiki · Waikiki beach (2 min from hotel)", type: "date" },
      { time: "2:30 PM", icon: "🧳", main: "Start packing — last full afternoon", note: "Get ahead of 10 AM checkout · Lay out Misha's bag first" },
      { time: "4:00 PM", icon: "🏊", main: "Full family pool or beach — last swim!", note: "No logistics · Misha rested and happy · Great final family photos" },
      { time: "6:30 PM", icon: "🥂", main: "Farewell Family Dinner — book in advance!", note: "Orchids at Halekulani (AAA Five Diamond · 808-518-2019) · Taormina Sicilian · I-Naba Japanese", type: "date" },
    ],
    nap: { method: "🏨 Hotel Crib", note: "Grand Waikikian · Grandparents take Misha up after lunch · 12:30–2:15 PM · No Jeep, no Uber, no stroller · Simplest nap of the trip" },
  },
  {
    day: 8, date: "Sunday, May 17", icon: "🌧️", high: 26, low: 22, rain: 4.8,
    title: "Departure Day",
    tags: [{ label: "🛺 Last Stroller Nap 12:30", type: "nap" }, { label: "✈️ Night Flights", type: "alert" }],
    activities: [
      { time: "6:00 AM", icon: "🌅", main: "Last sunrise run (Gleb) + Zoe & Misha last beach walk" },
      { time: "8:00 AM", icon: "🧳", main: "Final packing" },
      { time: "10:00 AM", icon: "🏨", main: "Hotel check-out — store bags in 8th floor Arrival Lounge", note: "Lounge open 8 AM–6 PM · Checkout hard deadline 10 AM" },
      { time: "11:00 AM", icon: "🏖️", main: "Last Waikiki stroll + final lunch", note: "Eggs 'n Things · OR Liliha Bakery (spam & eggs / oxtail soup) · OR Musubi Cafe for the road" },
      { time: "12:30 PM", icon: "💤", main: "NAP — Final stroller walk · Waikiki → Ala Wai canal", note: "Misha naps · You soak in the last hour in paradise · 12:30–2:15 PM · Slow, gentle, perfect", type: "nap" },
      { time: "2:15 PM", icon: "🍩", main: "Leonard's Airport Location — One Last Malasada", note: "540 Lagoon Dr · On the way to HNL · Perfect final Hawaii bite 🍩" },
      { time: "3:00 PM", icon: "🚘", main: "Uber to HNL — Daniel K. Inouye Airport", note: "Allow 45 min + buffer · Both groups together" },
      { time: "3:45 PM", icon: "🛫", main: "Airport check-in · bags · security · Dinner at HNL" },
      { time: "9:55 PM", icon: "✈️", main: "Andrei & Larissa depart — AC518", note: "Ref: C898G4 · Arrives YVR 06:53+1" },
      { time: "10:05 PM", icon: "✈️", main: "Gleb, Zoe & Misha depart — AC518", note: "Ref: A5YSL2 · Arrives YVR 07:00+1 · Aloha 🌺" },
    ],
    nap: { method: "🛺 Stroller", note: "Final walk · Waikiki → Ala Wai canal path · 12:30–2:15 PM · Misha's last nap in paradise · Slow, gentle, bittersweet" },
  },
];

const FOOD_SECTIONS = [
  {
    key: "breakfast", label: "☀️ Breakfast",
    items: [
      { icon: "🍩", badge: "MUST-DO", btype: "must", name: "Leonard's Bakery", where: "933 Kapahulu Ave · Open 5:30 AM", day: "Day 6 + Day 8", orders: ["Original malasada — warm & powdered", "Cinnamon sugar malasada ⭐", "Custard-filled if available"] },
      { icon: "☕", badge: "FRIEND REC", btype: "friend", name: "Island Vintage Coffee", where: "Waikiki · Ala Moana area", day: "Any morning", orders: ["Acai bowl — best of 3 tested ⭐", "Chicken pesto panini", "⚠️ Expect a wait — worth it"] },
      { icon: "🍳", badge: "FRIEND REC", btype: "friend", name: "Da Bald Guy", where: "Honolulu · ⏰ 6 AM–2 PM only", day: "Day 5 brunch", orders: ["Kalbi beef plate ⭐", "⚠️ May sell out — go early", "Closed for dinner"] },
      { icon: "🥚", badge: "CLASSIC", btype: "classic", name: "Eggs 'n Things", where: "343 Saratoga Rd, Waikiki", day: "Anytime / Day 8", orders: ["Pancakes with whipped cream 🥞", "Eggs any style", "Opens early — great with Misha"] },
      { icon: "☕", badge: "FRIEND REC", btype: "friend", name: "Island Brew Coffee Shop", where: "North Shore · Across from Kona Brewing", day: "Day 3", orders: ["Amazing ocean views ⭐", "Great local coffee", "Morning stop before shrimp trucks"] },
    ]
  },
  {
    key: "poke", label: "🐟 Poke & Quick",
    items: [
      { icon: "🍣", badge: "RELIABLE", btype: "classic", name: "Foodland Farms Poke", where: "1450 Ala Moana Blvd", day: "Days 2, 6, 7", orders: ["Multiple varieties — always fresh", "Mix-and-match bowls", "Eat on the beach lawn next door"] },
      { icon: "🐟", badge: "FRIEND REC", btype: "friend", name: "Ono Seafood", where: "Honolulu", day: "Days 2, 6", orders: ["Spicy salmon poke ⭐", "Shoyu ahi poke ⭐", "Friend's favourite poke spot 🏆"] },
      { icon: "🌮", badge: "FRIEND REC", btype: "friend", name: "Musubi Cafe Iyasume", where: "Waikiki area", day: "Any day / Day 8", orders: ["Cucumber musubi ⭐", "Kimchi musubi ⭐", "Classic spam musubi"] },
      { icon: "🍜", badge: "FRIEND REC", btype: "friend", name: "Marugame Udon", where: "Waikiki · Multiple locations", day: "Day 5 brunch option", orders: ["Nikutama (beef + egg udon) ⭐", "Chicken katsu udon ⭐", "Shrimp tempura"] },
      { icon: "🍚", badge: "ICONIC", btype: "classic", name: "Rainbow Drive-In", where: "3308 Kanaina Ave · Since 1940", day: "Day 5 or 8", orders: ["Loco moco — classic plate", "Mac salad + 2 scoops rice", "Mixed plate 🥩"] },
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
      { icon: "🐷", badge: "CONFIRMED ✓", btype: "must", name: "Pig and the Lady", where: "83 N King St, Chinatown", day: "Day 4 — May 13 · 5:15 PM", orders: ["Marinated ahi toast ⭐", "Burmese tea leaf salad", "Bo kho pappardelle ⭐", "Chicken wings + Brussels sprouts"] },
      { icon: "🌟", badge: "FIVE DIAMOND", btype: "must", name: "Orchids at Halekulani", where: "2199 Kalia Rd · 808-518-2019", day: "Day 7 farewell", orders: ["Oceanfront setting ⭐", "AAA Five Diamond", "Tasting menu experience"] },
      { icon: "🥩", badge: "OPENTABLE", btype: "classic", name: "Stripsteak Waikiki", where: "International Market Place · Michael Mina", day: "Option if needed", orders: ["Signature cocktails ⭐", "Dry-aged steaks", "Reserve on OpenTable"] },
      { icon: "🍱", badge: "CLASSIC", btype: "classic", name: "Nobu Waikiki", where: "2233 Helumoa Rd", day: "Option if needed", orders: ["Black cod miso ⭐", "Yellowtail jalapeño", "Omakase menu"] },
      { icon: "🍣", badge: "FRIEND REC", btype: "friend", name: "Katsumidori Sushi", where: "Honolulu · Fish from Japan daily", day: "Date night option", orders: ["Omakase ⭐", "Max Holloway's go-to 🏆", "Great date night"] },
      { icon: "🍝", badge: "FRIEND REC", btype: "friend", name: "Rigo", where: "Honolulu", day: "Option", orders: ["Crostini ⭐", "Bolognese ⭐", "⚠️ Carbonara is very rich per friend"] },
      { icon: "🦀", badge: "FRIEND REC", btype: "friend", name: "Da Seafood Cartel", where: "Honolulu", day: "Date night option", orders: ["Blue crab dip ⭐", "Ceviche ⭐", "Good date night"] },
      { icon: "🍜", badge: "FRIEND REC", btype: "friend", name: "Ramen Bario at STIX Asia", where: "Honolulu", day: "Day 8 last meal", orders: ["Spicy tonkotsu ⭐", "Great final meal option"] },
    ]
  },
  {
    key: "bars", label: "🍹 Bars",
    items: [
      { icon: "🏙️", badge: "HAPPY HOUR", btype: "hh", name: "The Deck", where: "Rooftop · Waikiki", day: "2–6 PM any day", orders: ["Happy hour 2–6 PM ⏰ ⭐", "Great rooftop views"] },
      { icon: "🍺", badge: "UNIQUE", btype: "classic", name: "Off The Wall", where: "Ala Moana area", day: "Afternoon", orders: ["Pour-your-own beer, cider, wine ⭐", "Mimosa station", "Great afternoon activity"] },
      { icon: "🍹", badge: "ICONIC", btype: "classic", name: "Mai Tai Bar — Royal Hawaiian", where: "Waikiki Beach · Birthplace of the Mai Tai", day: "Date Night #1", orders: ["Original Mai Tai ⭐", "Oceanfront setting", "Follow with Duke's for round 2"] },
      { icon: "🌺", badge: "LIVE MUSIC", btype: "friend", name: "House Without a Key", where: "Halekulani Hotel · Beachfront", day: "Date Night #2", orders: ["Live Hawaiian music nightly ⭐", "Hula dancers", "Open-air oceanfront bar"] },
      { icon: "🌆", badge: "ROOFTOP", btype: "hh", name: "SKY Waikiki", where: "19th floor · DJ nightly", day: "Date Night #2", orders: ["Panoramic Diamond Head views ⭐", "Handcrafted cocktails", "DJ nightly"] },
      { icon: "🥃", badge: "BEST BAR", btype: "friend", name: "Bar Leather Apron", where: "745 Fort St, Honolulu", day: "Date Night #1", orders: ["Honolulu's best cocktail bar 🏆", "Craft cocktails ⭐", "Follow with Skull & Crown"] },
      { icon: "💀", badge: "TUE–SAT ONLY", btype: "alert", name: "Skull & Crown Trading Co.", where: "Chinatown · Tue–Sat 5–11 PM", day: "Date Night #1 (not Sun/Mon!)", orders: ["Tiki cocktails ⭐", "⚠️ CLOSED SUNDAY & MONDAY", "Tue–Sat 5–11 PM only"] },
    ]
  },
];

const BOOKINGS = [
  { icon: "✈️", type: "confirmed", title: "Flights — Gleb, Zoe & Misha", detail: "AC519 · May 10 · YVR 17:40 → HNL 20:50\nReturn AC518 · May 17 · HNL 22:05 → YVR 07:00+1\nSeats 12F / 12E · Economy Comfort", conf: "Ref: A5YSL2" },
  { icon: "✈️", type: "confirmed", title: "Flights — Andrei & Larissa", detail: "AC519 · May 10 · YVR 17:20 → HNL 20:40\nReturn AC518 · May 17 · HNL 21:55 → YVR 06:53+1\nEconomy G", conf: "Ref: C898G4" },
  { icon: "🏨", type: "confirmed", title: "Grand Waikikian — HGV", detail: "1811 Ala Moana Blvd, Honolulu HI\nCheck-in: May 10 at 4 PM · Check-out: May 17 at 10 AM\n2-Bedroom Resort Unit · 12,000 Club Points\n🎆 Friday fireworks every week!\nValet $89+tax · Self-park $69+tax/day", conf: "Res: #985178033" },
  { icon: "🚐", type: "confirmed", title: "Airport Shuttle — Fly Shuttle & Tours", detail: "May 10 · Departs HNL 9:00 PM → Waikiki\n4 Adults + 1 Infant · $87.96 USD\nHost: Kevin Tran · Free cancel 24h prior", conf: "Conf: #1746120339" },
  { icon: "🚙", type: "confirmed", title: "Turo — Jun's Jeep Wrangler 2024", detail: "Pickup: May 11 at 1:00 PM\nReturn: May 14 at 1:00 PM — HARD DEADLINE ⚠️\n1810 Kapiolani Blvd, Honolulu\n600 miles included · $351.55 charged May 4\nHost: Jun Lan · 📞 909-979-7672", conf: "Booked Dec 22, 2025" },
  { icon: "🐷", type: "confirmed", title: "Pig and the Lady — May 13", detail: "83 N King St, Chinatown, Honolulu\nWednesday May 13 · 5:15 PM\nGleb & Zoe · Grandparents stay with Misha", conf: "Reservation confirmed ✓" },
  { icon: "🐠", type: "alert", title: "Hanauma Bay — BOOK MAY 12 at 10 AM PDT", detail: "Visit: Thu May 14 · Arrive 6:45 AM HST\nBook opens: Tue May 12 at 10:00 AM PDT SHARP\n4 Adults + 1 Infant (Misha FREE) · ~$102 USD\n⚠️ Sells out in under 5 minutes — SET YOUR ALARM", conf: "pros.hnl.info/hanauma-bay" },
];

const CHECKLIST_NOW = [
  "Book farewell dinner (Day 7) — Orchids at Halekulani fills up fast · 808-518-2019",
  "Book Koko Head Café brunch (Day 5) on OpenTable",
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
  "Lightweight travel stroller (nap walks on Days 2, 8)",
  "Travel crib / pack-and-play + fitted sheet",
  "Rash guard (UPF 50+) + swim diaper stash",
  "Wide-brim baby sun hat (non-negotiable)",
  "Baby reef-safe SPF 50 sunscreen",
  "White noise machine or app",
  "Snacks: puffs, pouches, soft crackers for beach days",
  "Car seat for Jeep (Turo — confirm with Jun ahead)",
  "Favourite sleep toy + sound machine backup",
];

// ─── Tag & Badge colour maps ──────────────────────────────────────────────────
const TAG_COLORS = {
  jeep:      { bg: `rgba(240,168,48,0.12)`,  color: C.gold,   border: `rgba(240,168,48,0.25)` },
  beach:     { bg: `rgba(91,164,245,0.10)`,  color: C.blue,   border: `rgba(91,164,245,0.22)` },
  nap:       { bg: `rgba(61,214,140,0.10)`,  color: C.green,  border: `rgba(61,214,140,0.22)` },
  date:      { bg: `rgba(155,124,248,0.10)`, color: C.purple, border: `rgba(155,124,248,0.22)` },
  food:      { bg: `rgba(240,96,96,0.10)`,   color: C.red,    border: `rgba(240,96,96,0.22)` },
  alert:     { bg: `rgba(240,96,96,0.10)`,   color: C.red,    border: `rgba(240,96,96,0.22)` },
  fireworks: { bg: `rgba(240,168,48,0.12)`,  color: C.gold,   border: `rgba(240,168,48,0.25)` },
};

const BADGE_COLORS = {
  must:    { bg: `rgba(61,214,140,0.15)`,   color: C.green },
  friend:  { bg: `rgba(240,96,96,0.13)`,    color: "#f87a7a" },
  hh:      { bg: `rgba(240,168,48,0.14)`,   color: C.gold },
  alert:   { bg: `rgba(240,96,96,0.13)`,    color: C.red },
  classic: { bg: `rgba(91,164,245,0.12)`,   color: C.blue },
};

// ─── Small components ─────────────────────────────────────────────────────────
function WeatherBadge({ rain }) {
  if (rain < 1) return <span style={{ color: C.green,  fontSize: 12, fontWeight: 600 }}>☀ Clear</span>;
  if (rain < 3) return <span style={{ color: C.gold,   fontSize: 12, fontWeight: 600 }}>🌦 Light rain</span>;
  return           <span style={{ color: C.red,    fontSize: 12, fontWeight: 600 }}>🌧 Rain</span>;
}

function Tag({ tag }) {
  const c = TAG_COLORS[tag.type] || TAG_COLORS.beach;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600,
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
      whiteSpace: "nowrap",
    }}>{tag.label}</span>
  );
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
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {items.map((item, i) => (
        <div key={i} onClick={() => toggle(i)} style={{
          display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer",
          padding: "11px 14px", borderRadius: 10,
          background: checked.includes(i) ? "rgba(61,214,140,0.05)" : C.surface,
          border: `1px solid ${checked.includes(i) ? "rgba(61,214,140,0.2)" : C.border}`,
          transition: "all 0.15s",
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
            border: `2px solid ${checked.includes(i) ? C.green : "rgba(255,255,255,0.2)"}`,
            background: checked.includes(i) ? C.green : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s", fontSize: 10, color: "#07101e", fontWeight: 800,
          }}>{checked.includes(i) ? "✓" : ""}</div>
          <span style={{
            fontSize: 13, lineHeight: 1.55,
            color: checked.includes(i) ? "rgba(232,222,206,0.3)" : C.text,
            textDecoration: checked.includes(i) ? "line-through" : "none",
            transition: "all 0.15s",
          }}>{item}</span>
        </div>
      ))}
      <div style={{ textAlign: "right", fontSize: 12, color: C.t3, marginTop: 4, paddingRight: 2 }}>
        {checked.length} / {items.length} done
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function HawaiiApp() {
  const [tab, setTab] = useState("schedule");
  const [activeDay, setActiveDay] = useState(0);
  const [foodSection, setFoodSection] = useState("breakfast");

  const day = DAYS[activeDay];

  const tabs = [
    { key: "schedule",  label: "Schedule" },
    { key: "naps",      label: "Nap Plan" },
    { key: "food",      label: "Food" },
    { key: "bookings",  label: "Bookings" },
    { key: "checklist", label: "Checklist" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT, color: C.text }}>

      {/* ── Header ── */}
      <div style={{
        padding: "28px 20px 20px", textAlign: "center",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: C.t3, textTransform: "uppercase", marginBottom: 8 }}>
          May 10 – 17 · 2026
        </div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: C.gold, letterSpacing: -0.3 }}>
          🌺 Vaguine Family Hawaii
        </h1>
        <div style={{ fontSize: 13, color: C.t2, marginTop: 8, lineHeight: 1.7 }}>
          Gleb · Zoe · Misha (16 mo.) · Deda Andrei · Baba Larissa
        </div>
        <div style={{ fontSize: 11, color: C.t3, marginTop: 3 }}>Grand Waikikian · Res #985178033</div>
      </div>

      {/* ── Nav ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: C.bg, borderBottom: `1px solid ${C.border}`,
        display: "flex", overflowX: "auto",
      }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, padding: "13px 8px", border: "none", cursor: "pointer",
            background: "transparent",
            color: tab === t.key ? C.gold : C.t2,
            fontSize: 12, fontFamily: FONT, fontWeight: tab === t.key ? 600 : 400,
            borderBottom: `2px solid ${tab === t.key ? C.gold : "transparent"}`,
            transition: "all 0.15s", whiteSpace: "nowrap",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px 60px" }}>

        {/* ────── SCHEDULE ────── */}
        {tab === "schedule" && (
          <div>
            {/* Day selector */}
            <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 18 }}>
              {DAYS.map((d, i) => (
                <button key={i} onClick={() => setActiveDay(i)} style={{
                  flexShrink: 0, padding: "6px 13px", borderRadius: 99, cursor: "pointer",
                  background: activeDay === i ? C.gold : C.surface,
                  color: activeDay === i ? "#07101e" : C.t2,
                  fontSize: 12, fontWeight: activeDay === i ? 700 : 400, fontFamily: FONT,
                  border: `1px solid ${activeDay === i ? C.gold : C.border}`,
                  transition: "all 0.15s",
                }}>{d.icon} D{d.day}</button>
              ))}
            </div>

            {/* Day card */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
              {/* Day header */}
              <div style={{ padding: "18px 20px 16px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: C.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{day.date}</div>
                    <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3, marginBottom: 12, color: C.text }}>{day.icon} {day.title}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {day.tags.map((tag, i) => <Tag key={i} tag={tag} />)}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: C.gold }}>{day.high}°</div>
                    <div style={{ fontSize: 11, color: C.t3 }}>{day.low}° low</div>
                    <div style={{ marginTop: 4 }}><WeatherBadge rain={day.rain} /></div>
                  </div>
                </div>
              </div>

              {/* Activity timeline */}
              <div style={{ padding: "8px 0" }}>
                {day.activities.map((a, i) => {
                  const isNap   = a.type === "nap";
                  const isAlert = a.type === "alert";
                  const isDate  = a.type === "date";
                  const accent  = isNap ? C.green : isAlert ? C.red : isDate ? C.purple : null;
                  const timeCol = accent || C.gold;

                  return (
                    <div key={i} style={{
                      display: "grid", gridTemplateColumns: "72px 26px 1fr",
                      gap: 8, padding: "10px 20px",
                      background: accent ? `${accent}08` : "transparent",
                      borderLeft: accent ? `3px solid ${accent}30` : "3px solid transparent",
                      borderTop: (!accent && i > 0) ? `1px solid ${C.border}` : "none",
                    }}>
                      <div style={{ fontSize: 11, color: timeCol, fontWeight: 600, paddingTop: 1, lineHeight: 1.4 }}>
                        {a.time}
                      </div>
                      <div style={{ fontSize: 15, lineHeight: 1 }}>{a.icon}</div>
                      <div>
                        <div style={{
                          fontSize: 13, fontWeight: 500, lineHeight: 1.4,
                          color: isDate ? "#c4aff8" : C.text,
                        }}>{a.main}</div>
                        {a.note && (
                          <div style={{ fontSize: 12, color: C.t2, marginTop: 4, lineHeight: 1.55 }}>
                            {a.note}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Week glance */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11, color: C.t3, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
                Week at a glance
              </div>
              <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
                {DAYS.map((d, i) => (
                  <div key={i} onClick={() => setActiveDay(i)} style={{
                    flexShrink: 0, textAlign: "center", cursor: "pointer", minWidth: 52,
                    padding: "8px 6px", borderRadius: 10,
                    background: activeDay === i ? `rgba(240,168,48,0.1)` : C.surface,
                    border: `1px solid ${activeDay === i ? `rgba(240,168,48,0.35)` : C.border}`,
                    transition: "all 0.15s",
                  }}>
                    <div style={{ fontSize: 15 }}>{d.icon}</div>
                    <div style={{ fontSize: 10, color: C.t3, marginTop: 3 }}>May {9 + i + 1}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, marginTop: 2 }}>{d.high}°</div>
                    <div style={{ fontSize: 10, color: C.t3 }}>{d.rain}mm</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ────── NAP PLAN ────── */}
        {tab === "naps" && (
          <div>
            <p style={{ fontSize: 13, color: C.t2, marginBottom: 18, lineHeight: 1.65, marginTop: 0 }}>
              Every day targets a nap window of{" "}
              <strong style={{ color: C.green }}>12:30 – 2:15 PM</strong>.
              Method depends on location — crib whenever possible.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {DAYS.map((d, i) => (
                <div key={i} style={{
                  padding: "14px 16px", borderRadius: 12,
                  background: d.nap ? `rgba(61,214,140,0.05)` : C.surface,
                  border: `1px solid ${d.nap ? "rgba(61,214,140,0.18)" : C.border}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: C.t3, marginBottom: 4 }}>{d.icon} {d.date}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: d.nap ? C.green : C.t2 }}>
                        {d.nap ? d.nap.method : "No nap — late arrival night"}
                      </div>
                      {d.nap && (
                        <div style={{ fontSize: 12, color: C.t2, marginTop: 5, lineHeight: 1.6 }}>
                          {d.nap.note}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: C.green, fontWeight: 600, flexShrink: 0, whiteSpace: "nowrap" }}>
                      {d.nap ? "12:30–2:15" : "—"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 20, padding: "16px 18px", borderRadius: 12,
              background: `rgba(240,168,48,0.06)`, border: `1px solid rgba(240,168,48,0.2)`,
            }}>
              <div style={{ fontSize: 11, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>
                ⭐ Best naps of the trip
              </div>
              <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.75 }}>
                <strong style={{ color: C.text }}>Day 3 — Car Nap ⭐</strong><br />
                1.5 hr highway drive from North Shore. Full belly + beach tired = guaranteed deep sleep on the highway.<br /><br />
                <strong style={{ color: C.text }}>Day 5 — Car → Crib ⭐</strong><br />
                Misha sleeps from Hanauma Bay all the way to the hotel crib. Grandparents receive a sleeping baby. 🙌<br /><br />
                <strong style={{ color: C.text }}>Days 6 & 7 — Hotel Crib</strong><br />
                No car, no stroller. Grandparents take her upstairs right after lunch. Simplest, most reliable nap of the trip — and back near the hotel both days.
              </div>
            </div>
          </div>
        )}

        {/* ────── FOOD ────── */}
        {tab === "food" && (
          <div>
            {/* Category tabs */}
            <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 18, paddingBottom: 2 }}>
              {FOOD_SECTIONS.map(s => (
                <button key={s.key} onClick={() => setFoodSection(s.key)} style={{
                  flexShrink: 0, padding: "7px 14px", borderRadius: 99, cursor: "pointer",
                  background: foodSection === s.key ? C.gold : C.surface,
                  color: foodSection === s.key ? "#07101e" : C.t2,
                  fontSize: 12, fontWeight: foodSection === s.key ? 700 : 400, fontFamily: FONT,
                  border: `1px solid ${foodSection === s.key ? C.gold : C.border}`,
                  transition: "all 0.15s",
                }}>{s.label}</button>
              ))}
            </div>

            {FOOD_SECTIONS.filter(s => s.key === foodSection).map(section => (
              <div key={section.key} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {section.items.map((item, i) => {
                  const bc = BADGE_COLORS[item.btype] || BADGE_COLORS.classic;
                  return (
                    <div key={i} style={{
                      padding: "14px 16px", borderRadius: 12,
                      background: C.surface, border: `1px solid ${C.border}`,
                    }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ fontSize: 22, flexShrink: 0, lineHeight: 1 }}>{item.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{item.name}</span>
                            <span style={{
                              fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
                              background: bc.bg, color: bc.color, textTransform: "uppercase", letterSpacing: 0.5,
                            }}>{item.badge}</span>
                          </div>
                          <div style={{ fontSize: 11, color: C.t3, marginBottom: 8 }}>
                            📍 {item.where} · 📅 {item.day}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {item.orders.map((o, j) => (
                              <div key={j} style={{ fontSize: 12, color: C.t2, lineHeight: 1.45 }}>→ {o}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Wild card */}
            <div style={{
              marginTop: 16, padding: "16px 18px", borderRadius: 12,
              background: `rgba(240,168,48,0.07)`, border: `1px solid rgba(240,168,48,0.22)`,
            }}>
              <div style={{ fontSize: 10, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>
                Highest Conviction Wild Card 😂
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>🥖 Jersey Mike's</div>
              <div style={{ fontSize: 12, color: C.t3, marginBottom: 8 }}>Multiple Honolulu locations · Any day (seriously)</div>
              <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.7 }}>
                → Turkey + provolone<br />
                → "Mike's Way" — onion, lettuce, tomato<br />
                → Add pickles + jalapeños<br />
                → 🏆 Friend's single highest-conviction recommendation
              </div>
            </div>
          </div>
        )}

        {/* ────── BOOKINGS ────── */}
        {tab === "bookings" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {BOOKINGS.map((b, i) => {
                const isOk = b.type === "confirmed";
                return (
                  <div key={i} style={{
                    padding: "14px 16px", borderRadius: 12,
                    background: C.surface,
                    border: `1px solid ${isOk ? "rgba(61,214,140,0.2)" : "rgba(240,96,96,0.28)"}`,
                    borderLeft: `4px solid ${isOk ? C.green : C.red}`,
                  }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ fontSize: 20, flexShrink: 0 }}>{b.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 13, fontWeight: 700, marginBottom: 6,
                          color: b.type === "alert" ? "#f4a0a0" : C.text,
                        }}>{b.title}</div>
                        <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                          {b.detail}
                        </div>
                        <div style={{
                          marginTop: 8, fontSize: 12, fontWeight: 700,
                          color: isOk ? C.green : C.gold,
                          fontFamily: "monospace",
                        }}>{b.conf}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key contacts */}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 11, color: C.t3, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
                Key Contacts
              </div>
              {[
                { name: "Jun Lan (Turo Jeep)",   val: "📞 909-979-7672" },
                { name: "Kevin Tran (Shuttle)",  val: "Conf #1746120339" },
                { name: "Orchids at Halekulani", val: "📞 808-518-2019" },
              ].map((c, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 0", borderBottom: `1px solid ${C.border}`,
                }}>
                  <div style={{ fontSize: 13, color: C.t2 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: C.gold, fontFamily: "monospace", fontWeight: 600 }}>{c.val}</div>
                </div>
              ))}
            </div>

            {/* Critical alarm */}
            <div style={{
              marginTop: 20, padding: "16px 18px", borderRadius: 12,
              background: "rgba(240,96,96,0.07)", border: "2px solid rgba(240,96,96,0.28)",
            }}>
              <div style={{ fontSize: 11, color: C.red, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>
                🚨 Critical Alarm
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f4a0a0" }}>May 12 at 10:00 AM PDT</div>
              <div style={{ fontSize: 12, color: "rgba(244,160,160,0.65)", marginTop: 6, lineHeight: 1.65 }}>
                Hanauma Bay tickets go live. Sells out in under 5 minutes.<br />
                pros.hnl.info/hanauma-bay · 4 adults + 1 infant (Misha FREE) · ~$102 USD
              </div>
            </div>
          </div>
        )}

        {/* ────── CHECKLIST ────── */}
        {tab === "checklist" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <div style={{ fontSize: 11, color: C.red, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
                🚨 Do Right Now
              </div>
              <Checklist items={CHECKLIST_NOW} storageKey="hi_now" />
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
                Before You Fly
              </div>
              <Checklist items={CHECKLIST_FLY} storageKey="hi_fly" />
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.blue, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
                👶 Misha's Pack List
              </div>
              <Checklist items={CHECKLIST_MISHA} storageKey="hi_misha" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
