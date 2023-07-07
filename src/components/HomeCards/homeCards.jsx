import useWindowDimensions from "@/Hooks/UseWindowDimensions";
import "./homeCards.css";


export default function HomeCards({id,name,price,img}) {

    const {width, height} = useWindowDimensions();

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
                    <button className="card-cart-button"><svg xmlns="http://www.w3.org/2000/svg" width={width < 800 ? "20": "24"} height={width < 800 ? "20" : "24"} viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle><path d="M21 7H7.334L6.18 4.23A1.995 1.995 0 0 0 4.333 3H2v2h2.334l4.743 11.385c.155.372.52.615.923.615h8c.417 0 .79-.259.937-.648l3-8A1.003 1.003 0 0 0 21 7zm-4 6h-2v2h-2v-2h-2v-2h2V9h2v2h2v2z"></path></svg></button>
                </div>
            </div>
        </div>
    )
}