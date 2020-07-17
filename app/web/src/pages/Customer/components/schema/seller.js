export default {
  "NO_NAME_FIELD_$8": {
    "type": "object",
    "x-component": "Card",
    "x-component-props": {
      "title": "卖方信息",
      "style": {}
    },
    "properties": {
      "NO_NAME_FIELD_$81": {
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
          "seller_name": {
            "type": "string",
            "title": "姓名",
            "x-component": "Input",
          },
          "seller_id": {
            "type": "string",
            "title": "身份证",
            "x-component": "Input",
          },
          "seller_card": {
            "type": "string",
            "title": "收款卡号",
            "x-component": "Input",
            "x-mega-props": {
              "span": 2
            },
          },
          "seller_sharer": {
            "type": "string",
            "title": "卖方共有人姓名",
            "x-component": "Input",
          },
          "seller_sharer_id": {
            "type": "string",
            "title": "卖方共有人身份证",
            "x-component": "Input",
          },
          "seller_sharer_relation": {
            "type": "string",
            "title": "和卖方关系",
            "x-component": "Input",
          },
        },
      },
    },
  },
};
