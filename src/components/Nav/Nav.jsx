"use client";
import Link from "next/link";
import "./Nav.css";
import { useEffect, useState } from "react";
import useWindowDimensions from "@/Hooks/UseWindowDimensions";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import _ from "lodash";
import axios from "axios";

export default function Header(props) {
  const { width, height } = useWindowDimensions();
  let [toggleMenu, setToggleMenu] = useState(false);
  const [toggleCartMenu, setToggleCartMenu] = useState(false);
  const [color, setColor] = useState(false);
  const session = useSession();
  const { cartItems, addProduct, deleteProduct, setCart, getTotalCart } =
    useCart();
  const totalAmountCart = getTotalCart();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const colorNav = () => {
      if (window.scrollY >= 80) {
        setColor(true);
      } else {
        setColor(false);
      }
    };

    window.addEventListener("scroll", colorNav);
  }, [color]);


  useEffect(()=> {
    const getCategories = async () => {
      try {
        const response = await axios.get('https://shoe-shop-five.vercel.app/api/products/categories');

        setCategories(response.data)
      } catch (error) {
        console.error(error);
      }
    }

    getCategories()
  },[])

  const handleCartMenu = () => {
    setToggleCartMenu(!toggleCartMenu);
  };

  const handleRemoveItemCart = (index) => {
    deleteProduct(index);
  };

  const handleAddCart = (product, sizeSelected, colorSelected) => {
    let data = {
      sizeSelected,
      colorSelected,
      product,
      total: 1,
    };

    const productEqualWithTotal = cartItems.find((item) =>
      _.isEqual(item, data)
    );

    if (productEqualWithTotal) {
      const indexProductInCart = cartItems.findIndex((item) =>
        _.isEqual(item, data)
      );

      if (!product.have_variations) {
        const sizeStock = product.size.find(
          (size) => size.size == sizeSelected
        );

        if (sizeStock.stock >= 2) {
          const cartCopy = [...cartItems];
          cartCopy[indexProductInCart].total = 2;
          setCart(cartCopy);
          toast.success(`Product added to cart`);
          return;
        } else {
          toast.error("No more stock");
          return;
        }
      } else {
        const variationMatch = product.variations.find(
          (variation) => variation.name == colorSelected
        );

        const sizeStock = variationMatch.size.find(
          (size) => size.size == sizeSelected
        );

        if (sizeStock.stock >= 2) {
          const cartCopy = [...cartItems];
          cartCopy[indexProductInCart].total = 2;
          setCart(cartCopy);
          toast.success(`Product added to cart`);
          return;
        } else {
          toast.error("No more stock");
          return;
        }
      }
    } else {
      const productEqual = cartItems.find(
        (item) =>
          item.sizeSelected == sizeSelected &&
          item.colorSelected == colorSelected &&
          _.isEqual(item.product, product)
      );

      if (productEqual) {
        const totalProduct = productEqual.total;

        const indexProductInCart = cartItems.findIndex(
          (item) =>
            item.sizeSelected == sizeSelected &&
            item.colorSelected == colorSelected &&
            _.isEqual(item.product, product)
        );

        if (!product.have_variations) {
          const sizeStock = product.size.find(
            (size) => size.size == sizeSelected
          );

          if (sizeStock.stock > totalProduct) {
            const cartCopy = [...cartItems];
            cartCopy[indexProductInCart].total =
              cartCopy[indexProductInCart].total + 1;

            setCart(cartCopy);
            toast.success(`Product added to cart`);
            return;
          } else {
            toast.error("No more stock");
            return;
          }
        } else {
          const variationMatch = product.variations.find(
            (variation) => variation.name == colorSelected
          );

          const sizeStock = variationMatch.size.find(
            (size) => size.size == sizeSelected
          );

          if (sizeStock.stock > totalProduct) {
            const cartCopy = [...cartItems];
            cartCopy[indexProductInCart].total =
              cartCopy[indexProductInCart].total + 1;
            setCart(cartCopy);
            toast.success(`Product added to cart`);
            return;
          } else {
            toast.error("No more stock");
            return;
          }
        }
      }
    }
    addProduct(data);
    toast.success(`Product added to cart`);
    return;
  };

  const handleDiscountProduct = (indexProduct) => {
    const dataProduct = cartItems[indexProduct];

    if (dataProduct.total > 1) {
      const cartCopy = [...cartItems];

      cartCopy[indexProduct].total = cartCopy[indexProduct].total - 1;

      setCart(cartCopy);
    }
  };

  const handleCardCart = (i, index) => {
    let variationFound;
    if (i.product.have_variations) {
      variationFound = i.product.variations.find(
        (v) => v.name == i.colorSelected
      );
    }
    return (
      <div className="card-cart-container">
        <div className="card-cart-image-container">
          <img
            src={variationFound?.images[0] || i.product.images[0]}
            alt={i.product.name}
          />
        </div>
        <div className="card-cart-information-container">
          <h3>{i.product.name}</h3>
          <div className="info-variations-container">
            <span>Color: {i.colorSelected}</span>
            <span>Size: {i.sizeSelected}</span>
          </div>
          <div className="total-product-in-cart">
            <button onClick={() => handleDiscountProduct(index)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "rgba(255, 255, 255, 1)" }}
              >
                <path d="M5 11h14v2H5z"></path>
              </svg>
            </button>
            <span>{i.total}</span>
            <button
              onClick={() =>
                handleAddCart(i.product, i.sizeSelected, i.colorSelected)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "rgba(255, 255, 255, 1)" }}
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
            </button>
          </div>
          <button onClick={() => handleRemoveItemCart(index)}>Remove</button>
        </div>
      </div>
    );
  };

  return (
    <nav className={color ? "nav-all-container-color" : "nav-all-container"}>
      <div className="left-container-nav">
        <Link href={"/"}>
          <img
            src="/assets/Shoes-shop-logo.webp"
            alt="shoe shop logo"
            className="logo"
          />
        </Link>
      </div>
      {width >= 1200 ? (
        <div className={`right-container-nav ${props.font.className}`}>
          <div className="categories-button-nav" href={"/testimonial"}>
            <span>Categories</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "rgba(0, 0, 0, 1)" }}
              >
                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
              </svg>
            </span>
            <div className="categories-nav-container">
              {
                categories?.map((category,index) => <Link href={`/shop?category=${category}`} key={index}>{category}</Link>)
              }
            </div>
          </div>
          <Link className="link-button-nav" href={"/about"}>
            About
          </Link>
          <Link className="link-button-nav" href={"/shop"}>
            Shop
          </Link>
          {session.status === "unauthenticated" && (
            <div className="session-buttons-container">
              <Link className="link-button-nav" href={"/login"}>
                Sign In
              </Link>
              <Link className="link-button-nav-green" href={"/register"}>
                Sign Up
              </Link>
            </div>
          )}
          {session.status === "authorized" ||
            (session.status === "authenticated" && (
              <button className="link-button-nav-green" onClick={signOut}>
                Log out
              </button>
            ))}
          {session.data?.user?.roll === "ADMIN" && (
            <>
              <Link className="link-button-nav-green" href={"/dashboard"}>
                Dashboard
              </Link>
              <Link className="link-button-nav" href={"/create"}>
                Create
              </Link>
            </>
          )}
          <div className="button-cart-container-nav">
            <button onClick={handleCartMenu} className="button-cart-nav">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                style={{ fill: "rgba(128, 237, 153, 1)" }}
              >
                <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921z"></path>
                <circle cx="10.5" cy="19.5" r="1.5"></circle>
                <circle cx="17.5" cy="19.5" r="1.5"></circle>
              </svg>
              <span>{cartItems.length}</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${props.font.className}`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: "16px",
          }}
        >
          {session.status === "unauthenticated" ? (
            <>
              <Link className="link-button-nav-default" href={"/login"}>
                Sign In
              </Link>
              <Link className="link-button-nav-default" href={"/register"}>
                Sign Up
              </Link>
            </>
          ) : (
            <button onClick={signOut} className="button-nav-log-out">
              Log out
            </button>
          )}

          <div
            onClick={() => setToggleMenu(!toggleMenu)}
            className={
              toggleMenu === false
                ? "bar-menu-container"
                : "bar-menu-container-active"
            }
          >
            <span className="bar-menu"></span>
            <span className="bar-menu"></span>
            <span className="bar-menu"></span>
          </div>
          <button
            onClick={() => setToggleCartMenu(!toggleCartMenu)}
            className="button-cart-nav"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(128, 237, 153, 1)" }}
            >
              <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921z"></path>
              <circle cx="10.5" cy="19.5" r="1.5"></circle>
              <circle cx="17.5" cy="19.5" r="1.5"></circle>
            </svg>
          </button>
          <span>{cartItems.length > 0 ? cartItems.length : null}</span>
        </div>
      )}
      {width < 1200 && (
        <div className={toggleMenu ? "toggle-menu-active" : "toggle-menu"}>
          <div className="toggle-menu-container">
            <Link className="link-button-nav" href={"/shop"}>
              Shop
            </Link>
            <Link className="link-button-nav" href={"/about"}>
              About
            </Link>
            <Link className="link-button-nav" href={"/testimonial"}>
              Testimonial
            </Link>
          </div>
        </div>
      )}
      <div
        className={
          toggleCartMenu ? "toggle-cart-menu-active" : "toggle-cart-menu"
        }
      >
        {cartItems.length ? (
          cartItems.map((i, index) => (
            <div
              className={`card-cart-items ${props.font.className}`}
              key={index}
            >
              {handleCardCart(i, index)}
            </div>
          ))
        ) : (
          <div className="no-product-cart-menu">
            <span className={props.font.className}>
              There are no products in the cart
            </span>
          </div>
        )}
        {cartItems.length > 0 && (
          <>
            <span className="panel-cart-amount-total">
              Total: ${totalAmountCart}
            </span>
            <Link
              onClick={()=> setToggleCartMenu(false)}
              className={`button-buy-cart ${props.font.className}`}
              href={"/cart"}
            >
              Buy
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
