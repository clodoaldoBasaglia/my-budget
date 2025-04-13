<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate @submit.prevent="save()">
        <h2
          id="myBudgetApp.bank.home.createOrEditLabel"
          data-cy="BankCreateUpdateHeading"
          v-text="t$('myBudgetApp.bank.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="bank.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="bank.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('myBudgetApp.bank.descriptionName')" for="bank-descriptionName"></label>
            <input
              type="text"
              class="form-control"
              name="descriptionName"
              id="bank-descriptionName"
              data-cy="descriptionName"
              :class="{ valid: !v$.descriptionName.$invalid, invalid: v$.descriptionName.$invalid }"
              v-model="v$.descriptionName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('myBudgetApp.bank.bankType')" for="bank-bankType"></label>
            <select
              class="form-control"
              name="bankType"
              :class="{ valid: !v$.bankType.$invalid, invalid: v$.bankType.$invalid }"
              v-model="v$.bankType.$model"
              id="bank-bankType"
              data-cy="bankType"
            >
              <option
                v-for="bankTypeEnum in bankTypeEnumValues"
                :key="bankTypeEnum"
                :value="bankTypeEnum"
                :label="t$('myBudgetApp.BankTypeEnum.' + bankTypeEnum)"
              >
                {{ bankTypeEnum }}
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
<script lang="ts" src="./bank-update.component.ts"></script>
