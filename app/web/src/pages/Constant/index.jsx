import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SchemaForm, FormButtonGroup, Submit, createFormActions, SchemaMarkupField as Field, FormEffectHooks, FormPath } from '@formily/antd';
import { Input, ArrayTable, Select, NumberPicker } from '@formily/antd-components'
import { connect } from 'umi';

import constEnum from './enum';

const { onFieldValueChange$ } = FormEffectHooks;
const transformResult = (arr) => {
  if (!Array.isArray(arr)) throw new Error("参数错误");;
  const obj = {};
  arr.forEach(item => {
    obj[item.const_name] = item.const_value;
  });
  return obj;
}

const transformOrigin = (obj) => {
  if (typeof obj !== 'object') throw new Error("参数错误");
  const arr = [];
  Object.keys(obj).forEach(item => {
    arr.push({
      const_name: item,
      const_value: obj[item],
    })
  });
  return arr;
}

function Constant(props) {
  const { dispatch, constantList, loading = true } = props;
  const reload = () => {
    dispatch({
      type: 'constant/fetch',
    });
  }

  useEffect(() => {
    reload();
  }, []);

  const handleSubmit = (values) => {
    const result = transformResult(values.const_list);
    dispatch({
      type: 'constant/fetchUpdateConstant',
      payload: { ...result },
    });
  }

  const useSomeEffects = () => {
    const { setFieldState } = createFormActions();
    onFieldValueChange$('const_list.*.const_name').subscribe(({ name, value }) => {
      setFieldState(
        FormPath.transform(name, /\d/, $1 => {
          return `const_list.${$1}.const_value`
        }),
        state => {
          const findIt = constEnum.find(item => item.value === value);
          if (!findIt) return;
          state.props['x-component'] = (findIt.type === 'number') ? "NumberPicker" : "Input"
        }
      )
    })
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Spin spinning={loading} >
          <SchemaForm
            components={{ ArrayTable, Input, Select, NumberPicker }}
            value={{ const_list: transformOrigin(constantList) }}
            effects={() => {
              useSomeEffects();
            }}
          >
            <Field
              name="const_list"
              type="array"
              x-component="ArrayTable"
              x-component-props={{
                operationsWidth: 100,
                operations: {
                  title: '操作'
                },
                draggable: true
              }}
            >
              <Field type="object">
                <Field
                  title="常量名称"
                  name="const_name"
                  x-component="Select"
                  enum={constEnum}
                  required
                />
                <Field
                  name="const_value"
                  x-component="Input"
                  title="常量值"
                  x-component-props={{ style: { width: "100%" }}}
                  required
                />
              </Field>
            </Field>
            <FormButtonGroup>
              <Submit onSubmit={handleSubmit}>保存</Submit>
            </FormButtonGroup>
          </SchemaForm>
        </Spin>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ constant, loading }) => ({
  constantList: constant.constantList,
  loading: loading.effects['constant/fetch'],
}))(Constant);
