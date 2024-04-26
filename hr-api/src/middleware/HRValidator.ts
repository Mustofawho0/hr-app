import { body } from 'express-validator';

export const validatorCreateEmployee = [
  body(['email', 'fullname', 'password', 'positionId', 'shiftId', 'address'])
    .notEmpty()
    .withMessage('Data Must Completed!'),
  body('email').isString().isEmail().withMessage('Email Must Valid!'),
  body('password')
    .isString()
    .isLength({ min: 5, max: 15 })
    .withMessage('Password Have Minimum 5 Character and Maximum 15 Character'),
  body(['positionId', 'shiftId'])
    .not()
    .isString()
    .withMessage('Positionid or ShiftId Type is Number'),
];
