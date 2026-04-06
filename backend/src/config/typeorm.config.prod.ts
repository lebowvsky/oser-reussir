import { DataSource } from 'typeorm';
import * as path from 'path';

const distRoot = path.resolve(__dirname, '..', '..');

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [path.join(distRoot, 'src/modules/**/*.entity.js')],
  migrations: [path.join(distRoot, 'migrations/*.js')],
  synchronize: false,
});
