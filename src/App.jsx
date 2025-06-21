import styles from "./App.module.css";
import PokemonList from "./Components/PokemonList";

function App() {
  return (
    <>
      <div className={`${styles["triangle-1"]}`}></div>
      <div className={`${styles["triangle-2"]}`}></div>
      <PokemonList />
      <div className={`${styles["circle-1"]}`}></div>
      <div className={`${styles["circle-2"]}`}></div>
    </>
  );
}

export default App;
