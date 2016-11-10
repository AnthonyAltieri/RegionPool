/**
 * @author Anthony Altieri on 11/3/16.
 */

export const startTimer = () => ({
  type: 'START_TIMER',
});

export const decrementTimer = () => ({
  type: 'DECREMENT_TIMER',
});

export const setTimerInterval = (interval) => ({
  type: 'SET_TIMER_INTERVAL',
  interval,
});