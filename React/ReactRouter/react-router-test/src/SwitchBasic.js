import React from 'react';

import { Route, Switch} from "react-router-dom";

import * as pagine from './Pages';

/*
Route, rotta singola, possono essere utilizzate in sequenza
ma non si ha la garanzia che una volta raggiunta una rotta
non se ne esegua un altra che coincide all'url digitato
richiede attenzione

Switch insieme di rotte,
in Switch avviene una ricerca a cascata della rotta da eseguire
utile per evitare di eseguire più rotte per errore
*/

//con render passiamo dei parametri ad una rotta
//in questo caso la rotta /prodotti
const prodotti =['Palloni', 'Computer', 'Televisioni'];

const SwitchBasic = ()=> (

  <Switch>
    {/*
        Ogni rotta rimanda ad un componente
        Esecuzione a cascata, exact path permette di
        non causare l'esclusione delle altre rotte,
        component per eseguire una
        componente a cui non si passano dei dati,
        render per un componente a cui si passano dei dati
        */}
    <Route exact path="/" component={pagine.HomePage} />
    <Route path="/utenti/:id" component={pagine.PaginaUtenteSingolo} />
    <Route path="/utenti" component={pagine.PaginaUtenti} />
    <Route path="/contattaci" component={pagine.PaginaContattaci} />
    <Route exact path="/prodotti/categorie" component={pagine.PaginaCategorie} />
    <Route path="/prodotti/categorie/:categoria" component={pagine.PaginaCategoria}/>
    <Route exact path="/prodotti" render={props => <pagine.PaginaProdotti {...props} prodotti={prodotti} />} />
  </Switch>
)

export default SwitchBasic;
