<template>

    <h2 v-if="successPayment" class="t-center">
        successful payment
    </h2>
    <div v-else>
        <h1>Payment</h1>
        <div>
            <label for="cnum">Card Number</label>
            <input :class="{ 'border-error': !isCardNumberValid && cardNumber }" v-model.trim="cardNumber" type="text"
                id="cnum" name="cnum">
            <div v-if="!isCardNumberValid && cardNumber" class="error">error</div>
        </div>
        <div>
            <label for="expdate">Exp Date</label>
            <input :class="{ 'border-error': !isDateValid && expDate }" v-model="expDate" type="month"
                :min="getFutureMonths" id="expdate" name="expdate">
            <div v-if="!isDateValid && expDate" class="error">error</div>
        </div>
        <div>
            <label for="cvv">CVV</label>
            <input :class="{ 'border-error': !isCvvValid && cvv }" v-model="cvv" type="text" id="cvv" name="cvv">
            <div v-if="!isCvvValid && cvv" class="error">error</div>
        </div>
        <div>
            <label for="cname">Card Name</label>
            <input :class="{ 'border-error': !isCardNameValid && cardName }" v-model.trim="cardName" type="text"
                id="cname" name="cname">
            <div v-if="!isCardNameValid && cardName" class="error">error</div>
        </div>

        <button class="btn-light" :disabled="!checkValidation" @click="pay()">Pay</button>
    </div>
</template>

<script>
export default {
    name: 'payment',
    data() {
        return {
            cardName: '',
            cardNumber: '',
            expDate: '',
            cvv: '',
            successPayment: false
        }
    },
    computed: {
        checkValidation() {
            return this.isDateValid && this.expDate && this.isCardNumberValid && this.cardNumber && this.isCvvValid && this.cvv && this.isCardNameValid && this.cardName
        },
        isCardNumberValid() {
            const reg = new RegExp('^[0-9 ]*$', 'g');
            return reg.test(this.cardNumber) && this.cardNumber != ''
        },
        isDateValid() {
            // Date: YYYY-MM
            const isFutureYear = this.expDate.substring(0, this.expDate.indexOf('-')) >= new Date().getFullYear()
            const reg = new RegExp('^\\d{4}-(0?[1-9]|[12][0-9]|3[01])', 'g')
            return reg.test(this.expDate) && !isNaN(Date.parse(this.expDate)) && this.expDate != '' && isFutureYear
        },
        isCardNameValid() {
            const reg = new RegExp('^[a-zA-Z ]*$', 'g');
            return reg.test(this.cardName) && this.cardName != ''
        },
        isCvvValid() {
            const reg = new RegExp('^(\\d{3}|\\d{4})$', 'g')
            return reg.test(this.cvv) && this.cvv != ''
        },
        getFutureMonths() {
            return new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
        }
    },
    methods: {
        pay() {
            this.successPayment = true
        }
    },
};
</script>

<style scoped>
.border-error {
    border: var(--c-warn) solid 2px;
}

.error {
    color: var(--c-warn)
}

div {
    margin-bottom: 15px;
}
</style>