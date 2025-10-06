import { Fab, Icon } from '@material-ui/core';
import notificationHandler from 'app/utils/errorHandler';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FuseAnimate, FusePageSimple } from '@fuse';
import { statusName } from 'app/constants/appConstant';
import Breadcrumb from './Breadcrumb';
import DetailSidebarContent from './DetailSidebarContent';
import DetailSidebarHeader from './DetailSidebarHeader';
import FileList from './FileList';
import * as Actions from './store/actions';

function FileManagerApp(props) {
  const { data } = props;
  const dispatch = useDispatch();
  const recordData = useSelector(({ fileManagerApp }) => fileManagerApp.files);

  const pageLayout = useRef(null);

  function handleUploadChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.size >= 2000000) {
      notificationHandler.infoMessage(dispatch, 'El tamaño del archivo excede el limite de 2MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      dispatch(Actions.uploadFile(file, data.id, data.type));
    };

    reader.onerror = function() {
      console.log('error on load image');
    };
  }

  return (
    <FusePageSimple
      classes={{
        root: 'bg-red',
        header: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
        sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
        rightSidebar: 'w-320',
      }}
      header={
        <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
          <div className="flex items-center justify-between" />
          {data.status !== statusName.CERRADO && (
            <div className="flex flex-1 items-end">
              <input accept=".doc,.docx,.xls,.xlsx,.pdf" className="hidden" id="button-file" type="file" onChange={handleUploadChange} />
              <FuseAnimate animation="transition.expandIn" delay={600}>
                <label htmlFor="button-file">
                  <Fab color="secondary" aria-label="add" className="absolute bottom-0 left-0 ml-16 -mb-28 z-999" component="span">
                    <Icon>add</Icon>
                  </Fab>
                </label>
              </FuseAnimate>
              <FuseAnimate delay={200}>
                <div>{recordData && <Breadcrumb selected={recordData} className="flex flex-1 pl-72 pb-12 text-16 sm:text-24" />}</div>
              </FuseAnimate>
            </div>
          )}
        </div>
      }
      content={<FileList pageLayout={pageLayout} />}
      leftSidebarVariant="temporary"
      rightSidebarHeader={<DetailSidebarHeader status={data.status} />}
      rightSidebarContent={<DetailSidebarContent />}
      ref={pageLayout}
      innerScroll
    />
  );
}

export default FileManagerApp;
