export const getDigits = (value: string) => {
    let v = value.match(/(\d+)|(^\D+)/g)?.join("");
    return v?.replaceAll(/^\D+/g, '') || ""
}