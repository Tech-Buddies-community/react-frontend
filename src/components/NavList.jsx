import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
    { id: 1, url: '/', text: 'home'},
    { id: 2, url: '/event', text: 'event'},
    { id: 3, url: '/program', text: 'program'},
    { id: 4, url: '/job', text: 'job'},
]

const NavList = () => {
    const [isLgScreen, setIsLgScreen] = useState(window.matchMedia("(min-width: 1024px)").matches); // lg screen starts at 1024px

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        const handleScreenChange = (e) => setIsLgScreen(e.matches);

        mediaQuery.addEventListener("change", handleScreenChange);
        
        // Cleanup event listener on component unmount
        return () => {
            mediaQuery.removeEventListener("change", handleScreenChange);
        };
    }, []);
    
    return (
        <>
            {links.map((link) => {
                const {id, url, text} = link;

                if (id === 1 && isLgScreen) {
                    return null;
                }

                return(
                    <li key={id}>
                        <NavLink className='capitalize' to={url}>
                            {text}
                        </NavLink>
                    </li>
                )
            })}
        </>
    )
}

export default NavList;