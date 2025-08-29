import styles from "./Home.module.css";
import Anime from "./Anime.jsx";

function Home() {
    return (
        <>
            <h1 id={styles.title}>Anime Tracker</h1>

            <Anime />
        </>
    );
}

export default Home;
