import React, { useState, useEffect } from "react";
import darkModeIcon from "../assets/icons/dark-mode.svg";
import lightModeIcon from "../assets/icons/light-mode.svg";
import { BurgerOpen, BurgerClose } from "./icons";

const NavBar = () => {
    const [activeNavItem, setActiveNavItem] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedDarkMode = localStorage.getItem("darkMode");
        return savedDarkMode ? JSON.parse(savedDarkMode) : true;
    });
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);
    const [burgerIcon, setBurgerIcon] = useState(false);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(isDarkMode));

        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const handleNavItemClick = (navItemId) => {
        setActiveNavItem(navItemId);
        setShowBurgerMenu(false);
        setBurgerIcon(false);
    };

    const handleBurgerClick = () => {
        setShowBurgerMenu(!showBurgerMenu);
        setBurgerIcon(!showBurgerMenu);
    };

    return (
        <>
            <header className="sticky top-0 z-10 hidden h-20 w-full items-center justify-between bg-white/75 px-4 backdrop-blur-xl dark:bg-gray-950/75 md:flex md:justify-around">
                <div>
                    <a href="#" onClick={() => handleNavItemClick(null)} className="select-none font-krona text-3xl dark:text-gray-50">
                        Bingo
                    </a>
                </div>
                <div className="hidden items-center gap-5 md:flex">
                    <nav className="flex gap-5 text-gray-600 dark:text-gray-200">
                        <a href="#articles" onClick={() => handleNavItemClick("1")} className={`scroll-smooth rounded-xl px-3 py-2 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-300 ${activeNavItem === "1" ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50" : ""}`}>
                            Articles
                        </a>
                        <a href="#projects" onClick={() => handleNavItemClick("2")} className={`scroll-smooth rounded-xl px-3 py-2 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-300 ${activeNavItem === "2" ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50" : ""}`}>
                            Projects
                        </a>
                        <a href="#stacks" onClick={() => handleNavItemClick("3")} className={`scroll-smooth rounded-xl px-3 py-2 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-300 ${activeNavItem === "3" ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50" : ""}`}>
                            Stacks
                        </a>
                    </nav>
                    <div className="flex items-center gap-5">
                        <hr className="w-5 rotate-90" />
                        <button onClick={() => setIsDarkMode(!isDarkMode)}>
                            <img src={isDarkMode ? darkModeIcon : lightModeIcon} alt="" />
                        </button>
                        <a href="mailto:therealbingops@gmail.com" className="rounded-xl bg-gray-900 px-5 py-2 text-gray-50 hover:bg-gray-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-50">
                            Contact Me
                        </a>
                    </div>
                </div>
            </header>
            <header className="fixed top-0 z-20 w-full bg-white/75 backdrop-blur-xl dark:bg-gray-950/75 md:hidden">
                <div className="flex h-20 items-center justify-between px-5">
                    <div>
                        <a href="#" onClick={() => handleNavItemClick(null)} className="select-none font-krona text-3xl dark:text-gray-50">
                            Bingo
                        </a>
                    </div>
                    <div className="flex items-center justify-center">
                        <button onClick={handleBurgerClick} className="focus:outline-none ">
                            {burgerIcon ? <BurgerClose /> : <BurgerOpen />}
                        </button>
                    </div>
                </div>
                <div className={`flex w-full flex-col shadow-md transition-all duration-300 ${showBurgerMenu ? "opacity-100" : "pointer-events-none hidden opacity-0"}`}>
                    <div className="flex w-full p-5">
                        <div className="flex w-1/2">
                            <nav className="flex flex-col gap-4 text-gray-600 dark:text-gray-300">
                                <a
                                    href="#articles"
                                    onClick={() => {
                                        handleNavItemClick("1");
                                    }}
                                    className="py-2"
                                >
                                    Articles
                                </a>
                                <a
                                    href="#projects"
                                    onClick={() => {
                                        handleNavItemClick("2");
                                    }}
                                    className="py-2"
                                >
                                    Projects
                                </a>
                                <a
                                    href="#stacks"
                                    onClick={() => {
                                        handleNavItemClick("3");
                                    }}
                                    className="py-2"
                                >
                                    Stacks
                                </a>
                                <a href="mailto:therealbingops@gmail.com" className="rounded-xl bg-gray-900 px-5 py-2 text-gray-50 hover:bg-gray-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-50">
                                    Contact Me
                                </a>
                            </nav>
                        </div>
                        <div className="flex w-1/2 items-end justify-end pb-2">
                            <button onClick={() => setIsDarkMode(!isDarkMode)}>
                                <img src={isDarkMode ? darkModeIcon : lightModeIcon} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default NavBar;
