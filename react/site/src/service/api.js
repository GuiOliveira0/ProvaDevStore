import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:3030'
})


export default class Api {

    async listar() {
        const r = await api.get('/produto');
        return r.data;
    }

    async inserir(produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem) { 
        const r = await api.post('/produto', { produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem } )
        return r.data;
    } 

    async alterar( idProduto, produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem) {
        const r = await api.put(`/produto/${idProduto}`, {produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem} )
        return r.data;
    }

    async remover(idProduto) {
        const r = await api.delete(`/produto/${idProduto}`);
        return r.data;
    }
}