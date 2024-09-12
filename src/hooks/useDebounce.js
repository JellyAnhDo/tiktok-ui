import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebounceValue(value), delay);

        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debouncedValue;
}

useDebounce.propTypes = {
    value: PropTypes.any.isRequired,
    delay: PropTypes.number.isRequired,
};

export default useDebounce;
