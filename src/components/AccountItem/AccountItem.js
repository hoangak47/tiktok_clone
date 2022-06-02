import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '../Image';
import style from './AccountItem.module.scss';
const cx = classNames.bind(style);

function AccountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <div className={cx('name')}>
                    <h4>{data.nickname}</h4>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </div>
                <span className={cx('username')}>{data.full_name}</span>
            </div>
        </Link>
    );
}

export default AccountItem;
