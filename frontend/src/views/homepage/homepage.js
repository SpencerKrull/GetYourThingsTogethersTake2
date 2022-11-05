import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/getittogether.jpg"
// import "./home.scss"

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
        <nav className="container flex-between">
            <ul className="nav-home">
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                    <button className="btn btn-primary">
                    <Link to="/login">Log In</Link>
                    </button>
                </li>
                <li>
                    <button className="btn btn-primary">
                        <Link to="/dash">Dash</Link>
                    </button>
                </li>
            </ul>
        </nav>
        <section className="container hero">
            <div className="hero-text"></div>
                <p>For those of us who have too much stuff and can't keep it all in one place, I think it's time to...</p>
                <h2>Get It Together!</h2>
            <div className="hero-image"></div>
            <div className="flex-start">
                <Text text="Books" />
                <Text text="Music" />
                <Text text="Movies" />
                <Text text="Trading Cards" />
                <Text text="Anything Collectible!" />
            </div>

            <div className="hero-image">
                <img src={heroImage} alt="Cassettes" />
            </div>
        </section>
    </div>
  );
};

const Text = ({num, text}) => {
    return (
        <div className="mr">
            <p className="white">{text}</p>
        </div>
    )
}

export default Home;