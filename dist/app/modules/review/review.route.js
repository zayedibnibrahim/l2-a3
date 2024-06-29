"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_validation_1 = require("./review.validation");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(review_validation_1.reviewValidation.reviewValidationSchema), review_controller_1.reviewControllers.createReview);
exports.reviewRoutes = router;
