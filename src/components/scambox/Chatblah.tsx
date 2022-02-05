import React, { useEffect, useRef, useState } from "react";
import anime, { AnimeTimelineInstance } from "animejs";
import _uniqueId from 'lodash/uniqueId';
import {useMediaQuery} from '@react-hook/media-query'


import * as styles from "./Chatbox.module.scss";

const Chatblah = () => {
    const animeRef = useRef<AnimeTimelineInstance>(null)
    const [myId,] = useState(_uniqueId)
    const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

    useEffect(() => {
        if(typeof window === "undefined") return; // Don't run on static build
        if(reduceMotion) return; // Don't run the animation for users who prefer reduced motion

        const speed = 0.25;
        const delay = anime.random(100/speed, 1000/speed);

        animeRef.current = anime.timeline({
            targets: "#chatblah-"+myId,
            loop: true,
            easing: "easeInOutSine"
        })

        const tl = animeRef.current

        tl.add({
            duration: 250/speed,
            opacity: [0, .25],
            easing: "linear"
        }, delay).add({
            duration: 1000/speed,
            rotate: [anime.random(-5, 5)+"deg", anime.random(-10, 10)+"deg"],
            translateY: [0, anime.random(0, -2)+"px"],
            translateX: [0, anime.random(-2, 2)+"px"],
        }, delay).add({
            duration: 500/speed,
            opacity: [.25, 0],
            easing: "linear"
        }, delay+(500/speed))

        return () => {
            if(animeRef.current) {
                animeRef.current.pause();
                animeRef.current = null;
            }
        }
    }, [myId, reduceMotion])


    return <div className={styles.chatBlah} id={"chatblah-"+myId}>
        <span>blah</span>
    </div>
}

export default Chatblah