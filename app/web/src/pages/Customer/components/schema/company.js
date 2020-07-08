export default {
  "NO_NAME_FIELD_$6": {
    "type": "object",
    "x-component": "Card",
    "x-component-props": {
      "title": "担保公司",
      "style": {}
    },
    "properties": {
      "NO_NAME_FIELD_$61": {
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
          "company_name": {
            "type": "string",
            "title": "担保公司名称",
            "x-component": "Input",
          },
          "company_code": {
            "type": "string",
            "title": "统一社会信用代码",
            "x-component": "Input",
            "x-mega-props": {
              "span": 2
            },
          },
          "company_area": {
            "type": "string",
            "title": "区域",
            "x-component": "Input",
          },
        },
      },
    },
  },
};
