import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

export type NavLinks = {
  name: string;
  link: string;
  icon?: string;
};

export type NavBarProps = {
  title: string;
  navLinks: NavLinks[];
  reactRouter?: boolean;
};

export const NavBar: React.FC<NavBarProps> = ({
  title,
  navLinks,
  reactRouter = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="kit-navbar">
      <div className="kit-navbar-title">{title}</div>
      <ul className={`kit-navbar-links ${isOpen ? "open" : ""}`}>
        {navLinks.map((link, index) => (
          <li key={index} className="kit-navbar-link">
            {reactRouter ? (
              <Link to={link.link}>{link.name}</Link>
            ) : (
              <a href={link.link}>{link.name}</a>
            )}
          </li>
        ))}
      </ul>
      <div
        className="kit-navbar-burger"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="kit-navbar-burger-line"></div>
        <div className="kit-navbar-burger-line"></div>
        <div className="kit-navbar-burger-line"></div>
      </div>
    </nav>
  );
};
