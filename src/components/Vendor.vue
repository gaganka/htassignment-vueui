<template>
  <div>
  <div class="row">
    <h4>{{ msg }}</h4> 
    </div>
<!--   <div class="row">
  <div class="col-sm">{{products.productid}}</div>
  <div class="col-sm">{{products.name}}</div>
  <div class="col-sm">{{products.unitprice}}</div>
  <div class="col-sm"><img v-bind:src="require('../assets/' + products.imageurl)" alt="" width="55"></div>
  </div>    
  <hr/>
  <div class="row">
  <div class="col-sm">{{lrprb[1].productid}}</div>
  <div class="col-sm">{{lrprb[1].name}}</div>
  <div class="col-sm">{{lrprb[1].unitprice}}</div>
  <div class="col-sm"><img v-bind:src="require('../assets/' + lrprb[1].imageurl)" alt="" width="55"></div>
  </div>  -->     
  <div class="row">
    <div class="col-sm-4 text-center" 
    v-for="(inv, index) in inventory"
    :key="index">
      <img v-bind:src="require('../assets/' + inv.imageUrl )" alt="" width="55"> <br/>
      {{inv.name}}<br/>
      {{inv.unitPrice}}<br/>
      <button class="btn btn-outline-success rounded-circle"
              @click="incrementCount()">+</button>
      <hr/>   
    </div>
  </div>

  <div class="row">
    <div class="col-sm-1"><button class="btn btn-lg btn-success" @click="newOrder()">Buy</button></div>
    <div class="col-sm-1"><button class="btn btn-lg btn-danger" @click="clearSelection()">Clear</button></div>
    <div class="col-sm-3"><h4>Selected Items {{itemsCount}}</h4></div>
  </div>

</div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
//import {ProductQueryModel} from '../models/product-query-model';
import QueryDataService from '../services/query-data-service';
import NewOrderCommandService from '../services/new-order-command-service';

import {salesOrder} from '../models/sales-order';
import { orderDetails } from "../models/order-detail";
import { paymentDetails } from "../models/payment-details";

@Component
export default class Vendor extends Vue {
  @Prop() private msg!: string;
  itemsCount = 0;
  public inventory: any[] = [];
  private salesOrder!: salesOrder;

  //Mock data
  private orderDetailsMock: orderDetails[] = [
    // {orderId: 0, productId: 1, quantity: 2, lineItemTotal: 3, orderDate: "2021-03-06"},
    // {orderId: 0, productId: 4, quantity: 1, lineItemTotal: 1, orderDate: "2021-03-06"}

    {orderId: 0, productId: 2, quantity: 1, lineItemTotal: 1.75, orderDate: "2021-03-06"},
    {orderId: 0, productId: 3, quantity: 1, lineItemTotal: 1.50, orderDate: "2021-03-06"}
  ];
  //Mock data
  private paymentDetailsMock: paymentDetails = {
    paymentId: 0, amount: 4, amountPaid: 4, paymentDate: "2021-03-06", amountReturned: 0
    }
  
    retrieveProducts() {
    QueryDataService.getAll()
      .then((response: any) => {
        this.inventory = response.data.data;
        console.log(this.inventory);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  mounted(){
    this.retrieveProducts();
    console.log('mounted');
  }

  incrementCount(){
    if(this.itemsCount == 6){
      this.itemsCount = 0;
    }
    this.itemsCount++;
  }

  clearSelection(){
    this.itemsCount = 0;
    ///clear the selected items as well
  }

  newOrder(){  

    alert('Order created with Mock data');
    this.salesOrder = {
      orderDetails: this.orderDetailsMock,
      paymentDetails: this.paymentDetailsMock
    };

    console.log(JSON.stringify(this.salesOrder));

    NewOrderCommandService.newOrder(this.salesOrder)
    .then((response: any) => {        
        console.log(JSON.stringify(response.data));
        if(response.data.isSuccess === true){
          alert('Success!!!\nPlease collect your items!!');
        }
        else{
          alert('Sorry an error occured');
        }
        
      })
      .catch((e: any) => {
        console.log(e);
      });

  }
  
}
</script>

