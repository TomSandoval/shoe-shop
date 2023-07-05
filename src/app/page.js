"use client";
import Link from "next/link";
import "./page.css";
import { shoes } from "@/Utils/shoes";
import HomeCards from "@/components/HomeCards/homeCards";
import { useEffect, useState } from "react";
import useWindowDimensions from "@/Hooks/UseWindowDimensions";

export default function page() {
  const {width, height} = useWindowDimensions();

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
              <div className="buttons-container">
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
          { width > 800 &&
            <div className="image-container">
              <img
                alt="landing-image"
                className="landing-image"
                src="/assets/shoe-shop-image.png"
              />
            </div>
          }
        </div>
        {width >= 1460 ? (
          <div className="cards-home-container">
            {shoes.slice(0, 5).map((shoe) => {
              return (
                <HomeCards
                  id={shoe.id}
                  name={shoe.name}
                  price={shoe.price}
                  img={shoe.imageURL}
                  key={shoe.id}
                />
              );
            })}
          </div>
        ) : (
          <div className="cards-home-container">
            {shoes.slice(0, 4).map((shoe) => {
              return (
                <HomeCards
                  id={shoe.id}
                  name={shoe.name}
                  price={shoe.price}
                  img={shoe.imageURL}
                  key={shoe.id}
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
