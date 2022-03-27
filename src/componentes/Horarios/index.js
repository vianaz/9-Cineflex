import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import "./style.css";

export default function Horarios() {
	const [horarios, setHorarios] = useState([]);
	const { idFilme } = useParams();

	useEffect(() => {
		const requisicao = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`,
		);

		requisicao.then((response) => {
			setHorarios(response.data);
		});
	}, []);
	return (
		<>
			<div className='main-horarios'>
				<p>Selecione o horário</p>
				<div className='grid-horarios container'>
					{horarios.length != 0 ? (
						<MontarHorarios horarios={horarios.days} />
					) : (
						<></>
					)}
				</div>
			</div>
			<div className='footer-horarios'>
				<div className='logo-filme'>
					<img src={horarios.posterURL} alt='logo-filme' />
					<p>{horarios.title}</p>
				</div>
			</div>
		</>
	);
}

function MontarHorarios({ horarios }) {
	return horarios.map((element) => {
		return (
			<div className='horario' key={element.id}>
				<p>{`${element.weekday} - ${element.date}`}</p>
				<div>
					{element.showtimes.map((element) => {
						return (
							<Link to={`/sessao/${element.id}`}>
								<div className='container-horario' key={element.id}>
									<p>{element.name}</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		);
	});
}
