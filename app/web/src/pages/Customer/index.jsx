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
  const [curEditInfo, setCurEditInfo] = useState({});

  const reload = () => {
    dispatch({
      type: 'customer/fetch',
    });
  }

  useEffect(() => {
    reload();
  }, []);

  const handleAdd = () => {
    setVisible(true);
    setCurEditInfo({});
  };

  const handleEdit = (record) => {
    setVisible(true);
    setCurEditInfo(record);
  };

  const handleDelete = (_id) => {
    dispatch({
      type: 'customer/fetchDestroyCustomer',
      payload: { _id },
    });
  };

  const handleSubmit = async values => {
    if (Reflect.has(values, '_id')) {
      await dispatch({
        type: 'customer/fetchUpdateCustomer',
        payload: { ...values },
      });
    } else {
      await dispatch({
        type: 'customer/fetchCreateCustomer',
        payload: { ...values },
      });
    }
    setVisible(false);
  };

  // const showConfirm = () => {
  //   confirm({
  //     title: '您确定要关闭当前编辑的表单吗?',
  //     icon: <ExclamationCircleOutlined />,
  //     content: '关闭后填写的信息会丢失',
  //     onOk() { setVisible(false) },
  //   });
  // }

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
      sorter: (a, b) => Date.parse(a.create_time) - Date.parse(b.create_time),
      hideInSearch: true,
      render: _ => moment(_).format('lll'),
    },
    {
      title: '最近修改时间',
      dataIndex: 'update_time',
      sorter: (a, b) => Date.parse(a.update_time) - Date.parse(b.update_time),
      hideInSearch: true,
      render: _ => moment(_).format('lll'),
    },
    {
      title: '最近操作人',
      dataIndex: 'operator',
      hideInSearch: true,
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
                handleDelete(record._id);
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
  return (
    <PageHeaderWrapper>
      <ProTable
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={customerList}
        options={{density: true, reload, fullScreen: true, setting: true, }}
        toolBarRender={() => [
          <Button type="primary" onClick={handleAdd}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
      />
      <CurdForm
        value={curEditInfo}
        visible={visible}
        loading={loading}
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
  loading: loading.effects['customer/fetch'],
}))(Customer);
