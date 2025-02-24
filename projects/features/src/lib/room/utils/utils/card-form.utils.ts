import { ColorUtils } from "./color.utils"

export namespace CardFormUtils {
    export function getInteractiveFormBackgroundCSS(color: string) {
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
                }
            ]
        );
    }

}