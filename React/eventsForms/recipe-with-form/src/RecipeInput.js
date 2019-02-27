import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './RecipeInput.css';

class RecipeInput extends Component {

  //Il componente che possiede lo stato è quello principale
  //tramite una callback che arriva dal componente padre
  //eseguiamo setState

  static defaultProps = {
    onClose() {},
    onSave() {}
  }

  constructor(props){
    super(props);

    this.state = {
      title: '',
      instructions: '',
      ingredients: [''],
      img: '',
    };

    //usiamo bind per non far perdere contesto a this
    this.handleChange = this.handleChange.bind(this);
    this.handleNewIngredient = this.handleNewIngredient.bind(this);
    this.handleChangeIng = this.handleChangeIng.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //puntando a e.target.name otteniamo una chiave dinamica
  //per ogni input su cui viene usato il metodo
  handleChange(e) {
    this.setState({ [ e.target.name ] : e.target.value});
  }

  //alla pressione del + ingredienti
  handleNewIngredient(e){
    const {ingredients} = this.state;
    // aggiungiamo una nuovo ingrediente all'array
    this.setState({ ingredients: [...ingredients, '']});
  }


  handleChangeIng(e){
    const index = Number(e.target.name.split('-')[1]);

    const ingredients = this.state.ingredients.map((ing, i) => (
      i === index ? e.target.value : ing
    ));
    this.setState({ingredients});
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onSave({...this.state})

    this.setState({
      title: '',
      instructions: '',
      ingredients: [''],
      img: '',
    })

  }


  render() {
    //Estraggo le var da this.state e this.props
    const {title, instructions, ingredients, img } = this.state;

    const {onClose} = this.props;

    const inputs = ingredients.map((ingr, i) => (
     <div className="recipe-form-line" key={`ingredient-${i}`}>
      <label> { i + 1 /*numero input ingrediente */} .
      <input
        type="text"
        name={`ingredient-${i}`}
        value={ingr}
        size={45}
        autoComplete="off"
        placeholder=" Ingredient"
        onChange={this.handleChangeIng}
       />
      </label>
     </div>
   ));

   return(
    <div className="recipe-form-container">
      <form className="recipe-form" onSubmit={this.handleSubmit}>
        <button
        type="button"
        className="close-button"
        onClick={onClose}
        > X
        </button>
        <div className="recipe-form-line">
          <label htmlFor="recipe-title-input">Title</label>
          <input
          id="recipe-title-input"
          key="title"
          name="title"
          type="text"
          value={title}
          size={42}
          autoComplete="off"
          onChange={this.handleChange}
          />
        </div>
          <label
          htmlFor="recipe-instructions-input"
          style={{marginTop: '5px'}}
          >Instructions
          </label>
          <textarea
          id="recipe-instructions-input"
          key="instructions"
          name="instructions"
          type="Instructions"
          value={instructions}
          rows='8'
          cols='50'
          autoComplete="off"
          onChange={this.handleChange}
          />
          {inputs}
          <button
          type="button"
          onClick={this.handleNewIngredient}
          className="buttons"
          > + </button>
        <div className="recipe-form-line">
          <label
          htmlFor="recipe-img-input"
          >Image URL</label>
          <textarea
          id="recipe-img-input"
          placeholder=''
          name="img"
          type="text"
          value={img}
          size={36}
          autoComplete="off"
          onChange={this.handleChange}
          />
          </div>
          <button
          type="submit"
          className="buttons"
          style={ { alignSelf: 'flex-end',marginRight: 0}}
          >Save</button>
          </form>
        </div>

   )
  }

}

export default RecipeInput;
