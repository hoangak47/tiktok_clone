import classNames from 'classnames/bind';
import { forwardRef, useState } from 'react';
import images from '~/asset/images';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    // console.log(images.noImage);
    const [fallBack, setFallBack] = useState('');

    const handleError = () => {
        setFallBack(customFallback);
    };

    const classes = cx('wrapper', className);

    return <img ref={ref} className={classes} src={fallBack || src} alt={alt} {...props} onError={handleError} />;
});

export default Image;
