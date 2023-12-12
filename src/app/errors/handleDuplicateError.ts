import { TGenericErrorResponse } from "../interface/error";

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
    // Extract value within double quotes using regex
    const match = err.message.match(/"([^"]*)"/);

    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];
    const errorSources = [{
        path: '',
        message: `${extractedMessage} is already exists.`
    }]
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate id',
        errorSources
    }
}