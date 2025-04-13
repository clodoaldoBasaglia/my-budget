<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate @submit.prevent="save()">
        <h2
          id="myBudgetApp.bankAccount.home.createOrEditLabel"
          data-cy="BankAccountCreateUpdateHeading"
          v-text="t$('myBudgetApp.bankAccount.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="bankAccount.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="bankAccount.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('myBudgetApp.bankAccount.descriptionName')"
              for="bank-account-descriptionName"
            ></label>
            <input
              type="text"
              class="form-control"
              name="descriptionName"
              id="bank-account-descriptionName"
              data-cy="descriptionName"
              :class="{ valid: !v$.descriptionName.$invalid, invalid: v$.descriptionName.$invalid }"
              v-model="v$.descriptionName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('myBudgetApp.bankAccount.accountNumber')" for="bank-account-accountNumber"></label>
            <input
              type="text"
              class="form-control"
              name="accountNumber"
              id="bank-account-accountNumber"
              data-cy="accountNumber"
              :class="{ valid: !v$.accountNumber.$invalid, invalid: v$.accountNumber.$invalid }"
              v-model="v$.accountNumber.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('myBudgetApp.bankAccount.accountDigit')" for="bank-account-accountDigit"></label>
            <input
              type="text"
              class="form-control"
              name="accountDigit"
              id="bank-account-accountDigit"
              data-cy="accountDigit"
              :class="{ valid: !v$.accountDigit.$invalid, invalid: v$.accountDigit.$invalid }"
              v-model="v$.accountDigit.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('myBudgetApp.bankAccount.agencyNumber')" for="bank-account-agencyNumber"></label>
            <input
              type="text"
              class="form-control"
              name="agencyNumber"
              id="bank-account-agencyNumber"
              data-cy="agencyNumber"
              :class="{ valid: !v$.agencyNumber.$invalid, invalid: v$.agencyNumber.$invalid }"
              v-model="v$.agencyNumber.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('myBudgetApp.bankAccount.agencyDigit')" for="bank-account-agencyDigit"></label>
            <input
              type="text"
              class="form-control"
              name="agencyDigit"
              id="bank-account-agencyDigit"
              data-cy="agencyDigit"
              :class="{ valid: !v$.agencyDigit.$invalid, invalid: v$.agencyDigit.$invalid }"
              v-model="v$.agencyDigit.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('myBudgetApp.bankAccount.bank')" for="bank-account-bank"></label>
            <select class="form-control" id="bank-account-bank" data-cy="bank" name="bank" v-model="bankAccount.bank">
              <option :value="null"></option>
              <option
                :value="bankAccount.bank && bankOption.id === bankAccount.bank.id ? bankAccount.bank : bankOption"
                v-for="bankOption in banks"
                :key="bankOption.id"
              >
                {{ bankOption.descriptionName }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" @click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./bank-account-update.component.ts"></script>
