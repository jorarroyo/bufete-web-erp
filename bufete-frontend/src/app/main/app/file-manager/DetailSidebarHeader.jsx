import React from 'react';
import { Icon, IconButton, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import FileManagerService from 'app/services/file-records/fileManagerService';
import { FuseAnimate } from '@fuse';
import { statusName } from 'app/constants/appConstant';
import * as Actions from './store/actions';

function DetailSidebarHeader(props) {
  const { status } = props;
  const dispatch = useDispatch();
  const files = useSelector(({ fileManagerApp }) => fileManagerApp.files.entities);
  const selectedItem = useSelector(({ fileManagerApp }) => files[fileManagerApp.selectedItemId]);

  if (!selectedItem) {
    return null;
  }

  function onDeleteHandle() {
    dispatch(Actions.removeFile(selectedItem.id));
  }

  function onDownloadHandle() {
    FileManagerService.getFileContentById(selectedItem.id).then(response => {
      const filename = response.headers['content-disposition'].split('filename=')[1];
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'download';
      a.click();
    });
  }

  return (
    <div className="flex flex-col justify-between h-full p-4 sm:p-12">
      <div className="toolbar flex align-center justify-end">
        {status !== statusName.CERRADO && (
          <FuseAnimate animation="transition.expandIn" delay={200}>
            <IconButton onClick={onDeleteHandle}>
              <Icon>delete</Icon>
            </IconButton>
          </FuseAnimate>
        )}
        <FuseAnimate animation="transition.expandIn" delay={200}>
          <IconButton onClick={onDownloadHandle}>
            <Icon>cloud_download</Icon>
          </IconButton>
        </FuseAnimate>
      </div>

      <div className="p-12">
        <FuseAnimate delay={200}>
          <Typography variant="subtitle1" className="mb-8">
            {selectedItem.file_name}
          </Typography>
        </FuseAnimate>
        <FuseAnimate delay={300}>
          <Typography variant="caption" className="">
            <span>Editado</span>
            <span>: {selectedItem.modified}</span>
          </Typography>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default DetailSidebarHeader;
