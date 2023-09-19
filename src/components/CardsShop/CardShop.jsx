import Link from "next/link";
import "./CardShop.css";

import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function CardShop({
  name,
  img,
  brand,
  price,
  variations,
  backgroundColor,
  in_discount,
  id,
  width,
}) {
  const parseName = (name) => {
    if (width > 800) {
      if (name.length > 18) {
        return name.slice(0, 18) + "...";
      } else {
        return name;
      }
    } else {
      if (name.length > 12) {
        return name.slice(0, 12) + "...";
      } else {
        return name;
      }
    }
  };

  return (
    <Link
      href={`/detail/${id}`}
      key={id}
      className={`card-shop-all-container ${roboto.className}`}
    >
      <div
        className="img-container-card-shop"
        style={{ backgroundColor: backgroundColor }}
      >
        <img className="img-card-shop" src={img} alt={name} />
      </div>
      <div className="principal-information-card-shop">
        <div className="name-container-card-shop">
          <h2>{parseName(name)}</h2>
        </div>
        <div className="price-container-card-shop">
          <h2>${price}</h2>
        </div>
      </div>
      <div className="secondary-information-card-shop">
        <div className="brand-container-card-shop">
          <h4>{brand}</h4>
        </div>
        <div className="variations-container-card-shop">
          <h4>Colors: {variations === 0 ? 1 : variations}</h4>
        </div>
      </div>
      {in_discount && <span className="on-sale-span-card-shop">On sale</span>}
    </Link>
  );
}
