import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Forbidden = ({ goBack }) => (
  <Container>
    <Helmet title="Forbidden" />
    <Card>
      <CardHeader
        title="Forbidden"
      />
      <CardText>
        You have not enough rights to visit this page
      </CardText>
      <CardActions>
        <center>
          <FlatButton
            label="Go back"
            onClick={goBack}
          />
        </center>
      </CardActions>
    </Card>
  </Container>
);

Forbidden.propTypes = {
  goBack: PropTypes.func.isRequired,
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export default Forbidden;
