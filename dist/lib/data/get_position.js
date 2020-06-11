'use strict';

const _isString = require('lodash/isString');

const getDefaultSymbol = require('./get_default_symbol');
/**
 * Returns the position for the specified symbol
 *
 * @param {StrategyState} state - strategy state
 * @param {string} [forSymbol] - defaults to default strategy symbol
 * @returns {Position} position - may be null
 */


const getPosition = (state = {}, forSymbol) => {
  const _state$positions = state.positions,
        positions = _state$positions === void 0 ? {} : _state$positions;
  const symbol = forSymbol || getDefaultSymbol(state);

  if (!_isString(symbol)) {
    throw new Error('no default symbol provided');
  }

  return positions[symbol] || null;
};

module.exports = getPosition;