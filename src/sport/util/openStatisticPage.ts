interface openNewWindowOptions {
    url : string
    windowName : string
    windowFeatures : string
}

interface openStatisticPageOptions {
    sId : string
    mId : string
}

const openNewWindow = (options: openNewWindowOptions) => {
    const {
        url = '',
        windowName = '',
        windowFeatures = ''
    } = options

    return window.parent.open(url, windowName,  windowFeatures);
};

export const openStatisticPage = (options: openStatisticPageOptions) => {
    const {
        sId = '1',
        mId = '',
    } = options

    const url = `https://s5sir.minao182881.com/landing?sid=${sId}&mid=${mId}`;

    openNewWindow({
        url,
        windowName: mId,
        windowFeatures: `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, copyhistory=no`
    });
};
