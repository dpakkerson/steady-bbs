import { readFileSync } from "fs";
import { join } from "path";
import { Config } from "../src/models/config";

function getConfig(): Config {
    const boardName = 'Steady BBS';
    const localRule = readFileSync(join(__dirname, 'head.txt'), 'utf-8').replace('{{boardName}}', boardName);
    return {
        localRule,
        boardName,
    };
}

const config: Config = getConfig();

export default config;
