import React from "react";
import styles from "./styles/SkillsCard.module.css";

interface SkillsCardProps {
    className?: string;
}

function SkillsCard( { className }: SkillsCardProps) {
    return (
      <div className={`${styles.card} ${className ?? ""}`}>
          <h3>Skill Title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis maiores nulla perspiciatis ullam
              voluptatibus! Consequatur dignissimos ipsum magnam minima nam nulla provident quisquam quo, sapiente
              voluptatem. At deleniti laudantium optio.
          </p>
      </div>
    );
}

export default SkillsCard;