"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const dependency_graph_module_1 = require("./dependency-graph.module");
const core_1 = require("@nestjs/core");
const dependency_graph_service_1 = require("./dependency-graph.service");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = process.argv.slice(2);
        if (!args.length) {
            return console.error('You need to pass root module path as first argument...');
        }
        const modulePath = path.resolve(args[0]);
        if (!modulePath || !fs.existsSync(modulePath)) {
            return console.error(`Cannot resolve path '${modulePath}'`);
        }
        const module = yield Promise.resolve().then(() => require(modulePath));
        const moduleExports = Object.values(module);
        if (moduleExports.length > 1) {
            return console.error(`There are multiple exports in provided file, don't know which export to scan`);
        }
        const app = yield core_1.NestFactory.create(dependency_graph_module_1.DependencyGraphModule);
        const moduleClass = moduleExports[0];
        app.get(dependency_graph_service_1.DependencyGraphService).setRootModule(moduleClass);
        yield app.listen(3000);
        yield app.init();
        console.log('Graph ready on http://localhost:3000');
    });
}
bootstrap();
//# sourceMappingURL=index.js.map