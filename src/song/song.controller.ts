import {
  BadRequestException,
  Body,
  Query,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UploadedFile,
  UseInterceptors, Param, Delete
} from "@nestjs/common";
import { ApiConsumes, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { swaggerConst } from '../constant/swagger.const';
import { JoiValidationPipe } from '../pipe/joi/joi-validation.pipe';
import { CreateSongDto, createSongDTOValidator} from './dto/create.song.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SongModule } from "./song.module";
import { SongService } from "./song.service";
import { SongResponse } from "./respons/song.response";
import { GetSongsDto, getSongsDtoValidator } from "./dto/get.songs.dto";

@Controller('song')
export class SongController {
  constructor(
    private readonly songSevice:SongService
  ) {
  }
  @ApiTags(swaggerConst.tag.song)
  @ApiOkResponse({
    description: "The song list",
    type: SongResponse,
  })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  @UseInterceptors(FileInterceptor('song'))
  async createSong(
    @UploadedFile() song,
    @Body(new JoiValidationPipe(createSongDTOValidator)) dto: CreateSongDto,
  ):Promise<SongResponse> {
     return await this.songSevice.createSong(dto,song)
  }
  @ApiTags(swaggerConst.tag.song)
  @ApiOkResponse({
    description: "The song list",
    type: [SongResponse],
  })
  @Get('findAll')
  async getAllSongs(
    @Query(new JoiValidationPipe(getSongsDtoValidator)) dto: GetSongsDto,
  ): Promise<SongResponse[]> {
   return await this.songSevice.findAll(dto)
  }

}
