import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export abstract class FileCore {
    private readonly GET_TMP_PATH = () => join(__dirname, '..', '..', '..', 'tmp');
    private readonly GET_UPLOADS_PATH = () => join(__dirname, '..', '..', '..', 'tmp', 'uploads');

    private checkIfExistsOrCreateFolders() {
        try {
            this.checkTMPFolder();
            this.checkUploadsFolder();
            return true;
        } catch (e) {
            throw e;
        }
    }

    private checkTMPFolder() {
        const pathToTMP = this.GET_TMP_PATH();
        const existTMP = existsSync(pathToTMP);
        if (!existTMP) {
            console.log('create tmp');
            mkdirSync(pathToTMP);
        }
        return true;
    }

    private checkUploadsFolder() {
        const pathToUploads = this.GET_UPLOADS_PATH();
        const existUploads = existsSync(pathToUploads);
        if (!existUploads) {
            console.log('create uploads');
            mkdirSync(pathToUploads);
        }
        return true;
    }

    protected getFolder(): string {
        const ok = this.checkIfExistsOrCreateFolders();
        if (ok) {
            return this.GET_UPLOADS_PATH();
        }
        return null;
    }

    protected getFilename(file: Express.Multer.File) {
        const date = Date.now().toString();
        const { originalname } = file;
        return `${date}-${originalname}`;
    }
}
