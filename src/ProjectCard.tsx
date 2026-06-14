import React from "react";
import styles from "./styles/ProjectCard.module.css";

function ProjectCard() {
    return (
        <div className={styles.card}>
            <div className={styles.overlay}></div>
            <button className={styles.visitButton}>Visit</button>
            <h3 className={styles.title}><span className={styles.arrow}>&rarr;</span> Project Title</h3>
            <p className={styles.description}>description</p>
        </div>
    );
}

export default ProjectCard;