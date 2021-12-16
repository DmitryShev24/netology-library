import express from  "express"
const router = express.Router()

router.get('/', (req: any, res: any) => {
    res.send('<h1>Index<h1>')
});

module.exports = router