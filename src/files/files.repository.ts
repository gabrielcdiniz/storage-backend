import { EntityRepository, Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity';

@EntityRepository(File)
export class FilesRepository extends Repository<File> {
    public async createFile(createFileDto: CreateFileDto): Promise<File> {
        const {
            name,
            path,
        } = createFileDto;

        const file = new File();

        file.name = name;
        file.path = path;

        return await file.save();
    }
}