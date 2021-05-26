import Image from 'next/image';

const Footer = () => {
    return (
        <div className="footer">
            <p className="copyright">© Copyright 2021</p>
            <div className="flex">
                Powered by
                <a href="https://rally.io/creator/PRO" target="_blank" rel="noopener noreferrer">PlatformPro</a>
                <Image width={40} height={40} src="/PlatformPro.svg" alt="coin-icon" />
            </div>
        </div>
    );
};

export default Footer;