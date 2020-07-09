import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Spin, Upload, message, Modal } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import './index.less';

const { confirm } = Modal;

const transformResult = (arr) => {
  if (!Array.isArray(arr)) throw new Error("参数错误");;
  return arr.map((item, index) => {
    return {
      ...item,
      ...{
        uid: index,
      },
    }
  });
}

function Template(props) {
  const { dispatch, templateList, loading = true } = props;
  const [ fileList, setFileList ] = useState(transformResult(templateList));

  const reload = () => {
    dispatch({
      type: 'template/fetch',
    });
  }

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    setFileList(transformResult(templateList));
  }, [templateList]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传</div>
    </div>
  );

  const handleUploadChange = (info) => {
    setFileList(info.fileList);
    if (info.file.status === 'done' && info.file.response.code === 0) {
      console.log('end', info);
      reload();
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败.`);
    }
  };

  const handleUploadRemove = (info) => {
    return new Promise((resolve, reject) => {
      confirm({
      title: <div>您确定要删除 <b style={{ color: 'red' }}>{info.name}</b> 吗?</div>,
        icon: <ExclamationCircleOutlined />,
        onOk: async () => {
          if (info._id) {
            await dispatch({
              type: 'template/fetchDestroyTemplate',
              payload: { _id: info._id },
            });
          }
          resolve();
        },
        onCancel() {resolve(false)}
      });
    });
  }

  return (
    <PageHeaderWrapper>
      <Card>
        <Spin spinning={loading} >
          <Upload
            action="api/template"
            name="file"
            accept=".doc,.docx"
            listType="picture-card"
            headers={{
              authorization: global.localStorage.getItem('token'),
            }}
            fileList={fileList}
            onChange={handleUploadChange}
            onRemove={handleUploadRemove}
          >
            {uploadButton}
          </Upload>
        </Spin>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ template, loading }) => ({
  templateList: template.templateList,
  loading: loading.effects['template/fetch'],
}))(Template);
