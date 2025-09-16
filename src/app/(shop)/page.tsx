import { geist, geist_Mono } from "@/config/fonts";
import Image from "next/image";

export default function Home() {
  return (
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className={ geist.variable}>Hola Mundo!</h1>
        <h1 className={ geist_Mono.variable}>Hola Mundo!</h1>
      </main>
  );
}
