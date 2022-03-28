import { useLocation, useNavigate } from "react-router-dom";

import "./style.css";

export default function Finalizacao() {
	let dados = useLocation();
	let navigate = useNavigate();
	return (
		<div className='main-finalizacao'>
			<p>Pedido feito com sucesso!</p>
			<div className='infos'>
				<div className='filme'>
					<p className='titulo-sucesso'>Filme e sessão</p>
					<p>{`${dados.state[0].title}`}</p>
					<p>{`${dados.state[1].date} ${dados.state[3].name}`}</p>
				</div>
				<div className='ingressos'>
					<p className='titulo-sucesso'>Ingressos</p>
					{dados.state[2].ids.map((element) => {
						return <p>{`Assento ${element}`}</p>;
					})}
				</div>
				<div className='comprador'>
					<p className='titulo-sucesso'>Comprador</p>
					<p>{`Nome: ${dados.state[2].nome}`}</p>
					<p>{`CPF: ${dados.state[2].cpf}`}</p>
				</div>
			</div>
			<button
				className='botao'
				type='submit'
				onClick={() => {
					navigate("/");
				}}>
				Voltar para Home
			</button>
		</div>
	);
}
