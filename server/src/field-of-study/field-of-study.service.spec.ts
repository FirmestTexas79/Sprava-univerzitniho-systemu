import { Test, TestingModule } from '@nestjs/testing';
import { FieldOfStudyService } from './field-of-study.service';

describe('FieldOfStudyService', () => {
  let service: FieldOfStudyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldOfStudyService],
    }).compile();

    service = module.get<FieldOfStudyService>(FieldOfStudyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
