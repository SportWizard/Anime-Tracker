import styles from "./AnimeInfo.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "./config";

function AnimeInfo() {
    const navigate = useNavigate();

    const [animeInfo, setAnimeInfo] = useState({
        anime_name: null,
        img_url: null,
        author: null,
        rating: null
    });

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${API_URL}/api/anime-info?id=${localStorage.getItem("id")}`);

            setAnimeInfo(res.data.result);
        }

        fetchData();
    }, []);

    return (
        <>
            <button onClick={() => { navigate("/home"); }}>
                ←
            </button>

            <button id={styles.editButton} onClick={() => { navigate(); }}>
                EDIT
            </button>

            <div className={styles.container}>
                <div className={styles.box} id={styles.imgBox}>
                    <img src={animeInfo.img_url} height="300" width="200" />
                </div>

                <div className={styles.box}>
                    <ul id={styles.info}>
                        <li>Name: {animeInfo.anime_name}</li>
                        <li>Author: {animeInfo.author}</li>
                        <li>Rating: {animeInfo.rating}</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default AnimeInfo;
