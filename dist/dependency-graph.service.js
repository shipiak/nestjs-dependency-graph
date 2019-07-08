"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constants_1 = require("@nestjs/common/constants");
let DependencyGraphService = class DependencyGraphService {
    constructor() {
    }
    setRootModule(module) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.scanModule(module);
            this.graphData = yield this.mapToGraphStructure(data);
        });
    }
    getGraphData() {
        return this.graphData;
    }
    mapToGraphStructure(moduleData) {
        let name = moduleData.module.module ? moduleData.module.module.name : moduleData.module.name;
        name = moduleData.meta.isGlobal ? `${name} | GLOBAL` : name;
        return {
            name,
            children: moduleData.meta.imports.map(m => this.mapToGraphStructure(m)),
        };
    }
    scanModule(module) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDynamicModule = (mod) => mod && !!mod.module;
            const getMeta = (key) => (Reflect.getMetadata(key, module) || []);
            module = yield Promise.resolve(module);
            const data = {
                module,
                meta: {
                    imports: yield Promise.all(getMeta(constants_1.METADATA.IMPORTS).map(m => this.scanModule(m))),
                    providers: getMeta(constants_1.METADATA.PROVIDERS),
                    controllers: getMeta(constants_1.METADATA.CONTROLLERS),
                    exports: getMeta(constants_1.METADATA.EXPORTS),
                    isGlobal: !!Reflect.getMetadata(constants_1.GLOBAL_MODULE_METADATA, module),
                },
            };
            if (isDynamicModule(module)) {
                const dynModuleImports = module.imports || [];
                data.meta.imports = data.meta.imports.concat(yield Promise.all(dynModuleImports.map(m => this.scanModule(m))));
                data.meta.providers = data.meta.providers.concat(module.providers || []);
                data.meta.controllers = data.meta.controllers.concat(module.controllers || []);
                data.meta.exports = data.meta.exports.concat(module.exports || []);
            }
            return data;
        });
    }
};
DependencyGraphService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], DependencyGraphService);
exports.DependencyGraphService = DependencyGraphService;
//# sourceMappingURL=dependency-graph.service.js.map