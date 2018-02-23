import {INITIALIZE_COUNTER, START_COUNTDOWN, STOP_COUNTDOWN, DECREMENT_COUNTER, RESET_COUNTER} from './ActionTypes';


/**
 * Action Creators
 */
export const initializeCounter = (counterInitPayload) => ({ type: INITIALIZE_COUNTER, counterInitPayload });
export const startCountdown = () => ({ type: START_COUNTDOWN });
export const decrementCounter = () => ({ type: DECREMENT_COUNTER });
export const stopCountdown = () => ({ type: STOP_COUNTDOWN });
export const resetCounter = () => ({ type: RESET_COUNTER });
