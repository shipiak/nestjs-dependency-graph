# Nest.js dependency graph

## Installing as dependency
```$bash
npm i https://github.com/shipiak/nestjs-dependency-graph.git --save-dev
```

### Add to package.json scripts
```
  "scripts": {
    "nest-dep-graph": "node node_modules/nestjs-dependency-graph/dist/index.js dist/app/app.module.js"
  }
```

Don't forget to update correct path to your root app.module file


### Run
```
  npm run build
  npm run nest-dep-graph 
```

Open `http//:localhost:3000`
