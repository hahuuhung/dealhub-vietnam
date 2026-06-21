import { Test, TestingModule } from '@nestjs/testing';
import { LivestreamsService } from './livestreams.service';

describe('LivestreamsService', () => {
  let service: LivestreamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivestreamsService],
    }).compile();

    service = module.get<LivestreamsService>(LivestreamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
