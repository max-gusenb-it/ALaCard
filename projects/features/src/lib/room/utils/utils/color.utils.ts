import { systemDefaultValue } from "@shared";

export namespace ColorUtils {
    interface CSSColorValue {
        color: string,
        value: string
     }

    export function getColorCSS(color: string, colorValues: CSSColorValue[]) {
        return colorValues.find(c => c.color === color)!.value;
    }

    export function getBackground100CSS(color: string) {
        return ColorUtils.getColorCSS(
            color,
            [
                {
                    color: "blue",
                    value: "bg-blue-100"
                },
                {
                    color: "violet",
                    value: "bg-violet-100"
                },
                {
                    color: "emerald",
                    value: "bg-emerald-100"
                },
                {
                    color: "green",
                    value: "bg-green-100"
                },
                {
                    color: "red",
                    value: "bg-red-100"
                },
                {
                    color: "pink",
                    value: "bg-pink-100"
                }
            ]
        );
    }

    export function getBackground200CSS(color: string) {
        return ColorUtils.getColorCSS(
            color,
            [
                {
                    color: systemDefaultValue,
                    value: "bg-it_yellow-200"
                },
                {
                    color: "blue",
                    value: "bg-blue-200"
                },
                {
                    color: "violet",
                    value: "bg-violet-200"
                },
                {
                    color: "emerald",
                    value: "bg-emerald-200"
                },
                {
                    color: "green",
                    value: "bg-green-200"
                },
                {
                    color: "red",
                    value: "bg-red-200"
                },
                {
                    color: "pink",
                    value: "bg-pink-200"
                }
            ]
        );
    }

    export function getCardBorderCSS(color: string) {
        return ColorUtils.getColorCSS(
            color,
            [
                {
                    color: systemDefaultValue,
                    value: "border-it_yellow-500 bg-it_yellow-500"
                },
                {
                    color: "blue",
                    value: "border-blue-500 bg-blue-500"
                },
                {
                    color: "violet",
                    value: "border-violet-500 bg-violet-500"
                },
                {
                    color: "emerald",
                    value: "border-emerald-500 bg-emerald-500"
                },
                {
                    color: "green",
                    value: "border-green-500 bg-green-500"
                },
                {
                    color: "red",
                    value: "border-red-500 bg-red-500"
                },
                {
                    color: "pink",
                    value: "border-pink-500 bg-pink-500"
                }
            ]
        );
    }

    export function getSelectCSS(color: string) {
        return ColorUtils.getColorCSS(
            color,
            [
                {
                    color: "primary",
                    value: "bg-primary-200 border-primary-200 hover:border-b-primary-500 focus:border-primary-500 disabled:bg-primary-100 disabled:border-primary-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                },
                {
                    color: "red",
                    value: "bg-red-200 border-red-200 hover:border-b-red-500 focus:border-red-500 disabled:bg-red-100 disabled:border-red-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                },
                {
                    color: "blue",
                    value: "bg-blue-200 border-blue-200 hover:border-b-blue-500 focus:border-blue-500 disabled:bg-blue-100 disabled:border-blue-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-blue-500"
                },
                {
                    color: "emerald",
                    value: "bg-emerald-200 border-emerald-200 hover:border-b-emerald-500 focus:border-emerald-500 disabled:bg-emerald-100 disabled:border-emerald-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-emerald-500"
                },
                {
                    color: "green",
                    value: "bg-green-200 border-green-200 hover:border-b-green-500 focus:border-green-500 disabled:bg-green-100 disabled:border-green-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-green-500"
                },
                {
                    color: "violet",
                    value: "bg-violet-200 border-violet-200 hover:border-b-violet-500 focus:border-violet-500 disabled:bg-violet-100 disabled:border-violet-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-violet-500"
                },
                {
                    color: "pink",
                    value: "bg-pink-200 border-pink-200 hover:border-b-pink-500 focus:border-pink-500 disabled:bg-pink-100 disabled:border-pink-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-pink-500"
                }
            ]
        );
    }
}