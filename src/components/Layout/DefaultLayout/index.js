import Header from '../components/Header';
import SlideBar from './SlideBar';
import classNames from 'classnames/bind';
import style from './DefaultLayout.scss';

const cx = classNames.bind(style);

function DefaulLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('container')}>
                <SlideBar></SlideBar>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaulLayout;
