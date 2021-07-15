/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */

// == Import npm
import React from 'react';

import Header from 'src/components/Header';
import Currencies from 'src/components/Currencies';
import Result from 'src/components/Result';
import Toggler from 'src/components/Toggler';

import currenciesList from 'src/data/currencies';

import './converter.scss';

// == Composant
class Converter extends React.Component {
  // dans un composant sous forme de classe
  // si l'on veut ajouter un state (état local)
  // on doit le faire dans le constructeur
  // le constructeur prend les props
  constructor(props) {
    // le constructeur "remonte" les props au parent (React.Component)
    // grace au mot clé super
    super(props);

    // et enfin, nous pouvons déclarer notre state
    // grace à this.state
    this.state = {
      isListOpen: true,
      baseAmount: 1,
      selectedCurrency: 'Hong Kong Dollar',
      search: '',
    };

    // on a besoin d'associer explicitement le contexte (this) a la méthode
    // handleToggleClick
    // ainsi, si on "sort" handleToggleClick, son contexte viendra avec
    this.handleToggleClick = this.handleToggleClick.bind(this);

    this.handleToggleClickCurrency = this.handleToggleClickCurrency.bind(this);

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleToggleClick() {
    // pour modifier le state
    // on appelle SYSTEMATIQUEMENT la méthode this.setState
    // il est interdit de modifier this.state directement
    this.setState({
      // on donne a setState, les clés que l'on veut modifier
      // ici, on inverse la valeur actuelle de isListOpen, avec un !
      // et on met le résultat dans isListOpen, que l'on donne a setState
      isListOpen: !this.state.isListOpen,
    });
  }

  handleSearchChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

  handleToggleClickCurrency(newCurrency) {
    this.setState({
      selectedCurrency: newCurrency,
    });
  }

  getFilteredCurrencies() {
    return currenciesList.filter(
      (currency) => currency.name.toLowerCase().includes(
        this.state.search.toLowerCase(),
      ),
    );
  }

  makeConversion() {
    // on commence par trouver la devise choisie
    // dans le tableau de devises
    const foundCurrency = currenciesList
      .find((currency) => currency.name === this.state.selectedCurrency);

    // on fait le calcul taux * montant
    const result = foundCurrency.rate * this.state.baseAmount;

    // on renvoie le tout
    // on veut garder que 2 décimales après la virgule
    // si cette ligne vous plait pas ----> on va jouer avec dans la console
    return Math.round(result * 100) / 100;
  }

  // la méthode render sera appelée lorsqu'il faut redessiner le composant
  // react se charge d'appeller render au bon moment
  // c'est a dire quand les props, ou le state changent
  render() {
    // dans render, on renvoie le meme JSX qu'avant, rien ne change ici
    return (
      <div className="app">
        <Header baseAmount={this.state.baseAmount} />
        <Toggler
          isOpen={this.state.isListOpen}
          onToggle={this.handleToggleClick}
        />
        {this.state.isListOpen && (
          <Currencies
            searchValue={this.state.search}
            onSearchChange={this.handleSearchChange}
            currencies={this.getFilteredCurrencies()}
            onCurrencyClick={this.handleToggleClickCurrency}
          />
        )}
        <Result
          currency={this.state.selectedCurrency}
          value={this.makeConversion()}
        />
      </div>
    );
  }
}

// == Export
export default Converter;
