import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './enum-politics-status.reducer';
import { IEnumPoliticsStatus } from 'app/shared/model/enum-politics-status.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IEnumPoliticsStatusProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IEnumPoliticsStatusState = IPaginationBaseState;

export class EnumPoliticsStatus extends React.Component<IEnumPoliticsStatusProps, IEnumPoliticsStatusState> {
  state: IEnumPoliticsStatusState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { enumPoliticsStatusList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="enum-politics-status-heading">
          <Translate contentKey="rosterServer4App.enumPoliticsStatus.home.title">Enum Politics Statuses</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="rosterServer4App.enumPoliticsStatus.home.createLabel">Create a new Enum Politics Status</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {enumPoliticsStatusList && enumPoliticsStatusList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('valuez')}>
                    <Translate contentKey="rosterServer4App.enumPoliticsStatus.valuez">Valuez</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('orderz')}>
                    <Translate contentKey="rosterServer4App.enumPoliticsStatus.orderz">Orderz</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('tenentCode')}>
                    <Translate contentKey="rosterServer4App.enumPoliticsStatus.tenentCode">Tenent Code</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="rosterServer4App.enumPoliticsStatus.parent">Parent</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {enumPoliticsStatusList.map((enumPoliticsStatus, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${enumPoliticsStatus.id}`} color="link" size="sm">
                        {enumPoliticsStatus.id}
                      </Button>
                    </td>
                    <td>{enumPoliticsStatus.valuez}</td>
                    <td>{enumPoliticsStatus.orderz}</td>
                    <td>{enumPoliticsStatus.tenentCode}</td>
                    <td>
                      {enumPoliticsStatus.parentId ? (
                        <Link to={`enum-politics-status/${enumPoliticsStatus.parentId}`}>{enumPoliticsStatus.parentId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${enumPoliticsStatus.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${enumPoliticsStatus.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${enumPoliticsStatus.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="rosterServer4App.enumPoliticsStatus.home.notFound">No Enum Politics Statuses found</Translate>
            </div>
          )}
        </div>
        <div className={enumPoliticsStatusList && enumPoliticsStatusList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ enumPoliticsStatus }: IRootState) => ({
  enumPoliticsStatusList: enumPoliticsStatus.entities,
  totalItems: enumPoliticsStatus.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnumPoliticsStatus);
