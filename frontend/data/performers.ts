import type { GalleryItem, Performer } from "@/types/performer";

function galleryFrom(
  images: string[],
  videos: { youtubeId: string; title: string }[],
): GalleryItem[] {
  const items: GalleryItem[] = images.map((src) => ({
    type: "image" as const,
    src,
  }));

  videos.forEach((video, i) => {
    const insertAt = Math.min(1 + i * 3, items.length);
    items.splice(insertAt, 0, { type: "video", ...video });
  });

  return items;
}

const galleryA = [
  "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
];

const galleryB = [
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&h=600&fit=crop",
];

const galleryC = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&h=600&fit=crop",
];

export const performers: Performer[] = [
  // —— Musicians ——
  {
    id: "moira-dela-torre",
    name: "Moira dela Torre",
    category: "Musician",
    genres: ["OPM", "Ballad", "Pop"],
    price: 250000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1400&h=600&fit=crop",
    biography:
      "Award-winning OPM songstress known for heartfelt ballads and soaring live vocals. Perfect for weddings, corporate nights, and intimate concerts. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryA, [
    { youtubeId: "25Cs__vdmII", title: "Paubaya (Official MV)" },
    { youtubeId: "hT_nvWreIhg", title: "Counting Stars (Ballad Night Mood)" },
  ]),
  },
  {
    id: "zack-tabudlo",
    name: "Zack Tabudlo",
    category: "Musician",
    genres: ["OPM", "Pop", "R&B"],
    price: 150000,
    location: "Cebu",
    photoUrl:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1400&h=600&fit=crop",
    biography:
      "Chart-topping singer-songwriter blending smooth R&B and OPM pop. Ideal for mall shows, brand gigs, and romantic celebrations. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryA, [
    { youtubeId: "DhzDmhytrTI", title: "Binibini (Official MV)" },
    { youtubeId: "INvHma-qltE", title: "Binibini (Lyric Video)" },
  ]),
  },
  {
    id: "adie",
    name: "Adie",
    category: "Musician",
    genres: ["OPM", "Indie", "Ballad"],
    price: 120000,
    location: "Davao",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=1400&h=600&fit=crop",
    biography:
      "Indie balladeer with intimate storytelling and stripped-down live sets. Great for listening bars, cafés, and small wedding ceremonies. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryA, [
    { youtubeId: "yq2w6WBCZUQ", title: "Paraluman (Official MV)" },
    { youtubeId: "2Vv-BfVoq4g", title: "Perfect (Acoustic Inspiration)" },
  ]),
  },
  {
    id: "unique-salonga",
    name: "Unique Salonga",
    category: "Musician",
    genres: ["Indie", "Alternative", "OPM"],
    price: 140000,
    location: "Others",
    photoUrl:
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&h=600&fit=crop",
    biography:
      "Indie artist with poetic lyricism and atmospheric live arrangements. Suited for art spaces, listening rooms, and exclusive private gigs. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
    { youtubeId: "g6oAo-iQSzE", title: "Sino (Official MV)" },
    { youtubeId: "hCd1nAI-po4", title: "Leaves (Indie Session Pick)" },
  ]),
  },
  {
    id: "arthur-nery",
    name: "Arthur Nery",
    category: "Musician",
    genres: ["OPM", "R&B", "Soul"],
    price: 180000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=1400&h=600&fit=crop",
    biography:
      "Soulful OPM vocalist known for silky R&B delivery and emotional live performances. A favorite for dinners, lounges, and brand events. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryA, [
    { youtubeId: "KrRUxRCXpf8", title: "Pagsamo (Official MV)" },
    { youtubeId: "lp-EO5I60KA", title: "Thinking Out Loud (Soul Pick)" },
  ]),
  },
  {
    id: "dionela",
    name: "Dionela",
    category: "Musician",
    genres: ["OPM", "Pop", "Indie"],
    price: 110000,
    location: "Palawan",
    photoUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1400&h=600&fit=crop",
    biography:
      "Rising OPM singer with warm vocals and modern pop sensibility. Ideal for resort nights, café gigs, and intimate celebrations. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryA, [
    { youtubeId: "LLqDfGFMJbk", title: "sining ft. Jay R" },
    { youtubeId: "YQHsXMglC9A", title: "Hello (Vocal Mood)" },
  ]),
  },
  {
    id: "clara-benin",
    name: "Clara Benin",
    category: "Musician",
    genres: ["Indie", "Folk", "OPM"],
    price: 100000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1461784180009-21121b2f204c?w=1400&h=600&fit=crop",
    biography:
      "Indie folk artist with delicate guitar-driven sets and poetic songwriting. Perfect for art galleries, gardens, and quiet ceremonies. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryA, [
    { youtubeId: "daZoiEGyFgg", title: "Kathang Isip (Folk Mood)" },
    { youtubeId: "dvgZkm1xWPE", title: "Viva La Vida (Unplugged Mood)" },
  ]),
  },
  {
    id: "juan-karlos",
    name: "Juan Karlos",
    category: "Musician",
    genres: ["OPM", "Rock", "Alternative"],
    price: 160000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&h=600&fit=crop",
    biography:
      "Guitar-driven OPM artist with raw vocals and stadium-ready hooks. A strong pick for concerts, campus tours, and high-energy private nights. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryB, [
      { youtubeId: "BuA6z5Mq8pE", title: "Buwan (Live Mood)" },
      { youtubeId: "fJ9rUzIMcZQ", title: "Bohemian Rhapsody (Alt Night)" },
    ]),
  },
  {
    id: "regine-velasquez",
    name: "Regine Velasquez",
    category: "Musician",
    genres: ["OPM", "Ballad", "Pop"],
    price: 450000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1400&h=600&fit=crop",
    biography:
      "Asia's Songbird — powerhouse vocals for galas, corporate milestones, and landmark celebrations. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryA, [
      { youtubeId: "YQHsXMglC9A", title: "Hello (Vocal Showcase)" },
      { youtubeId: "lp-EO5I60KA", title: "Thinking Out Loud (Ballad Night)" },
    ]),
  },
  {
    id: "enzo-almario",
    name: "Enzo Almario",
    category: "Musician",
    genres: ["Jazz", "Soul", "OPM"],
    price: 95000,
    location: "Cebu",
    photoUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1400&h=600&fit=crop",
    biography:
      "Smooth jazz and soul vocalist for lounges, hotel residencies, and refined dinners. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryA, [
      { youtubeId: "fJ9rUzIMcZQ", title: "Jazz Standard Night" },
      { youtubeId: "2Vv-BfVoq4g", title: "Perfect (Lounge Take)" },
    ]),
  },

  // —— Bands ——
  {
    id: "ben-and-ben",
    name: "Ben & Ben",
    category: "Band",
    genres: ["OPM", "Folk", "Indie"],
    price: 400000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=1400&h=600&fit=crop",
    biography:
      "Beloved folk-pop collective with anthemic sing-alongs and warm stage presence. Ideal for festivals, university events, and large celebrations. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryB, [
    { youtubeId: "Bcv2cH8rsKU", title: "Kathang Isip (Official MV)" },
    { youtubeId: "XVhEm62Uqog", title: "Araw-Araw (Official MV)" },
  ]),
  },
  {
    id: "cup-of-joe",
    name: "Cup of Joe",
    category: "Band",
    genres: ["OPM", "Indie", "Pop"],
    price: 180000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&h=600&fit=crop",
    biography:
      "Rising OPM indie-pop band with catchy hooks and youthful energy. Great for campus gigs, brand activations, and private parties. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
    { youtubeId: "6QlSbMKjWSQ", title: "Tingin (Official MV)" },
    { youtubeId: "2gVl2Lwr8_E", title: "Live on Wish 107.5" },
  ]),
  },
  {
    id: "sb19",
    name: "SB19",
    category: "Band",
    genres: ["P-pop", "Dance", "R&B"],
    price: 500000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&h=600&fit=crop",
    biography:
      "P-pop powerhouse known for sharp choreography and high-energy performances. Book for arena shows, brand launches, and major festivals. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
    { youtubeId: "VZZA_38RUBI", title: "GENTO (Official MV)" },
    { youtubeId: "OAww-qrSnPs", title: "What? (Official MV)" },
  ]),
  },
  {
    id: "iv-of-spades",
    name: "IV of Spades",
    category: "Band",
    genres: ["Funk", "Rock", "Alternative"],
    price: 220000,
    location: "Cebu",
    photoUrl:
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1400&h=600&fit=crop",
    biography:
      "Funk-rock outfit with groovy riffs and retro swagger. A crowd favorite for club nights, music festivals, and stylish private events. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryB, [
    { youtubeId: "9a5XX1IckIw", title: "Come Inside Of My Heart" },
    { youtubeId: "hTWKbfoikeg", title: "Smells Like Teen Spirit (Live Energy)" },
  ]),
  },
  {
    id: "lola-amour",
    name: "Lola Amour",
    category: "Band",
    genres: ["Indie", "Funk", "Pop"],
    price: 160000,
    location: "Palawan",
    photoUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=1400&h=600&fit=crop",
    biography:
      "Feel-good indie funk band with sunny grooves and singable choruses. Perfect for beach events, resort nights, and outdoor festivals. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryB, [
    { youtubeId: "dglBgJSMr-E", title: "Raining in Manila (Lyric Video)" },
    { youtubeId: "09R8_2nJtjg", title: "Sugar (Festival Warmup)" },
  ]),
  },
  {
    id: "december-avenue",
    name: "December Avenue",
    category: "Band",
    genres: ["OPM", "Alternative", "Rock"],
    price: 200000,
    location: "Others",
    photoUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=1400&h=600&fit=crop",
    biography:
      "Alternative rock band delivering emotional anthems and high-energy live shows. A strong pick for provincial tours, concerts, and school events. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryB, [
    { youtubeId: "P1pwbnzbe7g", title: "Kung 'Di Rin Lang Ikaw (Official MV)" },
    { youtubeId: "7wtfhZwyrcc", title: "Believer (Alt-Rock Stage Cut)" },
  ]),
  },
  {
    id: "eraserheads",
    name: "Eraserheads",
    category: "Band",
    genres: ["OPM", "Rock", "Alternative"],
    price: 600000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&h=600&fit=crop",
    biography:
      "Legendary OPM rock band whose catalog defines generations. Book for major festivals, reunion-style nights, and landmark celebrations. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryB, [
    { youtubeId: "lajnSJZpI34", title: "Ang Huling El Bimbo" },
    { youtubeId: "fJ9rUzIMcZQ", title: "Bohemian Rhapsody (Classic Night)" },
  ]),
  },
  {
    id: "parokya-ni-edgar",
    name: "Parokya ni Edgar",
    category: "Band",
    genres: ["OPM", "Rock", "Comedy"],
    price: 350000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1400&h=600&fit=crop",
    biography:
      "Iconic OPM rock band with irreverent humor and crowd-favorite anthems. Book for festivals, campus concerts, and big private parties. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryB, [
      { youtubeId: "7wtfhZwyrcc", title: "Believer (Rock Warmup)" },
      { youtubeId: "hTWKbfoikeg", title: "Smells Like Teen Spirit (Live Energy)" },
    ]),
  },
  {
    id: "orange-and-lemons",
    name: "Orange & Lemons",
    category: "Band",
    genres: ["OPM", "Indie", "Pop"],
    price: 175000,
    location: "Others",
    photoUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=1400&h=600&fit=crop",
    biography:
      "Indie-pop band known for bright melodies and nostalgic OPM hits. Ideal for reunions, corporate nights, and outdoor festivals. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
      { youtubeId: "09R8_2nJtjg", title: "Sugar (Festival Warmup)" },
      { youtubeId: "dvgZkm1xWPE", title: "Viva La Vida (Indie Night)" },
    ]),
  },
  {
    id: "the-juans",
    name: "The Juans",
    category: "Band",
    genres: ["OPM", "Pop", "Ballad"],
    price: 190000,
    location: "Davao",
    photoUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&h=600&fit=crop",
    biography:
      "Heartfelt OPM pop band with romantic hits and polished live arrangements. Perfect for weddings, mall tours, and brand events. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryB, [
      { youtubeId: "Bcv2cH8rsKU", title: "Kathang Isip (Band Mood)" },
      { youtubeId: "2Vv-BfVoq4g", title: "Perfect (Wedding Set)" },
    ]),
  },

  // —— DJs ——
  {
    id: "dj-ace-ramos",
    name: "DJ Ace Ramos",
    category: "DJ",
    genres: ["EDM", "House", "Top 40"],
    price: 45000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&h=600&fit=crop",
    biography:
      "Manila club regular spinning house, EDM, and crowd-pleasing top 40. A go-to for weddings, debuts, and rooftop parties. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
    { youtubeId: "IcrbM1l_BoI", title: "Wake Me Up (EDM Peak)" },
    { youtubeId: "JRfuAukYTKg", title: "Titanium (Rooftop House)" },
  ]),
  },
  {
    id: "dj-marvin",
    name: "DJ Marvin",
    category: "DJ",
    genres: ["Hip-Hop", "R&B", "OPM"],
    price: 55000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&h=600&fit=crop",
    biography:
      "Hip-hop and R&B specialist who blends OPM hits into high-energy dance floors. Popular for birthdays, club takeovers, and brand nights. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
    { youtubeId: "OPf0YbXqDm0", title: "Uptown Funk (Dance Floor)" },
    { youtubeId: "YVkUvmDQ3HY", title: "Without Me (Club Takeover)" },
  ]),
  },
  {
    id: "mars-miranda",
    name: "Mars Miranda",
    category: "DJ",
    genres: ["House", "Techno", "Electronic"],
    price: 70000,
    location: "Cebu",
    photoUrl:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&h=600&fit=crop",
    biography:
      "Electronic DJ known for deep house and techno journeys. Ideal for beach clubs, after-parties, and boutique festival stages. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
    { youtubeId: "60ItHLz5WEA", title: "Faded (Deep House Journey)" },
    { youtubeId: "4NRXx6U8ABQ", title: "Blinding Lights (After-Hours)" },
  ]),
  },
  {
    id: "dj-loonyo",
    name: "DJ Loonyo",
    category: "DJ",
    genres: ["Top 40", "Dance", "Pop"],
    price: 60000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1400&h=600&fit=crop",
    biography:
      "High-energy party DJ with flashy presence and dance-floor instincts. Book for debuts, school events, and big celebrations. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
    { youtubeId: "KQ6zr6kCPj8", title: "Party Rock Anthem" },
    { youtubeId: "9bZkp7q19f0", title: "GANGNAM STYLE (Party Drop)" },
  ]),
  },
  {
    id: "kidwolf",
    name: "Kidwolf",
    category: "DJ",
    genres: ["Trap", "Hip-Hop", "Electronic"],
    price: 50000,
    location: "Davao",
    photoUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1400&h=600&fit=crop",
    biography:
      "Trap and hip-hop DJ bringing bass-heavy sets to Mindanao nights. Great for club residencies, bar openings, and youth events. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
    { youtubeId: "uelHwf8o7_U", title: "Love The Way You Lie (Trap Edit)" },
    { youtubeId: "wXhTHyIgQ_U", title: "Circles (Bar Opening)" },
  ]),
  },
  {
    id: "dj-isla",
    name: "DJ Isla",
    category: "DJ",
    genres: ["Afrobeats", "Reggaeton", "Top 40"],
    price: 48000,
    location: "Palawan",
    photoUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&h=600&fit=crop",
    biography:
      "Island DJ mixing afrobeats, reggaeton, and tropical party hits. Perfect for resort pools, beach weddings, and sunset sessions. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
    { youtubeId: "kJQP7kiw5Fk", title: "Despacito (Tropical Mix)" },
    { youtubeId: "pRpeEdMmmQ0", title: "Waka Waka (Pool Party)" },
  ]),
  },
  {
    id: "dj-nix-prudence",
    name: "DJ Nix Prudence",
    category: "DJ",
    genres: ["Disco", "Funk", "Top 40"],
    price: 52000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&h=600&fit=crop",
    biography:
      "Funky disco selector for wedding receptions, hotel lounges, and retro-themed nights. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
      { youtubeId: "OPf0YbXqDm0", title: "Uptown Funk (Disco Floor)" },
      { youtubeId: "KQ6zr6kCPj8", title: "Party Rock Anthem" },
    ]),
  },
  {
    id: "dj-kira-vale",
    name: "DJ Kira Vale",
    category: "DJ",
    genres: ["House", "Pop", "EDM"],
    price: 58000,
    location: "Others",
    photoUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1400&h=600&fit=crop",
    biography:
      "Versatile house and pop DJ for regional tours, resort takeovers, and corporate parties. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
      { youtubeId: "IcrbM1l_BoI", title: "Wake Me Up (Peak Hour)" },
      { youtubeId: "4NRXx6U8ABQ", title: "Blinding Lights (Resort Set)" },
    ]),
  },
  {
    id: "dj-bombi",
    name: "DJ Bombi",
    category: "DJ",
    genres: ["OPM", "Mashup", "Top 40"],
    price: 42000,
    location: "Cebu",
    photoUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1400&h=600&fit=crop",
    biography:
      "OPM mashup specialist keeping Visayas dance floors singing along all night. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
      { youtubeId: "JRfuAukYTKg", title: "Titanium (Mashup Peak)" },
      { youtubeId: "9bZkp7q19f0", title: "GANGNAM STYLE (Crowd Drop)" },
    ]),
  },
  {
    id: "dj-nova-reef",
    name: "DJ Nova Reef",
    category: "DJ",
    genres: ["Techno", "Minimal", "Electronic"],
    price: 65000,
    location: "Palawan",
    photoUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&h=600&fit=crop",
    biography:
      "Minimal techno and late-night electronic sets for island clubs and boutique festivals. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
      { youtubeId: "60ItHLz5WEA", title: "Faded (Techno Journey)" },
      { youtubeId: "wXhTHyIgQ_U", title: "Circles (After Hours)" },
    ]),
  },

  // —— Other ——
  {
    id: "gloc-9",
    name: "Gloc-9",
    category: "Other",
    genres: ["Rap", "Hip-Hop", "OPM"],
    price: 200000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&h=600&fit=crop",
    biography:
      "Iconic Filipino rapper known for storytelling bars and socially charged anthems. Strong booking for concerts, campus tours, and awareness events. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryB, [
    { youtubeId: "R2clXN1dtCs", title: "Ambag (Official MV)" },
    { youtubeId: "DyDfgMOUjCI", title: "bad guy (Campus Freestyle Mood)" },
  ]),
  },
  {
    id: "flow-g",
    name: "Flow G",
    category: "Other",
    genres: ["Rap", "Trap", "Hip-Hop"],
    price: 150000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&h=600&fit=crop",
    biography:
      "Hard-hitting rap artist with a loyal following and fierce stage energy. Ideal for club shows, brand collabs, and youth festivals. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
    { youtubeId: "gfxTa4uEV3U", title: "Kamusta (with Shanti Dope)" },
    { youtubeId: "E07s5ZYygMg", title: "Watermelon Sugar (Live Warmup)" },
  ]),
  },
  {
    id: "shanti-dope",
    name: "Shanti Dope",
    category: "Other",
    genres: ["Rap", "Hip-Hop", "OPM"],
    price: 130000,
    location: "Others",
    photoUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=1400&h=600&fit=crop",
    biography:
      "Laid-back yet punchy rapper with viral hits and chill swagger. Great for bar nights, college events, and casual brand gigs. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryB, [
    { youtubeId: "PLe0-6OYWoU", title: "Nadarang (Wish 107.5 Live)" },
    { youtubeId: "iS1g8G_njx8", title: "Problem (Bar Session Mood)" },
  ]),
  },
  {
    id: "manila-heat-crew",
    name: "Manila Heat Crew",
    category: "Other",
    genres: ["Dance", "Hip-Hop", "Performance"],
    price: 80000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&h=600&fit=crop",
    biography:
      "High-octane dance crew for openings, product launches, and stage spectacles. Custom choreography available on request. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
    { youtubeId: "0KSOMA3QBU0", title: "Dark Horse (Choreo Track)" },
    { youtubeId: "CevxZvSJLk8", title: "Roar (Stage Showcase)" },
  ]),
  },
  {
    id: "the-company",
    name: "The CompanY",
    category: "Other",
    genres: ["Vocal", "Pop", "OPM"],
    price: 120000,
    location: "Cebu",
    photoUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1400&h=600&fit=crop",
    biography:
      "Premier vocal group delivering polished harmonies and theatrical flair. Excellent for corporate dinners, galas, and tribute nights. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryA, [
    { youtubeId: "YykjpeuMNEk", title: "Hymn For The Weekend (Gala)" },
    { youtubeId: "e-ORhEE9VVg", title: "Blank Space (Tribute Night)" },
  ]),
  },
  {
    id: "bisaya-comedy-hour",
    name: "Bisaya Comedy Hour",
    category: "Other",
    genres: ["Comedy", "Host", "Variety"],
    price: 65000,
    location: "Davao",
    photoUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1400&h=600&fit=crop",
    biography:
      "Bilingual comedy and hosting duo for lively programs, company parties, and community festivals across Mindanao. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
    { youtubeId: "L_jWHffIx5E", title: "All Star (Show Opener)" },
    { youtubeId: "2vjPBrBU-TM", title: "Chandelier (Festival Bit)" },
  ]),
  },
  {
    id: "vice-ganda",
    name: "Vice Ganda",
    category: "Other",
    genres: ["Comedy", "Host", "Variety"],
    price: 550000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1400&h=600&fit=crop",
    biography:
      "A-list comedy and hosting for arena shows, brand launches, and major celebrations. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
      { youtubeId: "L_jWHffIx5E", title: "All Star (Show Opener)" },
      { youtubeId: "CevxZvSJLk8", title: "Roar (Variety Bit)" },
    ]),
  },
  {
    id: "bayanihan-dance-collective",
    name: "Bayanihan Dance Collective",
    category: "Other",
    genres: ["Dance", "Cultural", "Performance"],
    price: 90000,
    location: "Others",
    photoUrl:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&h=600&fit=crop",
    biography:
      "Cultural dance ensemble for festivals, diplomatic events, and heritage celebrations. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryC, [
      { youtubeId: "0KSOMA3QBU0", title: "Dark Horse (Dance Showcase)" },
      { youtubeId: "pRpeEdMmmQ0", title: "Waka Waka (Festival Set)" },
    ]),
  },
  {
    id: "string-quartet-manila",
    name: "String Quartet Manila",
    category: "Other",
    genres: ["Classical", "Wedding", "Instrumental"],
    price: 75000,
    location: "Metro Manila",
    photoUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=1400&h=600&fit=crop",
    biography:
      "Elegant string quartet for ceremonies, cocktail hours, and upscale dinners. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryA, [
      { youtubeId: "YykjpeuMNEk", title: "Hymn For The Weekend (Strings)" },
      { youtubeId: "2Vv-BfVoq4g", title: "Perfect (Ceremony)" },
    ]),
  },
  {
    id: "magician-enzo",
    name: "Magician Enzo",
    category: "Other",
    genres: ["Magic", "Variety", "Kids"],
    price: 40000,
    location: "Cebu",
    photoUrl:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&h=600&fit=crop",
    coverUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&h=600&fit=crop",
    biography:
      "Close-up and stage magic for birthdays, corporate mixers, and family events. Over the years, they have built a devoted following across the Philippines through consistent live performances, thoughtful setlists, and a genuine connection with every audience. Beyond the hits, their shows are crafted to fit the energy of the room — whether that means an intimate acoustic evening or a full production for a major celebration. Clients often note the professionalism from booking to load-out, clear communication, and a collaborative approach to song requests and event flow. Available for weddings, corporate functions, festivals, and private gatherings nationwide.",
    gallery: galleryFrom(galleryB, [
      { youtubeId: "2vjPBrBU-TM", title: "Chandelier (Show Bit)" },
      { youtubeId: "L_jWHffIx5E", title: "All Star (Kids Party)" },
    ]),
  },
];

export function getPerformerById(id: string): Performer | undefined {
  return performers.find((p) => p.id === id);
}

export function getRelatedPerformers(
  performer: Performer,
  limit = 4,
): Performer[] {
  const genreSet = new Set(performer.genres);

  const ranked = performers
    .filter((p) => p.id !== performer.id)
    .map((p) => {
      let score = 0;
      if (p.category === performer.category) score += 3;
      if (p.location === performer.location) score += 1;
      for (const genre of p.genres) {
        if (genreSet.has(genre)) score += 2;
      }
      return { performer: p, score };
    })
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, limit).map(({ performer: p }) => p);
}

export type PerformerSearchFilters = {
  query?: string;
  categories?: string[];
  locations?: string[];
  genres?: string[];
  minPrice?: number;
  maxPrice?: number;
};

export function searchPerformers({
  query = "",
  categories = [],
  locations = [],
  genres = [],
  minPrice,
  maxPrice,
}: PerformerSearchFilters = {}) {
  const q = query.trim().toLowerCase();
  const cats = categories.map((c) => c.trim()).filter(Boolean);
  const locs = locations.map((l) => l.trim()).filter(Boolean);
  const gens = genres.map((g) => g.trim()).filter(Boolean);

  return performers.filter((p) => {
    if (cats.length > 0 && !cats.includes(p.category)) return false;
    if (locs.length > 0 && !locs.includes(p.location)) return false;
    if (gens.length > 0 && !gens.some((g) => p.genres.includes(g))) return false;
    if (minPrice !== undefined && p.price < minPrice) return false;
    if (maxPrice !== undefined && p.price > maxPrice) return false;

    if (!q) return true;

    const haystack = [p.name, p.category, p.location, ...p.genres]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q) || p.name.toLowerCase().includes(q);
  });
}

export const categories = ["Musician", "Band", "DJ", "Other"] as const;

export const locations = [
  "Metro Manila",
  "Palawan",
  "Cebu",
  "Davao",
  "Others",
] as const;

export const budgetRanges = [
  { id: "any", label: "Any budget", min: undefined, max: undefined },
  { id: "under-75k", label: "Under ₱75,000", min: undefined, max: 75000 },
  {
    id: "75-150k",
    label: "₱75,000 – ₱150,000",
    min: 75000,
    max: 150000,
  },
  {
    id: "150-300k",
    label: "₱150,000 – ₱300,000",
    min: 150000,
    max: 300000,
  },
  { id: "300k-plus", label: "₱300,000+", min: 300000, max: undefined },
] as const;

export const allGenres = Array.from(
  new Set(performers.flatMap((p) => p.genres)),
).sort();
