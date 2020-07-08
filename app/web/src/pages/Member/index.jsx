import React, { useState, useEffect } from 'react';
import { Card, Input, Table, Popconfirm, Form, Button, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { connect } from 'umi';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `请输入${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function Member(props) {
  const { dispatch, loading, memberList } = props;
  const [ form ] = Form.useForm();
  const [ data, setData ] = useState(memberList);
  const [ editingKey, setEditingKey ] = useState('');
  const [ showpwKey, setShowpwKey ] = useState([]);

  useEffect(() => {
    dispatch({
      type: 'user/fetch',
    });
  }, []);

  useEffect(() => {
    setData(memberList);
  }, [memberList]);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: '33%',
      editable: true,
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      width: '33%',
      editable: true,
    },
    {
      title: '密码',
      dataIndex: 'password',
      width: '25%',
      editable: true,
      render: (_, record) => {
        const hasKey = showpwKey.includes(record._id);
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ flex: 1 }}>{hasKey ? _ : "******"}</span>
            <span style={{ fontSize: '22px', cursor: 'pointer' }} onClick={() => { handleShowpw(record._id, hasKey) }}>{hasKey ? <EyeInvisibleOutlined /> : <EyeOutlined />}</span>
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
            <span>
              <a
                onClick={() => handleSave(record)}
                style={{ marginRight: 8 }}
              >
                保存
              </a>
              <Popconfirm title="确认取消?" onConfirm={handelCancel}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <span>
              <a
                disabled={editingKey !== ''}
                onClick={() => handleEdit(record)}
                style={{ marginRight: 8 }}
              >
                编辑
              </a>
              <Popconfirm title="确认删除?" onConfirm={() => { handleDelete(record) }}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
    },
  ];

  const isEditing = record => record._id === editingKey;

  const handleShowpw = (_id, hasKey) => {
    if (hasKey) {
      setShowpwKey(c => c.filter(item => item !== _id));
    } else {
      setShowpwKey(c => c.concat(_id));
    }
  }

  const handleEdit = record => {
    form.setFieldsValue({
      name: '',
      phone: '',
      password: '',
      ...record,
    });
    setEditingKey(record._id);
  };

  const handelCancel = () => {
    setEditingKey('');
  };

  const handleSave = async record => {
    try {
      const row = await form.validateFields();
      if (typeof record._id === 'string') {
        dispatch({
          type: 'user/fetchUpdate',
          payload: { ...row, ...{ _id: record._id } },
        });
      } else {
        dispatch({
          type: 'user/fetchCreate',
          payload: { ...row },
        });
      }
      setEditingKey('');
    } catch (errInfo) {
      message.error(errInfo);
    }
  };
  
  const handleDelete = record => {
    if (!Reflect.has(record, '_id') || typeof record._id !== 'string') {
      setData(data.filter(item => item._id !== record._id))
      return;
    }
    dispatch({
      type: 'user/fetchDelete',
      payload: { _id: record._id },
    });
  }

  const handleAdd = () => {
    const newData = {
      _id: parseInt(Math.random() * 10000),
      name: '',
      phone: '',
      password: '',
    };
    setData(c => c.concat(newData));
    handleEdit(newData);
  }

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <PageHeaderWrapper>
      <Card>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          添加成员
        </Button>
        <Form form={form} component={false}>
          <Table
            rowKey="_id"
            loading={loading}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: handelCancel,
            }}
          />
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ user, loading }) => ({
  memberList: user.memberList,
  loading: loading.effects['user/fetch', 'user/fetchCreate', 'user/fetchUpdate', 'user/fetchDelete'],
}))(Member);
