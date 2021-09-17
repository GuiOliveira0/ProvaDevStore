import { Cabecalho } from './styled'


export default function Index() {
    return (
        <Cabecalho>
            <div class="reader-right-box">
                <div class="box-user"> 
                    <div class="user-image">
                    <img src="/assets/images/perfil.jpg" alt=""></img>
                        <div class="absolute">3</div>
                    </div>
                    <div class="user-name"> Olá, <b>Guilherme Oliveira</b> </div>
                </div>
                
                <div class="box-image">
                    <div class="refresh-button"> <button> <img src="/assets/images/load.svg" style={{width: "32px"}} alt=""  />  </button> </div>
                    <div class="left-button"> <button> <img src="/assets/images/exit2.svg" style={{width: "30px"}} alt = "" />  </button> </div>
                </div>
            </div>
            <div class="bottom-bar-right-header" />
        </Cabecalho>
    )
}