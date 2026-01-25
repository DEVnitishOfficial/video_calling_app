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


# server setup
* we setup our basic backend with typescript
* Now for the first time handsake between two client we have to setup the server, after first time handsake webrtc will take cantrol so for this i will install express and socket.io.

```npm i express socket.io```

refer github : https://github.com/peers/peerjs-server
install peerjs : $ npm install peer -g
run command :  peerjs --port 9000 --key peerjs --path /myapp

