import React from 'react';
import { Form, Button } from 'antd';

export default function Results(props) {
  return (
    <div>
      <Form onSubmit={props.handleAcceptResults}>
        <h2 style={{ textAlign: 'center' }}>Results</h2>
        <Form.Item style={{ textAlign: 'center' }}>
          <p>
            {props.success > 70
              ? `Congratulations! The test is passed succesfully. You answered correctly ${props.success}% of questions`
              : null}{' '}
          </p>
          <p>
            {!props.failed && props.success <= 70
              ? `The test is failed because you answered too few questions. You answered just ${props.success}% of questions correctly, but it requires at least 70% to pass successfully`
              : null}{' '}
          </p>
          <p>
            {props.failed && props.success <= 70
              ? `The test is failed because time is up and you answered too few questions. You answered just ${props.success}% of questions correctly, but it requires at least 70% to pass successfully`
              : null}{' '}
          </p>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 1, offset: 11 }}>
          <Button type='primary' htmlType='submit' style={{ width: '120px' }}>
            OK
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
