import React from "react";
import styles from "./styles/ProjectCard.module.css";
import projectImage from "./images/preview.png";
import cafeImg from "./images/cafePreview.png";

interface ProjectCardProps {
    projectName: string;
    description: string;
    link: string;
    img: string;
}

const imagesDict: Record<string, string> = {
    cafe: cafeImg,
    sports: projectImage
};

function ProjectCard(props: ProjectCardProps) {
    return (
        <div className={styles.card}>
            <img src={imagesDict[props.img]} alt={"preview"}/>
            <div className={styles.overlay}></div>
            <a className={styles.visitButton} href={props.link} target={"_blank"} rel={"noreferrer"}>Visit</a>
            <h3 className={styles.title}><span className={styles.arrow}>&rarr;</span> {props.projectName}</h3>
            <p className={styles.description}>{props.description}</p>
        </div>
    );
}

export default ProjectCard;