import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Finalizacao from "../Finalizacao";



import HomeFilmes from "../HomeFilmes/"
import Horarios from "../Horarios";
import Lugares from "../Lugares";

import "./style.css";

export default function App() {
	return (
		<BrowserRouter>
			<Link to="/">
				<Header />
			</Link>
			<Routes>
				<Route path="/" element={<HomeFilmes />} />
				<Route path="/filme/:idFilme" element={<Horarios />} />
				<Route path="/sessao/:idSessao" element={<Lugares />} />
				<Route path="/sucesso" element={<Finalizacao />} />
			</Routes>
		</BrowserRouter>
	);
}

function Header() {
	return (
		<>
			<div className='header'>
				<p>CINEFLEX</p>
			</div>
		</>
	);
}
