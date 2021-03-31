import React from 'react';
import Loader from './Loader';
import Item from './Item';
import Modal from './Modal';
import Shuffle from 'shufflejs';
import throttle from '../utils/throttle';
import imagesLoaded from '../utils/imagesLoaded';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.buttons = React.createRef();
        this.loader = React.createRef();
        this.search = React.createRef();
        this.element = React.createRef();
        this.sizer = React.createRef();
        this.mdlApp = React.createRef();
    }

    componentDidMount() {
        imagesLoaded(this.element.current, this._initShuffle);
        this.addSearchEvent();
    }

    componentDidUpdate() {
        this.shuffle.resetItems();
    }

    componentWillUnmount() {
        this.shuffle.destroy();
        this.shuffle = null;
    }

    showMdlApp = () => {
        this.mdlApp.current.show();
    }

    hideMdlApp = () => {
        this.mdlApp.current.hide();
    }

    _initShuffle = () => {
        const shuffle = new Shuffle(this.element.current, {
            itemSelector: '.grid__item',
            sizer: this.sizer.current,
            speed: 600,
            columnThreshold: .04,
            buffer: 1
        });
        shuffle.layout();

        window.addEventListener('resize', throttle(function (ev) {
            shuffle.layout();
        }, 50));

        this.shuffle = shuffle;
        this.loader.current.style.display = 'none';
    }

    filter = (e, filter) => {
        this._activateButton(e)
        if (filter) this.shuffle.filter(filter);
        else this.shuffle.filter();
        this.shuffle.layout();
    }

    addSearchEvent = () => {
        this.search.current.addEventListener('keyup', this._handleSearchKeyup);
    }

    _activateButton = e => {
        const btns = this.buttons.current.querySelectorAll('button');
        btns.forEach(btn => btn.classList.remove('btn-active'));
        e.currentTarget.classList.add('btn-active');
    }

    _handleSearchKeyup = e => {
        const searchText = e.target.value.toLowerCase();

        this.shuffle.filter(function (element, shuffle) {
            const titleElement = element.querySelector('.meta__title');
            const titleText = titleElement.textContent.toLowerCase().trim();

            return titleText.indexOf(searchText) !== -1;
        });
    }

    render() {
        return (
            <div className="grid-container">
                <div ref={this.loader} className="loader">
                    <Loader />
                </div>
                <div className="header">
                    <div ref={this.buttons} className="filters">
                        <button name="all" onClick={e => this.filter(e)} className="btn btn-active">All</button>
                        <button name="twitch" onClick={e => this.filter(e, 'twitch')} className="btn">Twitch</button>
                        <button name="discord" onClick={e => this.filter(e, 'discord')} className="btn">Discord</button>
                        <button name="facebook" onClick={e => this.filter(e, 'facebook')} className="btn">Facebook</button>
                        <button name="bots" onClick={e => this.filter(e, 'bots')} className="btn">Bots</button>
                        <button name="tools" onClick={e => this.filter(e, 'tools')} className="btn">Tools</button>
                        <button name="interaction" onClick={e => this.filter(e, 'interactions')} className="btn">Viewers Interaction</button>
                    </div>
                    <div className="flex">
                        <div className="search-container">
                            <input ref={this.search} type="search" name="serch" placeholder="Search app..." className="search-input" />
                            <button type="submit" className="search-button">
                                <svg className="search-icon" fill="currentColor" viewBox="0 0 56.966 56.966" style={{ enableBackground: 'new 0 0 56.966 56.966' }}>
                                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                </svg>
                            </button>
                        </div>
                        <button name="profile" onClick={this.props.profileMd} className="btn">My Profile</button>
                    </div>
                </div>
                <div ref={this.element} className="grid">
                    <div ref={this.sizer} className="grid__sizer"></div>
                    <Item appMd={this.showMdlApp} img="logo512.png" groups={'["twitch"]'} title="Random App" by="Ju99ernaut" rating={4.5} />
                    <Item appMd={this.showMdlApp} img="logo512.png" groups={'["discord"]'} title="Random App" by="Ju99ernaut" rating={4} />
                    <Item appMd={this.showMdlApp} img="logo512.png" groups={'["twitch"]'} title="Random App" by="Ju99ernaut" rating={5} />
                    <Item appMd={this.showMdlApp} img="logo512.png" groups={'["facebook"]'} title="Random App" by="Ju99ernaut" rating={2} />
                    <Item appMd={this.showMdlApp} img="logo512.png" groups={'["bots", "tools"]'} title="Random App" by="Ju99ernaut" rating={3.5} />
                    <Item appMd={this.showMdlApp} img="logo512.png" groups={'["tools"]'} title="Random App" by="Ju99ernaut" rating={4.5} />
                    <Item appMd={this.showMdlApp} img="logo512.png" groups={'["bots", "interactions"]'} title="Random App" by="Ju99ernaut" rating={4} />
                    <Item appMd={this.showMdlApp} img="logo512.png" groups={'["interactions"]'} title="Random App" by="Ju99ernaut" rating={5} />
                    <Item appMd={this.showMdlApp} img="logo512.png" groups={'["discord"]'} title="Random App" by="Ju99ernaut" rating={2} />
                    <Item appMd={this.showMdlApp} img="logo512.png" groups={'["twitch"]'} title="Random App" by="Ju99ernaut" rating={3.5} />
                </div>
                <Modal ref={this.mdlApp} className="modal" keyboard={true}>
                    <h2>App Data Expanded</h2>
                    <button name="close" className="btn btn-close" onClick={this.hideMdlApp}>×</button>
                </Modal>
            </div>
        );
    }
};

export default Navbar;