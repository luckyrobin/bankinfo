import React from 'react';
import { Drawer } from 'antd';
import {
  SchemaForm,
  FormButtonGroup,
  Submit,
  Reset,
  setValidationLanguage,
} from '@formily/antd';
import { FormCard, Input, Select, NumberPicker, DatePicker, FormMegaLayout } from '@formily/antd-components';

import customerSchema from './schema/customer';
import customerSpouseSchema from './schema/customer_spouse';
import guarantorSchema from './schema/guarantor';
import guarantorSpouseSchema from './schema/guarantor_spouse';
import houseSchema from './schema/house';
import loansSchema from './schema/loans';
import companySchema from './schema/company';
import fundSchema from './schema/fund';

setValidationLanguage('zh');
import { useBirthdayEffects, useMarriedEffects, useComputedUnitCost, useComputedRate, useComputedSum, useComputedFundSum, useComputedTotalSalary, useHouseEffects, useCapsEffects } from './computedHook';

const schema = {
  type: 'object',
  properties: {
    ...houseSchema,
    ...customerSchema,
    ...customerSpouseSchema,
    ...guarantorSchema,
    ...guarantorSpouseSchema,
    ...loansSchema,
    ...fundSchema,
    ...companySchema,
  },
};

const CurdForm = (props) => {
  const { onCancel, visible, onSubmit, value, loading } = props;
  return (
    <Drawer key={Math.random()} title="客户信息录入" width="80%" visible={visible} onClose={onCancel}>
      <SchemaForm
        components={{ FormCard, FormMegaLayout, Input, Select, NumberPicker, DatePicker }}
        schema={schema}
        value={value}
        effects={() => {
          useBirthdayEffects();
          useMarriedEffects();
          useComputedUnitCost();
          useComputedRate();
          useComputedSum();
          useComputedFundSum();
          useComputedTotalSalary();
          useHouseEffects();
          useCapsEffects();
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
