import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PourquoiContent } from './pourquoi-content.entity';
import { PourquoiService } from './pourquoi.service';
import { PourquoiController } from './pourquoi.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PourquoiContent])],
  providers: [PourquoiService],
  controllers: [PourquoiController],
  exports: [PourquoiService],
})
export class PourquoiModule {}
