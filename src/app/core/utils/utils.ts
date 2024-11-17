export namespace Utils {
    export function getRandomNumber(max: number) {
        return Math.floor(Math.random() * max);
    }
    
    export function getNFromArray(arr: any[], n: number, unavailableEntries: any[] = []) {
        let availableEntries = [...arr];
        if(unavailableEntries.length > 0) availableEntries = availableEntries.filter(e => !unavailableEntries.includes(e));
        let result: any[] = [];
        for (let i = 0; i < n; i++) {
            const randomIndex = getRandomNumber(availableEntries.length);
            result = [...result, availableEntries[randomIndex]];
            availableEntries.splice(randomIndex, 1);
        }
        return result;
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

    export function addComaToStringArray(arr: string[], addAndSign: boolean = false): string {
        let text = "";
        arr.forEach((str, index) => {
            text += str;
            if (index !== arr.length -1) {
                if (addAndSign && index === arr.length - 2) text += " & ";
                else text += ", "
            };
        });
        return text;
    }
}