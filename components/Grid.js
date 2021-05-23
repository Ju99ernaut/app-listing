import React from 'react';
import Loader from './Base/Loader';
import Item from './Item';
import Modal from './Modal';
import AppDetail from './AppDetail';
import InfiniteScroll from 'react-infinite-scroll-component';
import Shuffle from 'shufflejs';
import throttle from '../utils/throttle';
import imagesLoaded from '../utils/imagesLoaded';
import fetch from '../utils/fetch';
import config from '../config';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.buttons = React.createRef();
        this.loader = React.createRef();
        this.search = React.createRef();
        this.element = React.createRef();
        this.sizer = React.createRef();
        this.mdlApp = React.createRef();
        this.state = {
            currentApp: null,
            applications: [],
            ratings: [],
            reviews: [],
            page: 0,
            pageSize: 24,
            hasMore: true,
        };
    }

    componentDidMount() {
        imagesLoaded(this.element.current, this._initShuffle);
        this.addSearchEvent();
        this.fetchData();
    }

    componentDidUpdate() {
        this.shuffle.resetItems();
    }

    componentWillUnmount() {
        this.shuffle.destroy();
        this.shuffle = null;
    }

    reload = () => {
        this.loadReviews(this.state.currentApp.id);
    }

    fetchData = () => {
        this.loadApps();
        this.loadRatings();
        this.setState(state => ({
            page: state.page + 1
        }))
        this.hasMore();
    }

    hasMore = () => {
        fetch(`${config.apiEndpoint}meta/apps`)
            .then(res => res.json())
            .then(res => {
                this.setState(state => ({
                    hasMore: res.count > state.page * state.pageSize + state.pageSize
                }))
            })
            .catch(err => console.log("Networt error"));
    }

    loadApps = () => {
        fetch(`${config.apiEndpoint}apps?page=${this.state.page}&size=${this.state.pageSize}`)
            .then(res => res.json())
            .then(res => {
                this.setState(state => ({
                    applications: [...state.applications, ...res]
                }));
                this.loader.current.style.display = 'none';
            })
            .catch(err => console.log("Networt error"));
    }

    loadRatings = () => {
        fetch(`${config.apiEndpoint}ratings/averages?page=${this.state.page}&size=${this.state.pageSize}`)
            .then(res => res.json())
            .then(res => {
                this.setState(state => ({
                    ratings: [...state.ratings, ...res]
                }));
            })
            .catch(err => console.log("Networt error"));
    }

    loadReviews = (application) => {
        fetch(`${config.apiEndpoint}ratings/app/${application}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    reviews: res
                });
            })
            .catch(err => console.log("Networt error"));
    }

    buildItemsList = () => {
        const apps = this.state.applications;
        const ratings = this.state.ratings;

        return apps.map((item, i) => {
            const { groups } = item;
            const rating = ratings.find(rating => rating.application.id === item.id);
            const groupsStr = groups.map(group => `"${group.toLowerCase().trim()}"`).join(',');
            return <Item key={i} appMd={this.showMdl} app={{ key: i, ...item }} rating={rating?.rating} groups={`[${groupsStr}]`} />;
        });
    }

    showMdl = (e) => {
        const clb = () => this.loadReviews(this.state.currentApp.id);
        this.setState(state => ({
            currentApp: state.applications[e.target.dataset.id]
        }), clb);
        this.mdlApp.current.show();
    }

    hideMdl = () => {
        this.mdlApp.current.hide();
    }

    _initShuffle = () => {
        const shuffle = new Shuffle(this.element.current, {
            itemSelector: '.grid__item',
            sizer: this.sizer.current,
            speed: 600,
            columnThreshold: .05,
            buffer: 1
        });
        shuffle.layout();

        window.addEventListener('resize', throttle(function (ev) {
            shuffle.layout();
        }, 50));

        this.shuffle = shuffle;
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
                        <button name="profile" onClick={this.props.profileMd} className="btn btn-profile" style={{ display: this.props.auth() ? '' : 'none' }}>My Profile</button>
                    </div>
                </div>
                <InfiniteScroll
                    dataLength={this.state.applications.length}
                    next={this.fetchData}
                    hasMore={this.state.hasMore}
                    loader={<Loader />}
                >
                    <div ref={this.element} className="grid">
                        <div ref={this.loader} className="loader">
                            <Loader />
                        </div>
                        <div ref={this.sizer} className="grid__sizer"></div>
                        {this.buildItemsList()}
                    </div>
                </InfiniteScroll>
                <Modal ref={this.mdlApp} className="modal" keyboard={true}>
                    <h2>{this.state.currentApp?.title}</h2>
                    <AppDetail app={this.state.currentApp} auth={this.props.auth} authorization={this.props.authorization} reviews={this.state.reviews} reload={this.reload} />
                    <button name="close" className="btn btn-close" onClick={this.hideMdl}>×</button>
                </Modal>
            </div>
        );
    }
};

export default Navbar;