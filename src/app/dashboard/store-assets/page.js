'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined, ImportOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input, Modal, Select, Space, Table, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';
import Column from 'antd/es/table/Column';
import { fetcherWithAuth } from '@/config/fetcher';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const HistoryTransaction = () => {
  const token = jsCookie.get('token');
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dataTable, setDataTable] = useState([]);
  const [dataSummaryReason, setDataSummaryReason] = useState({
    diservice: 0,
    diretire: 0,
    dipinjam: 0,
    tersedia: 0,
  });
  const [searchedColumn, setSearchedColumn] = useState('');
  const [formIncident] = Form.useForm();
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    fetcherWithAuth(token).get('/assets').then((res) => {
      setDataTable(res.data?.data ?? [])
    })
    fetcherWithAuth(token).get('/assets/count-by-reason').then((res) => {
      setDataSummaryReason(res.data.data)
    })
  }, [])
  const handleFinish = (value) => {
    fetcherWithAuth(token).post('/assets/reason-changes', value).then((res) => {
      Modal.success({
        title: "Berhasil Diubah",
        content: "Asset telah diubah",
        closable:  false,
        onOk() {
          location.reload();
        }
      })
    })
  }
  return <>
    <div>
    <div className='mb-4 flex'>
      <div className="bg-green-100 py-2 px-4 border rounded-md border-green-500">
        <span className="font-medium">Tersedia :</span>
        <span>{dataSummaryReason?.tersedia ?? 0}</span>
      </div>
      <div className="bg-yellow-100 py-2 px-4 border rounded-md border-yellow-500 ml-2">
        <span className="font-medium">Diservice :</span>
        <span>{dataSummaryReason?.diservice ?? 0}</span>
      </div>
      <div className="bg-red-100 py-2 px-4 border rounded-md border-red-500 ml-2">
        <span className="font-medium">Dipinjam :</span>
        <span>{dataSummaryReason?.dipinjam ?? 0}</span>
      </div>
      <div className="bg-orange-100 py-2 px-4 border rounded-md border-orange-500 ml-2">
        <span className="font-medium">Diretire :</span>
        <span>{dataSummaryReason?.diretire ?? 0}</span>
      </div>
    </div>
    <Button
      onClick={() => {
        router.push('store-assets/create')
      }}
      type="primary"
      icon={<PlusOutlined />}
    >
      Tambah Asset
    </Button>
    <Modal
      open={showModal}
      title="Change Status"
      footer={[]}
    >
      <Form
        layout="vertical" 
        autoComplete="off"
        className='mt-2'
        form={formIncident}
        onFinish={handleFinish}
      >
        <Form.Item label="Id Asset" name="id_asset" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="Kondisi" name="condition">
          <Select placeholder="Pilih">
            <Select.Option value="baik">Baik</Select.Option>
            <Select.Option value="rusak">Rusak</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tindakan" name="reason">
          <Select placeholder="Pilih">
            <Select.Option value="diservice">Service</Select.Option>
            <Select.Option value="diretire">Retire</Select.Option>
            <Select.Option value="on hand">On Hand</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary"  htmlType="submit">Simpan Asset</Button>
        </Form.Item>
      </Form>
    </Modal>
    </div>
    <Table dataSource={dataTable} >
      <Column
        sortDirections={['ascend', 'descend']}
        sorter={(a, b) => a.device_name.length - b.device_name.length}
        title="Nama Device"
        dataIndex="device_name"
        key="device_name"
        {...getColumnSearchProps('device_name')}
      /> 
      <Column
        title="Nomer Asset"
        dataIndex="asset_number"
        key="asset_number"
        {...getColumnSearchProps('asset_number')}
      /> 
      <Column
        title="Serial Number"
        dataIndex="serial_number"
        key="serial_number"
        {...getColumnSearchProps('serial_number')}
      />  
      <Column
        title="Tahun Asset"
        dataIndex="asset_year"
        key="asset_year"
        sortDirections={['ascend', 'descend']}
        sorter={(a, b) => a.asset_year.length - b.asset_year.length}
      /> 
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: '#4caf50',
                    colorPrimaryHover: '#66bb6a',
                    colorPrimaryActive: '#43a047',
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Tooltip placement="top" title="Edit">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    router.push(`/dashboard/store-assets/update/${record.id}`)
                  }}
                />
              </Tooltip>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: '#d500f9',
                    colorPrimaryHover: '#dd33fa',
                    colorPrimaryActive: '#9500ae',
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Tooltip placement="top" title={record.avability ? 'Pinjaman' : 'Pengembalian'}>
                <Button
                  type="primary"
                  icon={record.avability ? <ExportOutlined /> : <ImportOutlined/>}
                  onClick={() => {
                    if(!(record.reason === 'diretire' || record.reason === 'diservice')) {
                      router.push(`/dashboard/store-assets/loan-form/${record.id}`)
                    } else {
                      formIncident.setFieldValue('condition', 'rusak');
                      formIncident.setFieldValue('reason', record.reason);
                      formIncident.setFieldValue('id_asset', record.id);
                      setShowModal(true)
                    }
                  }}
                />
              </Tooltip>
            </ConfigProvider>
            <Tooltip placement="top" title="Hapus">
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                danger
              />
            </Tooltip>
          </Space>
        )}
      />
    </Table>
  </>;
}

export default HistoryTransaction;