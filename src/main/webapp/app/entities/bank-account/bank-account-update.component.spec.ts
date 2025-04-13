import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import BankAccountUpdate from './bank-account-update.vue';
import BankAccountService from './bank-account.service';
import AlertService from '@/shared/alert/alert.service';

import BankService from '@/entities/bank/bank.service';

type BankAccountUpdateComponentType = InstanceType<typeof BankAccountUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const bankAccountSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<BankAccountUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('BankAccount Management Update Component', () => {
    let comp: BankAccountUpdateComponentType;
    let bankAccountServiceStub: SinonStubbedInstance<BankAccountService>;

    beforeEach(() => {
      route = {};
      bankAccountServiceStub = sinon.createStubInstance<BankAccountService>(BankAccountService);
      bankAccountServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          bankAccountService: () => bankAccountServiceStub,
          bankService: () =>
            sinon.createStubInstance<BankService>(BankService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(BankAccountUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.bankAccount = bankAccountSample;
        bankAccountServiceStub.update.resolves(bankAccountSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bankAccountServiceStub.update.calledWith(bankAccountSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        bankAccountServiceStub.create.resolves(entity);
        const wrapper = shallowMount(BankAccountUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.bankAccount = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bankAccountServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        bankAccountServiceStub.find.resolves(bankAccountSample);
        bankAccountServiceStub.retrieve.resolves([bankAccountSample]);

        // WHEN
        route = {
          params: {
            bankAccountId: `${bankAccountSample.id}`,
          },
        };
        const wrapper = shallowMount(BankAccountUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.bankAccount).toMatchObject(bankAccountSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        bankAccountServiceStub.find.resolves(bankAccountSample);
        const wrapper = shallowMount(BankAccountUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
