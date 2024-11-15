'use client';

import { fetcherWithAuth } from "@/config/fetcher";
import { Button, Form, Input, Modal } from "antd";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";

const FormAsset = (props) => {
  const router = useRouter();
  const onFinish = (values) => {
    const token = jsCookie.get('token');
    if(props.type == 'insert') {
      fetcherWithAuth(token)
        .post("/assets/create", {
          asset_number: +values.asset_number,
          device_name: values.device_name,
          serial_number: values.serial_number,
          asset_year: values.asset_year,
          location: values.location,
        })
        .then((res) => {
          Modal.success({
            title: "Berhasil Menambahkan",
            content: "Data yang telah diinputkan telah ditambahkan kedalam asset store.",
            closable:  false,
            onOk() {
              router.replace('/dashboard/store-assets')
            }
          })
        })
    }
    if(props.type == 'update') {
      fetcherWithAuth(token)
        .post(`/assets/update/${props.id}`, {
          asset_number: +values.asset_number,
          device_name: values.device_name,
          serial_number: values.serial_number,
          asset_year: values.asset_year,
          location: values.location,
        })
        .then((res) => {
          Modal.success({
            title: "Berhasil Mengubah",
            content: "Data yang telah diinputkan telah dirubah dari asset store.",
            closable:  false,
            onOk() {
              router.replace('/dashboard/store-assets')
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
      <Form.Item label="Nama Device" name="device_name">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Nomer Asset" name="asset_number">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Serial Number" name="serial_number">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Year" name="asset_year">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Lokasi" name="location">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" size="large" htmlType="submit">Simpan</Button>
      </Form.Item>
    </Form>
  </>
}

export default FormAsset;