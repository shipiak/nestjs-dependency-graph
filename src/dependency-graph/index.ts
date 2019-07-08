import * as path from 'path';
import * as fs from 'fs';
import { DependencyGraphModule } from './dependency-graph.module';
import { NestFactory } from '@nestjs/core';
import { DependencyGraphService } from './dependency-graph.service';

async function bootstrap() {
  const args = process.argv.slice(2);
  if (!args.length) {
    return console.error('You need to pass root module path as first argument...');
  }
  const modulePath = path.resolve(args[0]);
  if (!modulePath || !fs.existsSync(modulePath)) {
    return console.error(`Cannot resolve path '${modulePath}'`);
  }

  const module = await import(modulePath);
  const moduleExports = Object.values(module);
  if (moduleExports.length > 1) {
    return console.error(`There are multiple exports in provided file, don't know which export to scan`);
  }

  const app = await NestFactory.create(DependencyGraphModule);

  const moduleClass = moduleExports[0];
  app.get(DependencyGraphService).setRootModule(moduleClass);

  await app.listen(3000);
  await app.init();

  console.log('Graph ready on http://localhost:3000');
}

bootstrap();
