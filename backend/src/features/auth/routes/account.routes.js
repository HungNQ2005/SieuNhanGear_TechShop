const express = require('express');
const { ROUTES } = require('../../../constants/routes.constants');

function createAccountRouter() {
    const router = express.Router();
    const {
        getAllAccounts,
        getAccountById,
        updateAccount,
        deleteAccount,
        createAccount
    } = require('../../../controllers/accountController');

    // POST /api/accounts
    router.post(ROUTES.ACCOUNT.NULL, createAccount);

    // GET /api/accounts
    router.get(ROUTES.ACCOUNT.NULL, getAllAccounts);

    // GET /api/accounts/:id
    router.get(ROUTES.ACCOUNT.GET_ACCOUNT_BY_ID, getAccountById);

    // PUT /api/accounts/:id
    router.put(ROUTES.ACCOUNT.GET_ACCOUNT_BY_ID, updateAccount);

    // DELETE /api/accounts/:id
    router.delete(ROUTES.ACCOUNT.GET_ACCOUNT_BY_ID, deleteAccount);

    return router;
}

module.exports = { createAccountRouter };