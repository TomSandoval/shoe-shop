"use client";

import { useCart } from "@/context/CartContext";
import "./pageCart.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Poppins } from "next/font/google";
import toast from "react-hot-toast";
import ReactCanvasConfetti from "react-canvas-confetti";
import axios from "axios";
import { useRouter } from "next/navigation";
import useWindowDimensions from "@/Hooks/UseWindowDimensions";

const poppinsBold = Poppins({ subsets: ["latin"], weight: "700" });

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

export default function Cart() {
  const { cartItems, getTotalCart, setCart, addProduct } = useCart();
  const refAnimationInstance = useRef(null);
  const {width,height} = useWindowDimensions();
  const router = useRouter()
  const session = useSession();
  const [email, setEmail] = useState("");
  const totalCartAmount = getTotalCart();
  const [paymentSucces, setPaymentSucces] = useState(false);
  const [address, setAddress] = useState({
    state: "",
    city: "",
    street: "",
    postalCode: "",
  });
  
  useEffect(() => {
    if (paymentSucces) {
      setCart([]);
      fire();
      toast.success('Successful purchase!')
      router.push('/');
    }
  }, [paymentSucces]);
  
  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);


  useEffect(() => {
    if (session.status === "authenticated") {
      const email = session.data.user.email;
      setEmail(email);
    }
  }, [session]);

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;

    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleChangeEmail = (e) => {
    const { value } = e.target;

    setEmail(value);
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
      <div key={index} className="card-cart-container">
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
          <span className="value-product-cart">
            value per unit: $
            {i.product.discount_price || i.product.original_price}
          </span>
        </div>
      </div>
    );
  };

  return (
    <main className="cart-all-container">
      <div>
        <section className="section-information-user">
          <h2 className={poppinsBold.className}>Shoe Shop</h2>
          <div className="one-input-container-cart">
            <label htmlFor="email">Email</label>
            {session.data ? (
              <input
                type="text"
                name="email"
                value={session.data.user.email}
                disabled
              />
            ) : (
              <input
                onChange={handleChangeEmail}
                value={email}
                type="email"
                name="email"
                id="email"
              />
            )}
          </div>
          <span>Address</span>
          <div className="hr-cart"></div>
          <div className="one-input-container-cart">
            <label htmlFor="state">State</label>
            <input
              onChange={handleChangeAddress}
              type="text"
              name="state"
              id="state"
            />
          </div>
          <div className="one-input-container-cart">
            <label htmlFor="city">City</label>
            <input
              onChange={handleChangeAddress}
              type="text"
              name="city"
              id="city"
            />
          </div>
          <div className="one-input-container-cart">
            <label htmlFor="postalCode">Postal code</label>
            <input
              onChange={handleChangeAddress}
              type="text"
              name="postalCode"
              id="postalCode"
            />
          </div>
          <div className="one-input-container-cart">
            <label htmlFor="street">Street</label>
            <input
              onChange={handleChangeAddress}
              type="text"
              name="street"
              id="street"
            />
          </div>
          <div className="paypal-button-container">
            {
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AXDt1YkSNd2ok4WN6uRSYSLXEPOGWE5RjppEerWQo1HHZMvxumy5HJWY1yGXiRyMBr_9EKcJqZkVTyy9",
                }}
              >
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: totalCartAmount,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const order = await actions.order?.capture();
                    try {
                      const response = await axios.post(
                        "https://shoe-shop-five.vercel.app/api/cart",
                        {
                          cartItems,
                          totalCartAmount,
                          email: email,
                          address: address,
                          order,
                        }
                      );

                      console.log(response);
                      if (response.status === 200) {
                        setPaymentSucces(true);
                      }
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  forceReRender={[
                    totalCartAmount,
                    email,
                    address.city,
                    address.street,
                    address.state,
                    address.postalCode,
                  ]}
                  disabled={
                    !address.city ||
                    !address.street ||
                    !email ||
                    !address.state ||
                    !address.postalCode
                  }
                />
              </PayPalScriptProvider>
            }
          </div>
        </section>
        <section
          className={
            cartItems.length > 0
              ? "section-cart-user"
              : "section-cart-user-center"
          }
        >
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              return handleCardCart(item, index);
            })
          ) : (
            <span>There are no products in the cart</span>
          )}
        </section>
        {width > 1200 && <span className="total-amount-cart">Total: ${totalCartAmount}</span>}
      </div>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </main>
  );
}
