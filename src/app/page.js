"use client";
import Link from "next/link";
import "./page.css";
import HomeCards from "@/components/HomeCards/homeCards";
import { useEffect, useState } from "react";
import useWindowDimensions from "@/Hooks/UseWindowDimensions";
import Shoe3D from "@/components/shoe3D/shoe3D";
import CardShop from "@/components/CardsShop/CardShop";
import axios from "axios";

export default function page() {
  const { width, height } = useWindowDimensions();
  const [shoes, setShoes] = useState();

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setShoes(response.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="section-home-all-container">
        <div className="landing-welcome">
          <div className="information-container">
            <div>
              <h1 className="principal-text">
                Days can't start with out perfect
                <span className="principal-text-green"> shoes</span>
              </h1>
              <h4 className="secondary-text">
                Find the best shoes at the best price
              </h4>
              <div className="buttons-container-home">
                <Link href={"/shop"} className="button-green">
                  Shop Now!
                </Link>
                <Link href={"/about"} className="button-learn-more">
                  Learn More{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(0, 0, 0, 1)" }}
                  >
                    <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          {width > 800 && (
            <div className="image-container">
              <Shoe3D />
            </div>
          )}
        </div>
        {width >= 1460 ? (
          <div className="cards-home-container">
            {shoes?.slice(0, 5).map((shoe) => {
              return (
                <CardShop
                  id={shoe._id}
                  name={shoe.name}
                  price={shoe.discount_price || shoe.original_price}
                  brand={shoe.brand}
                  img={shoe.variations[0]?.images[0] || shoe.images[0]}
                  backgroundColor={shoe.background_card}
                  variations={shoe.variations.length}
                  key={shoe._id}
                />
              );
            })}
          </div>
        ) : (
          <div className="cards-home-container">
            {shoes?.slice(0, 4).map((shoe) => {
              return (
                <CardShop
                  id={shoe._id}
                  name={shoe.name}
                  price={shoe.price}
                  img={ shoe.variations[0]?.images[0] || shoe.images[0]}
                  backgroundColor={shoe.background_card}
                  variations={shoe.variations.length}
                  brand={shoe.brand}
                  key={shoe._id}
                />
              );
            })}
          </div>
        )}
        <Link className="button-products-home" href={"/shop"}>
          View all products
        </Link>
      </section>
    </>
  );
}
