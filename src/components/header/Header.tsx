import { MENU } from '../../utils/menu';
import './Header.scss';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            <img className='logo' src="/logo.png" alt="" />
            <nav>
                {MENU.map((menu, index) => {
                    return <NavLink key={index} to={menu.path}>{menu.title}</NavLink>
                })}
            </nav>
            <div className="settings">
                <img className='message' src="/icons/Message.svg" alt="" />
                <img className='bell' src="/icons/Bell.svg" alt="" />
                <div className='user'>
                    <img className='avatar' src="/icons/Setting.svg" alt="" />
                    <span className='name'>Artyom</span>
                    <img className='arrow-down' src="/icons/Down.svg" alt="" />
                </div>
                <img className='language' src="/icons/language.svg" alt="" />

            </div>
        </header>
    );
}