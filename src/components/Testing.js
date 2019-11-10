import React, { Component } from 'react';
import TestParamsForm from './TestParamsForm';
import Question from './Question';
import Results from './Results';
import { quantity } from '../constants';
import ReactCountdownClock from 'react-countdown-clock';
import { Form, Button } from 'antd';

export default class Testing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1, //1 - filling form with params, 2 - testing, 3 - showing results
      subject: null,
      level: null,
      quantity: null,
      questions: [],
      activeQuestion: 0,
      answeredQuestions: [],
    };
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleAcceptResults = this.handleAcceptResults.bind(this);
  }

  handleSubjectChange(e) {
    this.setState({
      subject: e,
    });
  }

  handleLevelChange(e) {
    this.setState({
      level: e,
    });
  }

  handleQuantityChange(e) {
    this.setState({
      quantity: quantity[e],
    });
  }

  async handleStart(e) {
    e.preventDefault();
    let { subject, level, quantity } = this.state;
    if (subject && level && quantity) {
      const response = await fetch(
        `http://localhost:1234/api/v1/start?quantity=${quantity}&level=${level}&subjectId=${subject}`
      );
      const json = await response.json();
      const answeredQuestions = json.questions.map(q => {
        return {
          id: q.id,
        };
      });

      this.setState({
        step: 2,
        testId: json.testId,
        time: json.time,
        questions: json.questions,
        answeredQuestions,
      });
    }
  }

  async handleFinish(e) {
    if (e) {
      e.preventDefault();
    }
    let { answeredQuestions, testId } = this.state;
    const data = {
      testId,
      questions: answeredQuestions,
    };
    const response = await fetch(`http://localhost:1234/api/v1/end`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    this.setState({
      step: 3,
      failed: json.failed,
      success: json.success,
      subject: null,
      level: null,
      quantity: null,
      questions: [],
      activeQuestion: 0,
      answeredQuestions: [],
    });
  }

  handleAcceptResults(e) {
    e.preventDefault();
    this.setState({
      step: 1,
    });
  }

  handleAnswer(e) {
    const { answeredQuestions, questions, activeQuestion } = this.state;
    let answeredQuestionsCopy = JSON.parse(JSON.stringify(answeredQuestions));
    let id = questions[activeQuestion].id;
    answeredQuestionsCopy.forEach(q => {
      if (q.id === id) q.answerId = e.target.value;
    });
    this.setState({
      answeredQuestions: answeredQuestionsCopy,
    });
  }

  handlePrev(e) {
    let { activeQuestion } = this.state;
    if (activeQuestion > 0) --activeQuestion;
    this.setState({
      activeQuestion,
    });
  }

  handleNext(e) {
    let { activeQuestion, quantity } = this.state;
    if (activeQuestion < quantity - 1) ++activeQuestion;
    this.setState({
      activeQuestion,
    });
  }

  render() {
    const {
      step,
      subject,
      level,
      quantity,
      questions,
      time,
      activeQuestion,
      answeredQuestions,
      failed,
      success,
    } = this.state;
    const showingComponent =
      step === 1 ? (
        <TestParamsForm
          handleSubjectChange={this.handleSubjectChange}
          handleLevelChange={this.handleLevelChange}
          handleQuantityChange={this.handleQuantityChange}
          handleStart={this.handleStart}
          subject={subject}
          level={level}
          quantity={quantity}
        />
      ) : step === 2 ? (
        <Form onSubmit={this.handleFinish}>
          <Form.Item style={{ width: '70px', margin: 'auto' }}>
            <ReactCountdownClock
              seconds={time / 1000}
              color='#40a9ff'
              size={70}
              weight={2}
              fontSize={'20px'}
              showMilliseconds={false}
              onComplete={this.handleFinish}
              style={{ margin: '0 auto' }}
            />
          </Form.Item>
          <Form.Item>
            <Question
              question={questions[activeQuestion]}
              no={activeQuestion + 1}
              answer={answeredQuestions[activeQuestion].answerId}
              handleAnswer={this.handleAnswer}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 1, offset: 11 }}>
            <Button
              disabled={activeQuestion === 0}
              type='primary'
              onClick={this.handlePrev}
              style={{ width: '120px' }}
            >
              Previous
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 1, offset: 11 }}>
            <Button
              disabled={activeQuestion === quantity - 1}
              type='primary'
              onClick={this.handleNext}
              style={{ width: '120px' }}
            >
              Next
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 1, offset: 11 }}>
            <Button type='primary' style={{ width: '120px' }} htmlType='submit'>
              Finish testing
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Results
          failed={failed}
          success={success}
          handleAcceptResults={this.handleAcceptResults}
        />
      );
    return <div>{showingComponent}</div>;
  }
}
