"use client";
import useWindowDimensions from "@/Hooks/UseWindowDimensions";
import "./cardCreate.css";

export default function CardCreate({ data }) {
  
  const { width, height } = useWindowDimensions();

  const parseName = (name) => {
    if (width > 800) {
      if (name.length > 16) {
        return name.slice(0, 16) + "...";
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
    <div className="card-create-container">
      <div
        style={{ backgroundColor: data.background_card }}
        className="card-create-image-container"
      >
        {data.images[0] || data.variations[0]?.images[0] ? (
          <img
            src={ data.variations[0]?.images[0] || data.images[0]}
            alt={data.name}
          />
        ) : (
          <div className="card-create-div-image"></div>
        )}
      </div>
      <div className="card-create-principal-info">
        <div className="name-container-card-create">
          {data.name ? (
            <h2>{parseName(data.name)}</h2>
          ) : (
            <div className="card-create-div-name"></div>
          )}
        </div>
        <div className="price-container-card-create">
          {data.in_discount ? (
            <h2>${data.discount_price}</h2>
          ) : data.original_price === 0 || data.original_price === "" ? (
            <div className="card-create-div-price"></div>
          ) : (
            <h2>${data.original_price}</h2>
          )}
        </div>
      </div>
      <div className="card-create-secondary-info">
        <div className="brand-container-card-create">
          {data.brand ? (
            <h4>{data.brand}</h4>
          ) : (
            <div className="card-create-div-brand"></div>
          )}
        </div>
        <div className="variation-container-create-card">
          <h4>
            Colors:{" "}
            {data.variations.length === 0 ? "1" : data.variations.length}
          </h4>
        </div>
      </div>
    </div>
  );
}
