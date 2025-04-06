import React from "react";
import styles from "./Footer.module.css";
import { FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.subscribe}>
        <h3>Abonnez-vous</h3>
        <div className={styles.inputGroup}>
          <input type="email" placeholder="Saisissez votre email" />
          <button>S'abonner</button>
        </div>
      </div>

      <div className={styles.footerLinks}>
        <div className={styles.logoSection}>
        <img src="/assets/logo.png" alt="logo" />
          <span className={styles.brand}>TravelRank</span>
        </div>
        <div className={styles.links}>
          <a href="#">Tarifs</a>
          <a href="#">À propos de nous</a>
          <a href="#">Caractéristiques</a>
          <a href="#">Contactez-nous</a>
        </div>
        <div className={styles.social}>
          <FaTwitter />
          <FaFacebook />
          <FaLinkedin />
          <FaYoutube />
        </div>
      </div>

      <div className={styles.footerBottom}>
        <select>
          <option value="fr">français</option>
          <option value="en">English</option>
        </select>
        <p>© 2025 Brand, Inc. • Privacy • Terms • Sitemap</p>
      </div>
    </footer>
  );
}
