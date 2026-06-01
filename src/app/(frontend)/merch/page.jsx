import MerchPageClient from "@/components/organisms/MerchPageClient/MerchPageClient";
import { getMerchPage, getProducts } from "@/lib/payload/queries";
export const revalidate = 3600;

export const metadata = {
  title: "Merch",
  description: "Official merchandise — tees, vinyl, and exclusive drops.",
};

export default async function MerchPage() {
  const [pageContent, products] = await Promise.all([getMerchPage(), getProducts()]);

  return (
    <section className="section">
      <div className="container">
        <MerchPageClient pageContent={pageContent} products={products} />
      </div>
    </section>
  );
}
