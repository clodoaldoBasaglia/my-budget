package br.com.heimdall.domain;

import static br.com.heimdall.domain.BankAccountTestSamples.*;
import static br.com.heimdall.domain.BankTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.com.heimdall.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class BankTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bank.class);
        Bank bank1 = getBankSample1();
        Bank bank2 = new Bank();
        assertThat(bank1).isNotEqualTo(bank2);

        bank2.setId(bank1.getId());
        assertThat(bank1).isEqualTo(bank2);

        bank2 = getBankSample2();
        assertThat(bank1).isNotEqualTo(bank2);
    }

    @Test
    void bankAccountTest() {
        Bank bank = getBankRandomSampleGenerator();
        BankAccount bankAccountBack = getBankAccountRandomSampleGenerator();

        bank.addBankAccount(bankAccountBack);
        assertThat(bank.getBankAccounts()).containsOnly(bankAccountBack);
        assertThat(bankAccountBack.getBank()).isEqualTo(bank);

        bank.removeBankAccount(bankAccountBack);
        assertThat(bank.getBankAccounts()).doesNotContain(bankAccountBack);
        assertThat(bankAccountBack.getBank()).isNull();

        bank.bankAccounts(new HashSet<>(Set.of(bankAccountBack)));
        assertThat(bank.getBankAccounts()).containsOnly(bankAccountBack);
        assertThat(bankAccountBack.getBank()).isEqualTo(bank);

        bank.setBankAccounts(new HashSet<>());
        assertThat(bank.getBankAccounts()).doesNotContain(bankAccountBack);
        assertThat(bankAccountBack.getBank()).isNull();
    }
}
