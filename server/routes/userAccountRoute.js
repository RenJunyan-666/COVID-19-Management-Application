import express, { Router } from 'express'
import { getUserAccounts, addUserAccounts, updateUserAccounts, deleteUserAccounts, getUserAccountsByUser } from '../controllers/userAccounts.js';
import ROLES_LIST from '../config/roles_list.js';
import verifyRoles from '../middleware/verifyRoles.js';
// import { verify } from 'jsonwebtoken';

const router = express.Router()

// router.get('/', getUserAccounts)

// router.post("/", addUserAccounts)

// router.put('/:id', updateUserAccounts)

// router.delete('/:id', deleteUserAccounts)

router.route('/')
    .get(getUserAccounts)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User), addUserAccounts)
    
router.route('/:id')
    .put(updateUserAccounts)//verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    .delete(deleteUserAccounts);//verifyRoles(ROLES_LIST.Admin)

router.route('/:email')
    .get(getUserAccountsByUser)
export default router