import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as Joi from 'joi';

export class CreateSongDto {
  @ApiProperty({
    description: 'The Song name',
    example: 'Aerials',
  })
  songName: string;
  @ApiProperty({
    description: 'Artist name',
    example: 'Serj Tankian',
  })
  artistName: string;

  @ApiPropertyOptional({
    description: 'Song',
    format: 'binary',
  })
  song: string;
}
export const createSongDTOValidator = Joi.object<CreateSongDto>({
  songName: Joi.string().required(),
  artistName: Joi.string().required(),
  song: Joi.string(),
});
