import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({ example: 'content' })
  readonly content: string

  @ApiProperty({ example: ['abcbcddfdf7f8fdf', 'fdsfsdgugdhgfb'] })
  @IsArray()
  @IsOptional()
  readonly fileIds?: string[]
}
