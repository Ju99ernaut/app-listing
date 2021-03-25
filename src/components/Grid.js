import React from 'react';
import Item from './Item';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.a = "a";
    }

    render() {
        return (
            <div className="grid-container">
                <div className="header">
                    <div className="filters">
                        <button className="btn">Twitch</button>
                        <button className="btn">Discord</button>
                        <button className="btn">Facebook</button>
                        <button className="btn">Bots</button>
                        <button className="btn">Tools</button>
                        <button className="btn">Viewers Interaction</button>
                    </div>
                    <div className="search">
                        <div className="search-container">
                            <input type="search" name="serch" placeholder="Search app..." className="xl:w-64 search-input" />
                            <button type="submit" className="search-button">
                                <svg
                                    class="search-icon"
                                    fill="currentColor"
                                    viewBox="0 0 56.966 56.966"
                                    style={{ enableBackground: 'new 0 0 56.966 56.966' }}
                                >
                                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                </svg>
                            </button>
                        </div>
                        <button className="btn">My Profile</button>
                    </div>
                </div>
                <div className="grid">
                    <Item img="logo512.png" title="X-men" by="Ju99ernaut" rating={4.5} />
                    <Item img="logo512.png" title="X-men" by="Ju99ernaut" rating={4} />
                    <Item img="logo512.png" title="X-men" by="Ju99ernaut" rating={5} />
                    <Item img="logo512.png" title="X-men" by="Ju99ernaut" rating={2} />
                    <Item img="logo512.png" title="X-men" by="Ju99ernaut" rating={3.5} />
                    <Item img="logo512.png" title="X-men" by="Ju99ernaut" rating={4.5} />
                    <Item img="logo512.png" title="X-men" by="Ju99ernaut" rating={4} />
                    <Item img="logo512.png" title="X-men" by="Ju99ernaut" rating={5} />
                    <Item img="logo512.png" title="X-men" by="Ju99ernaut" rating={2} />
                    <Item img="logo512.png" title="X-men" by="Ju99ernaut" rating={3.5} />
                </div>
            </div>
        );
    }
};

export default Navbar;