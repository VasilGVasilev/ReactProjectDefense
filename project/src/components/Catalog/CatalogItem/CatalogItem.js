import { Link } from "react-router-dom";

// unlike majority of app, here we use props for unidirectional data flow
const CatalogItem = ({match}) => {
    return(
        <div className="match">
            <div className="teamSides">
                <p>{match.teamOne}</p>
                <h5>VS</h5>
                <p>{match.teamTwo}</p>
            </div>
            <div className="buttons">
                <Link to={`/catalog/${match._id}`} className="detailsButton">Details</Link>
            </div>
        </div>
    );
};

export default CatalogItem;