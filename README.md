# bankinfo

bank info system

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

when you are first start, run mongodb
```bash
$ docker run --name bank-mongo -v ./mongo-volume:/data/db -d -p 27017:27017 mongo
```

```bash
$ npm i
$ cd app/web npm i
$ npm run dev
$ open http://localhost:7001/
```

### Build

```bash
$ npm run build
```

### Deploy

```bash
$ docker-compose up -d
```

### Helper

```bash
# attach shell
$ docker exec -it bank-app /bin/sh -c "[ -e /bin/bash ] && /bin/bash || /bin/sh"
# check log
$ docker logs -f bank-app
# restart
$ docker-compose restart
# stop
$ docker-compose stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org