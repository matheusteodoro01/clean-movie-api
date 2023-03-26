import { config } from 'dotenv';
import 'reflect-metadata';

export default async () => {
  config({
    path: '.env.example',
  });
};
