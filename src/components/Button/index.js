import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './Button.module.scss';
const cx = classNames.bind(style);

function Button({ to, href, primary, outline, small, large, tran, rounded, children, className, onclick, ...rest }) {
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

    const classes = cx('wrapper', { primary, outline, small, large, tran, rounded, [className]: className });

    return (
        <Components className={classes} {...props} {...rest}>
            {children}
        </Components>
    );
}

export default Button;
