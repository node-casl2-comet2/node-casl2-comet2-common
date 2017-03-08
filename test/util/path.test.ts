"use strict";

import * as assert from "assert";
import { pathToFileName, isValidInputSource } from "../../src/util/path";

suite("path test", () => {
    test("pathToFileName", () => {
        assert.equal(pathToFileName("a.cas"), "a.cas");

        assert.equal(pathToFileName("./a.cas"), "a.cas");
        assert.equal(pathToFileName(".\\a.cas"), "a.cas");

        assert.equal(pathToFileName("../a.cas"), "a.cas");
        assert.equal(pathToFileName("..\\a.cas"), "a.cas");

        assert.equal(pathToFileName("/a.cas"), "a.cas");
        assert.equal(pathToFileName("\\a.cas"), "a.cas");

        assert.equal(pathToFileName("./a/a.cas"), "a.cas");
        assert.equal(pathToFileName(".\\a\\a.cas"), "a.cas");
    });

    suite("isValidInputSource", () => {
        const validate = (path: string) => isValidInputSource(path, ".cas");

        test("valid pattern", () => {
            // 拡張子が.casである
            const cases = [
                "a.cas", "./a.cas", "./a/a.cas"
            ];

            cases.forEach(x => assert(validate(x)));
        });

        test("invalid pattern", () => {
            // 拡張子が.casでない
            const cases = [
                "", ".", "..", "a", "a.txt", "./a.txt", "./a/a.txt"
            ];

            cases.forEach(x => assert(!validate(x)));
        });
    });
});
