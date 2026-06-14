import React from "react";
import styles from "./styles/SkillsCard.module.css";

interface SkillsCardProps {
    className?: string;
    skill: string;
    description: string;
}

function SkillsCard( { className, skill, description }: SkillsCardProps) {
    return (
      <div className={`${styles.card} ${className ?? ""}`}>
          <h3>{skill}</h3>
          <p>{description}</p>
      </div>
    );
}

export default SkillsCard;