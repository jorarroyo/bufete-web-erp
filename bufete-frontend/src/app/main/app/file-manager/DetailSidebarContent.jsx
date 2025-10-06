import React from 'react';
import { Icon, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { FuseAnimate } from '@fuse';

const useStyles = makeStyles({
  table: {
    '& th': {
      padding: '16px 0',
    },
  },
  typeIcon: {
    '&.folder:before': {
      content: "'folder'",
      color: '#FFB300',
    },
    '&.document:before': {
      content: "'insert_drive_file'",
      color: '#1565C0',
    },
    '&.spreadsheet:before': {
      content: "'insert_chart'",
      color: '#4CAF50',
    },
    '&.pdf:before': {
      content: "'picture_as_pdf'",
      color: '#ff6666',
    },
  },
});

function DetailSidebarContent(props) {
  const files = useSelector(({ fileManagerApp }) => fileManagerApp.files.entities);
  const selectedItem = useSelector(({ fileManagerApp }) => files[fileManagerApp.selectedItemId]);

  const classes = useStyles();

  if (!selectedItem) {
    return null;
  }

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={200}>
      <div className="file-details p-16 sm:p-24">
        <div className="preview h-128 sm:h-256 file-icon flex items-center justify-center">
          <FuseAnimate animation="transition.expandIn" delay={300}>
            <Icon className={clsx(classes.typeIcon, selectedItem.file_type, 'text-48')} />
          </FuseAnimate>
        </div>

        {/* <FormControlLabel
          className="offline-switch"
          control={<Switch checked={selectedItem.offline} aria-label="Available Offline" />}
          label="Available Offline"
        /> */}

        <Typography variant="subtitle1" className="py-16">
          Info
        </Typography>

        <table className={clsx(classes.table, 'w-full, text-left')}>
          <tbody>
            <tr className="type">
              <th>Tipo</th>
              <td>{selectedItem.file_type}</td>
            </tr>

            <tr className="size">
              <th>Tamaño</th>
              <td>{selectedItem.file_size === '' ? '-' : selectedItem.file_size}</td>
            </tr>

            <tr className="owner">
              <th>Creado</th>
              <td>{selectedItem.file_owner}</td>
            </tr>

            <tr className="modified">
              <th>Creado</th>
              <td>{selectedItem.modified}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </FuseAnimate>
  );
}

export default DetailSidebarContent;
