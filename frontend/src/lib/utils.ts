// create a structured clone
export const serializeNonPOJOs = (obj: any) => {
    return structuredClone(obj)
}