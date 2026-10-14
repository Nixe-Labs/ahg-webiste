export type Place = { name: string; text: string; image: string; kind: "Sacred" | "Heritage" | "Leisure & Nature"; region: "city" | "region"; x?: number; y?: number };

/* x/y place each regional destination on the illustrative map (0–100, Thanjavur at 40/52, ~70 units per degree).
   Directions follow the real geography; distances are compressed, and the map says so. */
export const PLACES: Place[] = [
  { name: "Brihadeeswarar Temple", kind: "Sacred", region: "city", image: "brihadeeswarar", text: "A UNESCO World Heritage site, this magnificent Chola-era temple dedicated to Lord Shiva is renowned for its grand architecture and towering vimana." },
  { name: "Punnainallur Mariamman Temple", kind: "Sacred", region: "region", x: 45, y: 49, image: "punnainallur", text: "A famous temple near Thanjavur devoted to Goddess Mariamman, known for its powerful deity believed to cure ailments and grant blessings." },
  { name: "Navagraha Temples", kind: "Sacred", region: "region", x: 63, y: 34, image: "navagraha", text: "A group of nine temples, each dedicated to a planetary deity, visited for astrological remedies and spiritual benefits." },
  { name: "Poondi Madha Basilica", kind: "Sacred", region: "region", x: 32, y: 46, image: "poondi-madha", text: "A revered Catholic church dedicated to Our Lady of Lourdes, attracting devotees seeking miracles and divine grace." },
  { name: "Our Lady of Good Health, Velankanni", kind: "Sacred", region: "region", x: 90, y: 59, image: "velankanni", text: "The famous Marian shrine known as the “Lourdes of the East”, attracting millions of pilgrims seeking healing and blessings." },
  { name: "Nagore Dargah", kind: "Sacred", region: "region", x: 89, y: 50, image: "nagore-dargah", text: "A sacred Sufi shrine dedicated to Saint Hazrat Syed Shahul Hameed, known for interfaith harmony and healing." },
  { name: "Kumbakonam Temples", kind: "Sacred", region: "region", x: 57, y: 40, image: "kumbakonam", text: "A spiritual hub of ancient temples including Adi Kumbeswarar, Sarangapani and Chakrapani, reflecting rich Dravidian heritage." },
  { name: "Darasuram Temple", kind: "Sacred", region: "region", x: 52, y: 43, image: "darasuram", text: "A UNESCO-listed Chola temple dedicated to Lord Shiva as Airavateshwarar, renowned for intricate carvings and architectural brilliance." },
  { name: "Mahamaham Kulam", kind: "Sacred", region: "region", x: 60, y: 36.5, image: "mahamaham-kulam", text: "The sacred temple tank of Kumbakonam, home to the Mahamaham festival every 12 years, when devotees take a holy dip." },
  { name: "Maratha Palace", kind: "Heritage", region: "city", image: "maratha-palace", text: "A grand palace showcasing royal artefacts, art and the legacy of Thanjavur's Maratha rulers." },
  { name: "Rajarajan Manimandapam", kind: "Heritage", region: "city", image: "rajarajan-manimandapam", text: "A memorial to the great Chola king Rajaraja I, celebrating his contributions." },
  { name: "Thanjavur Museum", kind: "Heritage", region: "city", image: "thanjavur-museum", text: "A rich collection of artefacts, sculptures and paintings reflecting Thanjavur's cultural heritage." },
  { name: "Ranees Clock Tower", kind: "Heritage", region: "city", image: "clock-tower", text: "A historic clock tower standing as a colonial-era landmark in the city." },
  { name: "South Zone Cultural Centre", kind: "Heritage", region: "city", image: "south-zone-cultural-centre", text: "A vibrant cultural hub promoting South Indian arts, crafts and performances." },
  { name: "Food Museum", kind: "Heritage", region: "city", image: "food-museum", text: "India's first food museum, tracing the history and evolution of agriculture and food production." },
  { name: "Manora Fort", kind: "Heritage", region: "region", x: 52, y: 89, image: "manora-fort", text: "A unique eight-storey fort built by the Marathas, offering panoramic coastal views." },
  { name: "Kallanai Dam", kind: "Heritage", region: "region", x: 18, y: 49, image: "kallanai-dam", text: "An ancient dam built by the Cholas across the Kaveri, still a vital source of irrigation today." },
  { name: "Samuthiram Lake", kind: "Leisure & Nature", region: "city", image: "samuthiram-lake", text: "A scenic freshwater lake offering a peaceful setting for relaxation and boating." },
  { name: "Rajali Birds Park", kind: "Leisure & Nature", region: "city", image: "rajali-bird-park", text: "A serene park home to native and migratory bird species, ideal for nature lovers." },
  { name: "7D Theatre", kind: "Leisure & Nature", region: "city", image: "7d-theatre", text: "An immersive cinema with motion seats, wind and water sprays." },
  { name: "Muthupet Lagoon Forest", kind: "Leisure & Nature", region: "region", x: 65, y: 80, image: "muthupet-lagoon", text: "A mangrove forest rich in biodiversity, with boat rides and a peaceful escape into nature." },
];

export type Milestone = { year: string; items: string[]; image?: string; caption?: string };

export const HISTORY: Milestone[] = [
  { year: "2012", image: "/img/history/2012-atrium.jpg", caption: "The Tanjore-art atrium at Abi's Inn", items: ["Abi's Inn, Thanjavur's first apartment hotel, opens with a restaurant and a conference hall."] },
  // CHECK: live site spells this hall "JBlossom Hall"
  { year: "2014", image: "/img/history/2014-lawn.jpg", caption: "Hot 'n' Spicy, on the lawn", items: ["JBlossom Hall opens at Abi's Inn, expanding banquet capacity to 250+ guests.", "Hot 'n' Spicy, Thanjavur's first lawn restaurant, opens as the second dining venue at Abi's Inn."] },
  { year: "2015", image: "/img/history/2015-rhythm.jpg", caption: "Rhythm Hall", items: ["Rhythm Hall opens with only sustainable design elements in its interiors: Thanjavur's first eco-friendly banquet space.", "Abi's Inn receives the Goibibo Certificate of Excellence, 2015–16."] },
  { year: "2016", items: ["Boardrooms are added at Abi's Inn for business and corporate events.", "Goibibo Certificate of Excellence, 2016–17.", "Cleartrip names Abi's Inn “Featured Hotel of the Year”, 2016–17."] },
  { year: "2019", items: ["Construction begins on our second property, Abi's Residency."] },
  { year: "2021", image: "/img/history/2021-residency.jpg", caption: "A room at Abi's Residency", items: ["Abi's Residency opens, steps away from the iconic Brihadeeswarar Temple."] },
  { year: "2023", items: ["Construction begins on our first premium hotel, The Emerald."] },
  { year: "2024", items: ["Abi's Residency grows by 10 rooms, to 34 in all."] },
  { year: "2025", image: "/img/history/2025-emerald.jpg", caption: "The Emerald", items: ["In March, The Emerald opens, marking our entry into premium hospitality.", "Abi's Hotel Group is established to unite all three properties under one company."] },
];

export type Review = { name: string; hotel?: string; quote: string; meta?: string };

export const REVIEWS: Review[] = [
  { name: "Venkat Manda", quote: "Hidden gem. I felt bad that I stayed only one night. Very well designed rooms, excellent service and food quality. Even the pre-arrival communication and reservation through WhatsApp was excellent." },
  { name: "Hema", hotel: "The Emerald", meta: "Rooms 5.0 · Service 5.0 · Location 5.0", quote: "From check-in to check-out, everything was smooth, professional, and pleasant. The staff was incredibly courteous, always ready to assist with a smile, and made me feel right at home." },
  { name: "Suresh S", quote: "Value for money stay. Loved the central courtyard with ample seating for a relaxed coffee, the housekeeping team's skill, and the breakfast, which is homely. Recommended." },
  { name: "P R.", hotel: "The Emerald", quote: "We are senior citizens and stayed for three nights. The room was spacious, clean, and extremely comfortable, and room service was prompt throughout. Overall, it was an excellent stay." },
  { name: "Rasa Thileepan", hotel: "Abi's Inn", quote: "Like an apartment home. Very friendly staff and good-sized rooms, each with two bathrooms and a nice living area. Complimentary breakfast with South Indian choices. Great price." },
  { name: "Dharani Mahesh", meta: "Rooms 5.0 · Location 5.0", quote: "Dreamy comfort and flawless service. A perfect stay, worth every moment." },
  { name: "Voleti Srikanth", quote: "One can get the feeling of staying at home although away from home. The hotel is near the Brihadeeswara temple, and the chocolates on Independence Day were a very nice gesture." },
  { name: "Santhosh Kumar Jayasankar", quote: "Visiting Thanjavur with my family. Best service and super clean, with parking too. Go for it without any doubts." },
];

export const DEPARTMENTS = ["Front Office", "Housekeeping", "F&B Service", "F&B Production", "Back Office"];
