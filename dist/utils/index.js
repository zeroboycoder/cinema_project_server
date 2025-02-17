"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p = exports.omitEmpty = exports.cleanSpace = exports.cleanObj = void 0;
exports.isEmptyValues = isEmptyValues;
const lodash_1 = require("lodash");
const cleanObj = (obj) => (0, lodash_1.omitBy)(obj, lodash_1.isEmpty);
exports.cleanObj = cleanObj;
const cleanSpace = (obj) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [
    key,
    typeof value === 'string' ? value.trim() : value,
]));
exports.cleanSpace = cleanSpace;
function isEmptyValues(value) {
    var _a;
    return ((!value && typeof value !== 'boolean') ||
        !value.toString().trim() ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && ((_a = value.trim()) === null || _a === void 0 ? void 0 : _a.length) === 0));
}
const omitEmpty = (obj) => (0, lodash_1.omitBy)(obj, isEmptyValues);
exports.omitEmpty = omitEmpty;
const p = (req) => {
    var _a;
    return (0, exports.cleanSpace)((0, exports.omitEmpty)(Object.assign(Object.assign(Object.assign(Object.assign({}, req.query), req.body), req.params), { user: (req === null || req === void 0 ? void 0 : req.customer) || (req === null || req === void 0 ? void 0 : req.admin), lang: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.lang) || 'EN' })));
};
exports.p = p;
