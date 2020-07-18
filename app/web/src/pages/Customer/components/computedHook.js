import nzhcn from 'nzh/cn';
import { FormEffectHooks, createFormActions } from '@formily/antd';
import { getBirthday, toFixed } from '@/utils/utils';

const { onFieldValueChange$ } = FormEffectHooks;

export const useBirthdayEffects = () => {
  const { setFieldState } = createFormActions();
  onFieldValueChange$('customer_id').subscribe(({ value }) => {
    setFieldState('customer_birthday', (state) => {
      state.value = getBirthday(value);
    });
  });

  onFieldValueChange$('customer_spouse_id').subscribe(({ value }) => {
    setFieldState('customer_spouse_birthday', (state) => {
      state.value = getBirthday(value);
    });
  });

  onFieldValueChange$('guarantor_id').subscribe(({ value }) => {
    setFieldState('guarantor_birthday', (state) => {
      state.value = getBirthday(value);
    });
  });

  onFieldValueChange$('guarantor_spouse_id').subscribe(({ value }) => {
    setFieldState('guarantor_spouse_birthday', (state) => {
      state.value = getBirthday(value);
    });
  });
};

export const useMarriedEffects = () => {
  const { setFieldState } = createFormActions();
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
    return toFixed((total * 10000 / area), 2);
  };

  onFieldValueChange$('customer_loans_all').subscribe(({ value }) => {
    if (typeof value !== 'number') return;
    setFieldState('customer_loans_unit', state => {
      const depend = getFieldState('customer_house_area', state => state.value);
       if (typeof depend !== 'number') return;
      state.value = formula(value, depend);
    })
  });
  onFieldValueChange$('customer_house_area').subscribe(({ value }) => {
    if (typeof value !== 'number') return;
    setFieldState('customer_loans_unit', state => {
      const depend = getFieldState('customer_loans_all', state => state.value);
      if (typeof depend !== 'number') return;
      state.value = formula(depend, value);
    })
  });
};

export const useComputedRate = () => {
  const { setFieldState, getFieldState } = createFormActions();
  const formula = (extrarate, loans_lrp) => {
    return toFixed(((extrarate / 100) + loans_lrp), 3);
  };

  onFieldValueChange$('loans_interest_extrarate').subscribe(({ value }) => {
    if (typeof value !== 'number') return;
    setFieldState('loans_interest_rate', state => {
      const depend = getFieldState('loans_lrp', state => state.value);
      if (typeof depend !== 'number') return;
      state.value = formula(value, depend);
    })
  });
  onFieldValueChange$('loans_lrp').subscribe(({ value }) => {
    if (typeof value !== 'number') return;
    setFieldState('loans_interest_rate', state => {
      const depend = getFieldState('loans_interest_extrarate', state => state.value);
      if (typeof depend !== 'number') return;
      state.value = formula(depend, value);
    })
  });
};

export const useComputedSum = () => {
  const { setFieldState, getFieldState } = createFormActions();
  const formula = (type, depend1, depend2, depend3) => {
    const loans_business = depend1 * 10000;
    const loans_rate = depend3 / 100;
    const loans_limit = depend2;
    if (type === '等额本息') {
      const result = loans_business * ( (loans_rate / 12 * (Math.pow((1 + loans_rate / 12), loans_limit * 12))) / ((Math.pow((1 + loans_rate / 12), loans_limit * 12)) - 1) );
      return toFixed(result, 2);
    }
    if (type === '等额本金') {
      const result =  (loans_business / loans_limit / 12) + (loans_business * loans_rate / 12);
      return toFixed(result, 2);
    }
  };

  onFieldValueChange$('customer_loans_method').subscribe(({ value }) => {
    if (!value) return;
    setFieldState('loans_month_sum', state => {
      const depend1 = getFieldState('customer_loans_business', state => state.value);
      const depend2 = getFieldState('customer_loans_limit', state => state.value);
      const depend3 = getFieldState('loans_interest_rate', state => state.value);
      if (typeof depend1 !== 'number' ||  typeof depend2 !== 'number' || typeof depend3 !== 'number') return;
      state.value = formula(value, depend1, depend2, depend3);
    })
  });
  
  onFieldValueChange$('customer_loans_business').subscribe(({ value }) => {
    if (typeof value !== 'number') return;
    setFieldState('loans_month_sum', state => {
      const depend1 = getFieldState('customer_loans_method', state => state.value);
      const depend2 = getFieldState('customer_loans_limit', state => state.value);
      const depend3 = getFieldState('loans_interest_rate', state => state.value);
      if (!depend1 ||  typeof depend2 !== 'number' || typeof depend3 !== 'number') return;
      state.value = formula(depend1, value, depend2, depend3);
    })
  });

  onFieldValueChange$('customer_loans_limit').subscribe(({ value }) => {
    if (typeof value !== 'number') return;
    setFieldState('loans_month_sum', state => {
      const depend1 = getFieldState('customer_loans_method', state => state.value);
      const depend2 = getFieldState('customer_loans_business', state => state.value);
      const depend3 = getFieldState('loans_interest_rate', state => state.value);
      if (!depend1 ||  typeof depend2 !== 'number' || typeof depend3 !== 'number') return;
      state.value = formula(depend1, depend2, value, depend3);
    })
  });

  onFieldValueChange$('loans_interest_rate').subscribe(({ value }) => {
    if (typeof value !== 'number') return;
    setFieldState('loans_month_sum', state => {
      const depend1 = getFieldState('customer_loans_method', state => state.value);
      const depend2 = getFieldState('customer_loans_business', state => state.value);
      const depend3 = getFieldState('customer_loans_limit', state => state.value);
      if (!depend1 ||  typeof depend2 !== 'number' || typeof depend3 !== 'number') return;
      state.value = formula(depend1, depend2, depend3, value);
    })
  });
};

export const useComputedFundSum = () => {
  const { setFieldState, getFieldState } = createFormActions();
  const formula = (type, depend1, depend2, depend3) => {
    const loans_business = depend1 * 10000;
    const loans_rate = depend3 / 100;
    const loans_limit = depend2;
    if (type === '等额本息') {
      const result = loans_business * ( (loans_rate / 12 * (Math.pow((1 + loans_rate / 12), loans_limit * 12))) / ((Math.pow((1 + loans_rate / 12), loans_limit * 12)) - 1) );
      return toFixed(result, 2);
    }
    if (type === '等额本金') {
      const result =  (loans_business / loans_limit / 12) + (loans_business * loans_rate / 12);
      return toFixed(result, 2);
    }
  };

  onFieldValueChange$('fund_method').subscribe(({ value }) => {
    if (!value) return;
    setFieldState('fund_month_sum', state => {
      const depend1 = getFieldState('fund_lines', state => state.value);
      const depend2 = getFieldState('fund_limit', state => state.value);
      const depend3 = getFieldState('fund_rate', state => state.value);
      if (typeof depend1 !== 'number' ||  typeof depend2 !== 'number' || typeof depend3 !== 'number') return;
      state.value = formula(value, depend1, depend2, depend3);
    })
  });
  
  onFieldValueChange$('fund_lines').subscribe(({ value }) => {
    if (typeof value !== 'number') return;
    setFieldState('fund_month_sum', state => {
      const depend1 = getFieldState('fund_method', state => state.value);
      const depend2 = getFieldState('fund_limit', state => state.value);
      const depend3 = getFieldState('fund_rate', state => state.value);
      if (!depend1 ||  typeof depend2 !== 'number' || typeof depend3 !== 'number') return;
      state.value = formula(depend1, value, depend2, depend3);
    })
  });

  onFieldValueChange$('fund_limit').subscribe(({ value }) => {
    if (typeof value !== 'number') return;
    setFieldState('fund_month_sum', state => {
      const depend1 = getFieldState('fund_method', state => state.value);
      const depend2 = getFieldState('fund_lines', state => state.value);
      const depend3 = getFieldState('fund_rate', state => state.value);
      if (!depend1 ||  typeof depend2 !== 'number' || typeof depend3 !== 'number') return;
      state.value = formula(depend1, depend2, value, depend3);
    })
  });

  onFieldValueChange$('fund_rate').subscribe(({ value }) => {
    if (typeof value !== 'number') return;
    setFieldState('fund_month_sum', state => {
      const depend1 = getFieldState('fund_method', state => state.value);
      const depend2 = getFieldState('fund_lines', state => state.value);
      const depend3 = getFieldState('fund_limit', state => state.value);
      if (!depend1 ||  typeof depend2 !== 'number' || typeof depend3 !== 'number') return;
      state.value = formula(depend1, depend2, depend3, value);
    })
  });
};

export const useComputedTotalSalary = () => {
  const { setFieldState, getFieldState } = createFormActions();
  const formula = (depend1 = 0, depend2 = 0, depend3 = 0, depend4 = 0) => {
    return (
      (typeof depend1 === 'number' ? depend1 : 0) 
    + (typeof depend2 === 'number' ? depend2 : 0)
    + (typeof depend3 === 'number' ? depend3 : 0)
    + (typeof depend4 === 'number' ? depend4 : 0)
    );
  };

  onFieldValueChange$('customer_salary').subscribe(({ value }) => {
    setFieldState('total_income', state => {
      const depend1 = getFieldState('customer_spouse_salary', state => state.value);
      const depend2 = getFieldState('guarantor_salary', state => state.value);
      const depend3 = getFieldState('guarantor_spouse_salary', state => state.value);
      state.value = formula(value, depend1, depend2, depend3);
    })
  });

  onFieldValueChange$('customer_spouse_salary').subscribe(({ value }) => {
    setFieldState('total_income', state => {
      const depend1 = getFieldState('customer_salary', state => state.value);
      const depend2 = getFieldState('guarantor_salary', state => state.value);
      const depend3 = getFieldState('guarantor_spouse_salary', state => state.value);
      state.value = formula(value, depend1, depend2, depend3);
    })
  });

  onFieldValueChange$('guarantor_salary').subscribe(({ value }) => {
    setFieldState('total_income', state => {
      const depend1 = getFieldState('customer_spouse_salary', state => state.value);
      const depend2 = getFieldState('customer_salary', state => state.value);
      const depend3 = getFieldState('guarantor_spouse_salary', state => state.value);
      state.value = formula(value, depend1, depend2, depend3);
    })
  });

  onFieldValueChange$('guarantor_spouse_salary').subscribe(({ value }) => {
    setFieldState('total_income', state => {
      const depend1 = getFieldState('customer_spouse_salary', state => state.value);
      const depend2 = getFieldState('customer_salary', state => state.value);
      const depend3 = getFieldState('guarantor_salary', state => state.value);
      state.value = formula(value, depend1, depend2, depend3);
    })
  });
};

export const useHouseEffects = () => {
  const { setFieldState, getFieldState } = createFormActions();
  const formula = (depend1 = '', depend2 = '', depend3 = '', depend4 = '') => {
    return depend1 + depend2 + depend3 + depend4;
  };
  onFieldValueChange$('customer_house_1').subscribe(({ value }) => {
    setFieldState('customer_house', (state) => {
      const depend2 = getFieldState('customer_house_2', state => state.value);
      const depend3 = getFieldState('customer_house_3', state => state.value);
      const depend4 = getFieldState('customer_house_4', state => state.value);
      state.value = formula(value, depend2, depend3, depend4);
    });
  });

  onFieldValueChange$('customer_house_2').subscribe(({ value }) => {
    setFieldState('customer_house', (state) => {
      const depend1 = getFieldState('customer_house_1', state => state.value);
      const depend3 = getFieldState('customer_house_3', state => state.value);
      const depend4 = getFieldState('customer_house_4', state => state.value);
      state.value = formula(depend1, value, depend3, depend4);
    });
  });

  onFieldValueChange$('customer_house_3').subscribe(({ value }) => {
    setFieldState('customer_house', (state) => {
      const depend1 = getFieldState('customer_house_1', state => state.value);
      const depend2 = getFieldState('customer_house_2', state => state.value);
      const depend4 = getFieldState('customer_house_4', state => state.value);
      state.value = formula(depend1, depend2, value, depend4);
    });
  });

  onFieldValueChange$('customer_house_4').subscribe(({ value }) => {
    setFieldState('customer_house', (state) => {
      const depend1 = getFieldState('customer_house_1', state => state.value);
      const depend2 = getFieldState('customer_house_2', state => state.value);
      const depend3 = getFieldState('customer_house_3', state => state.value);
      state.value = formula(depend1, depend2, depend3, value);
    });
  });
};


export const useCapsEffects = () => {
  const { setFieldState } = createFormActions();
  onFieldValueChange$('customer_loans_all').subscribe(({ value }) => {
    setFieldState('customer_loans_all_caps', (state) => {
      state.value = nzhcn.toMoney(value * 10000, { outSymbol: false });
    });
  });
  onFieldValueChange$('customer_loans_first').subscribe(({ value }) => {
    setFieldState('customer_loans_first_caps', (state) => {
      state.value = nzhcn.toMoney(value * 10000, { outSymbol: false });
    });
  });

};

export const useMonthTotalEffects = () => {
  const { setFieldState, getFieldState } = createFormActions();
  const formula = (depend1 = 0, depend2 = 0) => {
    return (
      (typeof depend1 === 'number' ? depend1 : 0) + (typeof depend2 === 'number' ? depend2 : 0)
    );
  };
  onFieldValueChange$('fund_month_sum').subscribe(({ value }) => {
    setFieldState('fund_month_loan_sum', (state) => {
      const depend = getFieldState('loans_month_sum', state => state.value);
      state.value = formula(depend, value);
    });
  });

  onFieldValueChange$('loans_month_sum').subscribe(({ value }) => {
    setFieldState('fund_month_loan_sum', (state) => {
      const depend = getFieldState('fund_month_sum', state => state.value);
      state.value = formula(value, depend);
    });
  });
};

export const useLoanTotalEffects = () => {
  const { setFieldState, getFieldState } = createFormActions();
  const formula = (depend1 = 0, depend2 = 0) => {
    return (
      (typeof depend1 === 'number' ? depend1 : 0) - (typeof depend2 === 'number' ? depend2 : 0)
    );
  };
  onFieldValueChange$('customer_loans_all').subscribe(({ value }) => {
    setFieldState('customer_loans', (state) => {
      const depend = getFieldState('customer_loans_first', state => state.value);
      state.value = formula(value, depend);
    });
  });

  onFieldValueChange$('customer_loans_first').subscribe(({ value }) => {
    setFieldState('customer_loans', (state) => {
      const depend = getFieldState('customer_loans_all', state => state.value);
      state.value = formula(depend, value);
    });
  });

  onFieldValueChange$('customer_loans').subscribe(({ value }) => {
    setFieldState('customer_loans_business', (state) => {
      state.value = value;
    });
  });
};