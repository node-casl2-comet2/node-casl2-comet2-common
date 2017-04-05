"use strict";

import { CommandLineOption } from "./options";
import { pathToFileName } from "./util/path";
import { sys, ExitStatus } from "./sys";
import * as _ from "lodash";

export namespace CLI {
    export function printHelp(commandLineOptions: CommandLineOption[]) {
        const output: string[] = [];

        const optionColumn: string[] = [];
        const descriptionColumn: string[] = [];
        let marginLength = 0;

        const sortedCommandLineOptions = commandLineOptions.sort((a, b) => {
            const c = a.name.toLowerCase() > b.name.toLowerCase();
            return c ? 1 : -1;
        });

        const makeSpace = (spaceLength: number) => Array(spaceLength + 1).join(" ");

        for (const opt of sortedCommandLineOptions) {
            let option = "";
            if (opt.shortName) {
                option += `-${opt.shortName}, `;
            }
            option += `--${opt.name}`;

            optionColumn.push(option);
            descriptionColumn.push(opt.description);

            marginLength = Math.max(option.length, marginLength);
        }

        if (optionColumn.length !== descriptionColumn.length) throw new Error();

        const zip = _.zip(optionColumn, descriptionColumn);
        for (const l of zip) {
            const [option, description] = l;
            // e.g. -v, --version [スペース] [説明]
            const format = option + makeSpace(marginLength - option.length + 4) + description;
            output.push(format);
        }

        for (const out of output) {
            sys.stdout.writeLine(out);
        }
    }

    export function printAppInfo(appName: string, version: string) {
        sys.stdout.writeLine(`${appName} v${version}`);
    }

    export function printVersion(version: string) {
        sys.stdout.writeLine(`v${version}`);
    }
}
