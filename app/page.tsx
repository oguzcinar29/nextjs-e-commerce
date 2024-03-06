import Categories from "@/components/Home/Categories";
import HomeHero from "@/components/Home/HomeHero";
import NewCollections from "@/components/Home/NewCollections";

export default function Home() {
  return (
    <section className="flex flex-col gap-10 pt-5">
      <HomeHero />
      <Categories />
      <NewCollections />
    </section>
  );
}
