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
import { useDebounce } from '~/hooks';

import * as searchServices from '~/apiServices/searchServices';

const cx = classNames.bind(styles);

function SearchFc() {
    const [searchResult, setSearchResult] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(inputValue, 500);

    const inputRef = useRef(null);

    const handleClear = () => {
        setInputValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouncedValue);
            setSearchResult(result);

            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleHideResult = () => {
        setShowSearchResult(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setInputValue(value);
        }
    };

    return (
        <div>
            <TippyHeadless
                interactive={true}
                placement="top-start"
                visible={searchResult.length > 0 && showSearchResult}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Account</h4>
                            {searchResult.map((item, index) => (
                                <AccountItem key={item.id} data={item} />
                            ))}
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
                        onChange={(e) => handleChange(e)}
                        onFocus={() => setShowSearchResult(true)}
                    />
                    {!!inputValue && !loading && (
                        <button onClick={handleClear} className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && (
                        <button className={cx('loading')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>
                    )}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <Search />
                    </button>
                </div>
            </TippyHeadless>
        </div>
    );
}

export default SearchFc;
