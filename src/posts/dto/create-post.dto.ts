import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({ example: 'content' })
  @IsOptional()
  readonly content: string

  @IsOptional()
  @IsArray()
  readonly fileIds?: string[]
}
