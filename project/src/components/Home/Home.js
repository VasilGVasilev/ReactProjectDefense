import { Link } from "react-router-dom";

const Home = () => {

    return(
            <section className="home">
                <Link to={`/catalog`} style={{textDecoration:'none'}}><h1> CLICK CLICK CLICK</h1></Link>
            </section>
    );
};

export default Home;