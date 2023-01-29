## Docker
```sh
$ docker-compose build
```

## NextJS With Jest
```sh
$ docker-compose run --rm app yarn create next-app --example with-jest re-test-next\
&& mv re-test-next/* . && mv re-test-next/.* . && rm -r re-test-next\
&& mkdir src && mv pages styles __tests__ src/
```
