import React from 'react';
import { Drawer } from 'antd';
import {
  SchemaForm,
  FormButtonGroup,
  Submit,
  Reset,
  setValidationLanguage,
  FormEffectHooks,
  createFormActions,
} from '@formily/antd';
import { FormCard, Input, Select, NumberPicker, FormMegaLayout } from '@formily/antd-components';
import customerSchema from './schema/customer';
import customerSpouseSchema from './schema/customer_spouse';
import guarantorSchema from './schema/guarantor';
import guarantorSpouseSchema from './schema/guarantor_spouse';
import houseSchema from './schema/house';
import loansSchema from './schema/loans';
import companySchema from './schema/company';
import fundSchema from './schema/fund';

setValidationLanguage('zh');
const { onFieldValueChange$ } = FormEffectHooks;

const schema = {
  type: 'object',
  properties: {
    ...customerSchema,
    ...customerSpouseSchema,
    ...guarantorSchema,
    ...guarantorSpouseSchema,
    ...houseSchema,
    ...loansSchema,
    ...fundSchema,
    ...companySchema,
  },
};

const CurdForm = (props) => {
  const { onCancel, visible, onSubmit, value, loading } = props;
  const useMarriedEffects = () => {
    const { setFieldState } = createFormActions();
    onFieldValueChange$('customer_married').subscribe(({ value }) => {
      setFieldState('*(NO_NAME_FIELD_$1)', (state) => {
        state.visible = value === '2';
      });
    });
    onFieldValueChange$('guarantor_married').subscribe(({ value }) => {
      setFieldState('*(NO_NAME_FIELD_$3)', (state) => {
        state.visible = value === '2';
      });
    });
  };
  return (
    <Drawer key={Math.random()} title="客户信息录入" width="80%" visible={visible} onClose={onCancel}>
      <SchemaForm
        components={{ FormCard, FormMegaLayout, Input, Select, NumberPicker }}
        schema={schema}
        value={value}
        effects={() => {
          useMarriedEffects();
        }}
      >
        <FormButtonGroup>
          <Submit loading={loading} onSubmit={onSubmit} style={{ marginRight: 8 }} size="large">
            保存
          </Submit>
          <Reset size="large" />
        </FormButtonGroup>
      </SchemaForm>
    </Drawer>
  );
};

export default CurdForm;
