import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { render } from "@testing-library/react";
import Card from "./components/Card.js";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      search: "",
    };
  }
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=100")
      .then((response) => response.json())

      .then((pokemonJson) => {
        this.setState({ pokemons: pokemonJson.results });
        console.log(this.state.pokemons);
      });
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  filterPokemons = () => {
    const search = this.state.search.toLowerCase();
    return this.state.pokemons.filter((pokemon) =>
      pokemon.name.startsWith(search)
    );
  };
  render() {
    const data = this.filterPokemons();
    return (
      <div className="App">
        <div className="navbar w-full flex justify-between bg-red-500 h-20">
          <div className="flex ml-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
              alt=""
              width="75px"
              height="75px"
            />
            <p className="title text-6xl">PokéDex</p>
          </div>
          <form className="mt-6 mr-6">
            <input
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
              type="text"
              placeholder="Ejemplo: Pikachu"
              className="p-1"
            />
            <button className="bg-red-900 tracking-widest text-white py-1 px-3 font-semibold">
              Buscar
            </button>
          </form>
        </div>
        {/*{this.state.pokemons.map((item) => {
          return <Card datos={item.url} name={item.name} />;
        })}*/}
        <Pokemons data={data} />
      </div>
    );
  }
}

function Pokemons({ data }) {
  return (
    <div className="flex flex-wrap my-4">
      {data.map((pokemon) => (
        <Card key={pokemon.url} {...pokemon} />
      ))}
    </div>
  );
}

export default App;
