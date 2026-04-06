import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValeursContent } from './valeurs-content.entity';
import { ValeursService } from './valeurs.service';
import { ValeursController } from './valeurs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ValeursContent])],
  providers: [ValeursService],
  controllers: [ValeursController],
  exports: [ValeursService],
})
export class ValeursModule {}
