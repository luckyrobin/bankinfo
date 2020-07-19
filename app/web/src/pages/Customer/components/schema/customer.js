export default {
  "NO_NAME_FIELD_$0": {
    "type": "object",
    "x-component": "Card",
    "x-component-props": {
      "title": "借款人",
      "style": {}
    },
    "properties": {
      "NO_NAME_FIELD_$01": {
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
          "customer_name": {
            "type": "string",
            "title": "姓名",
            "x-component": "Input",
            "required": true,
          },
          "customer_sex": {
            "type": "string",
            "title": "性别",
            "x-component": "Select",
            "required": true,
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
          "customer_id": {
            "type": "string",
            "title": "身份证",
            "x-component": "Input",
            "required": true
          },
          "customer_birthday": {
            "type": "string",
            "title": "生日",
            "x-component": "DatePicker",
            "x-component-props": {
              "format": "YYYY年MM月DD日",
            },
          },
          "customer_married": {
            "type": "string",
            "title": "婚姻状况",
            "x-component": "Select",
            "required": true,
            "enum": [
              {
                "label": "未婚",
                "value": "未婚"
              },
              {
                "label": "已婚",
                "value": "已婚"
              },
              {
                "label": "离异",
                "value": "离异"
              }
            ],
          },
          "customer_register_address": {
            "type": "string",
            "title": "户籍地址",
            "x-component": "Input",
          },
          "customer_phone": {
            "type": "string",
            "title": "借款人联系电话",
            "x-component": "Input",
          },
          "customer_work_unit": {
            "type": "string",
            "title": "工作单位",
            "x-component": "Input",
          },
          "customer_work_place": {
            "type": "string",
            "title": "单位地址",
            "x-component": "Input",
            "x-mega-props": {
              "span": 2
            },
          },
          "customer_work_phone": {
            "type": "string",
            "title": "单位电话",
            "x-component": "Input",
          },
          "customer_jobs": {
            "type": "string",
            "title": "职务",
            "x-component": "Input",
          },
          "customer_salary": {
            "type": "number",
            "title": "税前月收入（元）",
            "x-component": "NumberPicker",
            "x-component-props": {
              "formatter": value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              "parser": value => value.replace(/￥\s?|(,*)/g, ''),
            },
          },
          "customer_home_place": {
            "type": "string",
            "title": "家庭地址",
            "x-component": "Input",
            "x-mega-props": {
              "span": 2
            },
          },
          "customer_card": {
            "type": "string",
            "title": "还款卡号",
            "x-component": "Input",
            "x-mega-props": {
              "span": 2
            },
          },
        }
      }
    },
  },
};
