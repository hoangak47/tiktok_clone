import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './Button.module.scss';
const cx = classNames.bind(style);

function Button({
    to,
    href,
    primary,
    outline,
    small,
    large,
    tran,
    rounded,
    children,
    className,
    leftIcon,
    rightIcon,
    onclick,
    ...rest
}) {
    let Components = 'button';
    const props = {};

    if (to) {
        props.to = to;
        Components = Link;
    }
    if (href) {
        props.href = href;
        Components = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        tran,
        rounded,
        [className]: className,
        leftIcon,
        rightIcon,
    });

    return (
        <Components className={classes} {...props} {...rest}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Components>
    );
}

export default Button;
