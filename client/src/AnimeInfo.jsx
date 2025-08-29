import styles from "./AnimeInfo.module.css";
import { useNavigate } from "react-router-dom";

function AnimeInfo() {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => { navigate("/home") }}>
                ←
            </button>

            <div className={styles.container}>
                <div className={styles.box} id={styles.imgBox}>
                    <img height="300" width="200" />
                </div>

                <div className={styles.box}>
                    <ul id={styles.info}>
                        <li>Name: </li>
                        <li>Author: </li>
                        <li>Rating:</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default AnimeInfo;
