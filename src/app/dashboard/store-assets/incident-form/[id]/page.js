'use client';

import { AutoComplete, Button, Card, Form, Input, Select, Tag } from "antd";

const IncidentForm = () => {
  
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();
  const condition = Form.useWatch('condition', form);

  return <>
    <h1 className="text-2xl font-semibold border-b-2 w-fit border-blue-600 mb-4 leading-normal">Form Tindakan</h1>
    <Card bordered className="!border-gray-400 !border-2 " size="small">
      <div className="flex items-baseline">
        <span className="text-lg font-medium">Nomer asset. Laptop</span>
        <div className="w-1 h-1 rounded-full bg-black ml-2"/>
        <span className="text-base  ml-2">serial number</span>
        <div className="ml-auto flex items-center">
          <Tag color="#16a34a" className="!mr-5">Tersedia</Tag>
          <div>
            <span className="block leading-none text-xs">Terakhir diubah</span>
            <span className="block italic text-xs">20 Oktober 2023</span>
          </div>
        </div>
      </div>
    </Card>
    <br/>
    <Form
      layout="vertical" 
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{
        pic:  "Arul-52",
        id_asset:  "1"
      }}
      >
      <Form.Item label="PIC" name="pic">
        <AutoComplete  allowClear size="large" options={[
          {
            label: 'Arul',
            value: 'Arul-52',
            title: 'Arul',
          },
          {
            label: 'Arul2',
            value: '52',
            title: 'Arul2',
          }
        ]} />
      </Form.Item>
      <Form.Item label="Status Unit" name="status_unit">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Divisi" name="dapartement">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Section" name="section">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Line" name="line">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <div className="flex">
        {
          loanStatus === 'dikembalikan' && (
            <>
              <Form.Item label="Kondisi" name="condition" className="!ml-4 min-w-40">
                <Select size="large" placeholder="Pilih">
                  <Select.Option value="baik">Baik</Select.Option>
                  <Select.Option value="rusak">Rusak</Select.Option>
                </Select>
              </Form.Item>
              {
                condition === 'rusak' && (
                  <Form.Item label="Tindakan" name="reason" className="!ml-4 min-w-40">
                    <Select size="large" placeholder="Pilih">
                      <Select.Option value="diservice">Service</Select.Option>
                      <Select.Option value="diretire">Retire</Select.Option>
                      <Select.Option value="on hand">On Hand</Select.Option>
                    </Select>
                  </Form.Item>
                )
              }
            </>
          )
        }
      </div>
      <Form.Item>
        <Button type="primary" size="large" htmlType="submit">Simpan Asset</Button>
      </Form.Item>
    </Form>
  </>
};

export default IncidentForm;