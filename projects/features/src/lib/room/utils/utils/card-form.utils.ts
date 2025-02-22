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
                }
            ]
        );
    }

}