const express = require('express')
const sql = require('mssql')
const config = require('../dbconfig')
const router = express.Router()
router.get('/', async (req,res) => {
    try{
        const pool = await sql.connect(config)
        const result = await pool.request().query(
            `
            SELECT TelefonId,Marka,Kiadas,Tipus,Ar FROM Telefonok
            `)
        pool.close();
        res.json({
            success: true,
            data: result.recordset
        })
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

router.post('/', async(req,res) => {
    try
    {
        const {Marka,Kiadas,Tipus,Ar} = req.body

        const pool = await sql.connect(config)
        await pool.request()
        .input('Marka', sql.NVarChar, Marka)
        .input('Kiadas', sql.NVarChar, Kiadas)
        .input('Tipus', sql.NVarChar, Tipus)
        .input('Ar', sql.Int, Ar)
        .query(`
                INSERT INTO Telefonok(Marka,Kiadas,Tipus,Ar)
                VALUES(@Marka,@Kiadas,@Tipus,@Ar)
            `)
        pool.close()
        res.status(201).json({
            success: true
        })
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

module.exports = router