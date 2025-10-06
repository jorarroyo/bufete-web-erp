import React, { useEffect, useRef } from 'react';
import { Fab, Icon } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import RoleHeader from './RoleHeader';
import RoleSidebarContent from './RoleSidebarContent';
import RoleDialog from './RoleDialog';
import RoleList from './RoleList';
import LoadingComponent from 'app/main/shared/LoadingComponent';

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    zIndex: 99,
  },
});

const RolePage = props => {
  const dispatch = useDispatch();
  const loading = useSelector(({ roleApp }) => roleApp.role.loading);

  const classes = useStyles(props);
  const pageLayout = useRef(null);

  const { match } = props;

  useEffect(() => {
    dispatch(Actions.getRoles(match.params));
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
        header={<RoleHeader pageLayout={pageLayout} />}
        content={<RoleList action={match.params} />}
        leftSidebarContent={<RoleSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      {match.params.id === 'active' && (
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Fab color="primary" aria-label="add" className={classes.addButton} onClick={() => dispatch(Actions.openNewRoleDialog())}>
            <Icon>add</Icon>
          </Fab>
        </FuseAnimate>
      )}
      <RoleDialog />
      <LoadingComponent loadingRecord={loading} />
    </>
  );
};

export default withReducer('roleApp', reducer)(RolePage);
