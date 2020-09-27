<template>
    <v-container fluid class="custom-wrapper">
        <v-layout row wrap>
            <!-- Order Tracking Section -->
            <v-flex xs12 class="trackList-wrapper" v-if="activeSection === 'OrderTrackList'">
                <div class="heading" xs12>
                    <p class="title">Welcome to Pizza Corner !!!</p>
                </div>
                <v-card class="table-card">
                    <div class="sub">
                        <p>Order Track List</p>
                        <v-btn @click="goToMenu" class="customBtn newOrder-btn">New Order <span><v-icon>add_circle_outlines</v-icon></span></v-btn>
                    </div>
                    <table-comp 
                        @changeStatus="changeStatus"
                        @deleteItem="deleteItem"
                        :tableData="defaultOrders">
                    </table-comp>
                </v-card>
            </v-flex>
            <!-- Menu/Order Details Section -->
            <v-flex xs12 class="newOrderMenu-wrapper" v-if="activeSection === 'menuList'">
                <menu-list 
                :listOfItems="listOfItems"
                @confirmOrder="confirmOrder"
                @backToList="activeSection = 'OrderTrackList'"
                ></menu-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import tableComp from './custom/tableComp';
import menuList from './custom/orderForm';

export default {
    name:"pizzaTrackList",
    components: {tableComp, menuList},
    data(){
        return{
            activeSection: '',
            defaultOrders: [],
            listOfItems: []
        }
    },
    created(){
        this.activeSection = 'OrderTrackList';
        // Default Orders Data
        this.$http.get('./contents/mock/defaultOrders.json').then((response)=> {
            if(response) {
                this.defaultOrders = response.data;
            }
        })
        // Menu List Data
        this.$http.get('./contents/mock/listOfItem.json').then((response)=> {
            if(response) {
                this.listOfItems = response.data;
            }
        })
    },
    methods:{
        changeStatus(item) {
            // Changing of Order Status in Order Tracker List
            if(item.status === 'Order Received') {
                item.status = 'Order Preparing'
            } else if(item.status === 'Order Preparing') {
                item.status = 'Ready to Serve'
            }
        },
        deleteItem(data) {
            // Deleting "Ready To Serve" Items from Track List
            this.defaultOrders.data.forEach((element, index) => {
                if(element.id === data.item.id) {
                    this.defaultOrders.data.splice(index, 1);
                }
            });
        },
        goToMenu() {
            this.activeSection = 'menuList'
        },
        confirmOrder(details) {
            // Order Confirmation on Click of Confirm Button in Order Details
            this.defaultOrders.data && this.defaultOrders.data.length 
            ? details.id = this.defaultOrders.data[this.defaultOrders.data.length - 1].id + 1 
            : details.id = '100';
            this.defaultOrders.data.push(details)
            this.activeSection = 'OrderTrackList'
        }
    }

}
</script>