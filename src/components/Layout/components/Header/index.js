import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/asset/images';
import Button from '~/components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faCircleQuestion,
    faCircleXmark,
    faCloudUpload,
    faCoins,
    faEllipsisV,
    faGear,
    faKeyboard,
    faLanguage,
    faMessage,
    faPlus,
    faSearch,
    faSpinner,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless'; // different import path!
import 'tippy.js/dist/tippy.css'; // optional

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

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/User',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coins',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Logout',
        to: '/logout',
        separator: true,
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

    const currentUser = true;
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/">
                    <img src={images.logo} alt="logo" />
                </Link>
                <TippyHeadless
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
                </TippyHeadless>
                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Upload video">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faCloudUpload} />
                                </button>
                            </Tippy>
                            <Tippy content="Message">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faMessage} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button tran leftIcon={<FontAwesomeIcon className={cx('icon-plus')} icon={faPlus} />}>
                                Upload
                            </Button>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    {currentUser ? (
                        <>
                            <Menu items={userMenu}>
                                <img
                                    className={cx('user-avatar')}
                                    src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/9366bed55819a1889d53ff3a508c766b~c5_300x300.webp?x-expires=1654135200&x-signature=gvgneCFh0BeYTD1g8jle%2Fu1KBL4%3D"
                                    alt="avatar"
                                />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                                <button className={cx('icon-header-right')}>
                                    <FontAwesomeIcon className={cx('icon-header-menu')} icon={faEllipsisV} />
                                </button>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
