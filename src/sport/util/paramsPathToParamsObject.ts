import { prefixCharater } from './paramsObjectToParamsPath';

const paramsPathToParamsObject = (url: string): { [key: string]: string } => {
    const outputObject: { [key: string]: string } = {};
    const list = url.split(prefixCharater);

    for (let i = 1; i < list.length - 1; i += 2) {
        outputObject[list[i]] = list[i + 1];
    }

    return outputObject;
};

export default paramsPathToParamsObject;
