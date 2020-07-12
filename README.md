# bankinfo

bank info system

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

when you are first start, run mongodb
```bash
$ docker run --name bank-mongo -v /data/mongo:/data/db -d -p 27017:27017 mongo
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
$ docker build -t bank-app ./
```

### Deploy

```bash
$ docker run -itd --name bank-app -p 7001:7001 bank-app:latest
```

### Helper

```bash
# attach shell
$ docker exec -it bank-app /bin/sh -c "[ -e /bin/bash ] && /bin/bash || /bin/sh"
# check log
$ docker logs -f bank-app
# restart
$ docker restart bank-app
# stop
$ docker stop bank-app
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org