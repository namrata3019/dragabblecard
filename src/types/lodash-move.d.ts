declare module "lodash-move" {
  function swap<T>(array: T[], fromIndex: number, toIndex: number): T[];
  export = swap;
}
