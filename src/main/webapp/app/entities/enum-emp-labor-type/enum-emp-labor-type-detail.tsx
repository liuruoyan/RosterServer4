import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './enum-emp-labor-type.reducer';
import { IEnumEmpLaborType } from 'app/shared/model/enum-emp-labor-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnumEmpLaborTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EnumEmpLaborTypeDetail extends React.Component<IEnumEmpLaborTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { enumEmpLaborTypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="rosterServer4App.enumEmpLaborType.detail.title">EnumEmpLaborType</Translate> [
            <b>{enumEmpLaborTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="valuez">
                <Translate contentKey="rosterServer4App.enumEmpLaborType.valuez">Valuez</Translate>
              </span>
            </dt>
            <dd>{enumEmpLaborTypeEntity.valuez}</dd>
            <dt>
              <span id="orderz">
                <Translate contentKey="rosterServer4App.enumEmpLaborType.orderz">Orderz</Translate>
              </span>
            </dt>
            <dd>{enumEmpLaborTypeEntity.orderz}</dd>
            <dt>
              <span id="tenentCode">
                <Translate contentKey="rosterServer4App.enumEmpLaborType.tenentCode">Tenent Code</Translate>
              </span>
            </dt>
            <dd>{enumEmpLaborTypeEntity.tenentCode}</dd>
            <dt>
              <Translate contentKey="rosterServer4App.enumEmpLaborType.parent">Parent</Translate>
            </dt>
            <dd>{enumEmpLaborTypeEntity.parentId ? enumEmpLaborTypeEntity.parentId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/enum-emp-labor-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/enum-emp-labor-type/${enumEmpLaborTypeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ enumEmpLaborType }: IRootState) => ({
  enumEmpLaborTypeEntity: enumEmpLaborType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnumEmpLaborTypeDetail);
