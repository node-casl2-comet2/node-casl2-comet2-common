"use strict";

export function pathToFileName(path: string): string {
    return path.replace(/^.*[\\\/]/, "");
}

export function isValidInputSource(inputSource: string, extension: string): boolean {
    const fileName = pathToFileName(inputSource);
    const regex = new RegExp(`${extension}$`);
    return fileName.match(regex) ? true : false;
}
