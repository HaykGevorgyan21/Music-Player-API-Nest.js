import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SongDocument = Song & Document;

@Schema({ timestamps: true })
export class Song {
  @Prop({ required: true })
  songName: string;
  @Prop({ required: true })
  artistName: string;
  @Prop({ required: true })
  trackNumber: number;
  @Prop({ required: true })
  songPath: string;
}
export const SongSchema = SchemaFactory.createForClass(Song);
SongSchema.index({ createdAt: -1 });
