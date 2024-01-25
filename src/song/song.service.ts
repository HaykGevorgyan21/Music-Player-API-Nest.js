import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Song, SongDocument } from './songSchema/song.schema';
import { Model } from 'mongoose';
import { SongPayload } from './payload/song.payload';
import { FileService } from '../file/file.service';
import mongoose from 'mongoose';
import { SongResponse } from "./respons/song.response";
import { GetSongsDto } from "./dto/get.songs.dto";

@Injectable()
export class SongService {
  constructor(
    private readonly fileService: FileService,
    @InjectModel(Song.name)
    private readonly songModel: Model<SongDocument>,
  ) {}

  async createSong(dto, song):Promise<SongResponse> {
    const { songName, artistName } = dto;
    const songPath = await this.fileService.createFile(song);
    const tracks = await this.songModel.find().exec();
    const trackNumber = tracks.length + 1;
    const payload: SongPayload = {
      songName,
      artistName,
      trackNumber,
      songPath,
    };
    const newSong = await this.songModel.create(payload);
    return this.getSongById(newSong._id)
  }

  async getSongById(id):Promise<SongResponse> {
    const condition: any = { _id: new mongoose.Types.ObjectId(id) };
    const song = await this.songModel.aggregate([
      { $match: condition },
      {
        $project: {
          id: '$_id',
          _id: 0,
          songName: '$songName',
          artistName: '$artistName',
          trackNumber: '$trackNumber',
          songPath: '$songPath',
          createdAt: '$createdAt',
        },
      },
    ]).then(res=>res?.[0]);
    return song as SongResponse
  }

  async findAll(option:GetSongsDto): Promise<SongResponse[]>{
    const {limit, offset, text} = option
    const condition:any={}
    if (text) {
      const searchText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      condition.$or = [
        { 'songName': new RegExp(searchText, 'i') },
        { 'artistName': new RegExp(searchText, 'i') },
      ]
    }
    const songs=await this.songModel.aggregate([
      {$match:condition},
      { $sort: { "createdAt": -1 } },
      { $skip: Number(offset) || 0 },
      { $limit: Number(limit) || 20 },
      {
        $project: {
          id: '$_id',
          _id: 0,
          songName: '$songName',
          artistName: '$artistName',
          trackNumber: '$trackNumber',
          songPath: '$songPath',
          createdAt: '$createdAt',
        },
      },

    ])
    return songs as SongResponse[]
  }

}
