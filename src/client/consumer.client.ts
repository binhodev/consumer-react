import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import type { ApiResponse, HttpMethod } from "../types/types";
import type { z } from "zod";
import { handleResponse } from "./handle.response";

export class ConsumerClient {
    private static instance: ConsumerClient;
    private client: AxiosInstance;

    private constructor(config?: AxiosRequestConfig) {
        this.client = axios.create({
            timeout: 10000,
            ...config,
        });
    }

    static init(config?: AxiosRequestConfig): ConsumerClient {
        if (!ConsumerClient.instance) {
            ConsumerClient.instance = new ConsumerClient(config);
        }
        return ConsumerClient.instance;
    }

    private async request<T extends z.ZodSchema>({
        schema,
        method,
        url,
        data,
        config,
    }: {
        schema: T;
        method: HttpMethod;
        url: string;
        data?: unknown;
        config?: AxiosRequestConfig;
    }): Promise<ApiResponse<T>> {
        try {
            const response = await this.client.request({
                method,
                url,
                data,
                ...config,
            });

            return handleResponse(schema, response);
        } catch (e) {
            return handleResponse(schema, e);
        }
    }

    public async get<T extends z.ZodSchema>(
        schema: T,
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<ApiResponse<T>> {
        return this.request({ schema, method: "GET", url, config });
    }

    public async post<T extends z.ZodSchema>(
        schema: T,
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<ApiResponse<T>> {
        return this.request({ schema, method: "POST", url, data, config });
    }

    public async put<T extends z.ZodSchema>(
        schema: T,
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ) {
        return this.request({ schema, method: "PUT", url, data, config });
    }

    public async delete<T extends z.ZodSchema>(
        schema: T,
        url: string,
        config?: AxiosRequestConfig,
    ) {
        return this.request({ schema, method: "DELETE", url, config });
    }
}
