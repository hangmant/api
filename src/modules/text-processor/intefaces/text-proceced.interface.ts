export interface TextProcessed {
  html: string
  urls: string[]
  mentions: string[]
  issues: { number: number }[]
}
