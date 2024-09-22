'use client';

import { fetcherWithAuth } from "@/config/fetcher";
import { Button, ConfigProvider, Modal, Space, Table, Tooltip } from "antd";
import Column from "antd/es/table/Column";
import jsCookie from "js-cookie";
import { useEffect, useState, useCallback } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
const EmployeeCreate = () => {
  const [dataTable, setDataTable] = useState([]);
  const token = jsCookie.get('token');
  const router = useRouter();
  useEffect(() => {
    fetcherWithAuth(token).get('/employee').then((res) => {
      setDataTable(res.data?.data ?? [])
    })
  }, []);
  const handleDelete = useCallback((id) => () => {
    Modal.confirm({
      title: "Apakah anda ingin menghapus data ini?",
      content: "Data yang ini akan dihapus secara permanen dan tidak bisa dimunculkan kembali",
      onOk() {
        fetcherWithAuth(token).post(`/employee/delete/${id}`).then((res) => {
          window.location.reload();
        })
      },
    })
  }, [])
  return (
    <>
      <Button
        onClick={() => {
          router.push('employee/create')
        }}
        type="primary"
        icon={<PlusOutlined />}
      >
        Tambah Karyawan
      </Button>
      <Table dataSource={dataTable} >
        <Column
          sortDirections={['ascend', 'descend']}
          title="No Reg"
          dataIndex="no_reg"
          key="no_reg"
          sorter={(a, b) => a.no_reg.length - b.no_reg.length}
        /> 
        <Column
          title="Nama"
          dataIndex="name"
          key="name"
          sorter={(a, b) => a.name.length - b.name.length}
        /> 
        <Column
          title="Jabatan"
          dataIndex="function"
          key="function"
        />  
        <Column
          title="Section"
          dataIndex="section"
          key="section"
        />  
        <Column
          title="Line"
          dataIndex="line"
          key="line"
        />  
        <Column
          title="Dapartement"
          dataIndex="dapartement"
          key="dapartement"
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
                      router.push(`/dashboard/employee/update/${record.id}`)
                    }}
                  />
                </Tooltip>
              </ConfigProvider>
              <Tooltip placement="top" title="Hapus">
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={handleDelete(record.id)}
                />
              </Tooltip>
            </Space>
          )}
        />
      </Table>
    </>
  )
}

export default EmployeeCreate;