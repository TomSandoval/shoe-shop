import "./homeCards.css";


export default function HomeCards({id,name,price,img}) {


    return (
        <div className="card-container">
            <div className="card-image-container">
                <img className="card-image" src={img} alt={name}/>
            </div>
            <div className="hr-card"></div>
            <div style={{width: "100%"}}>   
                <h3 className="card-name">
                    {name}
                </h3>
                <div className="card-info-container">
                    <h4 className="card-price">${price}</h4>
                    <button className="card-cart-button">Add cart</button>
                </div>
            </div>
        </div>
    )
}