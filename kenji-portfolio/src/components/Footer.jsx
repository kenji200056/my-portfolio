const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <p className="footer-name">KENJI GUTIERREZ JIMENEZ</p>
                    <p className="footer-copy">© {currentYear} All Rights Reserved.</p>
                </div>
                <div className="footer-links">
                    <a
                        href="https://www.linkedin.com/in/kenji-gutierrez-jimenez"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
