"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(category_validation_1.categoryValidation.createCategoryValidationSchema), category_controller_1.categoryControllers.createCategory);
router.get('/', category_controller_1.categoryControllers.getAllCategory);
router.get('/:categoryId', category_controller_1.categoryControllers.getSingleCategory);
router.patch('/:categoryId', (0, validateRequest_1.default)(category_validation_1.categoryValidation.updateCategoryValidationSchema), category_controller_1.categoryControllers.updateCategory);
router.delete('/:categoryId', category_controller_1.categoryControllers.deleteCategory);
exports.categoryRoutes = router;
