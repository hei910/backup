import { useState } from 'react';
import useDebounceFn from './useDebounceFn';

const useDebounce = <T>(value: T, wait: number) => {
    const [state, setState] = useState(value);

    useDebounceFn(
        () => {
            setState(value);
        },
        [value],
        wait,
    );

    return state;
};

// eslint-disable-next-line import/no-unused-modules
export default useDebounce;
