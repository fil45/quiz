import React from 'react';
import { Card, Radio } from 'antd';

export default function Question(props) {
  return (
    <Card>
      <p>
        {props.no}) {props.question.question}
      </p>
      <Radio.Group onChange={props.handleAnswer} value={props.answer}>
        <Radio value={props.question.answers[0].id}>
          {props.question.answers[0].answer}
        </Radio>
        <Radio value={props.question.answers[1].id}>
          {props.question.answers[1].answer}
        </Radio>
        <Radio value={props.question.answers[2].id}>
          {props.question.answers[2].answer}
        </Radio>
        <Radio value={props.question.answers[3].id}>
          {props.question.answers[3].answer}
        </Radio>
      </Radio.Group>
    </Card>
  );
}
