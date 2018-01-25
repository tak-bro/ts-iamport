import { IamportError } from './iamport-error';
import * as Promise from 'bluebird';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_NOT_FOUND = 404;
const AXIOS_CONFIG: AxiosRequestConfig = {
    baseURL: 'https://api.iamport.kr',
    timeout: 10000,
    responseType: 'json'
};

export class Iamport {
    private token: string;
    private apiKey: string;
    private secret: string;
    private expireAt: string;
    private axiosInstance: AxiosInstance;

    constructor(apiKey = 'imp_apiKey',
                secret = 'ekKoeW8RyKuT0zgaZsUtXXTLQ4AhPFW3ZGseDA6bkA5lamv9OqDMnxyeB9wqOsuO9W3Mx9YSJ4dTqJ3f') {
        this.apiKey = apiKey;
        this.secret = secret;
        this.axiosInstance = axios.create(AXIOS_CONFIG);
    }

    /**
     * API 토큰 요청
     * POST - https://api.iamport.kr/users/getToken
     * @see {@link https://api.iamport.kr/#!/authenticate/getToken}
     *
     * @param {string} [apiKey=this.apiKey]
     * @param {string} [secret=this.secret]
     * @returns {Promise} result
     */
    public getToken(apiKey = this.apiKey, secret = this.secret) {
        const spec = {
            method: 'post',
            url: '/users/getToken',
            data: {
                'imp_key': apiKey,
                'imp_secret': secret
            }
        };

        return this._request(spec);
    }

    /**
     * SMS 본인인증 정보 조회
     * GET - https://api.iamport.kr/certifications/{imp_uid}
     * @see {@link https://api.iamport.kr/#!/certifications/getCertification}
     *
     * @param {string} impUid
     * @returns {Promise} result
     */
    public getCertification(impUid) {
        const spec = {
            method: 'GET',
            url: `/certifications/${impUid}`
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    /**
     * SMS 본인인증 정보 삭제
     * DELETE - https://api.iamport.kr/certifications/{imp_uid}
     * @see {@link https://api.iamport.kr/#!/certifications/deleteCertification}
     *
     * @returns {Promise} result
     */
    public deleteCertification(impUid) {
        const spec = {
            method: 'DELETE',
            url: `/certifications/${impUid}`
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    /**
     * 아임포트 고유 아이디로 결제 정보 조회
     * GET - https://api.iamport.kr/payments/{imp_uid}
     * @see {@link https://api.iamport.kr/#!/payments/getPaymentByImpUid}
     *
     * @param {string} impUid
     * @returns {Promise} result
     */
    public findByImpUid(impUid) {
        const spec = {
            method: 'GET',
            url: `/payments/${impUid}`
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    /**
     * 상점 고유 아이디로 결제 정보 조회
     * GET - https://api.iamport.kr/payments/find/{merchant_uid}
     * @see {@link https://api.iamport.kr/#!/payments/getPaymentByMerchantUid}
     *
     * @param {string} merchantUid
     * @returns {Promise} result
     */
    public findByMerchantUid(merchantUid) {
        const spec = {
            method: 'GET',
            url: `/payments/find/${merchantUid}`
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    /**
     * 상점 고유 아이디로 결제 정보 목록 조회
     * GET - https://api.iamport.kr/payments/findAll/{merchant_uid}/{payment_status}
     * @see {@link https://api.iamport.kr/#!/payments/getAllPaymentsByMerchantUid}
     *
     * @param {string} merchantUid
     * @param {Object} [extra]
     * @param {string} [extra.status]
     * @returns {Promise} result
     */
    public findAllByMerchantUid(merchantUid, extra = { status: '' }) {
        const spec = {
            method: 'GET',
            url: `/payments/findAll/${merchantUid}/${extra.status}`
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    /**
     * 결제 상태로 결제 정보 목록 조회
     * GET - https://api.iamport.kr/payments/status/{payment_status}
     * @see {@link https://api.iamport.kr/#!/payments/getPaymentsByStatus}
     *
     * @param {string} [status=all]
     * @param {Object} [extra]
     * @param {} extra.page
     * @param {} extra.from
     * @param {} extra.to
     * @returns {Promise} result
     */
    public findAllByStatus(status = 'all', extra = {}) {
        const spec = {
            method: 'GET',
            url: `/payments/status/${status}`,
            params: extra
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    /**
     * 결제취소
     * POST - https://api.iamport.kr/payments/cancel
     * @see {@link https://api.iamport.kr/#!/payments/cancelPayment}
     *
     * @param {Object} [data={}]
     * @returns {Promise} result
     */
    public cancel(data = {}) {
        const spec = {
            method: 'POST',
            url: '/payments/cancel',
            data: data
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    /**
     * 아임포트 고유 아이디로 결제취소
     * POST - https://api.iamport.kr/payments/cancel
     * @see {@link https://api.iamport.kr/#!/payments/cancelPayment}
     *
     * @param {string} impUid
     * @param {Object} [extra={}]
     * @returns {Promise} result
     */
    public cancelByImpUid(impUid, extra = {}) {
        const data = Object.assign(extra, { 'imp_uid': impUid });
        return this.cancel(data);
    }

    /**
     * 상점 고유 아이디로 결제취소
     * POST - https://api.iamport.kr/payments/cancel
     * @see {@link https://api.iamport.kr/#!/payments/cancelPayment}
     *
     * @param {string} merchantUid
     * @param {Object} [extra={}]
     * @returns {Promise} result
     */
    public cancelByMerchantUid(merchantUid, extra = {}) {
        const data = Object.assign(extra, { 'merchant_uid': merchantUid });
        return this.cancel(data);
    }

    /**
     * 결제예정금액 사전등록
     * POST - https://api.iamport.kr/payments/prepare
     * @see {@link https://api.iamport.kr/#!/payments.validation/preparePayment}
     *
     * @param {Object} data
     * @returns {Promise} result
     */
    public createPreparedPayment(data = {}) {
        const requiredParams = ['merchant_uid', 'amount'];

        if (!requiredParams.every(param => data.hasOwnProperty(param)))
            return Promise.reject(new IamportError('파라미터 누락: ', requiredParams));

        const spec = {
            method: 'POST',
            url: '/payments/prepare',
            data: data
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    /**
     * 사전등록된 결제정보 조회
     * GET - https://api.iamport.kr/payments/prepare/{merchant_uid}
     * @see {@link https://api.iamport.kr/#!/payments.validation/getPaymentPrepareByMerchantUid}
     *
     * @param {string} merchantUid
     * @returns {Promise} result
     */
    public getPreparedPayment(merchantUid) {
        const spec = {
            method: 'GET',
            url: `/payments/prepare/${merchantUid}`
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    /**
     * 비인증 신용카드 결제요청
     * POST - https://api.iamport.kr/subscribe/payments/onetime
     * @see {@link https://api.iamport.kr/#!/subscribe/onetime}
     *
     * @param {Object} data
     * @returns {Promise} result
     */
    public payOnetime(data: any) {
        const requiredParams = [
            'merchant_uid', 'amount', 'card_number', 'expiry',
            'birth'
        ];

        if (!requiredParams.every(param => data.hasOwnProperty(param)))
            return Promise.reject(new IamportError('파라미터 누락: ', requiredParams));

        const spec = {
            method: 'POST',
            url: '/subscribe/payments/onetime',
            data: data
        };

        return this._updateToken()
            .then(() => this._request(spec))
            .then((res) => this._validatePayment(data.amount, res));
    }

    /**
     * 비인증 빌링키 결제요청
     * POST - https://api.iamport.kr/subscribe/payments/again
     * @see {@link https://api.iamport.kr/#!/subscribe/again}
     *
     * @param {Object} data
     * @returns {Promise} result
     */
    public paySubscription(data: any) {
        const requiredParams = [
            'customer_uid', 'merchant_uid', 'amount'
        ];

        if (!requiredParams.every(param => data.hasOwnProperty(param)))
            return Promise.reject(new IamportError('파라미터 누락: ', requiredParams));

        const spec = {
            method: 'POST',
            url: '/subscribe/payments/again',
            data: data
        };

        return this._updateToken()
            .then(() => this._request(spec))
            .then((res) => this._validatePayment(data.amount, res));
    }

    /**
     * 해외카드 결제요청
     * POST - https://api.iamport.kr/subscribe/payments/foreign
     *
     * @param {Object} data
     * @returns {Promise} result
     */
    public payForeign(data: any) {
        const requiredParams = [
            'merchant_uid', 'amount', 'card_number', 'expiry'
        ];

        if (!requiredParams.every(param => data.hasOwnProperty(param)))
            return Promise.reject(new IamportError('파라미터 누락: ', requiredParams));

        const spec = {
            method: 'POST',
            url: '/subscribe/payments/foreign',
            data: data
        };

        return this._updateToken()
            .then(() => this._request(spec))
            .then((res) => this._validatePayment(data.amount, res));
    }

    /**
     * 구매자 빌링키 발급
     * POST - https://api.iamport.kr/subscribe/customers/{customer_uid}
     * @see {@link https://api.iamport.kr/#!/subscribe.customer/customer_save}
     *
     * @param {Object} data
     * @returns {Promise} result
     */
    public createSubscription(data = {}) {
        const requiredParams = [
            'customer_uid', 'card_number', 'expiry', 'birth',
        ];

        if (!requiredParams.every(param => data.hasOwnProperty(param)))
            return Promise.reject(new IamportError('파라미터 누락: ', requiredParams));

        const spec = {
            method: 'POST',
            url: `/subscribe/customers/${data['customer_uid']}`,
            data: data
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    /**
     * 구매자 빌링키 조회
     * GET - https://api.iamport.kr/subscribe/customers/{customer_uid}
     * @see {@link https://api.iamport.kr/#!/subscribe.customer/customer_view}
     *
     * @param {string} customerUid
     * @returns {Promise} result
     */
    public getSubscription(customerUid) {
        const spec = {
            method: 'GET',
            url: `/subscribe/customers/${customerUid}`
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    /**
     * 구매자 빌링키 삭제
     * DELETE - https://api.iamport.kr/subscribe/customers/{customer_uid}
     * @see {@link https://api.iamport.kr/#!/subscribe.customer/customer_delete}
     *
     * @param {string} customerUid
     * @returns {Promise} result
     */
    public deleteSubscription(customerUid) {
        const spec = {
            method: 'DELETE',
            url: `/subscribe/customers/${customerUid}`
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    /**
     * 가상계좌 발급
     * POST - https://api.iamport.kr/vbanks
     * @see {@link https://api.iamport.kr/#!/vbanks/createVbank}
     *
     * @param {Object} data
     * @returns {Promise} result
     */
    public createVbank(data = {}) {
        const requiredParams = [
            'merchant_uid', 'amount', 'vbank_code', 'vbank_due', 'vbank_holder'
        ];

        if (!requiredParams.every(param => data.hasOwnProperty(param)))
            return Promise.reject(new IamportError('파라미터 누락:', requiredParams));

        const spec = {
            method: 'POST',
            url: '/vbanks',
            data: data
        };

        return this._updateToken()
            .then(() => this._request(spec));
    }

    // TODO: Add below items
    /**
     * 에스크로 결제 배송정보 등록
     * POST - https://api.iamport.kr/escrows/logis/{imp_uid}
     * @see {@link https://api.iamport.kr/#!/escrow.logis/escrow_logis_save}
     *
     * @returns {Promise} result
     */

    /**
     * POST - https://api.iamport.kr/subscribe/payments/schedule
     * @see {@link https://api.iamport.kr/#!/subscribe/schedule}
     *
     * @returns {Promise} result
     */

    private _resSerializer(res: AxiosResponse) {
        return {
            status: res.status,
            message: res.data.message,
            data: res.data.response,
            raw: res.data
        };
    }

    private _request(spec) {
        spec.headers = {
            'User-Agent': 'Iamporter.js'
        };

        if (!this._isExpiredToken()) {
            spec.headers['Authorization'] = this.token;
        }

        return new Promise((resolve, reject) => {
            this.axiosInstance.request(spec)
                .then((res: AxiosResponse) => {
                    const { status, data } = res;
                    const output = this._resSerializer(res);

                    if (data.code !== 0)
                        return reject(new IamportError(data.message, output));
                    else
                        return resolve(output);
                })
                .catch((err: any) => {
                    if (!err.response)
                        return reject(new IamportError('예기치 못한 오류가 발생하였습니다.', {}));

                    const { status, data } = err.response;
                    const output = this._resSerializer(err.response);

                    switch (status) {
                        case HTTP_OK:
                        case HTTP_BAD_REQUEST:
                            return reject(new IamportError(data.message, output));
                        case HTTP_UNAUTHORIZED:
                            return reject(new IamportError('아임포트 API 인증에 실패하였습니다.', output));
                        case HTTP_NOT_FOUND:
                            return resolve(output);
                        default:
                            return reject(new IamportError('예기치 못한 오류가 발생하였습니다.', output));
                    }
                });
        });
    }

    private _updateToken() {
        if (this._isExpiredToken()) {
            return this.getToken()
                .then((res: AxiosResponse) => {
                    this.token = res.data['access_token'];
                    this.expireAt = res.data['expired_at'];
                    return this.token;
                });
        } else {
            return Promise.resolve(this.token);
        }
    }

    private _validatePayment(amount, res) {
        if (res.data.status !== 'paid' || res.data.amount !== amount)
            throw new IamportError('Fail to validate payment', res.data['fail_reason']);

        return res;
    }

    private _isExpiredToken() {
        return !this.expireAt || Number(this.expireAt) <= Math.floor(Date.now() / 1000);
    }
}