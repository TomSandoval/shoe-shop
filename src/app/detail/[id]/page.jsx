"use client";

import "./pageDetail.css";
import { shoes } from "@/Utils/shoes";
import { useEffect, useState } from "react";
import Link from "next/link";
import DiscountCards from "@/components/DiscountCards/discountCards";
import Footer from "@/components/Footer/footer";

const getData = (id) => {
  const found = shoes.filter((s) => s.id == id);

  if (found) {
    return found;
  } else {
    throw new Error("Product not found!");
  }
};

export default function Detail({ params }) {
  const idProduct = params.id;

  const [shoe, setShoe] = useState();
  const [selectedImage, setSelectedImage] = useState(0);
  const [colorSelected, setColorSelected] = useState(null);
  const [sizeSelected, setSizeSelected] = useState(null);
  const [Instock, setStock] = useState(null);

  useEffect(() => {
    const data = getData(idProduct);
    setShoe(data[0]);

    if (data[0].have_varations) {
      const variationInStock = data[0].variations.find(
        (v) => v.in_stock === true
      );

      const sizeInStock = variationInStock?.size.find((s) => s.stock > 0);

      setSizeSelected(sizeInStock.size);
      setColorSelected(variationInStock.name);
    } else {
      setColorSelected(data[0].color.name);
    }
  }, []);




  useEffect(()=>{

    if (shoe?.have_varations) {
      const shoeData = shoe.variations.find(v => v.name === colorSelected);

      const shoeSize = shoeData?.size.find(s => s.size == sizeSelected);

      shoeSize?.stock <= 0 ? setStock(false) : setStock(true);
      
    }



  },[sizeSelected, colorSelected])


  if (!shoe) {
    return <h1>Loading...</h1>;
  }

  let {
    id,
    name,
    description,
    images,
    brand,
    gender,
    in_stock,
    stock,
    category,
    have_varations,
    in_discount,
    original_price,
    discount_price,
    size,
    variations,
    features,
    material,
    color,
  } = shoe;

  const handleColorSelected = (e) => {
    const value = e.target.getAttribute("value");

    setColorSelected(value);
    setSelectedImage(0);
    const variationFound = variations.find((v) => v.name === value);
    const sizeInStock = variationFound?.size.find((s) => s.stock > 0);



    setSizeSelected(sizeInStock.size);
  };

  const handleOptionsImage = () => {
    if (!have_varations) {
      return images.map((i, index) => (
        <img
          onClick={() => setSelectedImage(index)}
          className="image-option"
          src={i}
          alt={name}
          key={index}
        />
      ));
    } else {
      const variationFound = variations.find((v) => v.name === colorSelected);

      return variationFound?.images.map((i, index) => (
        <img
          onClick={() => setSelectedImage(index)}
          className={
            index === selectedImage ? "image-option-selected" : "image-option"
          }
          src={i}
          key={index}
          alt={name}
        />
      ));
    }
  };

  const handlePrincipalImage = () => {
    if (!have_varations) {
      return <img src={images[0]} alt={name} />;
    } else {
      if (colorSelected) {
        const variationFound = variations.find((v) => v.name === colorSelected);

        return (
          <img
            className="selected-image"
            src={variationFound?.images[selectedImage]}
            alt={name}
          />
        );
      }
    }
  };

  const handleSize = () => {
    if (!have_varations) {
      return size.map((s, index) => (
        <option value={s} key={index}>
          {s}
        </option>
      ));
    } else {
      const variationFound = variations.find((v) => v.name === colorSelected);

      return variationFound?.size.map((s, index) => (
        <option value={s.size} key={index}>
          {s?.size}
        </option>
      ));
    }
  };

  const handleChangeSize = (e) => {
    setSizeSelected(e.target.value);
  };


  const handleStock = () => {
    if (!have_varations) {
      if (in_stock) {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <h3>Stock: </h3> <h3 className="stock-product">{stock}</h3>
          </div>
        );
      } else {

        return (
          <div style={{ display: "flex" }}>
            <h3>Stock: </h3>
            <h3 className="no-stock-error">No Stock</h3>
          </div>
        );
      }
    } else {
      const variationFound = variations.find((v) => v.name === colorSelected);

      const sizeFound = variationFound?.size.find(
        (s) => s.size == sizeSelected
      );

      if (sizeFound.stock > 0) {

        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <h3>Stock:</h3>
            <h3 className="stock-product">{sizeFound.stock}</h3>
          </div>
        );
      } else {

        return (

          <div style={{ display: "flex", gap: "10px" }}>
            <h3>Stock: </h3>
            <h3 className="no-stock-error">No stock</h3>
          </div>
        );
      }
    }
  };

  return (

    <main className="detail-section-all-container">
      <section className="detail-product-section-container">
        <div className="left-detail-product-information">
          <div className="detail-images-container">
            <div className="detail-image-options">{handleOptionsImage()}</div>
            {handlePrincipalImage()}
          </div>
          <div className="detail-description-product">
            <h2 className="detail-section-title">Description</h2>
            <div className="detail-hr"></div>
            <p className="detail-text">{description}</p>
          </div>
          <div className="detail-features-product">
            <h2 className="detail-section-title">Features</h2>
            <div className="detail-hr"></div>
            <p className="detail-text">Brand: {brand}</p>
            <br />
            <p className="detail-text">Gender: {gender}</p>
            <br />
            <p className="detail-text">Category: {category}</p>
            <br />
            <p className="detail-text">
              Material: {material}
            </p>
            <ul className="detail-features-product-list">
              {features.map((f, index) => (
                <li className="list-features-item" key={index}>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="detail-payment-section">
            <h2 className="detail-section-title">Payment and Security</h2>
            <div className="detail-hr"></div>
            <div className="detail-section-payment-icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 302"
              >
                <path
                  fill="#27346A"
                  d="M217.168 23.507C203.234 7.625 178.046.816 145.823.816h-93.52A13.393 13.393 0 0039.076 12.11L.136 259.077c-.774 4.87 2.997 9.28 7.933 9.28h57.736l14.5-91.971-.45 2.88c1.033-6.501 6.593-11.296 13.177-11.296h27.436c53.898 0 96.101-21.892 108.429-85.221.366-1.873.683-3.696.957-5.477-1.556-.824-1.556-.824 0 0 3.671-23.407-.025-39.34-12.686-53.765"
                ></path>
                <path
                  fill="#27346A"
                  d="M102.397 68.84a11.737 11.737 0 015.053-1.14h73.318c8.682 0 16.78.565 24.18 1.756a101.6 101.6 0 016.177 1.182 89.928 89.928 0 018.59 2.347c3.638 1.215 7.026 2.63 10.14 4.287 3.67-23.416-.026-39.34-12.687-53.765C203.226 7.625 178.046.816 145.823.816H52.295C45.71.816 40.108 5.61 39.076 12.11L.136 259.068c-.774 4.878 2.997 9.282 7.925 9.282h57.744L95.888 77.58a11.717 11.717 0 016.509-8.74z"
                ></path>
                <path
                  fill="#2790C3"
                  d="M228.897 82.749c-12.328 63.32-54.53 85.221-108.429 85.221H93.024c-6.584 0-12.145 4.795-13.168 11.296L61.817 293.621c-.674 4.262 2.622 8.124 6.934 8.124h48.67a11.71 11.71 0 0011.563-9.88l.474-2.48 9.173-58.136.591-3.213a11.71 11.71 0 0111.562-9.88h7.284c47.147 0 84.064-19.154 94.852-74.55 4.503-23.15 2.173-42.478-9.739-56.054-3.613-4.112-8.1-7.508-13.327-10.28-.283 1.79-.59 3.604-.957 5.477z"
                ></path>
                <path
                  fill="#1F264F"
                  d="M216.952 72.128a89.928 89.928 0 00-5.818-1.49 109.904 109.904 0 00-6.177-1.174c-7.408-1.199-15.5-1.765-24.19-1.765h-73.309a11.57 11.57 0 00-5.053 1.149 11.683 11.683 0 00-6.51 8.74l-15.582 98.798-.45 2.88c1.025-6.501 6.585-11.296 13.17-11.296h27.444c53.898 0 96.1-21.892 108.428-85.221.367-1.873.675-3.688.958-5.477-3.122-1.648-6.501-3.072-10.14-4.279a83.26 83.26 0 00-2.77-.865"
                ></path>
              </svg>
            </div>
            <p className="detail-text-payment">
              Your payment information is processed securely. We do not store
              credit card details nor have access to your credit card
              information.
            </p>
          </div>
        </div>
        <div className="right-detail-product-information">
          <div className="detail-principal-information-box">
            <div className="name-product-container">
              <h1 className="name-product">{name}</h1>
              <span className="brand-product">{brand}</span>
            </div>
            <div className="variations-container">
              <div className="colour-variations-container">
                <h4>Colour: {colorSelected}</h4>
                <div className="options-color-container">
                  {have_varations ? (
                    variations.map(
                      (v, index) =>
                        v.in_stock && (
                          <div
                            onClick={(e) => handleColorSelected(e)}
                            value={v.name}
                            key={index}
                            style={{ backgroundColor: v.color }}
                            className="product-color-options"
                          ></div>
                        )
                    )
                  ) : (
                    <div
                      style={{ backgroundColor: color.color }}
                      className="product-color-options"
                    ></div>
                  )}
                </div>
              </div>
              <div className="size-varitions-container">
                <h4>Size: </h4>
                <select
                  name="size"
                  value={sizeSelected}
                  onChange={(e) => handleChangeSize(e)}
                >
                  {handleSize()}
                </select>
              </div>
            </div>
            <div className="price-container">
              <h3 className="price-title-box">Price: </h3>
              {in_discount ? (
                <>
                  <h3 className="price-product">${discount_price}</h3>{" "}
                  <h3 className="old-price-product">
                    <span className="line-old-price-product"></span>$
                    {original_price}
                  </h3>
                </>
              ) : (
                <h3 className="price-product">${original_price}</h3>
              )}
            </div>
            <div className="stock-container">{handleStock()}</div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <div className="buttons-container">
                <button className={Instock ? "information-box-buttons" : "information-box-buttons-dissable"}>
                  Add to cart{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(0, 0, 0, 1)" }}
                  >
                    <circle cx="10.5" cy="19.5" r="1.5"></circle>
                    <circle cx="17.5" cy="19.5" r="1.5"></circle>
                    <path d="M21 7H7.334L6.18 4.23A1.995 1.995 0 0 0 4.333 3H2v2h2.334l4.743 11.385c.155.372.52.615.923.615h8c.417 0 .79-.259.937-.648l3-8A1.003 1.003 0 0 0 21 7zm-4 6h-2v2h-2v-2h-2v-2h2V9h2v2h2v2z"></path>
                  </svg>
                </button>
                <button className={Instock ? "information-box-buttons" : "information-box-buttons-dissable"}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="products-on-sale-section">
        <h2 className="products-on-sale-section-title">You may also like</h2>
        <div className="detail-hr"></div>
        <div className="cards-on-sale-container">
          {shoes.slice(0, 6).map((s, index) => (
            <DiscountCards key={index} image={s.imageURL || s.images[0]} name={s.name} discountPrice={s.discount_price} originalPrice={s.original_price} id={s.id} />
          ))}
        </div>
      </section>
    <Footer/>
    </main>
  );
}
