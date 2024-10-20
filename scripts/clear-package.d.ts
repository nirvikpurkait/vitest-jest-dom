declare module "clear-package" {
  export type ErrorType = "dist-folder" | "types-folder";

  export class ClearPackageError extends Error {
    type: ErrorType;
    errorMessage: string | undefined;
    constructor(type: ErrorType, errorMessage: string | undefined);
  }
}
