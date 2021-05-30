import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService,
    ) { }

    @UseInterceptors(FileInterceptor('file'))
    @Post('upload')
    public upload(
        @Body('name') name: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.filesService.upload(file, name);
    }

    @Get('view/:id')
    public async view(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        const { path } = await this.filesService.findOne(id);
        const root = join(__dirname, '..', '..', 'tmp', 'uploads');
        return res.sendFile(path, { root });
    }
}
