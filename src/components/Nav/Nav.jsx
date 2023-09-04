"use client";
import Link from "next/link";
import "./Nav.css";
import { useEffect, useState } from "react";
import useWindowDimensions from "@/Hooks/UseWindowDimensions";
import { useSession, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "@/redux/cartslice";

export default function Header(props) {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  let [toggleMenu, setToggleMenu] = useState(false);
  const [toggleCartMenu, setToggleCartMenu] = useState(false);
  const [color, setColor] = useState(false);
  const cartitems = useSelector((state) => state.cart);

  const session = useSession();


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

  const handleCartMenu = () => {
    setToggleCartMenu(!toggleCartMenu);
  };

  const handleRemoveItemCart = (index) => {
    dispatch(remove(index));
    window.localStorage.setItem("cart", JSON.stringify(cartitems));
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
          <div>
            <span>Color: {i.colorSelected}</span>
            <span>Size: {i.sizeSelected}</span>
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
      {width >= 800 ? (
        <div className={`right-container-nav ${props.font.className}`}>
          <Link className="link-button-nav" href={"/testimonial"}>
            Testimonial
          </Link>
          <Link className="link-button-nav" href={"/about"}>
            About
          </Link>
          <Link className="link-button-nav" href={"/shop"}>
            Shop
          </Link>
          {session.status === "unauthenticated" && (
            <div>
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
          {session.data?.user?.email === "admin@email.com" && (
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
              <span>{cartitems.length}</span>
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
          <Link className="link-button-nav-default" href={"/login"}>
            Sign In
          </Link>
          <Link className="link-button-nav-default" href={"/register"}>
            Sign Up
          </Link>
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
          <button className="button-cart-nav">
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
        </div>
      )}
      {width < 800 && (
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
        {cartitems.map((i, index) => (
          <div
            className={`card-cart-items ${props.font.className}`}
            key={index}
          >
            {handleCardCart(i, index)}
          </div>
        ))}
        {cartitems.length > 0 && (
          <Link
            className={`button-buy-cart ${props.font.className}`}
            href={"/cart"}
          >
            Buy
          </Link>
        )}
      </div>
    </nav>
  );
}
