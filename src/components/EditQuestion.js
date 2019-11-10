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

export default class EditQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: props.question.subjectId,
      level: props.question.level,
      question: props.question.question,
      correctAnswer: props.question.answers.filter(a => a.isCorrect)[0],
      wrongAnswer1: props.question.answers.filter(a => !a.isCorrect)[0],
      wrongAnswer2: props.question.answers.filter(a => !a.isCorrect)[1],
      wrongAnswer3: props.question.answers.filter(a => !a.isCorrect)[2],
      password: null,
    };
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAnswersChange = this.handleAnswersChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (e.target.id === 'correctAnswer') {
      const { correctAnswer } = this.state;
      this.setState({
        correctAnswer: {
          id: correctAnswer.id,
          answer: e.target.value,
        },
      });
    } else if (e.target.id === 'wrongAnswer1') {
      const { wrongAnswer1 } = this.state;
      this.setState({
        wrongAnswer1: {
          id: wrongAnswer1.id,
          answer: e.target.value,
        },
      });
    } else if (e.target.id === 'wrongAnswer2') {
      const { wrongAnswer2 } = this.state;
      this.setState({
        wrongAnswer2: {
          id: wrongAnswer2.id,
          answer: e.target.value,
        },
      });
    } else if (e.target.id === 'wrongAnswer3') {
      const { wrongAnswer3 } = this.state;
      this.setState({
        wrongAnswer3: {
          id: wrongAnswer3.id,
          answer: e.target.value,
        },
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {
      subject,
      level,
      question,
      correctAnswer,
      wrongAnswer1,
      wrongAnswer2,
      wrongAnswer3,
      password,
    } = this.state;
    const { question: oldQuestion } = this.props;
    correctAnswer.isCorrect = true;
    wrongAnswer1.isCorrect = false;
    wrongAnswer2.isCorrect = false;
    wrongAnswer3.isCorrect = false;
    delete correctAnswer.questionId;
    delete wrongAnswer1.questionId;
    delete wrongAnswer2.questionId;
    delete wrongAnswer3.questionId;
    const data = {
      password,
      id: oldQuestion.id,
      subjectId: subject,
      level,
      question,
      answers: [correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3],
    };
    const response = await fetch(`http://localhost:1234/api/v1/questions`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      this.error(response.statusText);
    } else {
      this.success();
      this.props.handleEditConfirm();
    }
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
      title: 'The question has been updated successfully!',
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
      wrongAnswer1,
      wrongAnswer2,
      wrongAnswer3,
      password,
    } = this.state;
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <h2 style={{ textAlign: 'center' }}>Edit question</h2>
          <Form.Item label='Subject'>
            <Select
              id='subject'
              onChange={this.handleSubjectChange}
              value={subjects[subject]}
            >
              {this.options(subjects)}
            </Select>
          </Form.Item>
          <Form.Item label='Level'>
            <Select
              id='level'
              onChange={this.handleLevelChange}
              value={levels[level]}
            >
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
              onChange={this.handleAnswersChange}
              value={correctAnswer.answer}
            />
          </Form.Item>
          <Form.Item label='First wrong answer'>
            <Input
              id='wrongAnswer1'
              onChange={this.handleAnswersChange}
              value={wrongAnswer1.answer}
            />
          </Form.Item>
          <Form.Item label='Second wrong answer'>
            <Input
              id='wrongAnswer2'
              onChange={this.handleAnswersChange}
              value={wrongAnswer2.answer}
            />
          </Form.Item>
          <Form.Item label='Third wrong answer'>
            <Input
              id='wrongAnswer3'
              onChange={this.handleAnswersChange}
              value={wrongAnswer3.answer}
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
                  wrongAnswer1 &&
                  wrongAnswer2 &&
                  wrongAnswer3 &&
                  password
                )
              }
              type='primary'
              htmlType='submit'
              style={{ width: '120px' }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
