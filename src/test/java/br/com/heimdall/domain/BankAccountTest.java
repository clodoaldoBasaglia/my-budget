package br.com.heimdall.domain;

import static br.com.heimdall.domain.BankAccountTestSamples.*;
import static br.com.heimdall.domain.BankTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.com.heimdall.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BankAccountTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BankAccount.class);
        BankAccount bankAccount1 = getBankAccountSample1();
        BankAccount bankAccount2 = new BankAccount();
        assertThat(bankAccount1).isNotEqualTo(bankAccount2);

        bankAccount2.setId(bankAccount1.getId());
        assertThat(bankAccount1).isEqualTo(bankAccount2);

        bankAccount2 = getBankAccountSample2();
        assertThat(bankAccount1).isNotEqualTo(bankAccount2);
    }

    @Test
    void bankTest() {
        BankAccount bankAccount = getBankAccountRandomSampleGenerator();
        Bank bankBack = getBankRandomSampleGenerator();

        bankAccount.setBank(bankBack);
        assertThat(bankAccount.getBank()).isEqualTo(bankBack);

        bankAccount.bank(null);
        assertThat(bankAccount.getBank()).isNull();
    }
}
