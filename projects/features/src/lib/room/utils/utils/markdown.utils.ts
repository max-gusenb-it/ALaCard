export namespace MarkdownUtils {
    export function addTagToContent(content: string, tag: string, classes: string[] = []) : string {
        return `<${tag} class="${classes.join(" ")}">${content}</${tag}>`
    }
}