import Hero from "@/components/home/Hero";
import HomeStickyNav from "@/components/home/HomeStickyNav";
import PerformerDirectory from "@/components/home/PerformerDirectory";

export default function HomePage() {
  return (
    <>
      <HomeStickyNav />
      <Hero />
      <PerformerDirectory />
    </>
  );
}
