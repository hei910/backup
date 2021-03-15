import { useState } from 'react';
import useSpringDebounceFn from './useSpringDebounceFn';

const useSpringDebounce = <T>(value: T, wait: number, level?: number) => {
    const [state, setState] = useState(value);

    useSpringDebounceFn(
        () => {
            setState(value);
        },
        [value],
        wait,
        level,
    );

    return state;
};

// eslint-disable-next-line import/no-unused-modules
export default useSpringDebounce;
