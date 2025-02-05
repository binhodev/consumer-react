import { z } from "zod";
import { useState } from "react";
import { ConsumerReactClient, ConsumerReactError } from "@consumer-react/core";

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

export function useGet<T>(
    client: ConsumerReactClient,
    route: string,
    { schema, onSuccess, onError }: ConsumerReactHooksOptions<T>
) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<ConsumerReactError | null>(null);
}
