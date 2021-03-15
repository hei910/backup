import { useEffect, useState } from 'react';

type TUseWindowsFocusHandler = (
    timeout?: number,
    onFocusCallBack?: () => void,
    onBlurCallBack?: () => void,
) => windowsFocusHandler;

interface windowsFocusHandler {
    isFocus: boolean;
    isBlur: boolean;
    onBlurTime: number;
}

const useWindowsFocusHandler: TUseWindowsFocusHandler = (
    timeout,
    onFocusCallBack = () => {},
    onBlurCallBack = () => {},
) => {
    const [onBlurTime, setOnBlurTime] = useState(0);
    const isFocus = onBlurTime === 0;
    const isBlur = onBlurTime > 0;

    let setTimeoutHolder: any = null;

    const asyncOnBlur = async () => {
        setOnBlurTime(+new Date());
        onBlurCallBack();
    };

    const _onFocus = () => {
        !isFocus && setOnBlurTime(0);
        setTimeoutHolder && clearTimeout(setTimeoutHolder);
        onFocusCallBack();
    };

    const _onBlur = () => {
        if (timeout) {
            setTimeoutHolder = setTimeout(asyncOnBlur, timeout * 1000);
        } else {
            asyncOnBlur();
        }
    };

    useEffect(() => {
        window.addEventListener('focus', _onFocus);
        window.addEventListener('blur', _onBlur);
        return () => {
            window.removeEventListener('focus', _onFocus);
            window.removeEventListener('blur', _onBlur);
        };
    });

    return { isFocus, isBlur, onBlurTime };
};

export default useWindowsFocusHandler;
