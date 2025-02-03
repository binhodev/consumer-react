import type { z } from "zod";
import type { ApiResponse, ErrorResponse } from "../types/types";
import { useEffect, useState } from "react";
import { ConsumerClient } from "../client/consumer.client";

type UseGetOptions<T extends z.ZodSchema> = {
    enabled?: boolean;
    params?: Record<string, unknown>;
    onSuccess?: (data: z.infer<T>) => void;
    onError?: (error: ErrorResponse) => void;
};

export function useGet<T extends z.ZodSchema>(schema: T, url: string, options?: UseGetOptions<T>) {
    const [result, setResult] = useState<ApiResponse<T>>({
        success: false,
        data: null,
        error: null,
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setIsLoading(true);

        const response = await ConsumerClient.init().get(schema, url, {
            params: options?.params,
        });

        setResult(response);
        setIsLoading(false);

        if (response.success && options?.onSuccess) {
            options?.onSuccess(response.data);
        } else if (!response.success && options?.onError) {
            options.onError(response.error!);
        }
    };

    useEffect(() => {
        if (options?.enabled !== false) {
            fetchData();
        }
    }, [url, options?.params, options?.enabled]);

    return { ...result, isLoading, refetch: fetchData };
}
