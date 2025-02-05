import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ConsumerReactClientOptions {
    baseUrl: string;
    timeout?: number;
    plugins?: ConsumerReactPlugin[];
    interceptors?: {
        beforeRequest?: (
            config: AxiosRequestConfig
        ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
        afterResponse?: (
            response: AxiosResponse
        ) => AxiosResponse | Promise<AxiosResponse>;
    };
}

export interface ConsumerReactError extends Error {
    status?: number;
    code?: string;
    data?: any;
    originalError?: any;
}

export interface ConsumerReactPlugin {
    name: string;
    beforeRequest?: (
        config: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    afterResponse?: (
        config: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>;
    onError?(
        error: ConsumerReactError
    ): ConsumerReactError | Promise<ConsumerReactError>;
}
