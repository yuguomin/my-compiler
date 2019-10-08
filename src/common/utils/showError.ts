export const showError = (errorMsg: string) => {
  new Error(errorMsg);
  console.error(errorMsg);
}