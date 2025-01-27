// import Image from "next/image";
import NavBar from "./ui/nav-bar";
import CardsWrapper from "./ui/cards";
import LocationFormWrapper from "./ui/location-form-wrapper";

export default function Home() {
  return (
    <main className="font-[family-name:var(--font-geist-sans)] flex min-h-screen flex-col">
      <header>
        <NavBar />
      </header>
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <LocationFormWrapper />
        <CardsWrapper />
      </div>
    </main>
  );
}
