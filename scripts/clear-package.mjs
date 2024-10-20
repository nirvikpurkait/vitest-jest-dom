/// <reference path="./clear-package.d.ts" />

import path from "node:path";
import fsProm from "node:fs/promises";
import colors from "colors";

/**
 * @typedef {"dist-folder" | "types-folder"} ErrorType
 */

/**
 * Custom error class for package clearing.
 * @param {ErrorType} type - The type of error ("dist-folder" or "types-folder").
 * @param {string} [errorMessage] - Optional error message.
 */
export class ClearPackageError extends Error {
  /**
   * @param {ErrorType} type
   * @param {string} [errorMessage]
   */
  constructor(type, errorMessage) {
    super(errorMessage);
    this.type = type;
    this.errorMessage = errorMessage;
  }
}

const red = colors.red;
const green = colors.green;

(async function clearPackage() {
  try {
    await clearTypesFolder();
    await clearDistFolder();
  } catch (error) {
    if (error instanceof ClearPackageError) {
      if (error.type === "dist-folder") {
        console.error(`${red("✘ Error:")} "dist" folder was not cleared`);
        return;
      }
      if (error.type === "types-folder") {
        console.error(`${red("✘ Error:")} "types" folder was not cleared`);
        return;
      }
    }

    console.error(`${red("✘ Error:")} clearing was not completed`);
  }
})();

async function clearDistFolder() {
  const distFolder = path.join(process.cwd(), "dist");

  try {
    await fsProm.rm(distFolder, { recursive: true, force: true });
    console.info(`${green("✔ Success:")} "dist" folder cleared successfully`);
  } catch (error) {
    throw new ClearPackageError("dist-folder");
  }
}

async function clearTypesFolder() {
  const distFolder = path.join(process.cwd(), "types");

  try {
    await fsProm.rm(distFolder, { recursive: true, force: true });
    console.info(`${green("✔ Success:")} "types" folder cleared successfully`);
  } catch (error) {
    throw new ClearPackageError("types-folder");
  }
}
