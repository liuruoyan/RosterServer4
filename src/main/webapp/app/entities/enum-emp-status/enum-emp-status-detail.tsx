import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './enum-emp-status.reducer';
import { IEnumEmpStatus } from 'app/shared/model/enum-emp-status.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnumEmpStatusDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EnumEmpStatusDetail extends React.Component<IEnumEmpStatusDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { enumEmpStatusEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="rosterServer4App.enumEmpStatus.detail.title">EnumEmpStatus</Translate> [<b>{enumEmpStatusEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="valuez">
                <Translate contentKey="rosterServer4App.enumEmpStatus.valuez">Valuez</Translate>
              </span>
            </dt>
            <dd>{enumEmpStatusEntity.valuez}</dd>
            <dt>
              <span id="orderz">
                <Translate contentKey="rosterServer4App.enumEmpStatus.orderz">Orderz</Translate>
              </span>
            </dt>
            <dd>{enumEmpStatusEntity.orderz}</dd>
            <dt>
              <span id="tenentCode">
                <Translate contentKey="rosterServer4App.enumEmpStatus.tenentCode">Tenent Code</Translate>
              </span>
            </dt>
            <dd>{enumEmpStatusEntity.tenentCode}</dd>
            <dt>
              <Translate contentKey="rosterServer4App.enumEmpStatus.parent">Parent</Translate>
            </dt>
            <dd>{enumEmpStatusEntity.parentId ? enumEmpStatusEntity.parentId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/enum-emp-status" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/enum-emp-status/${enumEmpStatusEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ enumEmpStatus }: IRootState) => ({
  enumEmpStatusEntity: enumEmpStatus.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnumEmpStatusDetail);
