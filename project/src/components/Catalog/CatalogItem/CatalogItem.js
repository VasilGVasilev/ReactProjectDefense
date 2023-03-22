import { Link } from "react-router-dom";

const CatalogItem = ({game}) => {
    return(
        <div className="match">
            <div className="teamSides">
                <p>{game.teamOne}</p>
                <h5>VS</h5>
                <p>{game.teamTwo}</p>
            </div>
            <div className="buttons">
                <Link to={`/catalog/${game._id}`} className="detailsButton">Details</Link>
            </div>
        </div>
    );
};

export default CatalogItem;