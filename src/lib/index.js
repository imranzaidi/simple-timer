/**
 * Helpers to keep reducers pure and clutter free.
 */


/**
 * Decrements remaining time by a single second.
 *
 * @param {Object} state - current state
 * @return {Object} * - new remaining time
 */
export const calculateRemainingTime = (state) => {
  let hours = state.countdown.remainingTime.hours,
    minutes = state.countdown.remainingTime.minutes,
    seconds = state.countdown.remainingTime.seconds;

  if (seconds !== 0) {
    seconds--;
  } else if (seconds === 0 && minutes !== 0) {
    seconds = 59;
    minutes--;
  } else if (seconds === 0 && minutes === 0 && hours !== 0) {
    seconds = 59;
    minutes = 59;
    hours--;
  }

  return {
    hours,
    minutes,
    seconds
  };
};

/**
 * Calculates the time remaining when the counter starts.
 *
 * @param {Object} counterInitPayload - initializing payload for counter
 * @return {Object} * - initial remaining time
 */
export const initialRemainingTime = (counterInitPayload) => {
  let startHours = counterInitPayload.startTime.hours,
    startMinutes = counterInitPayload.startTime.minutes,
    startSeconds = counterInitPayload.startTime.seconds,
    stopHours = counterInitPayload.stopTime.hours,
    stopMinutes = counterInitPayload.stopTime.minutes,
    stopSeconds = counterInitPayload.stopTime.seconds;

  let hours, minutes, seconds;

  if (stopSeconds >= startSeconds) {
    seconds = stopSeconds - startSeconds;
  } else {
    seconds = 60 + stopSeconds - startSeconds;
    if (stopMinutes !== 0) {
      stopMinutes--;
    } else {
      stopMinutes = 59;
      stopHours--;
    }
  }

  if (stopMinutes >= startMinutes) {
    minutes = stopMinutes - startMinutes;
  } else {
    minutes = 60 + stopMinutes - startMinutes;
    if (stopHours !== 0) {
      stopHours--;
    }
  }

  hours = stopHours - startHours;

  return {
    hours,
    minutes,
    seconds
  };
};
