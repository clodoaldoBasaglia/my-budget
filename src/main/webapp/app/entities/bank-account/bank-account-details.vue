<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="bankAccount">
        <h2 class="jh-entity-heading" data-cy="bankAccountDetailsHeading">
          <span v-text="t$('myBudgetApp.bankAccount.detail.title')"></span> {{ bankAccount.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('myBudgetApp.bankAccount.descriptionName')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.descriptionName }}</span>
          </dd>
          <dt>
            <span v-text="t$('myBudgetApp.bankAccount.accountNumber')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.accountNumber }}</span>
          </dd>
          <dt>
            <span v-text="t$('myBudgetApp.bankAccount.accountDigit')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.accountDigit }}</span>
          </dd>
          <dt>
            <span v-text="t$('myBudgetApp.bankAccount.agencyNumber')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.agencyNumber }}</span>
          </dd>
          <dt>
            <span v-text="t$('myBudgetApp.bankAccount.agencyDigit')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.agencyDigit }}</span>
          </dd>
          <dt>
            <span v-text="t$('myBudgetApp.bankAccount.bank')"></span>
          </dt>
          <dd>
            <div v-if="bankAccount.bank">
              <router-link :to="{ name: 'BankView', params: { bankId: bankAccount.bank.id } }">{{
                bankAccount.bank.descriptionName
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" @click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="bankAccount.id"
          :to="{ name: 'BankAccountEdit', params: { bankAccountId: bankAccount.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./bank-account-details.component.ts"></script>
