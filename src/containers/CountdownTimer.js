import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { initializeCounter, startCountdown, stopCountdown, decrementCounter, resetCounter } from '../actions'


const CountdownTimer = (props) => (
  <Counter startTime={props.startTime} stopTime={props.stopTime} remainingTime={props.remainingTime}
           actions={props.actions} />
);

CountdownTimer.propTypes = {
  startTime: PropTypes.object.isRequired,
  stopTime: PropTypes.object.isRequired,
  remainingTime: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  startTime: state.counter.countdown.startTime,
  stopTime: state.counter.countdown.stopTime,
  remainingTime: state.counter.countdown.remainingTime
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    initializeCounter,
    startCountdown,
    stopCountdown,
    decrementCounter,
    resetCounter
  }, dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountdownTimer);
