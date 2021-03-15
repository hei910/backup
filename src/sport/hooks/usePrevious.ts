import { useEffect, useRef } from 'react';

const usePrevious = (value: any): any => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    // Return previous value (happens before update in useEffect above)
    return ref.current;
};

export default usePrevious;
