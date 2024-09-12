import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(({ src, alt, className, fallback = images.noImage, ...props }, ref) => {
    const [_fallback, setFallback] = useState('');
    const handleError = () => {
        setFallback(fallback);
    };
    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={_fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        ></img>
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
