import { Module } from '@nestjs/common';
import { DependencyGraphService } from './dependency-graph.service';
import { DependencyGraphController } from './dependency-graph.controller';

@Module({
  providers: [DependencyGraphService],
  controllers: [DependencyGraphController],
})
export class DependencyGraphModule {
}
