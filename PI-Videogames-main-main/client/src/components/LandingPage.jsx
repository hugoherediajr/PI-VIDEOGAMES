import { Link } from "react-router-dom";
import { background, homeBtn, home_span,title1 } from "./LandingPage.module.css";
function LandingPage() {
  return (
    <div className={background}>
      <div className={title1}>VideoGames</div>
      <Link to="/videogame">
        <div className={homeBtn}></div>
        <span className={home_span}>Click to Home</span>
      </Link>
    </div>
  );
}

export default LandingPage;
