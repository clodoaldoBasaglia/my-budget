package br.com.heimdall.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A BankAccount.
 */
@Entity
@Table(name = "bank_account")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BankAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "description_name")
    private String descriptionName;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "account_digit")
    private String accountDigit;

    @Column(name = "agency_number")
    private String agencyNumber;

    @Column(name = "agency_digit")
    private String agencyDigit;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = { "bankAccounts" }, allowSetters = true)
    private Bank bank;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public BankAccount id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescriptionName() {
        return this.descriptionName;
    }

    public BankAccount descriptionName(String descriptionName) {
        this.setDescriptionName(descriptionName);
        return this;
    }

    public void setDescriptionName(String descriptionName) {
        this.descriptionName = descriptionName;
    }

    public String getAccountNumber() {
        return this.accountNumber;
    }

    public BankAccount accountNumber(String accountNumber) {
        this.setAccountNumber(accountNumber);
        return this;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountDigit() {
        return this.accountDigit;
    }

    public BankAccount accountDigit(String accountDigit) {
        this.setAccountDigit(accountDigit);
        return this;
    }

    public void setAccountDigit(String accountDigit) {
        this.accountDigit = accountDigit;
    }

    public String getAgencyNumber() {
        return this.agencyNumber;
    }

    public BankAccount agencyNumber(String agencyNumber) {
        this.setAgencyNumber(agencyNumber);
        return this;
    }

    public void setAgencyNumber(String agencyNumber) {
        this.agencyNumber = agencyNumber;
    }

    public String getAgencyDigit() {
        return this.agencyDigit;
    }

    public BankAccount agencyDigit(String agencyDigit) {
        this.setAgencyDigit(agencyDigit);
        return this;
    }

    public void setAgencyDigit(String agencyDigit) {
        this.agencyDigit = agencyDigit;
    }

    public Bank getBank() {
        return this.bank;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }

    public BankAccount bank(Bank bank) {
        this.setBank(bank);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BankAccount)) {
            return false;
        }
        return getId() != null && getId().equals(((BankAccount) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BankAccount{" +
            "id=" + getId() +
            ", descriptionName='" + getDescriptionName() + "'" +
            ", accountNumber='" + getAccountNumber() + "'" +
            ", accountDigit='" + getAccountDigit() + "'" +
            ", agencyNumber='" + getAgencyNumber() + "'" +
            ", agencyDigit='" + getAgencyDigit() + "'" +
            "}";
    }
}
