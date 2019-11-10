import React, { Component } from 'react';
import { Form, Button, Input, Select, Modal } from 'antd';
import { subject as subjects, level as levels } from '../constants';
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: null,
      level: null,
      question: null,
      correctAnswer: null,
      answers: [],
      password: null,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAnswersChange = this.handleAnswersChange.bind(this);
  }

  async handleAdd(e) {
    e.preventDefault();
    let {
      password,
      subject,
      level,
      question,
      correctAnswer,
      answers,
    } = this.state;
    answers = answers.map(answer => {
      return {
        answer,
        isCorrect: false,
      };
    });
    answers.push({
      answer: correctAnswer,
      isCorrect: true,
    });
    const data = {
      password,
      subjectId: subject,
      level,
      question,
      answers,
    };
    const response = await fetch(`http://localhost:1234/api/v1/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      this.error(response.statusText);
    } else {
      this.success();
      this.setState({
        subject: null,
        level: null,
        question: null,
        correctAnswer: null,
        answers: [],
        success: null,
        error: null,
        password: null,
      });
    }
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

  handleInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleAnswersChange(e) {
    const { answers } = this.state;
    const newAnswers = answers.slice();
    newAnswers[e.target.id] = e.target.value;
    this.setState({
      answers: newAnswers,
    });
  }

  options(obj) {
    let opts = [];
    for (let i in obj) {
      opts.push(<Option key={i}>{obj[i]}</Option>);
    }
    return opts;
  }

  success() {
    Modal.success({
      title: 'The question has been added successfully!',
    });
  }

  error(text) {
    Modal.error({
      title: 'Something went wrong!',
      content: text,
    });
  }

  render() {
    const {
      subject,
      level,
      question,
      correctAnswer,
      answers,
      password,
    } = this.state;
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleAdd}>
          <h2 style={{ textAlign: 'center' }}>
            Select parameters of new question
          </h2>
          <Form.Item label='Subject'>
            <Select
              id='subject'
              onChange={this.handleSubjectChange}
              value={subject}
            >
              {this.options(subjects)}
            </Select>
          </Form.Item>
          <Form.Item label='Level'>
            <Select id='level' onChange={this.handleLevelChange} value={level}>
              {this.options(levels)}
            </Select>
          </Form.Item>
          <Form.Item label='Question'>
            <Input
              id='question'
              onChange={this.handleInputChange}
              value={question}
            />
          </Form.Item>
          <Form.Item label='Correct answer'>
            <Input
              id='correctAnswer'
              onChange={this.handleInputChange}
              value={correctAnswer}
            />
          </Form.Item>
          <Form.Item label='First wrong answer'>
            <Input
              id='0'
              onChange={this.handleAnswersChange}
              value={answers[0]}
            />
          </Form.Item>
          <Form.Item label='Second wrong answer'>
            <Input
              id='1'
              onChange={this.handleAnswersChange}
              value={answers[1]}
            />
          </Form.Item>
          <Form.Item label='Third wrong answer'>
            <Input
              id='2'
              onChange={this.handleAnswersChange}
              value={answers[2]}
            />
          </Form.Item>
          <Form.Item label='Password'>
            <Input
              id='password'
              type='password'
              onChange={this.handleInputChange}
              value={password}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 1, offset: 11 }}>
            <Button
              disabled={
                !(
                  subject &&
                  level &&
                  question &&
                  correctAnswer &&
                  answers[0] &&
                  answers[1] &&
                  answers[2] &&
                  password
                )
              }
              type='primary'
              htmlType='submit'
              style={{ width: '120px' }}
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
