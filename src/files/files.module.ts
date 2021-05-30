import { Global, Module } from '@nestjs/common';
import { DiskDriver } from './drivers/disk/disk-driver';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesRepository } from './files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([FilesRepository])],
    providers: [
        FilesService,
        DiskDriver,
    ],
    exports: [
        FilesService,
        DiskDriver,
    ],
    controllers: [FilesController],
})
export class FilesModule {}
