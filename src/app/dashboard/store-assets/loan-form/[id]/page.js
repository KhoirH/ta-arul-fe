'use client';

import { fetcherWithAuth } from "@/config/fetcher";
import { AutoComplete, Button, Card, Form, Input, Modal, Select, Tag } from "antd";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

const LoanFormPage = (props) => {
  const token = jsCookie.get('token');
  const router = useRouter();
  const [dataAsset, setDataAsset] = useState({});
  const [loading, setLoading] = useState(false);
  const [optionSearch, setOptionSearch] = useState([]);
  const [form] = Form.useForm();
  
  useEffect(() => {
    fetcherWithAuth(token).get(`/assets/${props?.params?.id}`)
      .then((res) => {
        const data = res.data.data;
        setDataAsset(data)
        form.setFieldValue('loan_status', data.avability ? 'dipinjam' : 'dikembalikan')
      })
  }, [])
  const onFinish = (values) => {
    if(values.loan_status === 'dikembalikan') {
      fetcherWithAuth(token).post(`/assets/revert`, values)
        .then((res) => {
          if(values.condition === 'rusak') {
            Modal.success({
              title: "Berhasil Dikembalikan",
              content: "Asset sudah dalam tindakan selanjutnya",
              closable:  false,
              onOk() {
                router.replace('/dashboard/store-assets')
              }
            })
          }
          if(values.condition === 'baik') {
            Modal.success({
              title: "Berhasil Dikembalikan",
              content: "Telah menambahkan ketersediaan",
              closable:  false,
              onOk() {
                router.replace('/dashboard/store-assets')
              }
            })
          }
        })
    }
    if(values.loan_status === 'dipinjam') {
      fetcherWithAuth(token).post(`/assets/loan`, values)
        .then((res) => {
          Modal.success({
            title: "Berhasil Dipinjam",
            content: "Asset telah dipinjam terhadap pic yang mengajukan..",
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
  
  let timeoutSearch = null;
  const handleOnSearch = (val) => {
    if(timeoutSearch) {
      clearTimeout(timeoutSearch);
    }
    timeoutSearch = setTimeout(() => {

      const token = jsCookie.get('token');
      const name = val;
      const no_reg = val;
      
      fetcherWithAuth(token).get(`/employee/search`, {
        params: {
          name,
          no_reg,
        }
      })
        .then((res) => {
          const newArr = (res?.data?.data ?? []).map((v) => ({
            label: v.name,
            value: `${v.name}-${v.no_reg}`,
            title: v.name,
            id: v.id,
            section: v.section,
            line: v.line,
            dapartement: v.dapartement,
          }))
          setOptionSearch(newArr)
        })
    }, 1000)
  };
  const loanStatus = Form.useWatch('loan_status', form);
  const condition = Form.useWatch('condition', form);
  const handleSelectData = (_, data) => {
    form.setFieldValue('id_employee', data.id)
    form.setFieldValue('dapartement', data.dapartement)
    form.setFieldValue('line', data.line)
    form.setFieldValue('section', data.section)
  }
  const lastUpdated = useMemo(() => {
    if (dataAsset?.created_at) {
      return dayjs(dataAsset?.created_at).format("DD MMMM YYYY")
    }
    return '-';
  }, [dataAsset?.created_at])
  return <>
    <h1 className="text-2xl font-semibold border-b-2 w-fit border-blue-600 mb-4 leading-normal">{ loanStatus === "dipinjam" ? "Peminjaman": "Pengembalian" } Asset</h1>
    <Card bordered className="!border-gray-400 !border-2 " size="small">
      <div className="flex items-baseline">
        <span className="text-lg font-medium">{dataAsset?.asset_number}. {dataAsset?.device_name}</span>
        <div className="w-1 h-1 rounded-full bg-black ml-2"/>
        <span className="text-base  ml-2">{dataAsset?.serial_number}</span>
        <div className="ml-auto flex items-center">
          {
            dataAsset?.avability ? (
              <Tag color="#16a34a" >Tersedia</Tag>
            ) : (
              <Tag color="#dc2626" >Tidak Tersedia</Tag>
            )
          }
          <div className="ml-3">
            <span className="block leading-none text-xs">Terakhir diubah</span>
            <span className="block italic text-xs">{lastUpdated}</span>
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
        id_asset:  +props?.params?.id
      }}
      >
        
      <Form.Item label="Id Asset" name="id_asset" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="Id User" name="id_employee" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="PIC" name="pic">
        <AutoComplete onSelect={handleSelectData} placeholder="cari nama / no reg" allowClear size="large" onSearch={handleOnSearch} options={optionSearch} />
      </Form.Item>
      <Form.Item label="Status Unit" name="status_unit">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Divisi" name="division">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Dapartement" name="dapartement">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Section" name="section">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <Form.Item label="Line" name="line">
        <Input placeholder="masukan disini" size="large" />
      </Form.Item>
      <div className="flex">
        <Form.Item label="Status Peminjaman"  name="loan_status" shouldUpdate className="min-w-40">
          <Select size="large" disabled placeholder="Pilih">
            <Select.Option value="dipinjam">Pinjam</Select.Option>
            <Select.Option value="dikembalikan">Pengembalian</Select.Option>
          </Select>
        </Form.Item>
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

export default LoanFormPage;