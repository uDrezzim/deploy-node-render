const express = require('express')
router = express.Router()
const pg = require('pg')

const  stringConexao= new pg.({connectionString:process.env.DATABASE_URL || 'postgres://postgres:admin@localhost/db_node' })

const pool = new pg.Pool({connectionString: stringConexao})

router.get('/', async(req, res) => {
    try{
        var client = await pool.connect()
        var dados = await client.query('select * from tb_categoria')
        res.status(200).send(dados.rows);
     }
     catch(err){
         res.status(401).send({
             message: "conexão não autorizada",
             erro: err.message
         })  
     }
})

router.get('/:idcategoria', async(req, res) => {
    try{
        var client = await pool.connect()
        var dados = await client.query('select * from tb_categoria where id = $1',[req.params.id])
         if(dados.rowCount > 0)
           res.status(200).send(dados.rows[0])
         else{
            res.status(400).send({ message: "Categoria não cadastrada"});
         }
     }
     catch(err){
         res.status(401).send({
             message: "conexão não autorizada",
             erro: err.message
         })  
     }
})

router.post("/",async (req, res) =>{
    let descricao = res.body.descricao
    try{
        var client = await pool.connect()
        var dados = await client.query('insert into tb_categoria (descricao)values($1) RETURN *',[req.body.descricao])
         if(dados.rowCount > 0)
           res.status(201).send(dados.rows[0])
         else{
            res.status(400).send({ message: "Categoria não cadastrada"});
         }
     }
     catch(err){
         res.status(401).send({
            message: err.message
             
         })  
     }
})
router.put("/",async (req, res) =>{
    let descricao = res.body.descricao
    try{
        var client = await pool.connect()
        var dados = await client.query('insert into tb_categoria (descricao)values($1) RETURN *',[req.body.descricao])
         if(dados.rowCount > 0)
           res.status(201).send(dados.rows[0])
         else{
            res.status(400).send({ message: "Categoria não cadastrada"});
         }
     }
     catch(err){
         res.status(401).send({
            message: err.message
             
         })  
     }
})
module.exports = router