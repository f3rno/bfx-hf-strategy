'use strict'

const { EMA } = require('bfx-hf-indicators')
const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
const HFS = require('../../')

module.exports = ({
  symbol = SYMBOLS.BTC_USD,
  tf = TIME_FRAMES.ONE_HOUR
} = {}) => HFS.define({
  id: 'ema_cross',
  name: 'ema_cross',
  symbol,
  tf,

  indicators: {
    emaL: new EMA([100]),
    emaS: new EMA([20])
  },

  onPriceUpdate: async (state = {}, update = {}) => {
    const iv = HFS.indicatorValues(state)
    const l = iv.emaL
    const s = iv.emaS

    await HFS.condition.indicatorsCrossed(state, 's', 'l')

    if (!HFS.inAPosition()) {
      return HFS.openPositionMarket(state, { amount: s > l ? 6 : -6 })
    } else {
      return HFS.closePositionMarket(state)
    }
  }
})
