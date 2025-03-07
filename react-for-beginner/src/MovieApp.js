import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import MovieHome from "./router/MovieHome";
import MovieDetail from "./router/MovieDetail";

function MovieApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MovieHome />} />
                <Route path="/movieDetail" element={<MovieDetail />} />
            </Routes>
        </Router>
    );
}

export default MovieApp;