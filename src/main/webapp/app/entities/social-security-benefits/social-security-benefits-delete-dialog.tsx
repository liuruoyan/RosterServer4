import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ISocialSecurityBenefits } from 'app/shared/model/social-security-benefits.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './social-security-benefits.reducer';

export interface ISocialSecurityBenefitsDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SocialSecurityBenefitsDeleteDialog extends React.Component<ISocialSecurityBenefitsDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.socialSecurityBenefitsEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { socialSecurityBenefitsEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="rosterServer4App.socialSecurityBenefits.delete.question">
          <Translate
            contentKey="rosterServer4App.socialSecurityBenefits.delete.question"
            interpolate={{ id: socialSecurityBenefitsEntity.id }}
          >
            Are you sure you want to delete this SocialSecurityBenefits?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-socialSecurityBenefits" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ socialSecurityBenefits }: IRootState) => ({
  socialSecurityBenefitsEntity: socialSecurityBenefits.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialSecurityBenefitsDeleteDialog);
