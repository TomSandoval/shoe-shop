
import Link from "next/link";
import "./CardShop.css";

export default function CardShop({name,img,brand,price,variations, backgroundColor, id, width}) {

    const parseName = (name) => {


      if(width > 800){
        if (name.length > 18) {
            return name.slice(0, 18) + "...";
          } else {
            return name;
          }
      } else {
        if (name.length > 14) {
          return name.slice(0,14) + "...";
        } else {
          return name
        }
      }
    }


  return (
    <Link  href={`/detail/${id}`}  className="card-shop-all-container">
      <div className="img-container-card-shop" style={{backgroundColor: backgroundColor}}>
        <img className="img-card-shop" src={img} alt={name} />
      </div>
      <div className="principal-information-card-shop">
        <div className="name-container-card-shop"><h2>{parseName(name)}</h2></div>
        <div className="price-container-card-shop"><h2>${price}</h2></div>
      </div>
      <div className="secondary-information-card-shop">
        <div className="brand-container-card-shop"><h4>{brand}</h4></div>
        <div className="variations-container-card-shop"><h4>Colours: {variations === 0 ? 1 : variations}</h4></div>
      </div>
    </Link>
  );
}
