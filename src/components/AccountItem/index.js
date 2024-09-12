import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <span className={cx('avatar')}>
                <Image
                    src={data.avatar}
                    alt="Avatar"
                    className={cx('account-avatar')}
                    fallback="https://www.gravatar.com/avatar/6abaf53a24ff93b49b480b4d62d2c5b7.jpg?s=80&d=mp&r=g"
                />
            </span>
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <FontAwesomeIcon icon={faCircleCheck} className={cx('badge')} />}
                </h4>

                <p className={cx('username')}>{data.nickname}</p>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
