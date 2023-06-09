import CatalogItem from "./CatalogItem/CatalogItem";
import { useMatchContext } from '../../contexts/MatchContext'

const Catalog = () => {
    const { matches } = useMatchContext();
    return(
            <section className="catalogPage">
                <div className="container">

                        <div className="title">
                            <h1>All matches</h1>
                        </div>
                        <div className="carousel">
                            <div className="carouselBox" style={matches?.length < 6 ? {justifyContent:'center'} : {}}>
                                {matches?.length > 0 //data validation ?.
                                    ? matches.slice(0).reverse().map(match => <CatalogItem key={match._id} match={match}/>)
                                    : <h3 className="noMatches">No matches yet</h3>
                                }
                            </div>
                            <div className="switchLeft sliderButton"></div>
                            <div className="switchRight sliderButton"></div>
                        </div>

                </div>
            </section>
    );
};
export default Catalog;

// .slice(0).reverse() is to show first last added match to state