1. Initialize a package.json file
```
npm init
```

2. Install TypeScript as a dev dependency. 
```
npm install --save-dev typescript
```

3. Initialize tsconfig.json file
```
npx tsc --init 
```

4. Install node types as dev dependency
```
npm install --save-dev @types/node
```

5. (Optional) Install ts-node as dev dependency to directly execute TypeScript on Node.js without precompiling
```
npm install --save-dev ts-node
```

## Express installation

1.  Install express as dependency
```
npm install express
```

2. Install express types as dev dependency
```
npm install --save-dev @types/express 
```

## Useful scripts

### Development Scripts
Requires: `nodemon`
```
"dev": "nodemon src/index.ts"
```


