export const isAlpha: (singleChar: string) => boolean = (singleChar) => {
  return /[a-zA-Z]/.test(singleChar);
}

export const isDight: (singleChar: string) => boolean = (singleChar) => {
  return /[0-9]/.test(singleChar);
}

export const isAssignment: (singleChar: string) => boolean = (singleChar) => {
  return /^=$/.test(singleChar);
}

export const isGT: (singleChar: string) => boolean = (singleChar) => {
  return /^>$/.test(singleChar);
}

export const isBlank: (singleChar: string) => boolean = (singleChar) => {
  return /\s/.test(singleChar);
}