
import { createHmac } from 'node:crypto';

export const getResponseBody = <T>(data?: T, status?: number, message?: string) => {
    return {
        status: status || 200,
        message: message || "ok",
        data
    }
}
export type ResponseBodyType<T = undefined> = {
    status: number;
    message: string;
    data?: T
}

export const getBase64 = (data: string) => {
    // Node: encode text to base64
    return Buffer.from(data).toString("base64");
}

export const deBase64 = (data: string) => {
    // Node: decode base64 to text
    return Buffer.from(data, "base64").toString("utf-8");
}
export const hashData = (data: string, key: string) => {
    return createHmac('sha256', key).update(data).digest('hex');
}