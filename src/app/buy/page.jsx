"use client";

import { useSearchParams } from "next/navigation";
import "./pageBuy.css";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { useSession } from "next-auth/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const poppinsBold = Poppins({ subsets: ["latin"], weight: "700" });

export default function Buy() {
  const searchParams = useSearchParams();
  const idProduct = searchParams.get("id");
  const sizeSelected = searchParams.get("sizeSelected");
  const colorSelected = searchParams.get("colorSelected");
  const [productBuy, setProductBuy] = useState();
  const session = useSession();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    state: "",
    city: "",
    street: "",
    postalCode: "",
  });

  useEffect(() => {
    const getDataProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${idProduct}`
        );

        setProductBuy(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getDataProduct();
  }, []);

  const handleChangeEmail = (e) => {
    const { value } = e.target;

    setEmail(value);
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;

    setAddress({
      ...address,
      [name]: value,
    });
  };

  let variationSelected;

  if (productBuy?.have_variations) {
    variationSelected = productBuy.variations.find(
      (variation) => variation.name === colorSelected
    );
  }

  return (
    <main className="buy-all-container">
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
                            value:
                              productBuy.discount_price ||
                              productBuy.original_price,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const order = await actions.order?.capture();
                    try {
                      const response = await axios.post(
                        "http://localhost:3000/api/order",
                        {
                          product: productBuy,
                          email: email,
                          sizeSelected,
                          colorSelected,
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
                    productBuy?.name,
                    email,
                    address.city,
                    address.street,
                    address.state,
                    address.postalCode,
                    sizeSelected,
                    colorSelected,
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
        <section className="section-product-buy">
          <div className="card-product-buy">
            <div className="image-product-buy">
              <img
                src={variationSelected?.images[0] || productBuy?.images[0]}
                alt={productBuy?.name}
              />
            </div>
            <div className="product-buy-info-container">
              <h3>{productBuy?.name}</h3>
              <div>
                <span>Color selected: {colorSelected}</span>
                <span>Size selected: {sizeSelected}</span>
              </div>
              <span>
                Price: $
                {productBuy?.discount_price || productBuy?.original_price}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
