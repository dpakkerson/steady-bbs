import config from "../../config/config";

export type Config = {
    localRule: string;
    boardName: string;
}

export function getConfig(): Config {
    return config;
}
