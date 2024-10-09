export function getRandomNumber(topNumber: number) {
    return Math.floor(Math.random() * topNumber);
}

export function getNFromArray(arr: any[], n?: number) {
    if (!!n) {
        let availableEntries = [...arr];
        let result: any[] = [];
        for (let i = 0; i < n; i++) {
            const randomIndex = getRandomNumber(availableEntries.length);
            result = [...result, availableEntries[randomIndex]];
            availableEntries.splice(randomIndex, 1);
        }
        return result;
    } else {
        return [];
    }
};

/**
 * Count substrings in a string
 * @param string string which will be searched
 * @param subString substring which will be searched in string
 * @returns 0 to n
 */
export function countSubstrings(string: string, subString: string): number {
    return (string.match(new RegExp(subString, "g")) || []).length
}