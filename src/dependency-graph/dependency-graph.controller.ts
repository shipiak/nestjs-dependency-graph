import { Controller, Get, Res } from '@nestjs/common';
import { DependencyGraphService } from './dependency-graph.service';

@Controller()
export class DependencyGraphController {
  constructor(private graphService: DependencyGraphService) {
  }

  @Get()
  async get(@Res() res) {
    res.sendFile(`${__dirname}/index.html`);
  }

  @Get('tree-data')
  async treeData(@Res() res) {
    const stringified = JSON.stringify(this.graphService.getGraphData());
    res.send(`var treeData = [${stringified}]`);
  }
}
