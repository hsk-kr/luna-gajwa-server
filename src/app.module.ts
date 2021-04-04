import { Module } from '@nestjs/common';
import { AnchorModule } from './anchor/anchor.module';

@Module({
  imports: [AnchorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
