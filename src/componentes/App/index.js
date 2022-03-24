import axios from "axios";
import { useState, useEffect } from "react";

import "./style.css";

export default function App() {
	const [filmes, setFilmes] = useState([]);

	useEffect(() => {
		const requisicao = axios.get(
			"https://mock-api.driven.com.br/api/v5/cineflex/movies",
		);

		requisicao.then((response) => {
			setFilmes(response.data);
		});
	}, []);

	return (
		<>
			<div className='header'>
				<p>CINEFLEX</p>
			</div>
			<div className='main'>
				<p>Selecione o filme</p>
				<div className='grid-filmes'>
					{filmes.map((item) => {
						return (
							<div className='card-filme' key={`Filme${item.id}`}>
								<img
									src={`${item.posterURL}`}
									alt='card-filme'
                                    key={`Imagem${item.id}`}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
