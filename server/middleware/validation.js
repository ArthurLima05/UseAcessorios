import { body, validationResult } from 'express-validator';

export const validatePayment = [
  body('items').isArray().withMessage('Items deve ser um array'),
  body('items.*.productId').isInt({ min: 1 }).withMessage('ID do produto inválido'),
  body('items.*.quantity').isInt({ min: 1, max: 10 }).withMessage('Quantidade deve ser entre 1 e 10'),
  body('userEmail').isEmail().withMessage('Email inválido'),
  body('userName').isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres'),
];

export const validateRegistration = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('name').isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres'),
];

export const validateLogin = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: errors.array()
    });
  }
  next();
};