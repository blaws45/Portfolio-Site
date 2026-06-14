import React from "react";
import styles from "./styles/ProjectCard.module.css";
import projectImage from "./images/preview.png"

function ProjectCard() {
    return (
        <div className={styles.card}>
            <img src={projectImage} alt={"preview"}/>
            <div className={styles.overlay}></div>
            <button className={styles.visitButton}>Visit</button>
            <h3 className={styles.title}><span className={styles.arrow}>&rarr;</span> Project Title</h3>
            <p className={styles.description}>description</p>
        </div>
    );
}

export default ProjectCard;