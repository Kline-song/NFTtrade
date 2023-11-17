const accountService = require("../service/accountService");

const accountController = {
    checkBalance: async function (req, res, next) {
        // console.log(req.body);
        const {revAddr} = req.body;
        const balance = await accountService.checkBalance(revAddr);
        res.json({ code: 200, message: '查询余额成功', data: balance });
        // res.json({ code: 200, message: '查询' + revAddr + '余额成功', data: balance });
    },

    transferRev: async function (req, res, next) {
        const {privateKey, toRevAddr, amount} = req.body;
        const result = await accountService.transferRev(privateKey, toRevAddr, amount);
        if (result) {
            res.json({code: 200, message: '转账成功', data: result});
        } else {
            res.json({code: 500, message: '转账失败', data: result});
        }
    }
}

module.exports = accountController;