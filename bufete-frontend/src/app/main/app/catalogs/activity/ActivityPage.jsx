import React, { useEffect, useRef } from 'react';
import { Fab, Icon } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';
import * as Actions from '../store/actions/activities';
import reducer from '../store/reducers/activities';
import ActivityHeader from './ActivityHeader';
import ActivityList from './ActivityList';
import ActivityDialog from './ActivityDialog';
import ActivitySidebarContent from './ActivitySidebarContent';
import LoadingComponent from 'app/main/shared/LoadingComponent';

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    zIndex: 99,
  },
});

const ActivityPage = props => {
  const dispatch = useDispatch();
  const loading = useSelector(({ activityApp }) => activityApp.activity.loading);

  const classes = useStyles(props);
  const pageLayout = useRef(null);

  const { match } = props;

  useEffect(() => {
    dispatch(Actions.getActivities(match.params));
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
        header={<ActivityHeader pageLayout={pageLayout} />}
        content={<ActivityList action={match.params} />}
        leftSidebarContent={<ActivitySidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      {match.params.id === 'active' && (
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Fab color="primary" aria-label="add" className={classes.addButton} onClick={() => dispatch(Actions.openNewActivityDialog())}>
            <Icon>add</Icon>
          </Fab>
        </FuseAnimate>
      )}
      <ActivityDialog />
      <LoadingComponent loadingRecord={loading} />
    </>
  );
};

export default withReducer('activityApp', reducer)(ActivityPage);
