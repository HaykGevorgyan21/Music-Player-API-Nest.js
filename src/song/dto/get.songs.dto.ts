import * as Joi from 'joi';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class GetSongsDto {
  @ApiPropertyOptional({
    description: 'Offset',
    default: 0,
  })
  offset: number;
  @ApiPropertyOptional({
    description: 'Limit',
    default: 20,
  })
  limit: number;
  @ApiPropertyOptional({
    description: 'Search by story title description',
  })
  text: string;
}
export const getSongsDtoValidator = Joi.object<GetSongsDto>({
  limit: Joi.number().min(1),
  offset: Joi.number().min(0),
  text: Joi.string(),
});
