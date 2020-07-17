export default {
  "NO_NAME_FIELD_$5": {
    "type": "object",
    "x-component": "Card",
    "x-component-props": {
      "title": "商业贷款信息",
      "style": {}
    },
    "properties": {
      "NO_NAME_FIELD_$51": {
        "type": "object",
        "x-component": "mega-layout",
        "x-component-props": {
          "inset": true,
          "autoRow": true,
          "grid": true,
          "columns": 4,
          "full": true
        },
        "properties": {
          "customer_loans_mortgage": {
            "type": "number",
            "title": "抵押率（%）",
            "x-component": "NumberPicker",
            "x-component-props": {
              formatter: value => `${value}%`,
              parser: value => value.replace('%', '')
            },
          },
          "customer_loans_business": {
            "type": "number",
            "title": "商业贷款金额（万）",
            "x-component": "NumberPicker",
            "x-component-props": {
              "formatter": value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              "parser": value => value.replace(/￥\s?|(,*)/g, ''),
            },
          },
          "customer_loans_limit": {
            "type": "string",
            "title": "期限（年）",
            "x-component": "NumberPicker",
          },
          "customer_loans_method": {
            "type": "string",
            "title": "还款方式",
            "x-component": "Select",
            "enum": [
              {
                "label": "等额本息",
                "value": "等额本息"
              },
              {
                "label": "等额本金",
                "value": "等额本金"
              }
            ],
          },
          "loans_lrp": {
            "type": "number",
            "title": "5 年人行LPR(%)",
            "x-component": "NumberPicker",
            "x-component-props": {
              formatter: value => `${value}%`,
              parser: value => value.replace('%', '')
            },
          },
          "loans_interest_extrarate": {
            "type": "number",
            "title": "利率LPR +点",
            "x-component": "NumberPicker",
          },
          "loans_interest_rate": {
            "type": "number",
            "title": "贷款利率(%)",
            "x-component": "NumberPicker",
            "x-component-props": {
              formatter: value => `${value}%`,
              parser: value => value.replace('%', '')
            },
          },
          "loans_month_sum": {
            "type": "number",
            "title": "月还款额",
            "x-component": "NumberPicker",
          },
          "total_income": {
            "type": "number",
            "title": "借款人家庭月总收入（元）",
            "x-component": "NumberPicker",
            "x-mega-props": {
              "span": 2
            },
            "x-component-props": {
              "formatter": value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              "parser": value => value.replace(/￥\s?|(,*)/g, ''),
            },
          },
        },
      },
    },
  },
};
