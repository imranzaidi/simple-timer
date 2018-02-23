import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { initialRemainingTime } from '../lib';


class Counter extends Component {
  static timePlaceholder = 'hh:mm:ss';

  /**
   * Matches input string against timeRegex. Returns null if there is no match.
   *
   * Assumption: The max value for time is 23:59:59
   *
   * @param {String} inputString - time represented as hh:mm:ss
   * @returns {RegExpMatchArray} * - [inputString, hh:mm:ss]
   */
  validateInput(inputString) {
    const timeRegex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;
    return inputString.match(timeRegex);
  }

  /**
   * Parses a "time" object from a string.
   *
   * @param {String} timeString - time represented as hh:mm:ss
   * @throws {Error} * - throws an exception if validation fails
   * @returns {{hours: number, minutes: number, seconds: number}}
   */
  getTime(timeString) {
    const validationResult = this.validateInput(timeString);
    if (validationResult === null) {
      throw new Error('Invalid input. Time must be in the format hh:mm:ss and no larger than 23:59:59!')
    }

    return {
      hours: parseInt(validationResult[1], 10),
      minutes: parseInt(validationResult[2], 10),
      seconds: parseInt(validationResult[3], 10)
    };
  }

  /**
   * Format a "time" object to string representation.
   *
   * @param {Object} time - {hours: number, minutes: number, seconds: number}
   * @returns {String} * - time in the format "hh:mm:ss"
   */
  timeToString(time) {
    if (time.hours < 0) return 'Nope!';

    const hours = time.hours > 9 ? time.hours : '0' + time.hours,
      minutes =  time.minutes > 9 ? time.minutes : '0' + time.minutes,
      seconds =  time.seconds > 9 ? time.seconds : '0' + time.seconds;

    return `${hours}:${minutes}:${seconds}`;
  }

  /**
   * Helps the user input time using just the number keys by appending colons automatically. Also limits user input
   * based on last input.
   *
   * @param {Event} event - react event object
   */
  onChangeHandler(event) {
    const twoDigitHourRegEx = /^d{2}$/,
      currentValue = event.target.value,
      threeDigitRegex = /^\d{3}$/,
      hourColonMinuteRegex = /^\d{2}:\d{2}$/,
      singleDigitHourColonTwoDigitsRegex = /^\d{1}:\d{2}$/,
      singleDigitHourColonThreeDigitsRegex = /^\d{1}:\d{3}$/,
      hoursColonThreeDigitsRegex = /^\d{2}:\d{3}$/,
      colonSeparateSingleDigitHourAndMinute = /^\d{1}:\d{1}:\d+$/,
      colonSeparateSingleDigitHourTwoDigitMinutes = /^\d{1}:\d{2}:\d+$/;

    // append colon automatically as user inputs numbers
    if (currentValue.match(twoDigitHourRegEx) !== null) {
      event.target.value += ':';
    } else if (currentValue.match(threeDigitRegex) !== null) {
      event.target.value = currentValue.substring(0, 2) + ':' + currentValue.substring(3, currentValue.length - 1);
    } else if (currentValue.match(singleDigitHourColonTwoDigitsRegex)) {
      event.target.value = currentValue.substring(0, 1) + ':' + currentValue.substring(2, 4) + ':';
    } else if (currentValue.match(singleDigitHourColonThreeDigitsRegex) !== null) {
      event.target.value = currentValue.substring(0, 1) + ':' + currentValue.substring(2, 4) + ':' + currentValue.substring(5, currentValue.length - 1);
    } else if (event.target.value.match(hourColonMinuteRegex) !== null) {
      event.target.value = currentValue.substring(0, 2) + ':' + currentValue.substring(3, 5) + ':';
    } else if (event.target.value.match(hoursColonThreeDigitsRegex) !== null) {
      event.target.value = currentValue.substring(0, 2) + ':' + currentValue.substring(3, 5) + ':' + currentValue.substring(6, currentValue.length - 1);
    }

    // limits user from typing extra digits
    if (currentValue.match(colonSeparateSingleDigitHourAndMinute)) {
      event.target.value = currentValue.substring(0, 1) + ':' + currentValue.substring(2, 3) + ':' + currentValue.substring(4, 6);
    } else if (currentValue.match(colonSeparateSingleDigitHourTwoDigitMinutes)) {
      event.target.value = currentValue.substring(0, 1) + ':' + currentValue.substring(2, 4) + ':' + currentValue.substring(5, 7);
    }
  }

  /**
   * Only allows input of numbers and colons.
   *
   * @param {Event} event - react event object
   */
  onKeyPress(event) {
    // Guard: Firefox uses charCode and not keyCode
    const keyCode = event.nativeEvent.charCode || event.nativeEvent.keyCode;
    // colon keyCode is not the same across damn browsers
    const keyCodeChar = String.fromCharCode(keyCode);

    if ((keyCode < 48 || keyCode > 57) && keyCodeChar !== ':')  {
      event.preventDefault();
    }
  }

  /**
   * Helper function that removes colons on backspace.
   *
   * @param {Event} event - react event object
   */
  removeColonOnBackSpace(event) {
    // Guard: Firefox uses charCode and not keyCode
    const keyCode = event.nativeEvent.charCode || event.nativeEvent.keyCode,
      backspaceKeyCode = 8,
      currentValue = event.target.value,
      hoursWithColonRegex = /^\d{2}:$/,
      hoursMinutesWithColonRegex = /^\d{2}:\d{2}:$/,
      singleDigitHourColonMinutesRegex = /^\d{1}:\d{2}:$/;

    // remove last colon if user presses backspace
    if (keyCode === backspaceKeyCode && currentValue.match(hoursWithColonRegex) !== null) {
      event.target.value = event.target.value.substring(0, event.target.value.length - 1);
    } else if (keyCode === backspaceKeyCode && currentValue.match(hoursMinutesWithColonRegex) !== null) {
      event.target.value = event.target.value.substring(0, event.target.value.length - 1);
    } else if (keyCode === backspaceKeyCode && currentValue.match(singleDigitHourColonMinutesRegex) !== null) {
      event.target.value = event.target.value.substring(0, event.target.value.length - 1);
    }
  }

  /**
   * Key up event handler for inputs.
   *
   * @param {Event} event - react event object
   */
  onKeyUp(event) {
    this.removeColonOnBackSpace(event);
  }

  /**
   * Key down event handler for inputs.
   *
   * @param {Event} event - react event object
   */
  onKeyDown(event) {
    this.removeColonOnBackSpace(event);
  }

  /**
   * Click handler that validates inputs and kicks off countdown.
   *
   * @param {Event} event - react event object
   */
  onClickHandler(event) {
    // stop any potential default browser behavior
    event.preventDefault();

    const startTimeString =  this.startTimeInput.value,
      stopTimeString = this.stopTimeInput.value,
      counterInitPayload = {};

    try {
      counterInitPayload.startTime = this.getTime(startTimeString);
      counterInitPayload.stopTime = this.getTime(stopTimeString);
      this.props.actions.initializeCounter(counterInitPayload);

      // make sure start time is less than end time
      const remainingTime = initialRemainingTime(counterInitPayload);
      if (remainingTime.hours < 0) {
        throw new Error('End time must be greater than start time!');
      }
      this.startCounter();
    } catch (e) {
      window.alert(e.message);
    }
  }

  /**
   * Helper - starts counter.
   */
  startCounter() {
    // in case user start the counter again before the previous one finishes
    if (this.state && typeof this.state.intervalID === 'number') {
      clearInterval(this.state.intervalID);
    }
    this.props.actions.startCountdown();

    const intervalID = setInterval(this.decrementCounter.bind(this), 1000);
    // storing intervalID in component state as it need to be cleared if tab / window is closed
    this.setState({ intervalID });
  }

  /**
   * Helper - decrements counter.
   */
  decrementCounter() {
    let remainingTime = this.props.remainingTime;

    if (remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {
      clearInterval(this.state.intervalID);
      this.stopCounter();
    } else {
      this.props.actions.decrementCounter();
    }
  }

  /**
   * Helper - stops counter.
   */
  stopCounter() {
    this.props.actions.stopCountdown();
    this.props.actions.resetCounter();
  }

  componentWillUnmount() {
    // Guard: in case the user closes tab or window, we don't want an infinite interval
    clearInterval(this.state.intervalID);
  }

  render() {
    const remainingTime = this.timeToString(this.props.remainingTime);

    return (
      <section className={'countdown-timer'}>
        <div className={'time-inputs'}>
          <span className={'time-input-wrapper'}>
            <label htmlFor={'start-time'}>Start time:</label>
            <input id={'start-time'} type={'text'} placeholder={Counter.timePlaceholder}
                   minLength='5' maxLength='8'
                   onChange={this.onChangeHandler.bind(this)}
                   onKeyPress={this.onKeyPress.bind(this)}
                   onKeyUp={this.onKeyUp.bind(this)}
                   onKeyDown={this.onKeyDown.bind(this)}
                   ref={(input) => { this.startTimeInput = input }}/>
          </span>
          <span className={'time-input-wrapper'}>
            <label htmlFor={'stop-time'}>End time:</label>
            <input id={'stop-time'} type={'text'} placeholder={Counter.timePlaceholder}
                   minLength='5' maxLength='8'
                   onChange={this.onChangeHandler.bind(this)}
                   onKeyPress={this.onKeyPress.bind(this)}
                   onKeyUp={this.onKeyUp.bind(this)}
                   onKeyDown={this.onKeyDown.bind(this)}
                   ref={(input) => { this.stopTimeInput = input }}/>
          </span>
          <button onClick={this.onClickHandler.bind(this)} className={'start-countdown'}>Start Countdown</button>
        </div>
        <div className={'remaining-time'}>
          <span className={'remaining-time-wrapper'}>Remaining time: {remainingTime} </span>
        </div>
      </section>
    );
  }
}

Counter.propTypes = {
  startTime: PropTypes.shape({
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired
  }),
  stopTime: PropTypes.shape({
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired
  }),
  remainingTime: PropTypes.shape({
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired
  }),
  actions: PropTypes.shape({
    initializeCounter: PropTypes.func.isRequired,
    startCountdown: PropTypes.func.isRequired,
    stopCountdown: PropTypes.func.isRequired,
    decrementCounter: PropTypes.func.isRequired,
    resetCounter: PropTypes.func.isRequired
  })
};


export default Counter;
