import Stars from './Stars';

const Item = ({ img, title, by, rating }) => {
    return (
        <div className="grid__item">
            <div class="item__image"><img src={img} alt="Dummy" /></div>
            <div className="meta">
                <h3 className="meta__title">{title}</h3>
                <span className="meta__by">{by}</span>
                <span className="meta__stars">
                    <Stars rating={rating} />
                </span>
            </div>
        </div>
    );
};

export default Item;