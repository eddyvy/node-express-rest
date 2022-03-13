# Node Express API

Api built using Node, Express, Typescript and Jest

Commands and `node_modules` installation are done with `yarn`.



## Start development environment

Install dependencies

```bash
yarn install
```

Start the server on port 3000:

```bash
yarn dev
```

Run the tests
````bash
yarn test
````



## Production environment

Install dependencies and build the project

```bash
yarn install && yarn build
```

Start the server on port 3000:

```bash
yarn start
```



## Using docker

If docker is installed it can be run using docker compose.

### Docker development environment:

Build the container

```bash
yarn build:dev
```

Start the container and listen on port 3000:

```bash
yarn up
```

Stop the container:

```bash
yarn stop
```

See the logs:

```bash
yarn logs
```

### Docker production environment:

Build the container

```bash
yarn build:prod
```

```bash
yarn up:prod
```

Stop the container:

```bash
yarn stop:prod
```

See the logs:

```bash
yarn logs:prod
```


