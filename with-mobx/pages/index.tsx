/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import store, { type Pokemon } from "../src/store";
import { observer } from "mobx-react-lite";

export async function getServerSideProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );

  store.pokemon = await resp.json();

  return {
    props: {
      initialPokemon: store.pokemon,
    },
  };
}

function Home({ initialPokemon }: { initialPokemon: Pokemon[] }) {
  useEffect(() => {
    store.pokemon = initialPokemon;
  }, [initialPokemon]);

  return (
    <div className={styles.main}>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <input
          type="text"
          value={store.filter}
          onChange={(e) => (store.filter = e.target.value)}
          className={styles.search}
        />
      </div>
      <div className={styles.container}>
        {store.filteredPokemon.slice(0, 20).map((p) => (
          <div key={p.id} className={styles.image}>
            <img
              alt={p.name}
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${p.image}`}
            />
            <h2>{p.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(Home);
