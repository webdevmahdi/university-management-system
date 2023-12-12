import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

export const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    const errorSources : TErrorSources = [{
        path: err?.path,
        message: err?.message
    }];
    const statusCode = 400
    return {
        statusCode,
        message: 'Duplicate ID',
        errorSources,
    }
}