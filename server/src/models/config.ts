import config from "../../config/config";

export type Config = {
    localRule: string;
}

export function getLocalRule(): string {
    return config.localRule;
}
