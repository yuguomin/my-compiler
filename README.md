## what is this
write a compiler for JavaScript, just use to study compiler.

## install
need global devDependencies
[`node`](https://nodejs.org/en/download/package-manager/)
[`TypeScript`](https://ts.xcatliu.com/introduction/get-typescript)
[`yarn`](https://yarn.bootcss.com/docs/install/#mac-stable)

install packages
```shell
yarn install
```

## command

### start
```shell
yarn start
```
this command will open a script parsing environment.
If you want to see the details, input `yarn start -v`

### test
```shell
yarn test
```
this command will execute dist/index.js, test some function.
you can rewritten dist/index.js to test all kinds of situation.

### dev
``` shell
yarn dev
```
this command will parse src to dist, ts to js.

### build
```shell
yarn build
```
this command will rewritten dist folder.