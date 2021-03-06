import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './dimission.reducer';
import { IDimission } from 'app/shared/model/dimission.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IDimissionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IDimissionState = IPaginationBaseState;

export class Dimission extends React.Component<IDimissionProps, IDimissionState> {
  state: IDimissionState = {
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
    const { dimissionList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="dimission-heading">
          <Translate contentKey="rosterServer4App.dimission.home.title">Dimissions</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="rosterServer4App.dimission.home.createLabel">Create a new Dimission</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {dimissionList && dimissionList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('code')}>
                    <Translate contentKey="rosterServer4App.dimission.code">Code</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('lastDate')}>
                    <Translate contentKey="rosterServer4App.dimission.lastDate">Last Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('reason')}>
                    <Translate contentKey="rosterServer4App.dimission.reason">Reason</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('isSelfVerify')}>
                    <Translate contentKey="rosterServer4App.dimission.isSelfVerify">Is Self Verify</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('isHrVerify')}>
                    <Translate contentKey="rosterServer4App.dimission.isHrVerify">Is Hr Verify</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="rosterServer4App.dimission.dimissionType">Dimission Type</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="rosterServer4App.dimission.emp">Emp</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {dimissionList.map((dimission, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${dimission.id}`} color="link" size="sm">
                        {dimission.id}
                      </Button>
                    </td>
                    <td>{dimission.code}</td>
                    <td>
                      <TextFormat type="date" value={dimission.lastDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{dimission.reason}</td>
                    <td>{dimission.isSelfVerify ? 'true' : 'false'}</td>
                    <td>{dimission.isHrVerify ? 'true' : 'false'}</td>
                    <td>
                      {dimission.dimissionTypeId ? (
                        <Link to={`enum-dimission-type/${dimission.dimissionTypeId}`}>{dimission.dimissionTypeId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{dimission.empId ? <Link to={`employee/${dimission.empId}`}>{dimission.empId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${dimission.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${dimission.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${dimission.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="rosterServer4App.dimission.home.notFound">No Dimissions found</Translate>
            </div>
          )}
        </div>
        <div className={dimissionList && dimissionList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ dimission }: IRootState) => ({
  dimissionList: dimission.entities,
  totalItems: dimission.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dimission);
