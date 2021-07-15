/* eslint-disable no-unneeded-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ baseAmount, onAmountChange }) => (
  <header className="header">
    <h1 className="header__title">Converter</h1>
    <div>
      <input
        placeholder="Montant a convertir en €"
        className="header__input"
        type="number"
        min="0"
        max="10000"
        value={baseAmount ? baseAmount : ''}
        onChange={onAmountChange}
      />
      <span className="header__euro">€</span>
    </div>
  </header>
);

Header.propTypes = {
  baseAmount: PropTypes.number,
  onAmountChange: PropTypes.func.isRequired,
};

export default Header;
