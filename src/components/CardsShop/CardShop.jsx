import Link from "next/link";
import "./CardShop.css";

export default function CardShop({name,img,brand,price,variations, backgroundColor, id}) {


    const parseName = (name) => {
        if (name.length > 18) {
            return name.slice(0, 18) + "...";
          } else {
            return name;
          }
    }


  return (
    <Link href={`/detail/${id}`} className="card-shop-all-container">
      <div className="img-container-card-shop" style={{backgroundColor: backgroundColor}}>
        <img className="img-card-shop" src={img} alt={name} />
      </div>
      <div className="principal-information-card-shop">
        <div className="name-container"><h2>{parseName(name)}</h2></div>
        <div className="price-container"><h2>${price}</h2></div>
      </div>
      <div className="secondary-information-card-shop">
        <div className="brand-container"><h4>{brand}</h4></div>
        <div className="variations-container"><h4>Colours: {variations === 0 ? 1 : variations}</h4></div>
      </div>
    </Link>
  );
}
