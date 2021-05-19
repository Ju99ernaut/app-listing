import Stars from './Stars';

const Item = ({ app, groups, rating, appMd }) => {
    const { key, image, title, by } = app;

    return (
        <div onClick={appMd} className="grid__item" data-id={key} data-groups={groups}>
            <div className="item__image" data-id={key} style={{ backgroundImage: `url(${image})` }} ></div>
            <div className="meta" data-id={key}>
                <h3 className="meta__title" data-id={key}>{title}</h3>
                <span className="meta__by" data-id={key}>By {by}</span>
                <div className="meta__stars" data-id={key}>
                    <Stars data-id={key} rating={rating} edit={false} />
                </div>
            </div>
        </div>
    );
};

export default Item;