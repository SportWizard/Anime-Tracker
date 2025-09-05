import styles from "./Anime.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "./config";

function Anime() {
    const navigate = useNavigate();

    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`${API_URL}/api/animes`);

                setAnimeList(res.data.results);
            }
            catch (err) {
                console.error("Error:", err);
            }
        }

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            {animeList.map((anime) => {
                return (
                    <div key={anime.id}>
                        <button
                            className={styles.anime}

                            style={{ backgroundImage: `url("${anime.img_url}")` }}

                            onClick={() => {
                                localStorage.setItem("id", anime.id);
                                navigate("/anime-info");
                            }}></button>

                        <h2 className={styles.animeTitle}>{anime.anime_name}</h2>
                    </div>
                );
            })}
        </div>
    );
}

export default Anime;
