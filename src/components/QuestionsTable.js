import React from 'react';
import { Table } from 'antd';
import { subject as subjects, level as levels } from '../constants';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'question',
  },

  {
    title: 'Correct answer',
    dataIndex: 'correctAnswer',
    key: 'correctAnswer',
  },
  {
    title: 'Wrong answer 1',
    dataIndex: 'wrongAnswer1',
    key: 'wrongAnswer1',
  },
  {
    title: 'Wrong answer 2',
    dataIndex: 'wrongAnswer2',
    key: 'wrongAnswer2',
  },
  {
    title: 'Wrong answer 3',
    dataIndex: 'wrongAnswer3',
    key: 'wrongAnswer3',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() => record.action(record)}>Edit</a>
      </span>
    ),
  },
];

function getCorrectAnswer(answers) {
  return answers.filter(a => a.isCorrect)[0].answer;
}

function getWrongAnswers(answers) {
  return answers.filter(a => !a.isCorrect).map(a => a.answer);
}

function data(questions, action) {
  return questions.map(q => {
    return {
      key: q.id,
      id: q.id,
      subject: subjects[q.subjectId],
      level: levels[q.level],
      question: q.question,
      correctAnswer: getCorrectAnswer(q.answers),
      wrongAnswer1: getWrongAnswers(q.answers)[0],
      wrongAnswer2: getWrongAnswers(q.answers)[1],
      wrongAnswer3: getWrongAnswers(q.answers)[2],
      action,
    };
  });
}

export default function QuestionsTable(props) {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data(props.questions, props.handleEdit)}
      />
    </div>
  );
}
