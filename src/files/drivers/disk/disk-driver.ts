import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { FileCore } from '../../core/file.core';
import { UploadConfig } from '../../files.types';

@Injectable()
export class DiskDriver extends FileCore {
    constructor() { super(); }

    public upload(file: Express.Multer.File) {
        return new Promise<UploadConfig>((resolve, reject) => {
            const folder = this.getFolder();
            const filename = this.getFilename(file);
            const path = join(folder, filename);

            writeFileSync(path, file.buffer);

            return resolve({ path: filename });
        });
    }
}
