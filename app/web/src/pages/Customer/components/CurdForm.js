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
import './CurdForm.less';

import customerSchema from './schema/customer';
import customerSpouseSchema from './schema/customer_spouse';
import guarantorSchema from './schema/guarantor';
import guarantorSpouseSchema from './schema/guarantor_spouse';
import houseSchema from './schema/house';
import loansSchema from './schema/loans';
import companySchema from './schema/company';
import fundSchema from './schema/fund';
import sellerSchema from './schema/seller';
import reservedSchema from './schema/reserved';

setValidationLanguage('zh');
import {
  useBirthdayEffects,
  useMarriedEffects,
  useComputedUnitCost,
  useComputedRate,
  useComputedSum,
  useComputedFundSum,
  useComputedTotalSalary,
  useHouseEffects,
  useCapsEffects,
  useMonthTotalEffects,
  useLoanTotalEffects,
} from './computedHook';

const schema = {
  type: 'object',
  properties: {
    ...houseSchema,
    ...sellerSchema,
    ...customerSchema,
    ...customerSpouseSchema,
    ...guarantorSchema,
    ...guarantorSpouseSchema,
    ...loansSchema,
    ...fundSchema,
    ...companySchema,
    ...reservedSchema,
  },
};

const CurdForm = (props) => {
  const { onCancel, visible, onSubmit, value, loading } = props;
  return (
    <Drawer key={Math.random()} title="客户信息录入" width="80%" visible={visible} onClose={onCancel}>
      <SchemaForm
        className="customer_form"
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
          useMonthTotalEffects();
          useLoanTotalEffects();
        }}
      >
        <FormButtonGroup>
          <Submit loading={loading} onSubmit={onSubmit} style={{ marginRight: 8, padding: '0 20px' }} size="large">
            保存
          </Submit>
          <Reset size="large" style={{ padding: '0 20px' }} />
        </FormButtonGroup>
      </SchemaForm>
    </Drawer>
  );
};

export default CurdForm;
