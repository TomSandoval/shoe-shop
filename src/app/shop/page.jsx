"use client";

import "./pageShop.css";
import axios from "axios";
import shoeSale from "../../../public/assets/Shoe-sale.png";
import CardShop from "@/components/CardsShop/CardShop";
import Link from "next/link";
import Pagination from "@/components/Pagination/Pagination";
import useWindowDimensions from "@/Hooks/UseWindowDimensions";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer/footer";
import { useRouter, useSearchParams } from "next/navigation";
import { Poppins } from "next/font/google";
import { resolve } from "styled-jsx/css";

const poppins = Poppins({ subsets: ["latin"], weight: "700" });

export default function Shop() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const [filterPanel, setFilterPanel] = useState(false);
  const [data, setData] = useState();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const color = searchParams.get("color");
  const minPriceParams = searchParams.get("min");
  const maxPriceParams = searchParams.get("max");
  const order = searchParams.get("order");
  const page = searchParams.get("page");
  const searchValue = searchParams.get("search");
  const [categories, setCategories] = useState([]);
  const [variations, setVariations] = useState([]);
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);
  const [hasFilter, setHasFilter] = useState(false);
  const [search, setSearch] = useState(undefined);
  const arrayAux = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const handlePanel = () => {
    setFilterPanel(!filterPanel);
  };

  useEffect(() => {
    if (maxPriceParams || minPriceParams || category || order || color) {
      setHasFilter(true);
    } else {
      setHasFilter(false);
    }
  }, [maxPriceParams, minPriceParams, category, order, color]);

  useEffect(() => {
    const getVariations = async () => {
      try {
        const response = await axios.get(
          "https://shoe-shop-five.vercel.app/api/products/variations"
        );

        setVariations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getCategories = async () => {
      try {
        const response = await axios.get("/api/products/categories");

        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getData = async () => {
      try {
        console.log(page);
        const response = await axios.get(
          `https://shoe-shop-five.vercel.app/api/products?page=${page}`
        );

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getProductsCategory = async () => {
      const response = await axios.get(
        `https://shoe-shop-five.vercel.app/api/products?category=${category}`
      );

      setData(response.data);
    };

    const getproductsColor = async () => {
      try {
        const response = await axios.get(
          `https://shoe-shop-five.vercel.app/api/products?color=${color}`
        );

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getProductsPrice = async () => {
      try {
        const response = await axios.get(
          `https://shoe-shop-five.vercel.app/api/products?min=${minPriceParams}&max=${maxPriceParams}`
        );

        console.log(response);

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getProductsSearch = async () => {
      try {
        const response = await axios.get(
          `https://shoe-shop-five.vercel.app/api/products?search=${searchValue}`
        );

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getProductsOrder = async () => {
      try {
        const response = await axios.get(
          `https://shoe-shop-five.vercel.app/api/products?order=${order}`
        );

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (
      category ||
      color ||
      minPriceParams ||
      maxPriceParams ||
      order ||
      searchValue
    ) {
      if (category) {
        getProductsCategory();
      } else if (color) {
        getproductsColor();
      } else if (minPriceParams || maxPriceParams) {
        getProductsPrice();
      } else if (order) {
        getProductsOrder();
      } else if (searchParams) {
        getProductsSearch();
      }
    } else {
      getData();
    }

    getVariations();
    getCategories();
  }, [
    category,
    color,
    minPriceParams,
    maxPriceParams,
    order,
    searchValue,
    page,
  ]);

  const handleFilterPrice = () => {
    router.push(`/shop?min=${minPrice || 0}&max=${maxPrice || 5000}`);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      if (search) {
        handleSearch();
        setSearch("");
      }
    }
  };

  const handleChangeFilterPrice = (e) => {
    const { name, value } = e.target;

    if (name === "min-price") {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  const handleChangeOrder = (e) => {
    const { value } = e.target;

    router.push(`/shop?order=${value}`);
  };

  const handleSearch = () => {
    router.push(`/shop?search=${search}`);
  };

  return (
    <main>
      <div className={`sale-container ${poppins.className}`}>
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
          <button onClick={handleSearch}>
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
            onKeyDown={handleEnterKeyPress}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            className="input-search"
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>
        {width > 1200 ? (
          <div className="filters-options-container">
            <span>Sort By</span>
            <select
              onChange={handleChangeOrder}
              defaultValue={"default"}
              name="sort"
            >
              <option value="default" disabled>
                Select
              </option>
              <option value="min-max">Price min - max</option>
              <option value="max-min">Price max - min</option>
            </select>
          </div>
        ) : (
          <button className="button-filter-show" onClick={handlePanel}>
            Filters
          </button>
        )}
      </div>
      <section className="principal-section-shop">
        <div
          className={
            filterPanel === false
              ? "filters-panel-shop"
              : "filters-panel-shop-active"
          }
        >
          <div className="sticky-panel-filter">
            {width <= 1200 && (
              <button className="button-filter-hide" onClick={handlePanel}>
                Close panel
              </button>
            )}
            <div className="category-filters-shop">
              <h3>CATEGORIES</h3>
              <div>
                {categories?.map((c, index) => (
                  <Link
                    onClick={() => setFilterPanel(false)}
                    key={index}
                    className="categories-link-filter"
                    href={`/shop?category=${c}`}
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
                  value={minPrice}
                  placeholder="Min"
                  className="filter-price-inputs"
                  type="number"
                  name="min-price"
                  onChange={handleChangeFilterPrice}
                />
                <input
                  value={maxPrice}
                  placeholder="Max"
                  className="filter-price-inputs"
                  type="number"
                  name="max-price"
                  onChange={handleChangeFilterPrice}
                />
                <button
                  onClick={handleFilterPrice}
                  className="filter-price-button"
                >
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
                {variations?.map((c, index) => (
                  <Link
                    onClick={() => setFilterPanel(false)}
                    key={index}
                    href={`/shop?color=${c.name}`}
                    style={{ backgroundColor: c.color }}
                  ></Link>
                ))}
              </div>
            </div>
            {hasFilter && (
              <Link href={"/shop"} className="filter-panel-clear-filter">
                Clear filter
              </Link>
            )}
          </div>
        </div>
        <div className="products-panel-shop">
          <div className="products-cards-container-shop">
            {data
              ? data.docs.map((s, index) => (
                  <CardShop
                    key={index}
                    width={width}
                    name={s.name}
                    img={s.images[0] || s.variations[0].images[0]}
                    brand={s.brand}
                    in_discount={s.in_discount}
                    price={s.in_discount ? s.discount_price : s.original_price}
                    variations={s.variations.length}
                    backgroundColor={s.background_card}
                    id={s._id}
                  />
                ))
              : arrayAux.map((item) => {
                  return (
                    <div className="shop-card-skeleton" key={item}>
                      <div className="shop-card-skeleton-image"></div>
                      <div className="shop-card-skeleton-info-container">
                        <div className="shop-card-skeleton-name"></div>
                        <div className="shop-card-skeleton-price"></div>
                      </div>
                    </div>
                  );
                })}
          </div>
          <Pagination
            currentPage={data?.page}
            hasNextPage={data?.hasNextPage}
            hasPrevPage={data?.hasPrevPage}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
