import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import AnimeInfo from "./AnimeInfo.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/anime-info" element={<AnimeInfo />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
