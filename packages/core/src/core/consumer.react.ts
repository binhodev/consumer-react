import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
    ConsumerReactClientOptions,
    ConsumerReactError,
    ConsumerReactPlugin,
} from "../types/types";

export class ConsumerReactClient {
    private client: AxiosInstance;
    private plugins: ConsumerReactPlugin[] = [];

    constructor(private options: ConsumerReactClientOptions) {
        this.client = axios.create({
            baseURL: options.baseUrl,
            timeout: options.timeout || 5000,
        });

        if (options.plugins) {
            this.plugins = options.plugins;
        }

        this.client.interceptors.request.use(
            async (config: AxiosRequestConfig) => {
                if (options.interceptors?.beforeRequest) {
                    config = await options.interceptors.beforeRequest(config);
                }

                for (const plugin of this.plugins) {
                    if (plugin.beforeRequest) {
                        config = await plugin.beforeRequest(config);
                    }
                }

                return config;
            }
        );

        this.client.interceptors.response.use(
            async (response: AxiosResponse) => {
                if (options.interceptors?.afterResponse) {
                    response =
                        await options.interceptors.afterResponse(response);
                }

                for (const plugin of this.plugins) {
                    if (plugin.afterResponse) {
                        response = await plugin.afterResponse(response);
                    }
                }

                return response;
            },
            async (error) => {
                // for (const plugin of this.plugins) {
                //     if (plugin.onError) {
                //         error = await plugin.onError(error);
                //     }
                // }
                const consumerError: ConsumerReactError = {
                    ...error,
                    message: error.message,
                    status: error.response?.status,
                    code: error.code,
                    data: error.response?.data,
                    originalError: error,
                };

                return Promise.reject(consumerError);
            }
        );
    }

    /**
     * get<T>
     */
    public async get<T>(route: string, config?: AxiosRequestConfig) {
        return await this.client.get<T>(route, config);
    }

    /**
     * post<T>
     */
    public post<T>(
        route: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.client.post(route, data, config);
    }

    /**
     * put<T>
     */
    public put<T>(
        route: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.client.put(route, data, config);
    }

    /**
     * patch<T>
     */
    public patch<T>(
        route: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.client.patch(route, data, config);
    }
}
