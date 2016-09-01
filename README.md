## Develop
```
npm install
npm test // run tests
npm run linter // lint and auto fix formatting errors

npm run web-test //  run tests in browser with webpack-dev-server
open localhost:8080/test.bundle

npm run server // run webpack-dev-server with hot module reloading
open localhost:8080
```

Watching Tests
```
npm test -- --watch
```

Compile into `bin` and deploy to s3
```
npm run compiler
npm run aws-deploy s3://your-bucket-here
```
note you need the aws cli installed for deployment to work
