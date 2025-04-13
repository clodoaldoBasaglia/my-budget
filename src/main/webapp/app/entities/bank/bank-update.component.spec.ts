import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import BankUpdate from './bank-update.vue';
import BankService from './bank.service';
import AlertService from '@/shared/alert/alert.service';

type BankUpdateComponentType = InstanceType<typeof BankUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const bankSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<BankUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Bank Management Update Component', () => {
    let comp: BankUpdateComponentType;
    let bankServiceStub: SinonStubbedInstance<BankService>;

    beforeEach(() => {
      route = {};
      bankServiceStub = sinon.createStubInstance<BankService>(BankService);
      bankServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

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
          bankService: () => bankServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(BankUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.bank = bankSample;
        bankServiceStub.update.resolves(bankSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bankServiceStub.update.calledWith(bankSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        bankServiceStub.create.resolves(entity);
        const wrapper = shallowMount(BankUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.bank = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bankServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        bankServiceStub.find.resolves(bankSample);
        bankServiceStub.retrieve.resolves([bankSample]);

        // WHEN
        route = {
          params: {
            bankId: `${bankSample.id}`,
          },
        };
        const wrapper = shallowMount(BankUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.bank).toMatchObject(bankSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        bankServiceStub.find.resolves(bankSample);
        const wrapper = shallowMount(BankUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
