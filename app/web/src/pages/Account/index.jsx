import React from 'react';
import { Card, Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { SchemaForm, FormButtonGroup, Submit, setValidationLanguage } from '@formily/antd';

setValidationLanguage('zh');

const Password = Input.Password;

const schema = {
  type: "object",
  properties: {
    _id: {
      "type": "string",
      "x-component": "Input",
      "required": true,
      "display": false,
    },
    name: {
      "type": "string",
      "title": "管理员姓名：",
      "x-component": "Input",
      "required": true,
    },
    phone: {
      type: "number",
      title: "手机号码：",
      "x-component": "Input",
      "required": true,
      "x-rules": [
        {
          "whitespace": false,
          "pattern": /^1[3456789]\d{9}$/,
          "message": '请输入正确的手机号码!'
        }
      ]
    },
    password: {
      type: "password",
      title: "原始密码：",
      "x-component": "Password",
    },
    newPassword: {
      type: "password",
      title: "新密码：",
      "x-component": "Password",
    }
  }
};


function Account(props) {
  const { currentUser, dispatch, submitting } = props; 
  const handleSubmit = (values) => {
    dispatch({
      type: 'user/fetchUpdateMine',
      payload: { ...values },
    });
  }
  return (
    <PageHeaderWrapper>
      <Card>
        <div style={{ width: '50%' }}>
          <SchemaForm
            initialValues={currentUser}
            labelCol={5}
            wrapperCol={14}
            components={{ Input, Password }}
            schema={schema}
          >
            <FormButtonGroup>
              <Submit onSubmit={handleSubmit} loading={submitting}>确认修改</Submit>
            </FormButtonGroup>
          </SchemaForm>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  submitting: loading.effects['user/fetchUpdateMine'],
}))(Account);
