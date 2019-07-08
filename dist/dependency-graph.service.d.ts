export declare class DependencyGraphService {
    private graphData;
    constructor();
    setRootModule(module: any): Promise<void>;
    getGraphData(): any;
    private mapToGraphStructure;
    private scanModule;
}
