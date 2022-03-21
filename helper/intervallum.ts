export const intervallum = (tol: number, ig: number): number[] => {
  let a: number[] = []
  if (tol > ig) {
    return a
  }
  for (let i = tol; i <= ig; i += 1) {
    a = [...a, i]
  }
  return a
}
