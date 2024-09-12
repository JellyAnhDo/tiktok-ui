import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper, Menu as PopperMenu } from '~/components/Popper';
import Search from '~/layouts/components/Search';
import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './Header.module.scss';
import images from '~/assets/images';
import icons from '~/assets/icons';
import routesConfig from '~/configs/routes';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <img src={icons.iconCreator}></img>,
        title: 'Công cụ dành cho nhà sáng tạo',
    },
    {
        icon: <img src={icons.iconLanguage}></img>,
        title: 'Tiếng việt',
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    code: 'vi',
                    title: 'Tiếng việt (Việt Nam)',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng việt (Việt Nam)',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng việt (Việt Nam)',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng việt (Việt Nam)',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng việt (Việt Nam)',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng việt (Việt Nam)',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng việt (Việt Nam)',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng việt (Việt Nam)',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng việt (Việt Nam)',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng việt (Việt Nam)',
                },
                {
                    code: 'en',
                    title: 'English',
                },
            ],
        },
    },
    {
        icon: <img src={icons.iconCircleQuestion}></img>,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback',
    },
    {
        icon: <img src={icons.iconMoon}></img>,
        title: 'Chế độ tối',
        children: {
            title: 'Chế độ tối',
            data: [
                {
                    title: 'Tự động',
                },
                {
                    title: 'Chế độ sáng',
                },
                {
                    title: 'Chế độ tối',
                },
            ],
        },
    },
];

function Header() {
    const currentUser = true;
    const useMenu = [
        {
            icon: <img src={icons.iconUser}></img>,
            title: 'Xem hồ sơ',
            to: '@hoanganh',
        },
        {
            icon: <img src={icons.iconCoin}></img>,
            title: 'Nhận xu',
            to: '/coin',
        },
        {
            icon: <img src={icons.iconSetting}></img>,
            title: 'Cài đặt',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <img src={icons.iconLogout}></img>,
            title: 'Đăng xuất',
            to: '/logout',
            separate: true,
        },
    ];
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routesConfig.home} className={cx('logo-link')}>
                    <img src={images.logoDark} alt="Tiktok" />
                </Link>

                {/* Search */}
                <Search />

                {/* Actions */}
                <div className={cx('actions')}>
                    {currentUser ? (
                        // User login
                        <>
                            <Button
                                outline
                                className={cx('upload-outline-btn')}
                                leftIcon={<FontAwesomeIcon icon={faAdd} />}
                            >
                                Tải lên
                            </Button>

                            <Tippy content="Hộp thư" placement="bottom" delay={[0, 200]}>
                                <button className={cx('action-mailbox-btn')}>
                                    <img src={icons.iconMailBox} alt="Hộp thư" />
                                    <span className={cx('badge')}>9</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        // Action
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Đăng nhập</Button>
                        </>
                    )}

                    <PopperMenu items={currentUser ? useMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/118441977edc639baf728fd892d500b3~c5_300x300.webp?lk3s=a5d48078&nonce=40231&refresh_token=2962431fa538fe2b796a186a6e9ac031&x-expires=1726020000&x-signature=fDsER2ceI40hkyIH5SFSH6f0DzQ%3D&shp=a5d48078&shcp=c1333099"
                                alt="Nguyen Van A"
                                fallback="https://www.gravatar.com/avatar/6abaf53a24ff93b49b480b4d62d2c5b7.jpg?s=80&d=mp&r=g"
                            />
                        ) : (
                            <button className={cx('action-more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </PopperMenu>
                </div>
            </div>
        </header>
    );
}

export default Header;
