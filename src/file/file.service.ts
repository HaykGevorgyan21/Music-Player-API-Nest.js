import { HttpException, HttpStatus, Injectable, BadRequestException} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid'
@Injectable()
export class FileService {
  async createFile(file) {
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav') {
      try {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = uuid.v4() + '.' + fileExtension;
        const filePath=path.resolve('src/file/static')
        if (!fs.existsSync(filePath)){
          fs.mkdirSync(filePath,{recursive:true})
        }
        fs.writeFile(path.resolve(filePath,fileName),file.buffer,()=>{

        })
        return '/'+fileName
      } catch (e) {
         throw new HttpException(e.message,HttpStatus.BAD_REQUEST)
      }
    }else {
      throw  new BadRequestException({error:'valid  types audio/mpeg or audio/wav'})
    }

  }
}
