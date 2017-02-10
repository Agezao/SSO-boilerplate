import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get user */
  .get(userCtrl.get)

  /** PUT /api/users - Update user */
  .put(validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users - Delete user */
  .delete(userCtrl.remove);

export default router;
