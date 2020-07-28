import { Module } from '@nestjs/common'
import * as MarkdownProcessor from 'gitter-markdown-processor'
import { MARKDOWN_PROCESSOR } from './constants'
import { TextProcessorService } from './text-procesor.service'

@Module({
  providers: [
    {
      provide: MARKDOWN_PROCESSOR,
      useClass: MarkdownProcessor
    },
    TextProcessorService
  ],
  exports: [TextProcessorService]
})
export class TextProcessorModule {}
