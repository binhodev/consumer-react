import { AxiosError, type AxiosResponse } from "axios";
import type { z, ZodError } from "zod";
import type { ApiResponse, ErrorResponse } from "../types/types";

export function handleResponse<T extends z.ZodSchema>(
    schema: T,
    response: AxiosResponse | unknown,
): ApiResponse<T> {
    if (response instanceof AxiosError) {
        const error: ErrorResponse = {
            message: response.message,
            code: response.code || "UNKNOWN ERROR",
            status: response.response?.status,
            validationErrors: null,
        };

        return { success: false, error, data: null };
    }

    const axiosResponse = response as AxiosResponse;

    try {
        const parsedData = schema.parse(axiosResponse.data);

        return { success: true, error: null, data: parsedData };
    } catch (e) {
        const error = e as ZodError;
        const validationError: ErrorResponse = {
            message: "Validation failed",
            code: "SCHEMA_VALIDATION_ERROR",
            status: 422,
            validationErrors: error.errors,
        };

        return {
            success: false,
            error: validationError,
            data: null,
        };
    }
}
