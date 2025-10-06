import React, { useEffect, useRef } from 'react';
import { Fab, Icon } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import UserDialog from './UserDialog';
import UserSidebarContent from './UserSidebarContent';
import UserList from './UserList';
import UserHeader from './UserHeader';
import UserAssignDialog from './UserAssignDialog';
import UserResetPassword from './UserResetPassword';
import LoadingComponent from 'app/main/shared/LoadingComponent';

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    zIndex: 99,
  },
});

const UserPage = props => {
  const dispatch = useDispatch();
  const loading = useSelector(({ userApp }) => userApp.user.loading);

  const classes = useStyles(props);
  const pageLayout = useRef(null);

  const { match } = props;

  useEffect(() => {
    dispatch(Actions.getUsers(match.params));
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
        header={<UserHeader pageLayout={pageLayout} />}
        content={<UserList action={match.params} />}
        leftSidebarContent={<UserSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      {match.params.id === 'active' && (
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Fab color="primary" aria-label="add" className={classes.addButton} onClick={() => dispatch(Actions.openNewUserDialog())}>
            <Icon>add</Icon>
          </Fab>
        </FuseAnimate>
      )}
      <UserDialog />
      <UserAssignDialog />
      <UserResetPassword />
      <LoadingComponent loadingRecord={loading} />
    </>
  );
};

export default withReducer('userApp', reducer)(UserPage);
