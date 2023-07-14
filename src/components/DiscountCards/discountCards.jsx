import Link from "next/link";
import "./discountCards.css";

export default function DiscountCards({
  image,
  name,
  discountPrice,
  originalPrice,
  id,
}) {
  return (
    <Link style={{ cursor: "pointer", textDecoration: "none", color: "#000"}} href={`/detail/${id}`}>
      <div className="discount-card">
        <img className="discount-card-image" src={image} alt={name} />
        <div className="discount-card-hr"></div>
        <h1 className="discount-card-name">{name}</h1>
        <div className="discount-card-price-container">
          <h3 className="discount-price">${discountPrice}</h3>
          <h3 className="original-price">
            <span></span>${originalPrice}
          </h3>
        </div>
      </div>
    </Link>
  );
}
