import { Test, TestingModule } from '@nestjs/testing';
import { LivestreamsController } from './livestreams.controller';

describe('LivestreamsController', () => {
  let controller: LivestreamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivestreamsController],
    }).compile();

    controller = module.get<LivestreamsController>(LivestreamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
