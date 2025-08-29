import styles from "./Anime.module.css";
import { useNavigate } from "react-router-dom";

function Anime() {
    const navigate = useNavigate();

    let animeList = ["Sprited Away", "Your Name", "Demon Slayer", "Attack on Titan"];

    return (
        <div className={styles.container}>
            {animeList.map((anime, index) => {
                return (
                    <div key={index}>
                        <button className={styles.anime} onClick={() => { navigate("/anime-info") }}>
                            <img />
                        </button>

                        <h2 className={styles.animeTitle}>{anime}</h2>
                    </div>
                )
            })}
        </div>
    );
}

export default Anime;
