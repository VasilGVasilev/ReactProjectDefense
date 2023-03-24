import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = ({
    matches
}) => {
    return(
            <section className="catalogPage">
                <div className="container">

                        <div className="title">
                            <h1>All matches</h1>
                        </div>
                        <div className="carousel">
                            <div className="carouselBox" style={matches?.length < 4 ? {justifyContent:'center'} : {}}>
                                {matches?.length > 0
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