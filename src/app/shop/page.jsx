"use client";

import "./pageShop.css";
import axios from "axios";
import shoeSale from "../../../public/assets/Shoe-sale.png";
import { shoes } from "@/Utils/shoes";
import CardShop from "@/components/CardsShop/CardShop";
import { getAllVariations } from "@/Utils/getAllVariations";
import { getAllCategories } from "@/Utils/getAllCategories";
import Link from "next/link";
import Pagination from "@/components/Pagination/Pagination";
import useWindowDimensions from "@/Hooks/UseWindowDimensions";
import { useState } from "react";

export default function Shop() {
  const { width, height } = useWindowDimensions();
  const [filterPanel, setFilterPanel] = useState(false)

  const variations = getAllVariations();
  const categories = getAllCategories();

  const handleFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "shoe-shop");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dycpuotwh/image/upload",
      data
    );
    const file = await res.data;
    console.log(file);
  };


  const handlePanel = () => {
    setFilterPanel(!filterPanel)
  }


  return (
    <main>
      <div className="sale-container">
        <div className="sale-information">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3 className="sale-text">
              Unmissable <span>Deals</span> on Sneakers! Discover{" "}
              <span>Exclusive</span> Discounts on Our Collection of{" "}
              <span>Sports Footwear</span>
            </h3>
            <button className="sale-button">See Deals</button>
          </div>
        </div>
        <div className="sale-img-container">
          <img
            className="sale-img"
            src={shoeSale.src}
            alt="Unmissable Deals on Sneakers! Discover Exclusive Discounts on Our
            Collection of Sports Footwear"
          />
        </div>
      </div>

      <div className="nav-products-container">
        <div className="input-search-container">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(0, 0, 0, 1)" }}
            >
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
          </button>

          <input
            autoComplete="off"
            className="input-search"
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>
        { width > 800 ? 
        <div className="filters-options-container">
          <span>Sort By</span>
          <select defaultValue={"default"} name="sort">
            <option value="default" disabled>
              Select
            </option>
            <option value="price-min">Price min - max</option>
            <option value="price-max">Price max - min</option>
          </select>
        </div> : <button className="button-filter-show" onClick={handlePanel}>Filters</button>}
      </div>
      <section className="principal-section-shop">
          <div className={filterPanel === false ? "filters-panel-shop" : "filters-panel-shop-active"}>
            <div className="sticky-panel-filter">
              <button className="button-filter-hide" onClick={handlePanel}>X</button>
              <div className="category-filters-shop">
                <h3>CATEGORIES</h3>
                <div>
                  {categories.map((c, index) => (
                    <Link
                      key={index}
                      className="categories-link-filter"
                      href={`/categories/${c}`}
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="price-filter-shop">
                <h3>FILTER</h3>
                <div>
                  <input
                    placeholder="Min"
                    className="filter-price-inputs"
                    type="number"
                    name="min-price"
                  />
                  <input
                    placeholder="Max"
                    className="filter-price-inputs"
                    type="number"
                    name="max-price"
                  />
                  <button className="filter-price-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style={{ fill: "rgba(0, 0, 0, 1)" }}
                    >
                      <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="variations-filter-shop">
                <h3>COLOURS</h3>
                <div className="variations-colors-container-shop">
                  {variations.map((c, index) => (
                    <div key={index} style={{ backgroundColor: c.color }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        <div className="products-panel-shop">
          <div className="products-cards-container-shop">
            {shoes.slice(0, 9).map((s) => (
              <CardShop
                key={s.id}
                width={width}
                name={s.name}
                img={s.images[0] || s.variations[0].images[0]}
                brand={s.brand}
                price={s.in_discount ? s.discount_price : s.original_price}
                variations={s.variations.length}
                backgroundColor={s.background_card}
                id={s.id}
              />
            ))}
          </div>
          <Pagination />
        </div>
      </section>
    </main>
  );
}
