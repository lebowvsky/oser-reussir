import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroContent } from './hero.entity';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HeroContent])],
  providers: [HeroService],
  controllers: [HeroController],
  exports: [HeroService],
})
export class HeroModule {}
