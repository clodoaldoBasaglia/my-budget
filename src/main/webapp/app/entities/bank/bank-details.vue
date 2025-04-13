<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="bank">
        <h2 class="jh-entity-heading" data-cy="bankDetailsHeading">
          <span v-text="t$('myBudgetApp.bank.detail.title')"></span> {{ bank.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('myBudgetApp.bank.descriptionName')"></span>
          </dt>
          <dd>
            <span>{{ bank.descriptionName }}</span>
          </dd>
          <dt>
            <span v-text="t$('myBudgetApp.bank.bankType')"></span>
          </dt>
          <dd>
            <span v-text="t$('myBudgetApp.BankTypeEnum.' + bank.bankType)"></span>
          </dd>
        </dl>
        <button type="submit" @click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="bank.id" :to="{ name: 'BankEdit', params: { bankId: bank.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./bank-details.component.ts"></script>
