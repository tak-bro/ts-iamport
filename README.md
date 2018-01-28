# ts-iamport

- [박병진](https://github.com/posquit0)님께서 작성하신 [node-iamporter](https://github.com/posquit0/node-iamporter)를 TypeScript로 간단히 변경한 프로젝트입니다.
    - 기존 node-iamporter 프로젝트에서 debug 부분을 삭제하였습니다.
- 수면브랜드 [삼분의일](http://storefarm.naver.com/3boon1) 웹사이트 구축을 위해 만들었습니다.

### Installation
```
$ npm install --save ts-iamport
```

### Usage
```javascript
const IMP_API_KEY = 'your-iamport-apikey';
const IMP_SECRET_KEY = 'your-iamport-secret-key';
const iamport = new Iamport(IMP_API_KEY, IMP_SECRET_KEY);

static getToken = () => {
    const token$ = Rx.Observable.fromPromise(iamport.getToken());
    return token$;
}
```
