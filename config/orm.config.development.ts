import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'reading_recommendation',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
export default config;
