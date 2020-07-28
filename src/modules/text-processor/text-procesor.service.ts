import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common'
import { MARKDOWN_PROCESSOR } from './constants'
import * as MarkdownProcessor from 'gitter-markdown-processor'
import { promisify } from 'util'
import { TextProcessed } from './intefaces/text-proceced.interface'

@Injectable()
export class TextProcessorService implements OnModuleDestroy {
  private readonly processMarkdown

  constructor(@Inject(MARKDOWN_PROCESSOR) private readonly markdownProcessor: MarkdownProcessor) {
    this.processMarkdown = promisify(this.markdownProcessor.process).bind(markdownProcessor)
  }

  async processText(text: string): Promise<TextProcessed> {
    return this.processMarkdown(text)
  }

  async onModuleDestroy() {
    this.markdownProcessor.shutdown(() => console.log('MarkdownProcessor finished'))
  }
}
