'use client';

import { fetcherWithAuth } from "@/config/fetcher";
import { Button, Form, Input, Modal } from "antd";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";

const FormEmployee = (props) => {
  const router = useRouter();
  const onFinish = (values) => {
    const token = jsCookie.get('token');
    if(props.type == 'insert') {
      fetcherWithAuth(token)
        .post("/employee/create", values)
        .then((res) => {
          Modal.success({
            title: "Berhasil Menambahkan",
            content: "Data yang telah diinputkan telah ditambahkan sebagai karyawan.",
            closable:  false,
            onOk() {
              router.replace('/dashboard/employee')
            }
          })
        })
    }
    if(props.type == 'update') {
      fetcherWithAuth(token)
        .post(`/employee/update/${props.id}`, values)
        .then((res) => {
          Modal.success({
            title: "Berhasil Mengubah",
            content: "Data employee yang telah diinputkan telah dirubah.",
            closable:  false,
            onOk() {
              router.replace('/dashboard/employee')
            }
          })
        })
    }
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return <>
    <Form
      layout="vertical" 
      onFinish={onFinish}
      initialValues={props?.initialValues ?? {}}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item label="No Reg" name="no_reg">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Nama" name="name">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Jabatan" name="function">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Section" name="section">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Line" name="line">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>   
      <Form.Item label="Dapartement" name="dapartement">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" size="large" htmlType="submit">Simpan Asset</Button>
      </Form.Item>
    </Form>
  </>
}

export default FormEmployee;