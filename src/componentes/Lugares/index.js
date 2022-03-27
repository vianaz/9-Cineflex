import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./style.css";

export default function Lugares() {
	// States relacionado a API
    const [resposta, setResposta] = useState([]);
	const [lugares, setLugares] = useState([]);
	const [dia, setDia] = useState([]);
	const [filme, setFilme] = useState([]);
    // States dos Assentos
    const [selecionado, setSelecionado] = useState([]);

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
			<div className='main-horarios'>
				<p>Selecione o(s) assento(s)</p>
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
