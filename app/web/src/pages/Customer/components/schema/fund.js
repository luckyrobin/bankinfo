export default {
  "NO_NAME_FIELD_$7": {
    "type": "object",
    "x-component": "Card",
    "x-component-props": {
      "title": "公积金贷款信息",
      "style": {}
    },
    "properties": {
      "NO_NAME_FIELD_$71": {
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
          "fund_lines": {
            "type": "number",
            "title": "公积金贷款金额（万）",
            "x-component": "NumberPicker",
            "x-component-props": {
              "formatter": value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              "parser": value => value.replace(/￥\s?|(,*)/g, ''),
            },
          },
          "fund_limit": {
            "type": "number",
            "title": "期限（年）",
            "x-component": "NumberPicker",
          },
          "fund_rate": {
            "type": "number",
            "title": "公积金贷款利率（%）",
            "x-component": "NumberPicker",
            "x-component-props": {
              formatter: value => `${value}%`,
              parser: value => value.replace('%', '')
            },
          },
          "fund_method": {
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
          "fund_month_sum": {
            "type": "number",
            "title": "月还款额",
            "x-component": "NumberPicker",
          },
        },
      },
    },
  },
};
