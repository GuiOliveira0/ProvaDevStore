import Cabecalho from '../components/cabecalho/index';
import Menu from '../components/menu/index'

import { useEffect, useState, useRef } from 'react'
import { Container, Conteudo } from './styled'

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar';

import Api from '../service/api.js'
const api = new Api(); 

export default function Index() {

const [produto, setProduto] = useState([]); 
const [idProduto, setIdProduto] = useState(0);
const [nome, setNome] = useState(''); 
const [categoria, setCategoria] = useState(''); 
const [precode, setPrecode] = useState('');
const [precopor, setPrecopor] = useState('');
const [avaliacao, setAvaliacao] = useState(''); 
const [descricao, setDescricao] = useState(''); 
const [estoque, setEstoque] = useState(''); 
const [img, setImg] = useState(''); 

const loading = useRef(null);

    async function listarProdutos() {
        loading.current.continuousStart();

        let r = await api.listar();

            if( r.erro ){
                toast.error(`${r.erro}`)
            }
        setProduto(r);  
        loading.current.complete();
    }

    async function inserirProduto() {
        
        if(nome === '' || categoria === '' || precode === '' ||  precopor  === '' ||  avaliacao  === '' ||  descricao  === '' ||  estoque  === '' || img === ''){
            toast.error('Todos os campos precisam ser preenchidos!')
            return
        }
            let precodeE = Number(precode.replace(',', '.'));
            let precoporE = Number(precopor.replace(',', '.'));
            let avaliacaoE = Number(avaliacao.replace(',', '.'));
            let estoqueE = Number(String(estoque).replace(',', '.'));

        if ( isNaN(precodeE) || isNaN(precoporE) || isNaN(avaliacaoE) || isNaN(estoqueE) ){
            toast.error("Os campos 'Preço De', 'Preço Por', 'Avaliação' e 'Estoque' devem der números!")
            return
        }
        if ( precodeE < 0 || precoporE < 0 || avaliacaoE < 0 || estoqueE < 0 ){
            toast.error("Os campos 'Preço De', 'Preço Por', 'Avaliação' e 'Estoque' devem der números positivos!")
            return
        }
        if (estoqueE % 1 !== 0){
            toast.error("O campo 'Estoque' deve ser inteiro!")
            return
        }
        if(idProduto > 0 ){
            let P = await api.alterar(idProduto, nome, categoria, precodeE, precoporE, avaliacaoE, descricao, estoqueE, img)

            if( P.erro ) {
                toast.warning(`${P.erro}`)
                return
            }
            toast.success('Produto Alterado com Sucesso!')
        } else {
            let P = await api.inserir(nome, categoria, precodeE, precoporE, avaliacaoE, descricao, estoqueE, img);

                if( P.erro ) {
                    toast.warning(`${P.erro}`)
                    return
                }

            toast.success('Produto Cadastrado com Sucesso!')
        }
        limparInputs()
        listarProdutos()
    }

    async function removerProduto(idProduto) {
        confirmAlert({
            title: 'Confirmar Exclusão.',
            message: 'Realmente deseja remover ' + idProduto + '?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        let P = await api.remover(idProduto)

                            if (P.erro) {
                                alert(`${P.erro}`)
                                return
                            }
                        toast.success('O produto foi removido com sucesso!')
                        listarProdutos()
                    }
                },
                {
                    label: 'Não',
                    onClick: () => toast.error('O produto não foi removido!')
                }
            ]
        })
    }
    
    async function alterarProduto(idProduto, nome, categoria, precode, precopor, avaliacao, descricao, estoque, img ) {
        setIdProduto(idProduto);
        setNome(nome);
        setCategoria(categoria);
        setPrecode(precode)
        setPrecopor(precopor);
        setAvaliacao(avaliacao);
        setDescricao(descricao);
        setEstoque(estoque);
        setImg(img);
    }

    function limparInputs () {
        setIdProduto(0);
        setNome('');
        setCategoria('');
        setPrecode('')
        setPrecopor('');
        setAvaliacao('');
        setDescricao('');
        setEstoque('');
        setImg('');
    }

    useEffect( () => {
        listarProdutos()
    }, [] )

    return (

        <Container>
            <ToastContainer />
            <LoadingBar color="red" ref={loading} />
            <Menu/>
            <Conteudo>
                <Cabecalho/>
                <div class="body-right-box">
                    <div class="new-student-box">
                        <div className="text-new-student">
                            <div class="bar-new-student"></div>
                            <div class="text-new-student">{ idProduto === 0 ? 'Novo Produto' : 'Alterando Produto ' + idProduto }</div>
                        </div>
                        
                        <div className="form-new-product">
                            <div class="input-new-student"> 
                                <div className="culumns-inputs">
                                    <div class="input-one">
                                        <div class="agp-input"> 
                                            <div class="name-student"> Nome: </div>  
                                            <div class="input"> <input value={nome} onChange={ (x) => setNome(x.target.value) } /> </div>  
                                        </div> 
                                        <div class="agp-input">
                                            <div class="number-student"> Categoria: </div>  
                                            <div class="input"> <input value={categoria} onChange={ (x) => setCategoria(x.target.value) } /> </div> 
                                        </div>
                                        <div class="agp-input">
                                            <div class="number-student"> Avaliação: </div>  
                                            <div class="input"> <input  value={avaliacao} onChange={ (x) => setAvaliacao(x.target.value) }/> </div> 
                                        </div>
                                    </div>
                                    <div class="input-two">
                                        <div class="agp-input">
                                            <div class="corse-student"> Preço DE: </div>  
                                            <div className="input"> <input  value={precode} onChange={ (x) => setPrecode(x.target.value) } /> </div>  
                                        </div>
                                        <div class="agp-input">
                                            <div class="class-student" style={{marginRight: "8px"}} > Preço POR: </div>  
                                            <div class="input"> <input value={precopor} onChange={ (x) => setPrecopor(x.target.value) } /> </div> 
                                        </div>
                                        <div class="agp-input">
                                            <div class="number-student"> Estoque: </div>  
                                            <div class="input"> <input  value={estoque} onChange={ (x) => setEstoque(x.target.value) } /> </div> 
                                        </div>
                                    </div>
                                </div>
                                <div class="input-four">
                                    <div class="agp-input">
                                        <div class="link-image"> Link Imagem: </div>  
                                        <div class="input-linkImg"> <input value={img} onChange={ (x) => setImg(x.target.value) } /> </div>  
                                    </div>
                                </div>
                                <div class="textarea-one">
                                    <div class="agp-input">
                                        <div class="ds-product"> Descrição: </div>  
                                        <div class="textarea"> <textarea value={descricao} onChange={ (x) => setDescricao(x.target.value) } style={{"resize": "none"}} /> </div> 
                                    </div>
                                </div>
                            </div>                           
                            <div class="button-create"> <button onClick={inserirProduto} > { idProduto === 0 ? 'Cadastrar' : 'Alterar'} </button> </div>
                        </div>
                    </div>
                    <div class="student-registered-box">
                    <div class="row-bar"> 
                        <div class="bar-new-student"> </div>
                        <div class="text-registered-student"> Produtos </div>
                    </div>
                        <table class ="table-user">
                            <thead>
                                <tr>
                                    <th>    </th>
                                    <th> ID </th>
                                    <th> Produto </th>
                                    <th> Categoria </th>
                                    <th> Preço </th>
                                    <th> Estoque </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    produto.map( (x) => 
                                    
                                        <tr>
                                            <td className="Image-product"> <img src={x.img_produto} alt="" /> </td>
                                            <td> {x.id_produto} </td>
                                            <td title={x.nm_produto} style={{wordBreak: "break-all"}} > { String(x.nm_produto).length > 20 ? x.nm_produto.substring(0, 20) + '...' : x.nm_produto} </td>
                                            <td> {x.ds_categoria} </td>
                                            <td> {x.vl_preco_por} </td>
                                            <td> {x.qtd_estoque} </td>
                                            <td> <button onClick={ () => alterarProduto(x.id_produto, x.nm_produto, x.ds_categoria, x.vl_preco_de, x.vl_preco_por, x.vl_avaliacao, x.ds_produto, x.qtd_estoque, x.img_produto ) }> <img src="/assets/images/edit.svg" style={{width: "25px"}} alt = "" />  </button> </td>
                                            <td> <button onClick={ () => removerProduto(x.id_produto) }> <img src="/assets/images/lixo.svg" alt="" />  </button> </td>
                                        </tr>
                                    
                                    )
                                }
                                                      
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}