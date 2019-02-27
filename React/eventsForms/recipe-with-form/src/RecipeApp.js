import React, { Component } from 'react';
import Navbar from './Navbar';
import RecipeList from './RecipeList';
import RecipeInput from './RecipeInput';
import './RecipeApp.css';

class RecipeApp extends Component {

  constructor(props) {
    super(props);
    //Il componente principale gestisce lo state
    //e passa come prop alla lista le ricette con
    //un id (che sostituirà index nella key degli lis)
    //e un nextRecipeId per tenere traccia dell'id
    //da assegnare per una nuova creazione
    this.state = {
      recipes: [
        {
          id: 0,
          title: "Spaghetti",
          instructions: "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
          ingredients: ["pasta", "8 cups water", "1 box spaghetti"],
          img: "spaghetti.jpg"
        },
        {
          id: 1,
          title: "Milkshake",
          instructions: "Combine ice cream and milk.  Blend until creamy",
          ingredients: ["2 Scoops Ice cream", "8 ounces milk"],
          img: "milkshake.jpg"
        },
        {
          id: 2,
          title: "Avocado Toast",
          instructions: "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
          ingredients: ["2 slices of bread", "1 avocado", "1 tablespoon olive oil", "1 pinch of salt", "pepper"],
          img: "avocado_toast.jpg"
        }
      ],
      nextRecipeId: 3,
      showForm: false,
    }

    this.handleSave = this.handleSave.bind(this);
    //onDelete regola la cancellazione di una recipe
    this.onDelete = this.onDelete.bind(this);
  }

  //salva la ricetta venendo richiamata in RecipeInput.js
  handleSave(recipe){
    //callback di questo tipo perchè per aggiornare l'id dobbiamo
    //leggere lo state precedente, in questo modo possiamo
    //avere automaticamente una copia modificabile
    this.setState((prevState, props) => {
      //la nuova ricetta proviene da tutti i dati passati dal form,
      //in combinazione con lp'id incrementato di 1 già conservato in state
      const newRecipe = { ...recipe, id: this.state.nextRecipeId};

      //state
      //incrementa di 1 il nextRecipeId
      //recipes è una copia sicura di se stesso con la nuova ricetta aggiunta
      return {
        nextRecipeId: prevState.nextRecipeId + 1,
        recipes: [ ...this.state.recipes, newRecipe],
        showForm: false
      }
    })
  }

  onDelete(id){
    //estraggo un array che esclude la recipe con id corrispondente
    const recipes = this.state.recipes.filter((r => r.id !== id));

    this.setState ({recipes});
  }

  render() {

    //leggiamo showForm da State
    var {showForm} = this.state;


    return (
      <div className="App">
        <Navbar onNewRecipe={ () => this.setState({showForm: true })}/>
        {/* In base al valore di showForm mostriamo nascondiamo il form
           con onClose passiamo una callback come prop
          */}
        { showForm ? <RecipeInput
          onSave={this.handleSave}
          onClose={ () => this.setState({showForm: false })}
          />
          :
           null }
        <RecipeList onDelete={this.onDelete} recipes={this.state.recipes} />
      </div>
    );
  }
}

export default RecipeApp;
