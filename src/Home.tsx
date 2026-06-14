import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Home.css";
import testImg from "./images/testImg.png";
import SkillsCard from "./SkillsCard";

gsap.registerPlugin(ScrollTrigger);

function Home() {
    const root = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".heroContainer",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                    invalidateOnRefresh: true
                }
            });

            // Use transforms instead of fontSize (prevents layout shift bugs)
            tl.to(".heroTitleContainer h2", {
                scale: 0.5,
                y: -55,
                x: -220,
                ease: "none"
            });

            tl.to(".heroTitleContainer p", {
                fontSize: 24,
                duration: 0,
                ease: "none"
            }, 0);

            tl.to(".heroTitleContainer p", {
                opacity: 1,
                y: -90,
                ease: "none"
            }, "<50%");

            tl.to(".heroTitleContainer h1", {
                paddingBottom: 5,
                ease: "none"
            }, 0);

        }, root);

        // ----Wait for images to load before refresh-----
        const images = document.images;
        let loaded = 0;

        const onLoad = () => {
            loaded++;
            if (loaded >= images.length) {
                ScrollTrigger.refresh();
            }
        };

        Array.from(images).forEach((img) => {
            if (img.complete) {
                loaded++;
            } else {
                img.addEventListener("load", onLoad);
            }
        });

        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".skillsContainer",
                    start: "center center",
                    end: "+=2000",
                    pin: true,
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });

            const skillsCards = gsap.utils.toArray<HTMLElement>(".skillsCard");

            skillsCards.forEach((card, index) => {
                if (index > 0) {
                    tl.to(card, {
                        y: index * -775 ,
                        filter: `saturate(${1 - (index * 0.3)})`
                    })
                }
            })

        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={root}>
            <div className="heroContainer">
                <div className="heroTitleContainer">
                    <h1>Bryn Law-Smith</h1>
                    <h2>Software Developer</h2>

                    <p>
                        QUT graduate with a Bachelor of Information Technology majoring in Computer Science.
                        Full-stack developer experienced in building responsive web applications using WordPress,
                        HTML, CSS, JavaScript, Python, and database technologies. Strong attention to detail with a
                        focus on creating clean, user-friendly systems that balance functionality with intuitive design
                        for stakeholders and end users.
                    </p>
                </div>

                <div className="heroImgContainer">
                    <img className="heroImage" src={testImg} alt="Character Portrait" />
                </div>
            </div>

            <div className="skillsSection">
                <h2>Skills</h2>
                <div className="skillsContainer">
                    <SkillsCard className={"skillsCard"} />
                    <SkillsCard className={"skillsCard"} />
                    <SkillsCard className={"skillsCard"} />
                </div>
            </div>
            <br />
            <div className="Gap">
                <p>gap</p>
            </div>
        </div>
    );
}

export default Home;