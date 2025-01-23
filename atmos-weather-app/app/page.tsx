// import Image from "next/image";
import NavBar from "./ui/nav-bar";
import SearchBar from "./ui/search-bar";
import CardsWrapper from "./ui/cards";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <header>
        <NavBar />
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SearchBar />
        <CardsWrapper />
      </main>
    </div>
  );
}
