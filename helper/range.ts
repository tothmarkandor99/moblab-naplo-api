export const  range = (from: number, to: number, step: number = 1):number[] => {
    let a: number[] = [];
    if (step === 0 || (to > from && step < 0) || (to < from && step > 0))
        {return a}
    for (let i = from; i < to; i += step) {

    }
}