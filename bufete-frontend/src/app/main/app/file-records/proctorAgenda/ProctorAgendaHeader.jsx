import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Typography, Paper, Button, Input } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { FuseAnimate } from '@fuse';
import * as Actions from '../store/actions/proctor-agenda';

function ProctorAgendaHeader() {
  const dispatch = useDispatch();
  const searchText = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.proctorAgenda.searchText);
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Icon className="text-32 mr-0 sm:mr-12">shopping_basket</Icon>
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex" variant="h6">
            Agenda de Procurador
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex flex-1 items-center justify-center px-12">
        <ThemeProvider theme={mainTheme}>
          <FuseAnimate animation="transition.slideDownIn" delay={300}>
            <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
              <Icon className="mr-8" color="action">
                search
              </Icon>

              <Input
                placeholder="Buscar"
                className="flex flex-1"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  'aria-label': 'Search',
                }}
                onChange={ev => dispatch(Actions.setProctorAgendaSearchCriteria(ev))}
              />
            </Paper>
          </FuseAnimate>
        </ThemeProvider>
      </div>
      <FuseAnimate animation="transition.slideRightIn" delay={300}>
        <Button component={Link} to="/apps/file-records/proctor-agenda/new" className="whitespace-no-wrap" variant="contained">
          <span className="hidden sm:flex">Nueva Agenda</span>
          <span className="flex sm:hidden">Nuevo</span>
        </Button>
      </FuseAnimate>
    </div>
  );
}

export default ProctorAgendaHeader;
