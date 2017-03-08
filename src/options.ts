"use strict";


export type OptionType = "boolean" | "string";

export interface CommandLineOption {
    name: string;
    shortName?: string;
    type: OptionType;
    description: string;
}

export interface CommandLineOptions {
    [option: string]: boolean | string | undefined;
}
