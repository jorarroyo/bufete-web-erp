import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Formsy from 'formsy-react';
import * as authActions from 'app/auth/store/actions';
import { Button, Card, CardContent, Typography, InputAdornment, Icon } from '@material-ui/core';
import { FuseAnimate, TextFieldFormsy } from '@fuse';
import LoadingComponent from '../shared/LoadingComponent';

const useStyles = makeStyles(theme => ({
  root: {
    background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function Login() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.login);

  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (login.error && (login.error.username || login.error.password || login.error.companyId)) {
      formRef.current.updateInputsWithError({
        ...login.error,
      });
      disableButton();
    }
  }, [login.error]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    dispatch(authActions.submitLogin(model));
  }

  return (
    <div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
      <div className="flex flex-col items-center justify-center w-full">
        <FuseAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <img className="w-128 m-32" src="assets/images/logos/aoslogo.png" alt="logo" />

              <Typography variant="h6" className="mt-16 mb-32">
                INGRESAR A TU CUENTA
              </Typography>
              <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
              >
                <TextFieldFormsy
                  className="mb-16"
                  type="text"
                  name="username"
                  label="Usuario"
                  validations={{
                    minLength: 4,
                  }}
                  validationErrors={{
                    minLength: 'Tamaño mínimo de 4 caracteres',
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          perm_identity
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                />

                <TextFieldFormsy
                  className="mb-16"
                  type="password"
                  name="password"
                  label="Password"
                  validations={{
                    minLength: 4,
                  }}
                  validationErrors={{
                    minLength: 'Tamaño mínimo de 4 caracteres',
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          vpn_key
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full mx-auto mt-16 normal-case"
                  aria-label="INGRESAR"
                  disabled={!isFormValid}
                  value="legacy"
                >
                  INGRESAR
                </Button>
              </Formsy>
            </CardContent>
          </Card>
        </FuseAnimate>
        <LoadingComponent loadingComponent={login.loading} />
      </div>
    </div>
  );
}

export default Login;
