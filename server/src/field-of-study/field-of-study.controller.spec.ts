import { Test, TestingModule } from '@nestjs/testing';
import { FieldOfStudyController } from './field-of-study.controller';

describe('FieldOfStudyController', () => {
  let controller: FieldOfStudyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldOfStudyController],
    }).compile();

    controller = module.get<FieldOfStudyController>(FieldOfStudyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
