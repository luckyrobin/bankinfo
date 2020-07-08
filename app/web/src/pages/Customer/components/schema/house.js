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
          "customer_house_other": {
            "type": "string",
            "title": "其他详细地址",
            "x-component": "Input",
            "x-mega-props": {
              "span": 2
            },
          },
        },
      },
    },
  },
};
