import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccompagnementContent } from './accompagnement-content.entity';
import { AccompagnementService } from './accompagnement.service';
import { AccompagnementController } from './accompagnement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccompagnementContent])],
  providers: [AccompagnementService],
  controllers: [AccompagnementController],
  exports: [AccompagnementService],
})
export class AccompagnementModule {}
