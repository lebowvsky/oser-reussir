import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev' });

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
  synchronize: false,
});
