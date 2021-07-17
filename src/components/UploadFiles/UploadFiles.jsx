import React, {useState, useEffect} from 'react';
import {Upload, Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import attachmentsActions from "../../redux/actions/attachments";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const UploadFiles = ({attachments}) => {
  const dispatch = useDispatch();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState(attachments);

  useEffect(() => {
    setFileList(attachments)
  }, [attachments])

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  };

  const handleChange = ({fileList}) => setFileList(fileList);

  const onRemove = (file) => {
    dispatch(attachmentsActions.removeAttachment(file));
  }

  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={(file) => onRemove(file)}
      >
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{width: '100%'}} src={previewImage}/>
      </Modal>
    </>
  );
}

UploadFiles.defaultProps = {
  attachments: []
};

export default UploadFiles;