import Stars from './Base/Stars';
import Link from 'next/link';
import DblChevron from './Icons/DoubleChevron';

const Item = ({ app, groups, rating, appMd }) => {
    const { key, image, title, by } = app;

    return (
        <div className="grid__item" data-id={key} data-groups={groups}>
            <Link href={`/details/${app.id}`}>
                <DblChevron className="details-icon" />
            </Link>
            <div onClick={appMd} className="item__image" data-id={key} style={{ backgroundImage: `url(${image})` }} ></div>
            <div className="meta" data-id={key}>
                <h3 onClick={appMd} className="meta__title" data-id={key}>{title}</h3>
                <span onClick={appMd} className="meta__by" data-id={key}>By {by}</span>
                <div onClick={appMd} className="meta__stars" data-id={key}>
                    <Stars data-id={key} rating={rating} edit={false} />
                </div>
            </div>
        </div>
    );
};

export default Item;