# setting up typescript

1. npm install -g typescript
2. npm i -D typescript tslint
3. tsc --init
4. uncomment the --->>>  "outDir": "./dist", // here there will be all compiled code from ts to js.
5. uncomment below one as well
 "noImplicitReturns": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
6. add below one as well
 "exclude": ["node_modules"],
  "include": ["./src/**/*.ts"]
