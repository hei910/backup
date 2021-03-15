import { AxiosResponse } from 'axios';

const networkLogger = (key: string, response: AxiosResponse<any>, maxRecords: number = 10) => {
    try {
        let records: AxiosResponse<any>[] = [];
        const responseString = JSON.stringify(response).replace(/\\n/g, '');
        const responseNewLineRemoved = JSON.parse(responseString);

        if (sessionStorage[key]) {
            records = JSON.parse(sessionStorage[key]);
        }

        const length = records.unshift(responseNewLineRemoved);

        if (length > maxRecords) {
            records = records.slice(0, maxRecords);
        }

        sessionStorage[key] = JSON.stringify(records);
    } catch (err) {
        if (err.code === 22) {
            try {
                const responseString = JSON.stringify(response).replace(/\\n/g, '');
                const responseNewLineRemoved = JSON.parse(responseString);

                sessionStorage.clear();
                sessionStorage[key] = JSON.stringify([responseNewLineRemoved]);
            } catch (err) {
                // Do nothing
            }
        }
    }
};

export default networkLogger;
