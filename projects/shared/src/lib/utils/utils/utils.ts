import firebase from 'firebase/compat/app';

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

    export function addComaToStringArray(arr: string[], addAndSign: boolean = false, addParagraph: boolean = false): string {
        let text = "";
        arr.forEach((str, index) => {
            text += str;
            if (index !== arr.length -1) {
                if (addAndSign && index === arr.length - 2) text += " & ";
                else text += ", "
                if (addParagraph) text += "<br>"
            };
        });
        return text;
    }

    export function timestampToDate(timestamp: firebase.firestore.Timestamp) {
        return new Date(timestamp.seconds * 1000);
    }

    export function getDateWithoutTime(date: Date) {
        let d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }

    export function isNumberDefined(n?: number) {
        return typeof n !== "undefined" && n !== null;
    }

    export function isStringDefinedAndNotEmpty(s: string | undefined | null) {
        return s && s !== "";
    }
}