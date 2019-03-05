import React from 'react';
import { Link } from "react-router-dom";

const LinkGroup = ()=>(
  <React.Fragment>
    <Link to="/"> Home </Link>
    <Link to="/utenti"> Utenti </Link>
    <Link to="/utenti/25"> Utente 25 </Link>
    <Link to="/prodotti/categorie"> Categorie </Link>
    <Link to="/prodotti/categorie/25"> Categoria singola</Link>
    <Link to="/prodotti"> Prodotti </Link>
    <Link to="/contattaci"> Home </Link>
  </React.Fragment>
);

export default LinkGroup;
