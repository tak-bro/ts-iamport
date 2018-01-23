/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare class Iamport {
    private token;
    private apiKey;
    private secret;
    private host;
    private expireAt;
    private client;
    /**
     * Create an instance of Iamporter
     *
     * @param {string} [apiKey]
     * @param {string} [secret]
     * @param {string} [host]
     */
    constructor({apiKey, secret, host}?: {
        apiKey?: string;
        secret?: string;
        host?: string;
    });
    _request(spec: any): Promise<{}>;
    _updateToken(): Promise<string>;
    _validatePayment(amount: any, res: any): any;
    isExpiredToken(): boolean;
    /**
     * API 토큰 요청
     * GET - https://api.iamport.kr/users/getToken
     * @see {@link https://api.iamport.kr/#!/authenticate/getToken}
     *
     * @param {string} [apiKey=this.apiKey]
     * @param {string} [secret=this.secret]
     * @returns {Promise} result
     */
    getToken(apiKey?: string, secret?: string): Promise<{}>;
    /**
     * SMS 본인인증 정보 조회
     * GET - https://api.iamport.kr/certifications/{imp_uid}
     * @see {@link https://api.iamport.kr/#!/certifications/getCertification}
     *
     * @param {string} impUid
     * @returns {Promise} result
     */
    getCertification(impUid: any): Promise<{}>;
    /**
     * SMS 본인인증 정보 삭제
     * DELETE - https://api.iamport.kr/certifications/{imp_uid}
     * @see {@link https://api.iamport.kr/#!/certifications/deleteCertification}
     *
     * @returns {Promise} result
     */
    deleteCertification(impUid: any): Promise<{}>;
    /**
     * 에스크로 결제 배송정보 등록
     * POST - https://api.iamport.kr/escrows/logis/{imp_uid}
     * @see {@link https://api.iamport.kr/#!/escrow.logis/escrow_logis_save}
     *
     * @returns {Promise} result
     */
    /**
     * 아임포트 고유 아이디로 결제 정보 조회
     * GET - https://api.iamport.kr/payments/{imp_uid}
     * @see {@link https://api.iamport.kr/#!/payments/getPaymentByImpUid}
     *
     * @param {string} impUid
     * @returns {Promise} result
     */
    findByImpUid(impUid: any): Promise<{}>;
    /**
     * 상점 고유 아이디로 결제 정보 조회
     * GET - https://api.iamport.kr/payments/find/{merchant_uid}
     * @see {@link https://api.iamport.kr/#!/payments/getPaymentByMerchantUid}
     *
     * @param {string} merchantUid
     * @returns {Promise} result
     */
    findByMerchantUid(merchantUid: any): Promise<{}>;
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
    findAllByMerchantUid(merchantUid: any, extra?: {
        status: string;
    }): Promise<{}>;
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
    findAllByStatus(status?: string, extra?: {}): Promise<{}>;
    /**
     * 결제취소
     * POST - https://api.iamport.kr/payments/cancel
     * @see {@link https://api.iamport.kr/#!/payments/cancelPayment}
     *
     * @param {Object} [data={}]
     * @returns {Promise} result
     */
    cancel(data?: {}): Promise<{}>;
    /**
     * 아임포트 고유 아이디로 결제취소
     * POST - https://api.iamport.kr/payments/cancel
     * @see {@link https://api.iamport.kr/#!/payments/cancelPayment}
     *
     * @param {string} impUid
     * @param {Object} [extra={}]
     * @returns {Promise} result
     */
    cancelByImpUid(impUid: any, extra?: {}): Promise<{}>;
    /**
     * 상점 고유 아이디로 결제취소
     * POST - https://api.iamport.kr/payments/cancel
     * @see {@link https://api.iamport.kr/#!/payments/cancelPayment}
     *
     * @param {string} merchantUid
     * @param {Object} [extra={}]
     * @returns {Promise} result
     */
    cancelByMerchantUid(merchantUid: any, extra?: {}): Promise<{}>;
    /**
     * 결제예정금액 사전등록
     * POST - https://api.iamport.kr/payments/prepare
     * @see {@link https://api.iamport.kr/#!/payments.validation/preparePayment}
     *
     * @param {Object} data
     * @returns {Promise} result
     */
    createPreparedPayment(data?: {}): Promise<{}>;
    /**
     * 사전등록된 결제정보 조회
     * GET - https://api.iamport.kr/payments/prepare/{merchant_uid}
     * @see {@link https://api.iamport.kr/#!/payments.validation/getPaymentPrepareByMerchantUid}
     *
     * @param {string} merchantUid
     * @returns {Promise} result
     */
    getPreparedPayment(merchantUid: any): Promise<{}>;
    /**
     * 비인증 신용카드 결제요청
     * POST - https://api.iamport.kr/subscribe/payments/onetime
     * @see {@link https://api.iamport.kr/#!/subscribe/onetime}
     *
     * @param {Object} data
     * @returns {Promise} result
     */
    payOnetime(data: any): Promise<any>;
    /**
     * 비인증 빌링키 결제요청
     * POST - https://api.iamport.kr/subscribe/payments/again
     * @see {@link https://api.iamport.kr/#!/subscribe/again}
     *
     * @param {Object} data
     * @returns {Promise} result
     */
    paySubscription(data: any): Promise<any>;
    /**
     * 해외카드 결제요청
     * POST - https://api.iamport.kr/subscribe/payments/foreign
     *
     * @param {Object} data
     * @returns {Promise} result
     */
    payForeign(data: any): Promise<any>;
    /**
     * POST - https://api.iamport.kr/subscribe/payments/schedule
     * @see {@link https://api.iamport.kr/#!/subscribe/schedule}
     *
     * @returns {Promise} result
     */
    /**
     * POST - https://api.iamport.kr/subscribe/payments/unschedule
     * @see {@link https://api.iamport.kr/#!/subscribe/unschedule}
     *
     * @returns {Promise} result
     */
    /**
     * 구매자 빌링키 발급
     * POST - https://api.iamport.kr/subscribe/customers/{customer_uid}
     * @see {@link https://api.iamport.kr/#!/subscribe.customer/customer_save}
     *
     * @param {Object} data
     * @returns {Promise} result
     */
    createSubscription(data?: {}): Promise<{}>;
    /**
     * 구매자 빌링키 조회
     * GET - https://api.iamport.kr/subscribe/customers/{customer_uid}
     * @see {@link https://api.iamport.kr/#!/subscribe.customer/customer_view}
     *
     * @param {string} customerUid
     * @returns {Promise} result
     */
    getSubscription(customerUid: any): Promise<{}>;
    /**
     * 구매자 빌링키 삭제
     * DELETE - https://api.iamport.kr/subscribe/customers/{customer_uid}
     * @see {@link https://api.iamport.kr/#!/subscribe.customer/customer_delete}
     *
     * @param {string} customerUid
     * @returns {Promise} result
     */
    deleteSubscription(customerUid: any): Promise<{}>;
    /**
     * 가상계좌 발급
     * POST - https://api.iamport.kr/vbanks
     * @see {@link https://api.iamport.kr/#!/vbanks/createVbank}
     *
     * @param {Object} data
     * @returns {Promise} result
     */
    createVbank(data?: {}): Promise<{}>;
    private resSerializer(res);
}
