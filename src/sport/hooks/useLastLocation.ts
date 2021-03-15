import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useLastLocation = () => {
    const [locationHistory, setLocationHistory] = useState<string[]>([]);

    const ref = useRef<string>();

    const location = useLocation().pathname;

    useEffect(() => {
        setLocationHistory([...locationHistory, location]);
        ref.current = location;

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return { lastLocation: ref.current, locationHistory };
};

export default useLastLocation;
