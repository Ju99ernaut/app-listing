import Stars from './Base/Stars';
import Link from 'next/link';

const Item = ({ app, groups, rating, appMd }) => {
    const { key, image, title, by } = app;

    return (
        <div className="grid__item" data-id={key} data-groups={groups}>
            <Link href={`/details/${app.id}`}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="details-icon"
                >
                    <path
                        d="M16 8.90482L12 4L8 8.90482M8 15.0952L12 20L16 15.0952"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
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