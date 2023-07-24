import "./pageShop.css";
import axios from "axios";
import shoeSale from "../../../public/assets/Shoe-sale.png";
import { shoes } from "@/Utils/shoes";
import CardShop from "@/components/CardsShop/CardShop";

export default function Shop() {
  const handleFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "shoe-shop");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dycpuotwh/image/upload",
      data
    );
    const file = await res.data;
    console.log(file);
  };

  return (
    <main>
      <div className="sale-container">
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
          <button>
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
            autoComplete="off"
            className="input-search"
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>
        <div className="filters-options-container">
          <span>Sort By</span>
          <select defaultValue={"default"} name="sort">
            <option value="default" disabled>
              Select
            </option>
            <option value="price-min">Price min - max</option>
            <option value="price-max">Price max - min</option>
          </select>
        </div>
      </div>
      <section className="principal-section-shop">
        <div className="filters-panel-shop">
          <h4>Filters</h4>
        </div>
        <div className="products-panel-shop">
          <div className="products-cards-container-shop">
              {shoes.slice(0,9).map(s => <CardShop name={s.name} img={s.images[0] || s.variations[0].images[0]} brand={s.brand} price={s.in_discount ? s.discount_price : s.original_price} variations={s.variations.length} backgroundColor={s.background_card} id={s.id}/>)}
          </div>
        </div>
      </section>
    </main>
  );
}
