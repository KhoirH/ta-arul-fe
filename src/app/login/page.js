'use client';

import { Button, Card, Form, Input } from "antd";

const LoginPage = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  
  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="max-w-lg pt-5 block mx-auto">
        <Card bordered >
          <h1 className="text-2xl font-medium  block text-center">LOGIN</h1>
          <hr className="w-7 my-2 mx-auto"/>
          <Form
            layout="vertical" 
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input placeholder="masukan disini" size="large" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder="masukan disini" size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
};

export default LoginPage;