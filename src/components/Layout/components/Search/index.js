import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import TippyHeadless from '@tippyjs/react/headless'; // different import path!
import 'tippy.js/dist/tippy.css'; // optional

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem/AccountItem';
import { Search } from '~/components/Icons';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function SearchFc() {
    const [searchResult, setSearchResult] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(true);

    const inputRef = useRef(null);

    const handleClear = () => {
        setInputValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    // useEffect(() => {
    //     setSearchResult([1, 2, 3]);
    // }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearchResult([inputValue]);
        }
    };

    const handleHideResult = () => {
        setShowSearchResult(false);
    };

    return (
        <TippyHeadless
            interactive={true}
            placement="top-start"
            visible={searchResult.length > 0 && showSearchResult}
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
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={inputValue}
                    placeholder="Tìm kiếm tài khoản và video"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    onFocus={() => setShowSearchResult(true)}
                />
                {!!inputValue && (
                    <button onClick={handleClear} className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {/* <button className={cx('loading')}>
                    <FontAwesomeIcon icon={faSpinner} />
                </button> */}
                <button className={cx('search-btn')}>
                    <Search />
                </button>
            </div>
        </TippyHeadless>
    );
}

export default SearchFc;
