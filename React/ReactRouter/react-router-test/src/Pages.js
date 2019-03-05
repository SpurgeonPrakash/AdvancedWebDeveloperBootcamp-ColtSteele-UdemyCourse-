import React from 'react';
import { Link} from 'react-router-dom';

//pagine di Prova
const PaginaUtenti = () => (
  <React.Fragment>
    <p>pagina utenti </p>
  </React.Fragment>);

const HomePage = () => (
  <React.Fragment>
  <p>HomePage </p>
  </React.Fragment>);


const PaginaProdotti = ({prodotti}) => (
  <React.Fragment>
  <p>pagina prodotti </p>
  <p>I nostri prodotti più venduti: {prodotti}</p>
  <Link to="/prodotti/categorie"> Categorie </Link>
  <Link to="/prodotti/categorie/:categoria"> Categoria singola</Link>

  </React.Fragment>
);

const PaginaContattaci = () => (
  <React.Fragment>
  <p>pagina contattaci </p>
  </React.Fragment>
);

//le pagine componente che hanno degli endpoint variabili (/:id)
//ricevono essi tramite la prop match, i dati dentro di essa
//sono leggibili da match.params.nomeDato
const PaginaUtenteSingolo = ({match}) =>(
  <React.Fragment>
  <p>pagina utente con id: {match.params.id} </p>
  </React.Fragment>);


//Pagine categoria
const PaginaCategorie = ()=>(
  <div>
    <p>Questa è la pagina categorie....</p>
    <Link to="/prodotti/categorie/25"> Categoria più venduta</Link>
  </div>
)

const PaginaCategoria = ({match})=>(
  <div>
    <p>Questa è la pagina categoria singola, categoria : {match.params.categoria}</p>
  </div>
)

//metodo non consigliato!!!!
//usato solo per testare
export {PaginaUtenti,HomePage,PaginaProdotti,PaginaContattaci,PaginaUtenteSingolo, PaginaCategorie, PaginaCategoria};
