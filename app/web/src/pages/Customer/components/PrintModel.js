import React, { useState } from 'react';
import { Modal, Checkbox } from 'antd';

const PrintModel = props => {
  const { modalVisible, onCancel, onOk, value, templateList } = props;
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  
  const plainOptions = templateList.map(item => item.url);

  const handleCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const handleChange = (checkedValues) => {
    setCheckedList(checkedValues);
    setIndeterminate(!!checkedValues.length && checkedValues.length < plainOptions.length);
    setCheckAll(checkedValues.length === plainOptions.length);
  }

  return (
    <Modal
      destroyOnClose
      title={`请选择您需要打印的模板 -- 客户姓名：${value.customer_name}`}
      visible={modalVisible}
      onOk={() => onOk(value._id, checkedList)}
      onCancel={() => onCancel()}
    >
      <p>
        <Checkbox
          indeterminate={indeterminate}
          onChange={handleCheckAllChange}
          checked={checkAll}
        >
          全部选择
        </Checkbox>
      </p>
      <Checkbox.Group style={{ width: '100%' }} value={checkedList} onChange={handleChange}>
        {templateList.map(item => <p key={item._id}><Checkbox value={item.url}>{item.name}</Checkbox></p>)}
      </Checkbox.Group>
    </Modal>
  );
};

export default PrintModel;
