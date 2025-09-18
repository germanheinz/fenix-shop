import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
// import { geist, geist_Mono } from "@/config/fonts";
// import Image from "next/image";

const products = initialData.products;

export default function Home() {
  return (
      <>
        <Title title="Store" subtitle="All Products" className="mb-2"/>

        <ProductGrid products={ products }/>
      </>
  );
}
