import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import "./style.css";
import maskCpf from "./maskCpf";

export default function Lugares() {
	// States relacionado a API
	const [resposta, setResposta] = useState([]);
	const [lugares, setLugares] = useState([]);
	const [dia, setDia] = useState([]);
	const [filme, setFilme] = useState([]);
	const [cpf, setCpf] = useState();
	const [dadosPessoa, setDadosPessoa] = useState({
		ids: [],
		nome: "",
		cpf: "",
	});
	let navigate = useNavigate();
	const { idSessao } = useParams();

	useEffect(() => {
		const requisicao = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`,
		);

		requisicao.then((response) => {
			setResposta(response.data);
			setLugares(response.data.seats);
			setDia(response.data.day);
			setFilme(response.data.movie);
		});
	}, []);

	return (
		<>
			<div className='main-lugares'>
				<p>Selecione o(s) assento(s)</p>
				<div className='lugares'>
					{lugares.map((element) => {
						return (
							<MontarLugares
								lugares={element}
								verificarArray={(id) => {
									for (let i = 0; i < dadosPessoa.ids.length + 1; i++) {
										if (id === dadosPessoa.ids[i]) {
											dadosPessoa.ids.splice(i, 1);
											setDadosPessoa({
												...dadosPessoa,
												ids: [...dadosPessoa.ids],
											});
										} else {
											setDadosPessoa({
												...dadosPessoa,
												ids: [...dadosPessoa.ids, id],
											});
										}
									}
									console.log(dadosPessoa);
								}}
							/>
						);
					})}
				</div>
				<div className='legenda'>
					<div className='individual'>
						<div className='lugar selecionado'></div>
						<p>Selecionado</p>
					</div>
					<div className='individual'>
						<div className='lugar'></div>
						<p>Disponível</p>
					</div>
					<div className='individual'>
						<div className='lugar indisponivel'></div>
						<p>Indisponível</p>
					</div>
				</div>
				<form
					className='formulario'
					onSubmit={(e) => {
						e.preventDefault();
						axios
							.post(
								"https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
								dadosPessoa,
							)
							.catch(() => alert("Houve algum problema, tente novamente!"));
						navigate("/sucesso", {
							state: [filme, dia, dadosPessoa, resposta],
						});
					}}>
					<div className='nome-comprador'>
						<label htmlFor='nome'>Nome do Comprador:</label>
						<input
							type='text'
							placeholder='Digite seu nome...'
							id='nome'
							onChange={(e) => {
								setDadosPessoa({ ...dadosPessoa, nome: e.target.value });
							}}
							required
						/>
					</div>
					<div className='cpf-comprador'>
						<label htmlFor='cpf'>CPF do comprador:</label>
						<input
							type='text'
							maxLength='14'
							placeholder='Digite seu CPF...'
							id='cpf'
							value={cpf}
							onChange={(e) => {
								setDadosPessoa({
									...dadosPessoa,
									cpf: maskCpf(e.target.value),
								});
								setCpf(maskCpf(e.target.value));
							}}
							required
						/>
					</div>
					<button className='botao' type='submit'>
						Reservar assento(s)
					</button>
				</form>
			</div>
			<div className='footer-sessao'>
				<div className='logo-filme-sessao'>
					<img src={filme.posterURL} alt='logo-filme-sessao' />
					<div className='footer-titulo'>
						<p>{`${filme.title}`}</p>
						<p>{`${dia.weekday} - ${resposta.name}`}</p>
					</div>
				</div>
			</div>
		</>
	);
}

function MontarLugares({ lugares, verificarArray }) {
	const [selecionado, setSelecionado] = useState(false);
	const [disponivel, setDisponivel] = useState(lugares.isAvailable);

	return (
		<div
			className={`lugar ${lugares.isAvailable ? "" : "indisponivel"} ${
				selecionado ? "selecionado" : ""
			}`}
			onClick={(e) => {
				if (disponivel) {
					setSelecionado(!selecionado);
					verificarArray(e.target.innerText);
				}
			}}
			key={lugares.id}>
			<p>{lugares.name}</p>
		</div>
	);
}
