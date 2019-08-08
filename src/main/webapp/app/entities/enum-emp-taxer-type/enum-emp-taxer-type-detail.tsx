import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './enum-emp-taxer-type.reducer';
import { IEnumEmpTaxerType } from 'app/shared/model/enum-emp-taxer-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnumEmpTaxerTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EnumEmpTaxerTypeDetail extends React.Component<IEnumEmpTaxerTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { enumEmpTaxerTypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="rosterServer4App.enumEmpTaxerType.detail.title">EnumEmpTaxerType</Translate> [
            <b>{enumEmpTaxerTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="valuez">
                <Translate contentKey="rosterServer4App.enumEmpTaxerType.valuez">Valuez</Translate>
              </span>
            </dt>
            <dd>{enumEmpTaxerTypeEntity.valuez}</dd>
            <dt>
              <span id="orderz">
                <Translate contentKey="rosterServer4App.enumEmpTaxerType.orderz">Orderz</Translate>
              </span>
            </dt>
            <dd>{enumEmpTaxerTypeEntity.orderz}</dd>
            <dt>
              <span id="tenentCode">
                <Translate contentKey="rosterServer4App.enumEmpTaxerType.tenentCode">Tenent Code</Translate>
              </span>
            </dt>
            <dd>{enumEmpTaxerTypeEntity.tenentCode}</dd>
            <dt>
              <Translate contentKey="rosterServer4App.enumEmpTaxerType.parent">Parent</Translate>
            </dt>
            <dd>{enumEmpTaxerTypeEntity.parentId ? enumEmpTaxerTypeEntity.parentId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/enum-emp-taxer-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/enum-emp-taxer-type/${enumEmpTaxerTypeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ enumEmpTaxerType }: IRootState) => ({
  enumEmpTaxerTypeEntity: enumEmpTaxerType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnumEmpTaxerTypeDetail);
