export const args = <O extends object>(obj: O) => {
  interface Args {
    [key: string]: any;
  }

  return obj as Args;
};
