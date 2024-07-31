'use client';

import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import jsCookie from 'js-cookie';
import { fetcherWithAuth } from '@/config/fetcher';

const HistoryTransaction = () => {
  const [dataTable, setDataTable] = useState([]);
 
  useEffect(() => {
    const token = jsCookie.get('token');
    fetcherWithAuth(token).get('/history').then((res) => {
      setDataTable(res.data?.data ?? [])
    })
  }, [])
  return <>
    <div>
      <Button
        type="primary"
      >
        Export XLS
      </Button>
    </div>
    <Table dataSource={dataTable} >
      <Column
        sortDirections={['ascend', 'descend']}
        sorter={(a, b) => a.device_name.length - b.device_name.length}
        title="Nama Device"
        dataIndex="device_name"
        key="device_name"
      /> 
      <Column
        title="Nomer Asset"
        dataIndex="asset_number"
        key="asset_number"
      /> 
      <Column
        title="Serial Number"
        dataIndex="serial_number"
        key="serial_number"
      />  
      
      <Column
        title="Tahun Asset"
        dataIndex="asset_year"
        key="asset_year"
        sortDirections={['ascend', 'descend']}
        sorter={(a, b) => a.asset_year.length - b.asset_year.length}
      /> 
      <Column
        title="Status Asset"
        dataIndex="reason"
        key="reason"
      />
       
      <Column
        title="Status Unit"
        dataIndex="status_unit"
        key="status_unit"
      />

      <Column
        title="Divisi"
        dataIndex="division"
        key="division"
      />
      
      <Column
        title="Name PIC"
        dataIndex="pic_name"
        key="pic_name"
      />

      <Column
        title="Noreg PIC"
        dataIndex="no_reg"
        key="no_reg"
      />

      <Column
        title="Departement"
        dataIndex="dapartement"
        key="dapartement"
      />

      <Column
        title="Line"
        dataIndex="line"
        key="line"
      />

      <Column
        title="Condition"
        dataIndex="condition"
        key="condition"
        render={(condition) => {
          if(condition) {
            return "Baik"
          }
          return "Rusak"
        }}
      />

    </Table>
  </>;
}

export default HistoryTransaction;