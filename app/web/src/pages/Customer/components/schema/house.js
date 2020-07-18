export default {
  "NO_NAME_FIELD_$4": {
    "type": "object",
    "x-component": "Card",
    "x-component-props": {
      "title": "房产信息",
      "style": {}
    },
    "properties": {
      "NO_NAME_FIELD_$41": {
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
          "customer_house_1": {
            "type": "string",
            "title": "街道（村镇）",
            "x-component": "Input",
          },
          "customer_house_2": {
            "type": "string",
            "title": "路名",
            "x-component": "Input",
          },
          "customer_house_5": {
            "type": "string",
            "title": "物业名称",
            "x-component": "Input",
          },
          "customer_house_3": {
            "type": "string",
            "title": "门牌号（弄号）",
            "x-component": "Input",
          },
          "customer_house_4": {
            "type": "string",
            "title": "楼室楼号",
            "x-component": "Input",
          },
          "customer_house": {
            "type": "string",
            "title": "房产地址",
            "x-component": "Input",
            "x-mega-props": {
              "span": 2
            },
          },
          "customer_loans_all": {
            "type": "number",
            "title": "购买总金额（万）",
            "x-component": "NumberPicker",
            "x-component-props": {
              "formatter": value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              "parser": value => value.replace(/￥\s?|(,*)/g, ''),
            },
          },
          "customer_loans_all_caps": {
            "type": "string",
            "title": "购买总金额（大写）",
            "x-component": "Input",
          },
          "customer_loans_first": {
            "type": "number",
            "title": "首付款金额（万）",
            "x-component": "NumberPicker",
            "x-component-props": {
              "formatter": value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              "parser": value => value.replace(/￥\s?|(,*)/g, ''),
            },
          },
          "customer_loans_first_caps": {
            "type": "string",
            "title": "首付款金额（大写）",
            "x-component": "Input",
          },
          "customer_loans": {
            "type": "number",
            "title": "贷款总金额（万）",
            "x-component": "NumberPicker",
            "x-component-props": {
              "formatter": value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              "parser": value => value.replace(/￥\s?|(,*)/g, ''),
            },
          },
          "customer_house_area": {
            "type": "number",
            "title": "建筑面积（m²）",
            "x-component": "NumberPicker",
          },
          "customer_house_area_share": {
            "type": "number",
            "title": "土地分摊面积（m²）",
            "x-component": "NumberPicker",
          },
          "customer_loans_unit": {
            "type": "number",
            "title": "单价（元/m²）",
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
