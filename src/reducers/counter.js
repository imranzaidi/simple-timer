import { countdownInitialState } from '../constants';
import { INITIALIZE_COUNTER, START_COUNTDOWN, STOP_COUNTDOWN, DECREMENT_COUNTER, RESET_COUNTER } from '../actions/ActionTypes';
import { calculateRemainingTime, initialRemainingTime } from '../lib';


const initialState = {
  countdownStarted: false,
  countdownStopped: true,
  countdown: JSON.parse(JSON.stringify(countdownInitialState))
};


/**
 * Counter reducers
 *
 * @param {Object} state - current state
 * @param {Object} action - current action
 */
export default function counter(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_COUNTER:
      return {
        ...state,
        countdown: {
          startTime: action.counterInitPayload.startTime,
          stopTime: action.counterInitPayload.stopTime,
          remainingTime: initialRemainingTime(action.counterInitPayload)
        }
      };
    case START_COUNTDOWN:
      return {
        ...state,
        countdownStarted: true,
        countdownStopped: false
      };
    case STOP_COUNTDOWN:
      return {
        ...state,
        countdownStopped: true
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        countdown: {
          startTime: state.countdown.startTime,
          stopTime: state.countdown.stopTime,
          remainingTime: calculateRemainingTime(state)
        }
      };
    case RESET_COUNTER:
      return {
        countdownStarted: false,
        countdownStopped: true,
        countdown: JSON.parse(JSON.stringify(countdownInitialState))
      };
    default:
      return state;
  }
}