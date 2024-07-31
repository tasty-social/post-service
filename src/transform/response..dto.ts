import { PaginationMeta } from 'src/common/types/paging.type'

export class ResponseDto {
  message: string
  status: string
  data: ResponseDto
  paging?: PaginationMeta
  path: any
}
