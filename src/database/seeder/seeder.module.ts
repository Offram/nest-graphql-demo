import { Logger, Module } from '@nestjs/common';
import { SeederDataModule } from './data/seeder-data.module';
import { Seeder } from './seeder';

@Module({
  imports: [SeederDataModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
