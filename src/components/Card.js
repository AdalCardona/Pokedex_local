import React from "react";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: props.url,
      backD: "",
      frontD: "",
      backS: "",
      frontS: "",
      name: props.name,
      types: "",
      typeOne: "",
      stats: "",
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
      weight: 0,
      presentation: true,
      cardUno: false,
      cardDos: false,
      frontDefault: true,
      backDefault: false,
      frontShiny: false,
      backShiny: false,
    };
  }
  componentDidMount() {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((pokemon) => {
        this.setState({
          pokemon: pokemon,
          backD: pokemon.sprites.back_default,
          backS: pokemon.sprites.back_shiny,
          frontD: pokemon.sprites.front_default,
          frontS: pokemon.sprites.front_shiny,
          types: pokemon.types,
          typeOne: pokemon.types[0].type.name,
          typeTwo: pokemon.types[1] && pokemon.types[1].type.name,
          hp: pokemon.stats[0].base_stat,
          attack: pokemon.stats[1].base_stat,
          defense: pokemon.stats[2].base_stat,
          specialAttack: pokemon.stats[3].base_stat,
          specialDefense: pokemon.stats[4].base_stat,
          speed: pokemon.stats[5].base_stat,
          weight: pokemon.weight,
        });
        //console.log(this.state.hp);
      });
  }

  handleClickUno = () => {
    this.setState((state) => ({
      presentation: !state.presentation,
      cardUno: !state.cardUno,
    }));
  };
  handleClickReverse = () => {
    this.setState((state) => ({
      cardDos: !state.cardDos,
      cardUno: !state.cardUno,
    }));
  };

  handleClickFD = () => {
    this.setState((state) => ({
      frontDefault: true,
      backDefault: false,
      frontShiny: false,
      backShiny: false,
    }));
  };
  handleClickBD = () => {
    this.setState((state) => ({
      frontDefault: false,
      backDefault: true,
      frontShiny: false,
      backShiny: false,
    }));
  };

  handleClickFS = () => {
    this.setState((state) => ({
      frontDefault: false,
      backDefault: false,
      frontShiny: true,
      backShiny: false,
    }));
  };

  handleClickBS = () => {
    this.setState((state) => ({
      frontDefault: false,
      backDefault: false,
      frontShiny: false,
      backShiny: true,
    }));
  };

  getTypeColor = (type) => {
    const TYPE_COLORS = {
      water: "blue-500",
      fire: "red-500",
      grass: "green-600",
      bug: "green-400",
      normal: "gray-400",
      electric: "yellow-400",
      ground: "yellow-600",
      poison: "purple-500",
      fighting: "red-600",
      fairy: "pink-200",
      psychic: "pink-300",
      rock: "yellow-800",
      ghost: "purple-800",
    };
    return TYPE_COLORS[type] || "gray-500";
  };
  render() {
    const color = this.getTypeColor(this.state.typeOne);
    const pokemon = this.state;
    if (this.state.presentation) {
      return (
        this.state.frontD !== null && (
          <div className="card m-2 mx-3 w-1/6 bg-transparent inline-flex relative">
            <div className="presentation">
              <p>{this.state.name.toUpperCase()}</p>
              <img
                src="https://www.pngkey.com/png/full/18-182029_open-pokeball-png-pokemon-ball-open-png.png"
                className="open absolute top-1/4"
                onClick={this.handleClickUno}
              />
              <img
                src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c31e.png"
                className="close absolute top-1/4"
              />
            </div>
          </div>
        )
      );
    } else if (this.state.cardUno) {
      return (
        this.state.frontD !== null && (
          <div
            className={`card m-2 mx-3 bg-${color} w-1/6 inline-flex relative`}
          >
            <div className="cardUno">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/1200px-Back_Arrow.svg.png"
                width="17%"
                className="absolute left-2 top-2"
                onClick={this.handleClickUno}
              />
              <img
                src="https://static.thenounproject.com/png/2573378-200.png"
                width="15%"
                className="absolute right-2 top-2"
                onClick={this.handleClickReverse}
              />
              {this.state.frontDefault !== false && (
                <div className="image-card block absolute top-12 h-1/2 w-full">
                  {this.state.frontD !== null && (
                    <img
                      src={this.state.frontD}
                      alt="pokemon"
                      className="frontdefault max-h-full"
                    />
                  )}
                </div>
              )}

              {this.state.backDefault !== false && (
                <div className="image-card block absolute top-12 h-1/2 w-full">
                  {this.state.backD !== null && (
                    <img
                      src={this.state.backD}
                      alt="pokemon"
                      className="backdefault max-h-full"
                    />
                  )}
                </div>
              )}

              {this.state.frontShiny !== false && (
                <div className="image-card block absolute top-12 h-1/2 w-full">
                  {this.state.frontS !== null && (
                    <img
                      src={this.state.frontS}
                      alt="pokemon"
                      className="frontshi"
                    />
                  )}
                </div>
              )}

              {this.state.backShiny !== false && (
                <div className="image-card block absolute top-12 h-1/2 w-full">
                  {this.state.backS !== null && (
                    <img
                      src={this.state.backS}
                      alt="pokemon"
                      className="backshi max-h-full"
                    />
                  )}
                </div>
              )}
              <br></br>
              <div className="formas absolute top-56">
                <h1>{this.state.name.toUpperCase()}</h1>
                <div className="buttons">
                  <button
                    className="frn  rounded-full"
                    onClick={this.handleClickFD}
                  >
                    FD
                  </button>
                  <button
                    className="backn  rounded-full"
                    onClick={this.handleClickBD}
                  >
                    BD
                  </button>
                  <button
                    className="frsh  rounded-full"
                    onClick={this.handleClickFS}
                  >
                    FS
                  </button>
                  <button
                    className="backsh  rounded-full"
                    onClick={this.handleClickBS}
                  >
                    BS
                  </button>
                </div>
                <div className="types">
                  {this.state.types !== null && (
                    <div
                      className={`typeOne ${this.state.typeOne} inline-block m-3 rounded-full`}
                    >
                      <p>{this.state.typeOne.toUpperCase()}</p>
                    </div>
                  )}
                  {this.state.typeTwo !== undefined && (
                    <div
                      className={`typeTwo ${this.state.typeTwo}  inline-block rounded-full`}
                    >
                      <p>{this.state.typeTwo.toUpperCase()}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      );
    } else {
      return (
        this.state.frontD !== null && (
          <div
            className={`card m-2 mx-3 bg-${color} w-1/6 inline-flex relative`}
          >
            <div className="cardDos w-full">
              <div className="h8 w-full relative">
                <img
                  src="https://static.thenounproject.com/png/2573378-200.png"
                  width="15%"
                  className="absolute right-2 top-2"
                  onClick={this.handleClickReverse}
                />
              </div>
              <p className="stat">HP</p>
              <div className="progress-div">
                <div
                  style={{ width: `${this.state.hp}%` }}
                  className="progress"
                >
                  <p className="white">{this.state.hp}%</p>
                </div>
              </div>
              <p className="stat">ATTACK</p>
              <div className="progress-div">
                <div
                  style={{ width: `${this.state.attack}%` }}
                  className="progress"
                >
                  <p className="white">{this.state.attack}%</p>
                </div>
              </div>
              <p className="stat">DEFENSE</p>
              <div className="progress-div">
                <div
                  style={{ width: `${this.state.defense}%` }}
                  className="progress"
                >
                  <p className="white">{this.state.defense}%</p>
                </div>
              </div>
              <p className="stat">SPECIAL ATTACK</p>
              <div className="progress-div">
                <div
                  style={{ width: `${this.state.specialAttack}%` }}
                  className="progress"
                >
                  <p className="white">{this.state.specialAttack}%</p>
                </div>
              </div>
              <p className="stat">SPECIAL DEFENSE</p>
              <div className="progress-div">
                <div
                  style={{ width: `${this.state.specialDefense}%` }}
                  className="progress"
                >
                  <p className="white">{this.state.specialDefense}%</p>
                </div>
              </div>
              <p className="stat">SPEED</p>
              <div className="progress-div">
                <div
                  style={{ width: `${this.state.speed}%` }}
                  className="progress"
                >
                  <p className="white">{this.state.speed}%</p>
                </div>
              </div>
              <p className="stat">Weight: {this.state.weight}</p>
            </div>
          </div>
        )
      );
    }
  }
}

export default Card;
