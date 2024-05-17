import React from 'react';
import './Footer.scss';
import { MENU } from '../../utils/menu';
import { NavLink } from 'react-router-dom';
export default function Footer() {
    return (
        <footer className='footer'>
            <img className='logo' src="/logo.png" alt="" />
            <div className='social'>
                <img src="/icons/social/facebook.svg" alt="" />
                <img src="/icons/social/Google.svg" alt="" />
                <img src="/icons/social/instagram.svg" alt="" />
                <img src="/icons/social/twitter.svg" alt="" />
            </div>
            <nav>
                {MENU.map((menu, index) => {
                    return <NavLink key={index} to={menu.path}>{menu.title}</NavLink>
                })}
            </nav>
            <p className='copyright'>C 2021 PADC LLC All Rights Reserved</p>
        </footer>
    );
}