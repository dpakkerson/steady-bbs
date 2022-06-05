import { readFileSync } from "fs";
import { join } from "path";
import { Config } from "../src/models/config";

function getConfig(): Config {
    const localRule = readFileSync(join(__dirname, 'head.txt'), 'utf-8')
    return {
        localRule
    };
}

const config: Config = getConfig();

export default config;
