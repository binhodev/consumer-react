import { ConsumerReactClient, ConsumerReactError } from "@consumer-react/core";
import { useEffect, useState } from "react";
import {
    ConsumerReactHooksOptions,
    ConsumerReactHooksResponse,
} from "src/types/types";

export function useGet<T>(
    client: ConsumerReactClient,
    route: string,
    { schema, onSuccess, onError }: ConsumerReactHooksOptions<T>
): ConsumerReactHooksResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<ConsumerReactError | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        
        client
            .asyncGet(route)
            .then((response) => {
                const parsedData = schema.parse(response.data);

                if (isMounted) {
                    setData(parsedData);
                    onSuccess && onSuccess(parsedData);
                }
            })
            .catch((error: ConsumerReactError) => {
                if (isMounted) {
                    setError(error);
                    onError && onError(error);
                }
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [client, route, schema, onSuccess, onError]);

    return { data, isLoading, error };
}
