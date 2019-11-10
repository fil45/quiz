import React, { Component } from 'react';
import QuestionsTable from './QuestionsTable';
import Query from './Query';
import EditQuestion from './EditQuestion';
import { Modal, Button } from 'antd';

export default class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1, //1 - filling form with params, 2 - showing table, 3 - edit question
      id: null,
      subject: null,
      level: null,
      quantity: null,
      start: null,
      questions: [],
      activeQuestion: null,
      lastQuery: null,
    };
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditConfirm = this.handleEditConfirm.bind(this);
    this.update = this.update.bind(this);
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
    if (e.target.value.match(/^\d+$/g) || e.target.value === '') {
      if (e.target.id === 'id') {
        this.setState({
          [e.target.id]: e.target.value,
          subject: null,
          level: null,
          quantity: null,
          start: null,
        });
      } else {
        this.setState({
          [e.target.id]: e.target.value,
        });
      }
    }
  }

  async handleSearch(e) {
    e.preventDefault();
    let { id, subject, level, quantity, start } = this.state;
    if (id) {
      const url = `http://localhost:1234/api/v1/questions/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        this.error(response.statusText);
      } else {
        const json = await response.json();
        const questions = [json];
        this.setState({
          step: 2,
          questions,
          lastQuery: url,
        });
      }
    } else {
      let url = `http://localhost:1234/api/v1/questions?`;
      if (subject) url += `subjectId=${subject}&`;
      if (level) url += `level=${level}&`;
      if (quantity) url += `quantity=${quantity}&`;
      if (start) url += `start=${start}&`;
      const response = await fetch(url);
      if (!response.ok) {
        this.error(response.statusText);
      } else {
        const json = await response.json();
        const questions = json.questions;
        this.setState({
          step: 2,
          questions,
          subject: null,
          level: null,
          quantity: null,
          start: null,
          lastQuery: url,
        });
      }
    }
  }

  handleBack() {
    let { step } = this.state;
    step--;
    this.setState({
      step,
    });
  }

  handleEdit(q) {
    this.setState({
      step: 3,
      activeQuestion: q.id,
    });
  }

  handleEditConfirm() {
    setTimeout(() => this.update(), 3000);
  }

  async update() {
    const { lastQuery: url } = this.state;
    const response = await fetch(url);
    if (!response.ok) {
      this.error(response.statusText);
    } else {
      const json = await response.json();
      let questions;
      if (json.hasOwnProperty('questions')) {
        questions = json.questions;
      } else {
        questions = [json];
      }
      this.setState({
        step: 2,
        questions,
      });
    }
  }

  error(text) {
    Modal.error({
      title: 'Something went wrong!',
      content: text,
    });
  }

  render() {
    const {
      id,
      step,
      subject,
      level,
      quantity,
      start,
      questions,
      activeQuestion,
    } = this.state;
    const showingComponent =
      step === 1 ? (
        <Query
          handleSubjectChange={this.handleSubjectChange}
          handleLevelChange={this.handleLevelChange}
          handleInputChange={this.handleInputChange}
          handleSearch={this.handleSearch}
          subject={subject}
          level={level}
          quantity={quantity}
          start={start}
          id={id}
        />
      ) : step === 2 ? (
        <div>
          <Button
            type='primary'
            onClick={this.handleBack}
            style={{ width: '120px', marginBottom: '20px' }}
          >
            Back
          </Button>
          <QuestionsTable questions={questions} handleEdit={this.handleEdit} />
        </div>
      ) : (
        <div>
          <Button
            type='primary'
            onClick={this.handleBack}
            style={{ width: '120px', marginBottom: '20px' }}
          >
            Back
          </Button>
          <EditQuestion
            question={questions.filter(q => q.id === activeQuestion)[0]}
            handleEditConfirm={this.handleEditConfirm}
          />
        </div>
      );
    return <div>{showingComponent}</div>;
  }
}
