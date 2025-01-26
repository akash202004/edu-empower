"use client"

import {
    motion,
    useScroll,
    useSpring
} from "framer-motion"

export default function Parallax() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    const headlines = [
        <b>"Empowering Dreams, One Student at a Time"</b>,
        <b>"Bridging the Gap Between Potential and Opportunity"</b>,
        <b>"Your Partner in Breaking Financial Barriers to Education"</b>,
        <b>"Fueling Futures, Transforming Lives"</b>,
        <b>"Where Education Meets Possibility"</b>
    ]

    return (
        <div id="example">
            {headlines.map((text, index) => (
                <Headline key={index} text={text} />
            ))}
            <motion.div className="progress" style={{ scaleX }} />
            <StyleSheet />
        </div>
    )
}

function Headline({ text }) {
    return (
        <section className="headline-container">
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {text}
            </motion.h1>
        </section>
    )
}

function StyleSheet() {
    return (
        <style>{`
            html {
                scroll-snap-type: y mandatory;
            }

            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background-color: #121212;
                color: #fff;
            }

            .headline-container {
                height: 100vh;
                scroll-snap-align: start;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 20px;
            }

            .headline-container h1 {
                font-size: 4rem;
                font-weight: bold;
                color: #4ff0b7;
                margin: 0;
                line-height: 1.2;
            }

            @media (max-width: 500px) {
                .headline-container h1 {
                    font-size: 2rem;
                }
            }

            .progress {
                position: fixed;
                left: 0;
                right: 0;
                height: 5px;
                background: #4ff0b7;
                bottom: 50px;
                transform: scaleX(0);
            }
        `}</style>
    )
}
