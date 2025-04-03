import React from "react";
import styles from "./FeaturedTrips.module.css";

const trips = [
  {
    image: "/assets/beach.jpg",
    title: "Escapade Tropicale",
    description: "Profitez du soleil, de la mer et du sable blanc sur une plage paradisiaque.",
  },
  {
    image: "/assets/mountain.jpg",
    title: "Aventure en Montagne",
    description: "Randonnez à travers des paysages époustouflants et respirez l’air pur.",
  },
  {
    image: "/assets/city.jpg",
    title: "City Break",
    description: "Explorez les capitales animées et leur richesse culturelle.",
  },
];

export default function FeaturedTrips() {
  return (
    <section className={styles.tripsSection}>
      <h2>Voyages Populaires</h2>
      <div className={styles.tripsGrid}>
        {trips.map((trip, index) => (
          <div key={index} className={styles.tripCard}>
            <img src={trip.image} alt={trip.title} />
            <h3>{trip.title}</h3>
            <p>{trip.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
