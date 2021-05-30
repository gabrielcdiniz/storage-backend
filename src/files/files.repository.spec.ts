import { Test, TestingModule } from '@nestjs/testing';
import { FilesRepository } from './files.repository';

describe('FilesRepository', () => {
  let provider: FilesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesRepository],
    }).compile();

    provider = module.get<FilesRepository>(FilesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
