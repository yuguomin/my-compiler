export const isAlpha: (singleChar: string) => boolean = (singleChar) => {
  return /[a-zA-Z]/.test(singleChar);
}