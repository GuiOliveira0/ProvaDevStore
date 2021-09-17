import db from './db.js';
import express from 'express';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());


app.get('/produto', async (req, resp) => {
    try {
        let r = await db.tb_produto.findAll({ order: [["id_produto", "desc"]] });
        resp.send(r)
    } catch (e) {
        resp.send({erro: e.toString()})
    }        
})

app.post('/produto', async (req, resp) => {
    try {
        let { produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem } = req.body;

        let prodCad = await db.tb_produto.findAll({
            where: {nm_produto: produto}
        })

            if (prodCad.length != 0 ){
                resp.send({erro: 'Um produto igual a esse já existe'})
                return
            }
            
        let CadastrarProd = {
            nm_produto: produto,
            ds_categoria: categoria,
            vl_preco_de: precode,
            vl_preco_por: precopor,
            vl_avaliacao: avaliacao,
            ds_produto: descricao,
            qtd_estoque: estoque,
            img_produto: imagem,
            bt_ativo: true,
            dt_inclusao: new Date()
            }

        let r = await db.tb_produto.create(CadastrarProd);
        resp.sendStatus(200);
    } catch (e) {
        resp.send({erro: e.toString()});
    }
})

app.put('/produto/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let { produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem } = req.body;

        let alterar = {
            nm_produto: produto,
            ds_categoria: categoria,
            vl_preco_de: precode,
            vl_preco_por: precopor,
            vl_avaliacao: avaliacao,
            ds_produto: descricao,
            qtd_estoque: estoque,
            img_produto: imagem,
            }

        let r = await db.tb_produto.update(
            alterar, {
            where: {id_produto: id}
        })
        resp.sendStatus(200)
    } catch (e) {
        resp.send({erro: e.toString()})
    }
})

app.delete('/produto/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let r = await db.tb_produto.destroy({
            where: {id_produto: id}
        })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({erro: e.toString()})
    }
})

app.listen(process.env.PORT, x => console.log(`>> Server up at port: ${process.env.PORT}`) )