import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Home.css";
import heroImg from "./images/enhanced_portrait.png";
import SkillsCard from "./SkillsCard";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

function Home() {
    const root = useRef(null);

    // ----Wait for images to load before refresh-----
    useEffect(() => {
        const images = document.images;
        let loaded = 0;

        const onLoad = () => {
            loaded++;
            if (loaded >= images.length) {
                requestAnimationFrame(() => {
                    ScrollTrigger.refresh();
                });
            }
        };

        Array.from(images).forEach((img) => {
            if (img.complete) {
                loaded++;
            } else {
                img.addEventListener("load", onLoad);
            }
        });

        if (loaded >= images.length) {
            requestAnimationFrame(() => ScrollTrigger.refresh());
        }
    }, []);

    //--------------------- Hero Animation ----------------------
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".heroContainer",
                    start: "top top",
                    end: "+=500",
                    scrub: true,
                    pin: true,
                    invalidateOnRefresh: true
                }
            });

            // Use transforms instead of fontSize (prevents layout shift bugs)
            tl.to(".heroTitleContainer h2", {
                scale: 0.5,
                y: -55,
                x: -165,
                ease: "none"
            });

            tl.to(".heroTitleContainer p", {
                duration: 0,
                ease: "none"
            }, 0);

            tl.to(".heroTitleContainer p", {
                opacity: 1,
                y: -90,
                ease: "none"
            }, "<50%");

            tl.to(".heroTitleContainer h1", {
                ease: "none"
            }, 0);

        }, root);

        return () => ctx.revert();
    }, []);

    //-----------------Card reveal animation--------------------
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".skillsSection",
                    start: "center center",
                    end: "+=2000",
                    pin: true,
                    scrub: true,
                    invalidateOnRefresh: false,
                    markers: true
                }
            });

            const skillsCards = gsap.utils.toArray<HTMLElement>(".skillsCard");

            skillsCards.forEach((card, index) => {
                if (index >= 0) {
                    tl.to(card, {
                        y: index * -725 ,
                        filter: `saturate(${1 - (index * 0.3)})`
                    })
                }
            })

        }, root);

        return () => ctx.revert();
    }, []);

    //---------------- Projects text animation -----------------
    useEffect(() => {
        const ctx = gsap.context(() => {
           const tl = gsap.timeline({
               scrollTrigger: {
                   trigger: ".projectsSection",
                   start: "top center",
                   end: "top top",
                   scrub: true,
                   invalidateOnRefresh: true
               }
           });

           tl.to(".projectsSection h2", {
               y: 0,
               fontSize: 100
           }, "<50%");

            tl.to(".projectsContainer > *", {
                y: 0,
                opacity: 1,
            }, 0);

            tl.to(".projectsContainer", {
                y: 0
            }, 0);

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
                    <img className="heroImage" src={heroImg} alt="Character Portrait" />
                </div>
            </div>

            <div className="skillsSection">
                <h2>What I do</h2>
                <div className="skillsContainer">
                    <SkillsCard className={"skillsCard"} />
                    <SkillsCard className={"skillsCard"} />
                    <SkillsCard className={"skillsCard"} />
                </div>
            </div>
            <br />
            <div className="projectsSection">
                <h2>Projects</h2>
                <div className="projectsContainer">
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                </div>
            </div>
        </div>
    );
}

export default Home;