import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: '#about', number: '01', label: 'About' },
        { href: '#experience', number: '02', label: 'Experience' },
        { href: '#projects', number: '03', label: 'Projects' },
        { href: '#education', number: '04', label: 'Education' },
        { href: '#skills', number: '05', label: 'Skills' },
        { href: '#contact', number: '06', label: 'Contact' },
    ];

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="nav-container">
                <a href="#" className="nav-logo">K.G.J.</a>
                <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="nav-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            <span className="nav-number">{item.number}</span>
                            {item.label}
                        </a>
                    ))}
                </div>
                <button
                    className="nav-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </motion.nav>
    );
};

export default Header;
