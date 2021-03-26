import Stars from './Stars';

const Item = ({ groups, img, title, by, rating }) => {
    return (
        <div className="grid__item" data-groups={groups}>
            <div className="item__image"><img src={img} alt="Dummy" /></div>
            <div className="meta">
                <h3 className="meta__title">{title}</h3>
                <span className="meta__by">By {by}</span>
                <div className="meta__stars">
                    <Stars rating={rating} />
                </div>
            </div>
        </div>
    );
};

export default Item;