import React from 'react';
import PropTypes from 'prop-types';

import './currencies.scss';

const Currencies = ({
  currencies,
  onCurrencyClick,
  searchValue,
  onSearchChange,
}) => (
  <div className="currencies">
    <input
      type="text"
      placeholder="Rechercher une devise"
      className="currencies__search"
      value={searchValue}
      onChange={onSearchChange}
    />
    <ul className="currencies__list">
      {
        // on évalue du JS dans des accolades
        // on fait ensuite un map sur currencies
        // pour transformer chaque case du tableau de données
        // en élément JSX
        currencies.map(
          // map prend en parametre un callback
          // ce callback prend en parametre une case du tableau
          // (une devise quoi)
          // et renvoie du JSX
          (currencyItem) => (
            // on renvoie du JSX dans le callback du map
            <li
              key={currencyItem.name}
              className="currencies__list__item"
              onClick={() => onCurrencyClick(currencyItem.name)}
            >
              {currencyItem.name}
            </li>
          ),
        )
      }
    </ul>
  </div>
);

Currencies.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onCurrencyClick: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default Currencies;
