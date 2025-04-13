package br.com.heimdall.domain;

import br.com.heimdall.domain.enumeration.BankTypeEnum;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Bank.
 */
@Entity
@Table(name = "bank")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Bank implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "description_name")
    private String descriptionName;

    @Enumerated(EnumType.STRING)
    @Column(name = "bank_type")
    private BankTypeEnum bankType;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "bank")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "bank" }, allowSetters = true)
    private Set<BankAccount> bankAccounts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Bank id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescriptionName() {
        return this.descriptionName;
    }

    public Bank descriptionName(String descriptionName) {
        this.setDescriptionName(descriptionName);
        return this;
    }

    public void setDescriptionName(String descriptionName) {
        this.descriptionName = descriptionName;
    }

    public BankTypeEnum getBankType() {
        return this.bankType;
    }

    public Bank bankType(BankTypeEnum bankType) {
        this.setBankType(bankType);
        return this;
    }

    public void setBankType(BankTypeEnum bankType) {
        this.bankType = bankType;
    }

    public Set<BankAccount> getBankAccounts() {
        return this.bankAccounts;
    }

    public void setBankAccounts(Set<BankAccount> bankAccounts) {
        if (this.bankAccounts != null) {
            this.bankAccounts.forEach(i -> i.setBank(null));
        }
        if (bankAccounts != null) {
            bankAccounts.forEach(i -> i.setBank(this));
        }
        this.bankAccounts = bankAccounts;
    }

    public Bank bankAccounts(Set<BankAccount> bankAccounts) {
        this.setBankAccounts(bankAccounts);
        return this;
    }

    public Bank addBankAccount(BankAccount bankAccount) {
        this.bankAccounts.add(bankAccount);
        bankAccount.setBank(this);
        return this;
    }

    public Bank removeBankAccount(BankAccount bankAccount) {
        this.bankAccounts.remove(bankAccount);
        bankAccount.setBank(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bank)) {
            return false;
        }
        return getId() != null && getId().equals(((Bank) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bank{" +
            "id=" + getId() +
            ", descriptionName='" + getDescriptionName() + "'" +
            ", bankType='" + getBankType() + "'" +
            "}";
    }
}
