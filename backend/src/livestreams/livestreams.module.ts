import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { LivestreamsService } from './livestreams.service';
import { LivestreamsController } from './livestreams.controller';

@Module({
  providers: [ChatGateway, LivestreamsService],
  controllers: [LivestreamsController]
})
export class LivestreamsModule {}
