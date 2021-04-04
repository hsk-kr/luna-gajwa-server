import { Module } from '@nestjs/common';
import { AnchorController } from './anchor.controller';
import { AnchorService } from './anchor.service';
import { AnchorLibProvider } from './anchorlib.provider';

@Module({
  controllers: [AnchorController],
  providers: [AnchorService, AnchorLibProvider],
})
export class AnchorModule {}
