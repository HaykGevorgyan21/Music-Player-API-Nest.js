import { Module } from '@nestjs/common';
import { SongModule } from './song/song.module';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './options/config/config.module.options';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseModuleAsyncOptions } from './options/monguse/monguse.module.asyn.options';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    ServeStaticModule.forRoot({
      rootPath: path.resolve( 'src/file/static'),
    }),
    SongModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
