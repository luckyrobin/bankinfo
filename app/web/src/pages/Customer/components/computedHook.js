import { FormEffectHooks, createFormActions } from '@formily/antd';

const { onFieldValueChange$ } = FormEffectHooks;

export const useMarriedEffects = () => {
  const { setFieldState, getFieldState } = createFormActions();
  onFieldValueChange$('customer_married').subscribe(({ value }) => {
    setFieldState('*(NO_NAME_FIELD_$1)', (state) => {
      state.visible = value === '已婚';
    });
  });
  onFieldValueChange$('guarantor_married').subscribe(({ value }) => {
    setFieldState('*(NO_NAME_FIELD_$3)', (state) => {
      state.visible = value === '已婚';
    });
  });
};

export const useComputedUnitCost = () => {
  const { setFieldState, getFieldState } = createFormActions();
  const formula = (total, area) => {
    if (typeof total !== 'number' ||  typeof area !== 'number') return;
    return (total / area).toFixed(2);
  };

  onFieldValueChange$('customer_loans_all').subscribe(({ value }) => {
    if (!value) return;
    setFieldState('customer_loans_unit', state => {
      const depend = getFieldState('customer_house_area', state => state.value);
      if (!depend) return;
      state.value = formula(value, depend);
    })
  });
  onFieldValueChange$('customer_house_area').subscribe(({ value }) => {
    if (!value) return;
    setFieldState('customer_loans_unit', state => {
      const depend = getFieldState('customer_loans_all', state => state.value);
      if (!depend) return;
      state.value = formula(depend, value);
    })
  });
};

export const useComputedRate = () => {
  const { setFieldState, getFieldState } = createFormActions();
  const formula = (extrarate, loans_lrp) => {
    if (typeof extrarate !== 'number' ||  typeof loans_lrp !== 'number') return;
    return (extrarate / 100) + loans_lrp;
  };

  onFieldValueChange$('loans_interest_extrarate').subscribe(({ value }) => {
    if (!value) return;
    setFieldState('loans_interest_rate', state => {
      const depend = getFieldState('loans_lrp', state => state.value);
      if (!depend) return;
      state.value = formula(value, depend);
    })
  });
  onFieldValueChange$('loans_lrp').subscribe(({ value }) => {
    if (!value) return;
    setFieldState('loans_interest_rate', state => {
      const depend = getFieldState('loans_interest_extrarate', state => state.value);
      if (!depend) return;
      state.value = formula(depend, value);
    })
  });
};