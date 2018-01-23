"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var extendable_error_1 = require("extendable-error");
var IamportError = /** @class */ (function (_super) {
    __extends(IamportError, _super);
    function IamportError(message, error) {
        return _super.call(this, message) || this;
    }
    return IamportError;
}(extendable_error_1.default));
exports.IamportError = IamportError;
