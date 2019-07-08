#Nest.js dependency graph

###Install
```$bash
npm i https://github.com/shipiak/nestjs-dependency-graph.git --save-dev
```

###Add to package.json scripts
```
  "scripts": {
    "nest-dep-graph": "ts-node --files node_modules/ src/path/to/my-root.module.ts"
  }
```

don't forget to add correct path to your root module


###Run
```
  npm run nest-dep-graph
```

goto http//:localhost:3000
