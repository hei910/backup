import Axios from 'axios';
import { useEffect, useState } from 'react';

const getRegionBlockInfo = async (url: string) => {
    try {
        const { data } = await Axios.get(url);

        return {
            isAllowIp: data.isAllow,
            clientIp: data.ip,
        };
    } catch (error) {
        return {
            isAllowIp: process.env.NODE_ENV !== 'development', // allow ip if cannot get url in production
            clientIp: '',
        };
    }
};

const useGeoIp = () => {
    const [clientIp, setClientIp] = useState('');
    const [isAllowIp, setAllowIp] = useState<null | boolean>(null);

    useEffect(() => {
        getRegionBlockInfo(`https://drdjh8lq0xzd4.cloudfront.net/hkzz?tt=${Date.now()}`).then((result) => {
            if (isAllowIp === null) {
                setAllowIp(result.isAllowIp);
                setClientIp(result.clientIp);
            }
        });

        getRegionBlockInfo(`https://apiauthg.yonghuai5515.com/hkzz?tt=${Date.now()}`).then((result) => {
            if (isAllowIp === null) {
                setAllowIp(result.isAllowIp);
                setClientIp(result.clientIp);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { clientIp, isAllowIp };
};

export default useGeoIp;
