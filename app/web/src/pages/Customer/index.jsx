import React, { useState, useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PrinterOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import moment from 'moment';

import CurdForm from './components/CurdForm';

function Customer(props) {
  const { dispatch, customerList, loading } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'customer/fetch',
    });
  }, []);

  const handleAdd = () => {
    setVisible(true);
  };

  const handleEdit = () => {};

  const handleDelete = () => {};

  const handleSubmit = (values) => {
    debugger
    dispatch({
      type: 'customer/fetchCreateCustomer',
      payload: { ...values },
    });
  };

  const columns = [
    {
      title: '客户姓名',
      dataIndex: 'customer_name',
    },
    {
      title: '证件号码',
      dataIndex: 'customer_id',
    },
    {
      title: '信息入库时间',
      dataIndex: 'create_time',
      sorter: true,
      render: _ => moment().format('lll'),
    },
    {
      title: '最近修改时间',
      dataIndex: 'update_time',
      sorter: true,
      render: _ => moment().format('lll'),
    },
    {
      title: '最近操作人',
      dataIndex: 'operator',
      render: _ => _.name,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <span>
            <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
              编辑
            </Button>
            <Popconfirm
              title="确认删除?"
              onConfirm={() => {
                handleDelete(record);
              }}
            >
              <Button danger style={{ marginRight: 8 }}>
                删除
              </Button>
            </Popconfirm>
            <Button icon={<PrinterOutlined />}>打印</Button>
          </span>
        );
      },
    },
  ];
  console.log(customerList);
  return (
    <PageHeaderWrapper>
      <ProTable
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={customerList}
        toolBarRender={() => [
          <Button type="primary" onClick={handleAdd}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        scroll={{ x: 1300 }}
      />
      <CurdForm
        initialValues={{}}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      />
    </PageHeaderWrapper>
  );
}

export default connect(({ customer, loading }) => ({
  customerList: customer.customerList,
  loading: loading.effects['customer/fetch', 'customer/fetchCreateCustomer', 'customer/fetchUpdateCustomer', 'customer/fetchDestroyCustomer'],
}))(Customer);
