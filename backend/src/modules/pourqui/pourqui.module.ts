import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PourquiContent } from './pourqui-content.entity';
import { PourquiService } from './pourqui.service';
import { PourquiController } from './pourqui.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PourquiContent])],
  providers: [PourquiService],
  controllers: [PourquiController],
  exports: [PourquiService],
})
export class PourquiModule {}
