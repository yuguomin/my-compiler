export const isAlpha: (singleChar: string) => boolean = (singleChar) => {
  return /[a-zA-Z]/.test(singleChar);
}

export const isDigit: (singleChar: string) => boolean = (singleChar) => {
  return /[0-9]/.test(singleChar);
}

export const isBlank: (singleChar: string) => boolean = (singleChar) => {
  return /\s/.test(singleChar);
}