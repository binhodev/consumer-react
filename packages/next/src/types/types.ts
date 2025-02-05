import { z } from "zod";
import { ConsumerReactError } from "@consumer-react/core";

export interface ConsumerReactHooksResponse<T> {
    data: T | null;
    isLoading: boolean;
    error: ConsumerReactError | null;
}

export interface ConsumerReactHooksOptions<T> {
    schema: z.ZodSchema<T>;
    onSuccess?: (data: T) => void;
    onError?: (error: ConsumerReactError) => void;
}
