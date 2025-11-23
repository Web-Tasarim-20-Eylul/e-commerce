"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => setData(json));
    };

    getData();
  }, []);

  if (data.length === 0) {
    return <h2 className="text-4xl">Yükleniyor...</h2>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-col-2 sm:grid-cols-5 lg:grid-col-7 gap-6">
        {data.map((product, index) => (
          <Card
            as={Link}
            key={index}
            isPressable
            shadow="sm"
            href={`/${product.id}`}
          >
            <CardBody className="overflow-hidden p-0 ">
              <Image
                alt={"bla bla "}
                className="w-full transition duration-300 object-contain h-[350px] overflow-hidden"
                radius="lg"
                shadow="sm"
                src={product.image}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b className="text-left">{product.title}</b>
              <p className="text-default-500">{product.price}$</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
