import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AproposContent } from './apropos.entity';
import { AproposService } from './apropos.service';
import { AproposController } from './apropos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AproposContent])],
  providers: [AproposService],
  controllers: [AproposController],
  exports: [AproposService],
})
export class AproposModule {}
