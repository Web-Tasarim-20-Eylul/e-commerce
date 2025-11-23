export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = await fetch(`https://fakestoreapi.com/products/${id}`).then(
    (res) => res.json()
  );

  return (
    <div>
      <h1 className="text-6xl">{product.title}</h1>
    </div>
  );
}
