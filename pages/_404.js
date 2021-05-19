import Link from 'next/link';
import s from '../styles/404.module.css';

const NotFound = () => {
    return (
        <div className={s.notFound}>
            <h1>404</h1>
            <p>Page not found</p>
            <p>Go back to <Link href="/"><a>homepage</a></Link></p>
        </div>
    );
}

export default NotFound;