import { IsOptional, IsNumberString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  limit?: number;
}