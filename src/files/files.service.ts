import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DiskDriver } from './drivers/disk/disk-driver';
import { FilesRepository } from './files.repository';
import { DriversTypes, UploadConfig } from './files.types';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FilesRepository)
        private readonly filesRepository: FilesRepository,
        private readonly configService: ConfigService,
        private readonly diskDriver: DiskDriver,
    ) { }

    public async upload(file: Express.Multer.File, name: string) {
        let uploaded!: UploadConfig;
        const driver = this.configService.get<DriversTypes>('FILE_DRIVER');
        switch (driver) {
            case 'disk':
                uploaded = await this.diskDriver.upload(file);

            default:
                break;
        }
        const { path } = uploaded;
        return await this.filesRepository.createFile({ path, name });
    }

    public async findOne(id: string) {
        const file = await this.filesRepository.findOne(id);
        if (!file) {
            throw new HttpException(`File Not Found with this ID: ${id}`, HttpStatus.NOT_FOUND);
        }
        return file;
    }
}
