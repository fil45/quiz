import React from 'react';
import 'antd/dist/antd.css';
import { subject, level } from '../constants';
import { Form, Button, Select, Input } from 'antd';
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

export default function Query(props) {
  return (
    <div>
      <Form {...formItemLayout} onSubmit={props.handleSearch}>
        <h2 style={{ textAlign: 'center' }}>Search questions by parameters</h2>
        <Form.Item label='Id'>
          <Input id='id' onChange={props.handleInputChange} value={props.id} />
        </Form.Item>
        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>or</h2>
        <Form.Item label='Subject'>
          <Select
            disabled={!!props.id}
            id='subject'
            onChange={props.handleSubjectChange}
            value={props.subject}
          >
            {options(subject)}
          </Select>
        </Form.Item>
        <Form.Item label='Level'>
          <Select
            disabled={!!props.id}
            id='level'
            onChange={props.handleLevelChange}
            value={props.level}
          >
            {options(level)}
          </Select>
        </Form.Item>
        <Form.Item label='Quantity'>
          <Input
            disabled={!!props.id}
            id='quantity'
            onChange={props.handleInputChange}
            value={props.quantity}
          />
        </Form.Item>
        <Form.Item label='Start index'>
          <Input
            disabled={!!props.id}
            id='start'
            onChange={props.handleInputChange}
            value={props.start}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 1, offset: 11 }}>
          <Button type='primary' htmlType='submit' style={{ width: '120px' }}>
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
