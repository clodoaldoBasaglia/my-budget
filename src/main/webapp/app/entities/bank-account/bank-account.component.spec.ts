import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import BankAccount from './bank-account.vue';
import BankAccountService from './bank-account.service';
import AlertService from '@/shared/alert/alert.service';

type BankAccountComponentType = InstanceType<typeof BankAccount>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('BankAccount Management Component', () => {
    let bankAccountServiceStub: SinonStubbedInstance<BankAccountService>;
    let mountOptions: MountingOptions<BankAccountComponentType>['global'];

    beforeEach(() => {
      bankAccountServiceStub = sinon.createStubInstance<BankAccountService>(BankAccountService);
      bankAccountServiceStub.retrieve.resolves({ headers: {} });

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          bankAccountService: () => bankAccountServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        bankAccountServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(BankAccount, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(bankAccountServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.bankAccounts[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: BankAccountComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(BankAccount, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        bankAccountServiceStub.retrieve.reset();
        bankAccountServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        bankAccountServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeBankAccount();
        await comp.$nextTick(); // clear components

        // THEN
        expect(bankAccountServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(bankAccountServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
