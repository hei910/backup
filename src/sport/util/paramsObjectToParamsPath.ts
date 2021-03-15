export const prefixCharater = '/';
const priorityKeys = ['matchStatus'];

const paramsObjectToParamsPath = (inputObject: { [key: string]: any }): string => {
    let outputString = '';
    const list: string[] = Object.keys(inputObject);

    list.sort();

    for (const priorityKey of priorityKeys) {
        if (
            inputObject[priorityKey] &&
            JSON.stringify(inputObject[priorityKey]) !== JSON.stringify({}) &&
            inputObject[priorityKey].toString().length > 0
        ) {
            outputString += prefixCharater + priorityKey + prefixCharater + inputObject[priorityKey].toString();

            const indexOfList = list.indexOf(priorityKey);
            list.splice(indexOfList, 1);
        }
    }

    for (const key of list) {
        if (
            inputObject[key] &&
            JSON.stringify(inputObject[key]) !== JSON.stringify({}) &&
            inputObject[key].toString().length > 0
        ) {
            outputString += prefixCharater + key + prefixCharater + inputObject[key].toString();
        }
    }

    return outputString;
};

export default paramsObjectToParamsPath;
