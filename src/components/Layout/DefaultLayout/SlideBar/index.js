import classNames from 'classnames/bind';
import styles from './SlideBar.module.scss';

const cx = classNames.bind(styles);

function SlideBar() {
    return (
        <aside className={cx('wrapper')}>
            <h1>SlideBar</h1>
        </aside>
    );
}

export default SlideBar;
