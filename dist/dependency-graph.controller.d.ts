import { DependencyGraphService } from './dependency-graph.service';
export declare class DependencyGraphController {
    private graphService;
    constructor(graphService: DependencyGraphService);
    get(res: any): Promise<void>;
    treeData(res: any): Promise<void>;
}
