import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useMobileDetect, useTabletDetect } from '../../hooks/useDevice';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { ReactComponent as ProfileIcon } from './profile-icon.svg';
import { ReactComponent as BurgerIcon } from './mobile-menu-icon.svg';
import { ReactComponent as CloseIcon } from './close-icon.svg';
import { HeaderNavigation } from './HeaderNavigation';
import styles from "./Header.module.css";

const Header = ({ currentPage }) => {
    const isMobile = useMobileDetect();
    const isTablet = useTabletDetect();
    const showOnGadgets = isMobile || isTablet;

    // this code causes 'too many re-renders', but it can be useful if add authorization    
    // const [isLogged, setIsLogged] = useState(false);
    let isLogged = true;
    if (currentPage === 'main') isLogged = false;
    const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpened) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = '';
    }, [isMobileMenuOpened]);

    const handleToggleMenu = () => setIsMobileMenuOpened(!isMobileMenuOpened);

    return (
        <header id="header" className={`${styles.header} ${styles[currentPage]}`}>
            <div className={`${styles.header__inner} container`}>
                <Link to="/" className='centered'>
                    <Logo className={styles.logo} />
                </Link>
                {
                    !showOnGadgets && isLogged && <HeaderNavigation handleToggleMenu={handleToggleMenu}/>
                }
                {
                    !showOnGadgets && isLogged &&
                        <div className={styles.authorization}>
                            <Link to="/profile" className={styles.profileButton}>
                                Аккаунт
                                <span className={`${styles['profileButton__icon']} centered`}>
                                    <ProfileIcon />
                                </span>
                            </Link>
                        </div>
                }
                {
                    !isLogged ?
                        <div className={styles.authorization}>
                            <Link to="/register">Регистрация</Link>
                            <Link
                                to="/login"
                                className={`${styles.signinButton} btn btn--accent`}>
                                Войти
                            </Link>
                        </div>
                        : showOnGadgets &&
                        <button
                            type='button'
                            className={`${styles.mobileMenu__button} centered btn`}
                            onClick={handleToggleMenu}>
                            {isMobileMenuOpened ? <CloseIcon /> : <BurgerIcon />}
                        </button>
                }
               
            </div>
            {/* MOBILE TEMPLATE */}
            {
                showOnGadgets &&
                    <div className={`
                            ${styles['page-overlay']}
                            ${isMobileMenuOpened ? styles.visible : ''}
                        `}>
                        <div className={`
                                ${styles.mobileMenu}
                                ${isMobileMenuOpened ? styles.opened : ''}
                            `}>
                            <HeaderNavigation
                                handleToggleMenu={handleToggleMenu}
                                showOnGadgets={showOnGadgets} />
                            <div className={styles.authorization}>
                                <Link to="/profile" className={styles.profileButton}>
                                    Аккаунт
                                    <span className={`${styles['profileButton__icon']} centered`}>
                                        <ProfileIcon />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
            }
        </header>
    );
};

export default Header;