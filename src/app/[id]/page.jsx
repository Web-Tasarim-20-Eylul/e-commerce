import Image from "next/image";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = await fetch(`https://fakestoreapi.com/products/${id}`).then(
    (res) => res.json()
  );

  return (
    <div className="container mx-auto flex flex-col lg:flex-row gap-8 p-8">
      {/* RESİM */}
      <div className="relative h-[60vh] w-full lg:w-[35%]">
        <Image
          src={product.image}
          fill
          className="object-contain"
          alt={product.title}
        />
      </div>

      {/* SAĞDAKİ ÜRÜN BİLGİLERİ */}
      <div className="flex flex-col w-full justify-between">
        {/* Ürün bilgileri ve yıldız (Üst kısım) */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col-reverse justify-between lg:flex-row">
            <h1 className="text-3xl">{product.title}</h1>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#e3bc0e"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <p className="ms-2 text-sm font-bold text-heading">
                {product.rating.rate}
              </p>
              <span className="w-1 h-1 mx-1.5 bg-neutral-quaternary rounded-full"></span>
              <a
                href="#"
                className="text-sm font-medium text-heading underline hover:no-underline"
              >
                {product.rating.count} reviews
              </a>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl">{product.description}</p>
          <div className="p-1 bg-green-200 color-primary w-fit rounded-sm text-sm">
            {product.category}
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-white border bg-black p-2 hover:bg-white hover:text-black cursor-pointer">
              S
            </span>
            <span className="font-bold text-white border bg-black p-2 hover:bg-white hover:text-black cursor-pointer">
              M
            </span>
            <span className="font-bold text-white border bg-black p-2 hover:bg-white hover:text-black cursor-pointer">
              L
            </span>
            <span className="font-bold text-white border bg-black p-2 hover:bg-white hover:text-black cursor-pointer">
              XL
            </span>
          </div>
          <h2 className="text-3xl font-bold">{product.price}$</h2>
        </div>

        {/* Butonlar */}
        <div className="flex justify-end gap-4">
          <button className="py-4 px-8 bg-primary text-white font-bold cursor-pointer">
            Hemen Al
          </button>
          <button className="py-4 px-8 border border-primary bg-white hover:bg-primary hover:text-white text-black font-bold cursor-pointer ">
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
