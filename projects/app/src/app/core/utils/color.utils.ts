export namespace ColorUtils {
    interface CSSColorValue {
        color: string,
        value: string
     }

    export function getColorCSS(color: string, colorValues: CSSColorValue[]) {
        return colorValues.find(c => c.color === color)!.value;
    }
}