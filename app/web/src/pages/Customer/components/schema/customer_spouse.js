export default {
  "NO_NAME_FIELD_$1": {
    "type": "object",
    "x-component": "Card",
    "x-component-props": {
      "title": "借款人配偶",
      "style": {}
    },
    "visible": false,
    "properties": {
      "NO_NAME_FIELD_$11": {
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
          "customer_spouse_name": {
            "type": "string",
            "title": "姓名",
            "x-component": "Input",
          },
          "customer_spouse_sex": {
            "type": "string",
            "title": "性别",
            "x-component": "Select",
            "enum": [
              {
                "label": "男",
                "value": "男"
              },
              {
                "label": "女",
                "value": "女"
              }
            ],
          },
          "customer_spouse_id": {
            "type": "string",
            "title": "身份证",
            "x-component": "Input",
          },
          "customer_spouse_birthday": {
            "type": "string",
            "title": "生日",
            "x-component": "DatePicker",
            "x-component-props": {
              "format": "YYYY年MM月DD日",
            },
            "x-component-props": {
              "style": { border: '1px dashed green' },
            },
          },
          "customer_spouse_register_address": {
            "type": "string",
            "title": "户籍地址",
            "x-component": "Input",
          },
          "customer_spouse_work_unit": {
            "type": "string",
            "title": "工作单位",
            "x-component": "Input",
          },
          "customer_spouse_jobs": {
            "type": "string",
            "title": "职务",
            "x-component": "Input",
          },
          "customer_spouse_salary": {
            "type": "number",
            "title": "税前月收入（元）",
            "x-component": "NumberPicker",
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
