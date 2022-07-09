import React from 'react';
import 'antd/dist/antd.css';
import { subject, level, quantity } from '../constants';
import { Form, Button, Select } from 'antd';
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

function options(obj) {
  let opts = [];
  for (let i in obj) {
    opts.push(<Option key={i}>{obj[i]}</Option>);
  }
  return opts;
}

export default function TestParamsForm(props) {
  return (
    <div>
      <Form {...formItemLayout} onSubmit={props.handleStart}>
        <h2 style={{ textAlign: 'center' }}>Select parameters of testing</h2>
        <Form.Item label='Subject'>
          <Select
            id='subject'
            onChange={props.handleSubjectChange}
            value={props.subject}
          >
            {options(subject)}
          </Select>
        </Form.Item>
        <Form.Item label='Level'>
          <Select
            id='level'
            onChange={props.handleLevelChange}
            value={props.level}
          >
            {options(level)}
          </Select>
        </Form.Item>
        <Form.Item label='Quantity'>
          <Select
            id='quantity'
            onChange={props.handleQuantityChange}
            value={props.quantity}
          >
            {options(quantity)}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 1, offset: 11 }}>
          <Button
            disabled={!(props.subject && props.level && props.quantity)}
            type='primary'
            htmlType='submit'
            style={{ width: '120px' }}
          >
            Start testing
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
