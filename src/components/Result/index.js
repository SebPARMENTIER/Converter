import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

import './result.scss';

const Result = ({ currency, value }) => (
  <div className="result">
    <CountUp decimals={2} className="result__amount" end={value} />
    <p className="result_currency">{currency}</p>
  </div>
);

Result.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Result;
