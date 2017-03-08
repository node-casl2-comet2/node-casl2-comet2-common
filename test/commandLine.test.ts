"use strict";

import * as assert from "assert";
import { parseCommandLine, ParsedCommandLine } from "../src/commandLine";
import { CommandLineOption, CommandLineOptions } from "../src/options";


suite("parse command line test", () => {
    interface TestCommandLineOptions extends CommandLineOptions {
        version?: boolean
    }

    const commandLineOptions: Array<CommandLineOption> = [
        {
            name: "version",
            shortName: "v",
            type: "boolean",
            description: "バージョンを表示します。"
        }
    ];

    test("version option", () => {
        const cl = ["--version"];
        const result = parseCommandLine<TestCommandLineOptions>(cl, commandLineOptions);
        assert(result.options.version);
    });

    test("short version option", () => {
        const cl = ["-v"];
        const result = parseCommandLine<TestCommandLineOptions>(cl, commandLineOptions);
        assert(result.options.version);
    });
});
