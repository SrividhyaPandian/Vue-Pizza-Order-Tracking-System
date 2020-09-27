<template>
    <v-container fluid class="menu-wrapper">
        <v-layout row wrap>
            <!-- Menu List -->
            <v-flex xs4 class="menu-main-wrapper">
                <v-card>
                    <h3>Menu Of The Day !!!</h3>
                    <p class="noteMsg">**Customers are limited to order only one quantity/Item from the menu due to availability constraints**</p>
                    <div v-for="(item, key) in listOfItems" :key="key" class="div-wrap">
                        <p>{{item.mainLabel}}</p>
                        <ul>
                            <li v-for="(data, datakey) in item.data" :key="datakey">
                                <v-checkbox 
                                :ripple=false
                                v-model="orderedItems"
                                :label="data.label + ', Rs.' + data.price"
                                :value="data.price"
                                :id="data.price"
                                :messages="data.hint"
                                ></v-checkbox>
                            </li>
                        </ul>
                    </div>
                </v-card>
            </v-flex>
            <!-- Order Details/Summary -->
            <v-flex xs8 class="form-wrapper" v-if="orderedItems.length">
                <v-card>
                    <h3 class="customH3">Order Details</h3>
                    <v-form
                    v-model="valid"
                    ref="form">
                        <v-text-field
                            :rules="[v => !!v || 'Name is required']"
                            v-model="customerName"
                            label="Customer Name"
                            required
                            id="customerName"
                        ></v-text-field>
                
                        <v-text-field
                            :value="orderedItems.length"
                            label="No Of Items Ordered"
                            readonly
                            id="noOfItems"
                        ></v-text-field>

                        <v-text-field
                            :value="sum(orderedItems)"
                            readonly
                            label="Total"
                            id="total"
                        ></v-text-field>
                        <v-btn class="customBtn backBtn" @click="back">back</v-btn>
                        <v-btn class="customBtn cancelBtn" @click="cancel">Cancel</v-btn>
                        <v-btn :disabled="!valid" class="customBtn confirmBtn" @click="orderConfirm">Confirm</v-btn>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>

export default {
    props: {
        listOfItems: [Array, Object]
    },
    data(){
        return{
            valid: false,
            orderedItems: [],
            customerName:'',
            total: '',
            details: {}
        }
    },
    methods:{
        sum(items) {
            // Order Total Amount Calculation
            if(items && items.length) {
                let numberArray = items.map(Number)
                this.total = numberArray.reduce((a, b) => a + b, 0)
                return this.total;
            }
        },
        orderConfirm(){
            // Order Details to be sent back to Order Track List
            if(this.valid) {
                this.details = {
                    name : this.customerName,
                    noOfItems: this.orderedItems.length,
                    totalAmount: 'Rs.'+ this.total,
                    status: 'Order Received'
                }
            this.$emit('confirmOrder', this.details)
           }
        },
        cancel(){
            // Cancellation of Order
            this.customerName = '';
            this.orderedItems = [];
            this.total = ''
        },
        back(){
            // Back to Order Track List
            this.$emit('backToList')
        }
    }
}
</script>