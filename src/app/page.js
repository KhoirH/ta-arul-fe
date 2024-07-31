'use client';

import { fetcher } from "@/config/fetcher";
import { Alert, Button, Card, Form, Input } from "antd";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const router = useRouter()
  const handleClose = () => {
    setError(false);
  };
  
  const onFinish = (values) => {
    fetcher.post('/auth/login', values)
      .then(async (res) => {
        await jsCookie.set('token', res.data.data.access_token)
        router.push('/dashboard/store-assets')
      }).catch((err) => {
        console.log(err);
        setError(true);
        setMessageError(err.message)
        
      })
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
          {error && (
            <Alert message={messageError} type="error" closable afterClose={handleClose} />
          )}
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