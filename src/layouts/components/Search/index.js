import { useEffect, useState, useRef } from 'react';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import * as searchService from '~/services/searchService';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { default as useDebounce } from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedSearchValue) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const resultSearch = await searchService.search(debouncedSearchValue, 'less');
            setSearchResult(resultSearch);
            setLoading(false);
        };
        fetchApi();
    }, [debouncedSearchValue]);

    const handleClearInput = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChangeInput = (event) => {
        const searchValue = event.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                visible={showResult && searchResult.length > 0}
                interactive
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('search-result-title')}>Bạn có thể thích</div>
                            <div className={cx('search-result-title')}>Tài khoản</div>
                            <ul className={cx('search-result-list')}>
                                {searchResult.map((item) => (
                                    <AccountItem key={item.id} data={item} />
                                ))}
                            </ul>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <form className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        type="text"
                        className={cx('search-input', 'inputElement')}
                        placeholder="Tìm kiếm"
                        onChange={handleChangeInput}
                        onFocus={() => setShowResult(true)}
                    />

                    {!!searchValue && !loading && (
                        <button className={cx('search-clear')} onClick={handleClearInput}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {!!loading && (
                        <button className={cx('search-loading')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>
                    )}
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
