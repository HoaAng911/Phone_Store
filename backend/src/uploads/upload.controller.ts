import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Thư mục lưu file
        filename: (req, file, cb) => {
          // Tạo tên file duy nhất
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter:(req,file,cb)=>{
        const allowdMimes =[
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
          'image/gif',
        ]
        if(allowdMimes.includes(file.mimetype)){
          cb(null,true)
        }else{
          cb(new BadRequestException('Chỉ chấp nhận file ảnh (JPG, PNG, WebP, GIF)'),false)
        }
      },
      limits:{
fileSize:5*1024*1024 //5mb
      }
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if(!file){
      throw new BadRequestException('Không có file được upload')
    }
    // Trả về đường dẫn ảnh
    return {
      url: `http://localhost:3000/uploads/${file.filename}`,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size
    };
  }
}
