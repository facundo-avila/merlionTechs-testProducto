package merliontechs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

import merliontechs.domain.enumeration.State;

/**
 * A Sales.
 */
@Entity
@Table(name = "sales")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sales implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private State state;

    @Column(name = "provider")
    private String provider;

    @Column(name = "delivery_date")
    private LocalDate deliveryDate;

    @Column(name = "paid")
    private Long paid;

    @Column(name = "full_payment")
    private Long fullPayment;

    @ManyToOne
    @JsonIgnoreProperties(value = "sales", allowSetters = true)
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public State getState() {
        return state;
    }

    public Sales state(State state) {
        this.state = state;
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    public String getProvider() {
        return provider;
    }

    public Sales provider(String provider) {
        this.provider = provider;
        return this;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public Sales deliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
        return this;
    }

    public void setDeliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public Long getPaid() {
        return paid;
    }

    public Sales paid(Long paid) {
        this.paid = paid;
        return this;
    }

    public void setPaid(Long paid) {
        this.paid = paid;
    }

    public Long getFullPayment() {
        return fullPayment;
    }

    public Sales fullPayment(Long fullPayment) {
        this.fullPayment = fullPayment;
        return this;
    }

    public void setFullPayment(Long fullPayment) {
        this.fullPayment = fullPayment;
    }

    public Product getProduct() {
        return product;
    }

    public Sales product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sales)) {
            return false;
        }
        return id != null && id.equals(((Sales) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sales{" +
            "id=" + getId() +
            ", state='" + getState() + "'" +
            ", provider='" + getProvider() + "'" +
            ", deliveryDate='" + getDeliveryDate() + "'" +
            ", paid=" + getPaid() +
            ", fullPayment=" + getFullPayment() +
            "}";
    }
}
