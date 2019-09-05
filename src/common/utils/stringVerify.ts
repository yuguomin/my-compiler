export const isAlpha: (singleChar: string) => boolean = (singleChar) => {
  return /[a-zA-Z]/.test(singleChar);
}

export const isDight: (singleChar: string) => boolean = (singleChar) => {
  return /[0-9]/.test(singleChar);
}

export const isGE: (singleChar: string) => boolean = (singleChar) => {
  return /^=$/.test(singleChar);
}