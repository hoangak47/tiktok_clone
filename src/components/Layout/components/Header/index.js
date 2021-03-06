import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/asset/images';
import Button from '~/components/Button';
import Search from '../Search';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import Menu from '~/components/Popper/Menu';
import { Link } from 'react-router-dom';
import { Coins, Feedback, Keyboard, Language, Logout, Mess, Notify, Settings, User } from '~/components/Icons';
import Image from '~/components/Image';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <Language />,
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
        icon: <Feedback />,
        title: 'Feedback And Help',
        to: routes.feedback,
    },
    {
        icon: <Keyboard />,
        title: 'Keyboard Shortcuts',
    },
];

const userMenu = [
    {
        icon: <User />,
        title: 'View profile',
        to: '/User',
    },
    {
        icon: <Coins />,
        title: 'Get coins',
        to: '/coins',
    },
    {
        icon: <Settings />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <Logout />,
        title: 'Logout',
        to: '/logout',
        separator: true,
    },
];

function Header() {
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };

    const currentUser = true;
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="logo" />
                </Link>

                <Search />

                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Button
                                className={cx('btn-upload')}
                                tran
                                leftIcon={<FontAwesomeIcon className={cx('icon-plus')} icon={faPlus} />}
                            >
                                Upload
                            </Button>
                            <Tippy content="Message">
                                <button className={cx('action-btn')}>
                                    <Mess />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox">
                                <button className={cx('action-btn')}>
                                    <Notify />
                                    <span className={cx('notify')}>13</span>
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
                            <Menu items={userMenu} hideOnClick={false}>
                                <Image
                                    className={cx('user-avatar')}
                                    src="https://static.fullstack.edu.vn/static/media/f8-icon.7ad2b161d5e80c87e516.png"
                                    alt="avatar"
                                    fallback="https://static.fullstack.edu.vn/static/media/f8-icon.7ad2b161d5e80c87e516.png"
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
