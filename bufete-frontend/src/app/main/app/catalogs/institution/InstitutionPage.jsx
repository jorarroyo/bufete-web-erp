import React, { useEffect, useRef } from 'react';
import { Fab, Icon } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';
import * as Actions from '../store/actions/institutions';
import reducer from '../store/reducers/institutions';
import InstitutionHeader from './InstitutionHeader';
import InstitutionList from './InstitutionList';
import InstitutionDialog from './InstitutionDialog';
import InstitutionSidebarContent from './InstitutionSidebarContent';
import LoadingComponent from 'app/main/shared/LoadingComponent';

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    zIndex: 99,
  },
});

const InstitutionPage = props => {
  const dispatch = useDispatch();
  const loading = useSelector(({ institutionApp }) => institutionApp.institution.loading);

  const classes = useStyles(props);
  const pageLayout = useRef(null);

  const { match } = props;

  useEffect(() => {
    dispatch(Actions.getInstitutions(match.params));
  }, [dispatch, match.params]);

  return (
    <>
      <FusePageSimple
        classes={{
          contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
          content: 'flex flex-col h-full',
          leftSidebar: 'w-256 border-0',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<InstitutionHeader pageLayout={pageLayout} />}
        content={<InstitutionList action={match.params} />}
        leftSidebarContent={<InstitutionSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      {match.params.id === 'active' && (
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Fab color="primary" aria-label="add" className={classes.addButton} onClick={() => dispatch(Actions.openNewInstitutionDialog())}>
            <Icon>add</Icon>
          </Fab>
        </FuseAnimate>
      )}
      <InstitutionDialog />
      <LoadingComponent loadingRecord={loading} />
    </>
  );
};

export default withReducer('institutionApp', reducer)(InstitutionPage);
