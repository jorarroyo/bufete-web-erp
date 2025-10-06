import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/stamp-mov';
import StampMovHeader from './StampMovHeader';
import StampMovTable from './StampMovTable';

function StampMov(props) {
  const { productId } = props;
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<StampMovHeader />}
      content={<StampMovTable productId={productId} />}
      innerScroll
    />
  );
}

export default withReducer('stampMovApp', reducer)(StampMov);
