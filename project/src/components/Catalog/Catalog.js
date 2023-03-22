import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = ({
    games
}) => {
    return(
            <section className="catalogPage">
                <div className="container">

                        <div className="title">
                            <h1>All matches</h1>
                        </div>
                        <div className="carousel">
                            <div className="carouselBox" style={games?.length < 4 ? {justifyContent:'center'} : {}}>
                                {games?.length > 0
                                    ? games.map(game => <CatalogItem key={game._id} game={game}/>)
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