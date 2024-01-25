import { ApiProperty } from '@nestjs/swagger';

export class SongResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  songName: string;
  @ApiProperty()
  artistName: string;
  @ApiProperty()
  trackNumber: number;
  @ApiProperty()
  songPath: string;
  @ApiProperty({ format: 'date-time' })
  createdAt: string;
}
