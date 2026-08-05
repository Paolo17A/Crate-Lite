export type PerformerCategory = "DJ" | "Musician" | "Band" | "Other";

export type GalleryVideo = {
  type: "video";
  youtubeId: string;
  title: string;
};

export type GalleryImage = {
  type: "image";
  src: string;
};

export type GalleryItem = GalleryImage | GalleryVideo;

export type Performer = {
  id: string;
  name: string;
  category: PerformerCategory;
  genres: string[];
  price: number;
  location: string;
  photoUrl: string;
  coverUrl: string;
  biography: string;
  gallery: GalleryItem[];
};
