import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/asset/images';
import Button from '~/components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCircleXmark,
    faEllipsisV,
    faKeyboard,
    faLanguage,
    faPlus,
    faSearch,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';

// import Tippy from '@tippyjs/react';
import Tippy from '@tippyjs/react/headless'; // different import path!
import { useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem/AccountItem';
import Menu from '~/components/Popper/Menu';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    title: 'English',
                    code: 'en',
                    type: 'language',
                },
                {
                    title: 'Vietnamese',
                    code: 'vi',
                    type: 'language',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback And Help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard Shortcuts',
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    const handleKeyDown = (e) => {
        // if (e.key === 'Enter') {
        //     setSearchResult([...searchResult, e.target.value]);
        // }
    };
    // console.log(searchResult);

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/">
                    <img src={images.logo} alt="logo" />
                </Link>
                <Tippy
                    interactive={true}
                    placement="top-start"
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Account</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm tài khoản và video" onKeyDown={(e) => handleKeyDown(e)} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </Tippy>
                <div className={cx('action')}>
                    <Button tran leftIcon={<FontAwesomeIcon className={cx('icon-plus')} icon={faPlus} />}>
                        Upload
                    </Button>
                    <Button primary>Log in</Button>
                    <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                        <button className={cx('icon-header-right')}>
                            <FontAwesomeIcon className={cx('icon-header-menu')} icon={faEllipsisV} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
