const PriceTicker = ({ icon, coin, price, increase, change }) => {
    const percentageClass = increase ? 'percentage-change text-green' : 'percentage-change text-red';
    const svgClass = increase ? 'rotate-180 text-green' : 'text-red';

    return (
        <div className="price-ticker-container">
            <img className="ticker-icon" src={icon} alt="coin-icon" />
            <div className="price-ticker-meta">
                <span className="coin-name">{coin}</span>
                <div className="coin-price-container">
                    <p className="coin-price">{price}</p>
                    <svg className={svgClass} fill="currentColor" width="20px" height="20px" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 10l5 5 5-5z"></path>
                    </svg>
                    <p className={percentageClass}>{change}</p>
                </div>
            </div>
        </div>
    );
};

export default PriceTicker;