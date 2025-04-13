<template>
  <div>
    <h2 id="page-heading" data-cy="BankAccountHeading">
      <span v-text="t$('myBudgetApp.bankAccount.home.title')" id="bank-account-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" @click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('myBudgetApp.bankAccount.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'BankAccountCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-bank-account"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('myBudgetApp.bankAccount.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && bankAccounts && bankAccounts.length === 0">
      <span v-text="t$('myBudgetApp.bankAccount.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="bankAccounts && bankAccounts.length > 0">
      <table class="table table-striped" aria-describedby="bankAccounts">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('myBudgetApp.bankAccount.descriptionName')"></span></th>
            <th scope="row"><span v-text="t$('myBudgetApp.bankAccount.accountNumber')"></span></th>
            <th scope="row"><span v-text="t$('myBudgetApp.bankAccount.accountDigit')"></span></th>
            <th scope="row"><span v-text="t$('myBudgetApp.bankAccount.agencyNumber')"></span></th>
            <th scope="row"><span v-text="t$('myBudgetApp.bankAccount.agencyDigit')"></span></th>
            <th scope="row"><span v-text="t$('myBudgetApp.bankAccount.bank')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bankAccount in bankAccounts" :key="bankAccount.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'BankAccountView', params: { bankAccountId: bankAccount.id } }">{{ bankAccount.id }}</router-link>
            </td>
            <td>{{ bankAccount.descriptionName }}</td>
            <td>{{ bankAccount.accountNumber }}</td>
            <td>{{ bankAccount.accountDigit }}</td>
            <td>{{ bankAccount.agencyNumber }}</td>
            <td>{{ bankAccount.agencyDigit }}</td>
            <td>
              <div v-if="bankAccount.bank">
                <router-link :to="{ name: 'BankView', params: { bankId: bankAccount.bank.id } }">{{
                  bankAccount.bank.descriptionName
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'BankAccountView', params: { bankAccountId: bankAccount.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'BankAccountEdit', params: { bankAccountId: bankAccount.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  @click="prepareRemove(bankAccount)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="t$('entity.action.delete')"></span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span
          id="myBudgetApp.bankAccount.delete.question"
          data-cy="bankAccountDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-bankAccount-heading" v-text="t$('myBudgetApp.bankAccount.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" @click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-bankAccount"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            @click="removeBankAccount()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./bank-account.component.ts"></script>
