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
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                    invalidateOnRefresh: true
                }
            });

            // Use transforms instead of fontSize (prevents layout shift bugs)
            tl.to(".heroTitleContainer h2", {
                scale: 0.6,
                y: "-100%",
                x: "-20%",
                ease: "none"
            });

            tl.to(".heroTitleContainer p", {
                duration: 0,
                ease: "none"
            }, 0);

            tl.to(".heroTitleContainer p", {
                opacity: 1,
                y: "-40%",
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
                    start: "center 55%",
                    end: "+=2000",
                    pin: true,
                    scrub: true,
                    invalidateOnRefresh: false
                }
            });

            const skillsCards = gsap.utils.toArray<HTMLElement>(".skillsCard");
            const colours: string[] = [
                "#9f8a6a",
                "#d9c3a1",
                "#e1cfb4",
                "#ead3a8"
            ]
            skillsCards.forEach((card, index) => {
                if (index > 0) {
                    tl.to(card, {
                        y: `${index * -140}%`,
                        backgroundColor: colours[index]
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
                   start: "top 90%",
                   end: "top top",
                   scrub: true,
                   invalidateOnRefresh: true
               }
           });

           tl.to(".projectsSection h2", {
               y: 0,
               fontSize: 50
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
                    <h1 className={"hi"}>Hi, I'm</h1>
                    <h1 className={"nameTitle"}>Bryn Law-Smith</h1>
                    <h2>Graduate Software Developer</h2>
                    <p>
                        A 2025 QUT graduate with a Bachelor of Information Technology (Computer Science).
                        I'm a friendly, easy to get along with team member who always strives for the
                        highest-quality. I look at systems with a strong attention to detail mixing functionality
                        with intuitive design to make them as clean, user-friendly and professional as possible.
                    </p>
                </div>

                <div className="heroImgContainer">
                    <img className="heroImage" src={heroImg} alt="Character Portrait" />
                </div>
            </div>

            <div className="skillsSection">
                <h2>I Specialise In...</h2>
                <div className="skillsContainer">
                    <SkillsCard className={"skillsCard"} skill={"Web Design"} description={
                        "Designing modern, user-focused interfaces using tools such as Figma and sketching techniques." +
                        " I turn ideas into clear low and high-fidelity designs with a focus on usability," +
                        " responsiveness, and clean modern design."}/>
                    <SkillsCard className={"skillsCard"} skill={"Web Development"} description={
                        "Building responsive and accessible websites using HTML, CSS, and JavaScript." +
                        " I translate design concepts into functional, polished interfaces and use tools like GSAP" +
                        " to create engaging animations that enhance user experience and interaction."}/>
                    <SkillsCard className={"skillsCard"} skill={"Back-End Development"} description={"" +
                        "Developing and integrating scalable back-end systems using JavaScript," +
                        " Node.js, SQL, and REST APIs."}/>
                </div>
            </div>
            <br />
            <div className="projectsSection">
                <h2>Some of My Work</h2>
                <div className="projectsContainer">
                    <ProjectCard projectName={"Sports Streaming Site"}
                                 description={"Frontend showcase styled as streaming service"}
                                 link={"https://blaws45.github.io/sportStreamingSite/"}
                                 img={"sports"}/>
                    <ProjectCard projectName={"Where is ya bean"}
                                 description={"WordPress site made for a local cafe"}
                                 link={"https://blaws45.github.io/cafe-site/"}
                                 img={"cafe"}/>
                </div>
            </div>
        </div>
    );
}

export default Home;