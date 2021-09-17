import { Menu } from './styled'

export default function Index() {
    return (
        <Menu>
            <header className="header-left-box">
                <div className="svg-cabecalho-left-box"> <img src="/assets/images/Vector.svg" alt="" /></div>
                <div className="devSchool"> <span>Dev</span>Store</div>
            </header> 
            <div className="black-box"></div>
            <div className="left-box-management">
                <div> Gerenciamento </div>
                <img src="/assets/images/down.svg" style={{width: "20px"}} alt=""/>
            </div>
            <div className="left-box-aluno">
                <div> Produtos </div>
            </div> 
        </Menu>
    )
}