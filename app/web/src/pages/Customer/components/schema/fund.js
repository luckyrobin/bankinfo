export default {
  "NO_NAME_FIELD_$7": {
    "type": "object",
    "x-component": "Card",
    "x-component-props": {
      "title": "公积金贷款额度",
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
            "title": "公积金贷款额度",
            "x-component": "NumberPicker",
          },
          "fund_limit": {
            "type": "number",
            "title": "期限（年）",
            "x-component": "NumberPicker",
          },
          "fund_month_sum": {
            "type": "string",
            "title": "还款方式",
            "x-component": "Select",
            "enum": [
              {
                "label": "等额本息",
                "value": "1"
              },
              {
                "label": "等额本金",
                "value": "2"
              }
            ],
          },
          "fund_month": {
            "type": "number",
            "title": "月还款额",
            "x-component": "NumberPicker",
          },
        },
      },
    },
  },
};
