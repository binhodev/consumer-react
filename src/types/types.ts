import type { z } from "zod";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiResponse<T extends z.ZodSchema> {
    success: boolean;
    data: z.infer<T> | null;
    error: ErrorResponse | null;
}

export interface ErrorResponse {
    message: string;
    code: string;
    status?: number;
    validationErrors?: z.ZodIssue[] | null;
}
