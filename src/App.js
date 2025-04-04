import React, { useState } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.png";

// Composants externes
import Footer from "./components/Footer";
import FeaturedTrips from "./components/FeaturedTrips";

export default function App() {
  const [view, setView] = useState("home");
  const [newDay, setNewDay] = useState("");
  const [itineraryTitle, setItineraryTitle] = useState("");
  const [currentItinerary, setCurrentItinerary] = useState([]);
  const [sharedItineraries, setSharedItineraries] = useState([]);
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState(null);
  const [username, setUsername] = useState("");
  const [shareSuccess, setShareSuccess] = useState(false);

  const exampleItineraries = [
    {
      title: "Aventure nature",
      days: ["Musée", "Forêt", "Barbecue"],
      user: "Aventureuse Anna",
      score: 82,
      date: "02/04/2025",
    },
    {
      title: "Vacances tropicales",
      days: ["Plage", "Plongée", "Cocktail"],
      user: "Tropical Tom",
      score: 91,
      date: "01/04/2025",
    },
  ];

  const handleAddDay = () => {
    if (newDay.trim()) {
      setCurrentItinerary([...currentItinerary, newDay]);
      setNewDay("");
    }
  };

  const handleRemoveDay = (idx) => {
    setCurrentItinerary(currentItinerary.filter((_, i) => i !== idx));
  };

  const handleShare = () => {
    if (!itineraryTitle.trim()) return alert("Ajoute un titre à ton itinéraire !");
    const score = Math.min(100, 60 + currentItinerary.length * 10);
    const newItinerary = {
      id: Date.now(),
      title: itineraryTitle,
      days: currentItinerary,
      user: user || "Anonyme",
      score,
      date: new Date().toLocaleDateString("fr-FR"),
    };
    setSharedItineraries([...sharedItineraries, newItinerary]);
    setCurrentItinerary([]);
    setItineraryTitle("");
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
      setView("compare");
    }, 1500);
  };

  const handleEdit = (id) => {
    const itinerary = sharedItineraries.find((it) => it.id === id);
    if (itinerary) {
      setItineraryTitle(itinerary.title);
      setCurrentItinerary(itinerary.days);
      setSharedItineraries(sharedItineraries.filter((it) => it.id !== id));
      setView("create");
    }
  };

  const handleDelete = (id) => {
    setSharedItineraries(sharedItineraries.filter((it) => it.id !== id));
  };

  const handleLogin = () => {
    if (username.trim()) {
      setUser(username);
      setAuthView(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView("home");
  };

  return (
    <div className={styles.app}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={logo} alt="logo" className={styles.logo} />
          <h1 className={styles.brand}>Travel Rank</h1>
        </div>
        <nav className={styles.nav}>
          <a href="#" onClick={() => setView("home")}>Accueil</a>
          <a href="#" onClick={() => setView("explore")}>Explorer</a>
          <a href="#" onClick={() => setView("compare")}>Classement</a>
          <a href="#" onClick={() => setView("profile")}>Profil</a>
        </nav>
        <div className={styles.right}>
          {user ? (
            <>
              <span>👋 {user}</span>
              <button className={styles.signupBtn} onClick={handleLogout}>Se déconnecter</button>
            </>
          ) : (
            <>
              <button className={styles.signupBtn} onClick={() => setAuthView("signup")}>S'inscrire</button>
              <button className={styles.signupBtn} onClick={() => setAuthView("login")}>Login</button>
            </>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main className={styles.main}>
        {/* Login/Signup */}
        {authView && (
          <div className={styles.section}>
            <h2>{authView === "login" ? "Connexion" : "Inscription"}</h2>
            <input
              type="text"
              placeholder="Votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Valider</button>
          </div>
        )}

        {/* Page d’accueil */}
        {view === "home" && !authView && (
          <div className={styles.section}>
            <img src={logo} alt="Illustration" className={styles.mainImage} />
            <h2 className={styles.title}>Travel Rank</h2>
            <p className={styles.subtitle}>
              Crée, partage et compare tes itinéraires de voyage avec la communauté.
            </p>
            <div className={styles.actions}>
              <button onClick={() => setView("create")}>Créer</button>
              <button onClick={() => setView("compare")}>Comparer</button>
              <button onClick={() => setView("explore")}>Explorer</button>
            </div>
            <FeaturedTrips />
          </div>
        )}

        {/* Création d’itinéraire */}
        {view === "create" && (
          <div className={styles.section}>
            <h2>Créer mon itinéraire</h2>
            <input
              type="text"
              placeholder="Titre de l’itinéraire (ex: Week-end à Rome)"
              value={itineraryTitle}
              onChange={(e) => setItineraryTitle(e.target.value)}
              className={styles.input}
            />
            <div className={styles.dayInputGroup}>
              <input
                type="text"
                placeholder="Ajouter une activité pour un jour"
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
                className={styles.input}
              />
              <button onClick={handleAddDay} className={styles.addButton}>Ajouter</button>
            </div>
            <ul className={styles.dayList}>
              {currentItinerary.map((day, idx) => (
                <li key={idx} className={styles.dayItem}>
                  Jour {idx + 1} : {day}
                  <button onClick={() => handleRemoveDay(idx)} className={styles.deleteButton}>🗑️</button>
                </li>
              ))}
            </ul>
            {currentItinerary.length > 0 && (
              <button onClick={handleShare} className={styles.shareButton}>📤 Partager l'itinéraire</button>
            )}
            {shareSuccess && <p className={styles.success}>🎉 Itinéraire partagé avec succès !</p>}
          </div>
        )}

        {/* Classement */}
        {view === "compare" && (
          <div className={styles.section}>
            <h2>Classement des itinéraires</h2>
            {[...sharedItineraries].sort((a, b) => b.score - a.score).map((itinerary) => (
              <div key={itinerary.id} className={styles.itineraryCard}>
                <p><strong>{itinerary.title}</strong> par {itinerary.user}</p>
                <p>Score : <span className={itinerary.score >= 90 ? styles.highScore : styles.score}>{itinerary.score}/100</span> {itinerary.score > 90 && <span>🏅 Top itinéraire</span>}</p>
                <p>Date : {itinerary.date}</p>
                <ul>
                  {itinerary.days.map((day, d) => (
                    <li key={d}>Jour {d + 1} : {day}</li>
                  ))}
                </ul>
                {user === itinerary.user && (
                  <div>
                    <button onClick={() => handleEdit(itinerary.id)}>Modifier</button>
                    <button onClick={() => handleDelete(itinerary.id)}>Supprimer</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Explorer */}
        {view === "explore" && (
          <div className={styles.section}>
            <h2>Explorer les itinéraires populaires</h2>
            {exampleItineraries.map((itin, idx) => (
              <div key={idx} className={styles.itineraryCard}>
                <p><strong>{itin.title}</strong> par {itin.user}</p>
                <p>Score : {itin.score}/100 {itin.score > 90 && <span>🏅</span>}</p>
                <p>Date : {itin.date}</p>
                <ul>
                  {itin.days.map((day, d) => (
                    <li key={d}>Jour {d + 1} : {day}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Profil */}
        {view === "profile" && user && (
          <div className={styles.section}>
            <h2>Mon Profil</h2>
            <p>Bienvenue <strong>{user}</strong> !</p>
            <p>Itinéraires partagés : {sharedItineraries.filter(i => i.user === user).length}</p>
            <p>Score moyen : {
              Math.round(
                sharedItineraries.filter(i => i.user === user).reduce((acc, i) => acc + i.score, 0) /
                Math.max(1, sharedItineraries.filter(i => i.user === user).length)
              )
            } / 100</p>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
