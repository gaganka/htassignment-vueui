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
              @click="incrementCount($event,inv.unitPrice,inv.productId)" v-show="itemsCount < 6">+</button>
      <hr/>   
    </div>
  </div>

  <div class="row" v-show="itemsCount >= 1">
    <div class="col-sm-1">
      $1<br/>
      <button class="btn btn-outline-success rounded-circle"
              @click="addCredit($event,1)" v-show="creditAmount < orderTotal">+</button>      
    </div>
    <div class="col-sm-1">
      0.25<br/>
      <button class="btn btn-outline-success rounded-circle"
              @click="addCredit($event,0.25)" v-show="creditAmount < orderTotal">+</button>      
    </div>
    <div class="col-sm-1">
      0.10<br/>
      <button class="btn btn-outline-success rounded-circle"
              @click="addCredit($event,0.10)" v-show="creditAmount < orderTotal">+</button>      
    </div>
    <div class="col-sm-1">
      0.5<br/>
      <button class="btn btn-outline-success rounded-circle"
              @click="addCredit($event,0.05)" v-show="creditAmount < orderTotal">+</button>      
    </div>
  </div>
  
  <hr/>

  <div class="row">
    <div class="col-sm-1"><button class="btn btn-lg btn-success" @click="newOrder()" :disabled='itemsCount === 0'>Buy</button></div>
    <div class="col-sm-1"><button class="btn btn-lg btn-danger" @click="clearSelection()" :disabled='itemsCount === 0'>Clear</button></div>
    <div class="col-sm-3"><h4>Selected Items {{itemsCount}}</h4></div>
    <div class="col-sm-3"><h4>Order Total {{orderTotal}}</h4></div>
  </div>

</div>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
  orderTotal = 0;
  creditAmount = 0;
  public inventory: any[] = [];
  private salesOrder!: salesOrder;

  //Mock data
  private orderDetailsMock: orderDetails[] = [
    // {orderId: 0, productId: 1, quantity: 2, lineItemTotal: 3, orderDate: "2021-03-06"},
    // {orderId: 0, productId: 4, quantity: 1, lineItemTotal: 1, orderDate: "2021-03-06"}

    {orderId: 0, productId: 2, quantity: 1, lineItemTotal: 1.75, orderDate: "2021-03-06"},
    {orderId: 0, productId: 3, quantity: 1, lineItemTotal: 1.50, orderDate: "2021-03-06"}
  ];

  private vendOrder: orderDetails[] = [];
  private orderPayment!: paymentDetails;

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

  @Watch("itemsCount")
  onitemsCountChanged(){
    if(this.itemsCount === 6){
      alert('max selection');
    }
  }

  mounted(){
    this.retrieveProducts();
    console.log('mounted');
  }

  incrementCount(event: any,unitPrice: any, productId: any){
    if(this.itemsCount == 6){
      this.itemsCount = 0;
    }
    this.itemsCount++;
    this.orderTotal += unitPrice;

    const existinRow = this.vendOrder.find(o=>o.productId === productId);
    const exIndex = this.vendOrder.findIndex(o=>o.productId === productId);

    if(existinRow != undefined){
      existinRow.quantity +=1;
      existinRow.lineItemTotal += unitPrice;
      this.vendOrder[exIndex] = existinRow;
    }
    else{
      this.vendOrder.push({
        orderId: 0,
        productId: productId,
        quantity: 1,
        orderDate: new Date().toDateString(),
        lineItemTotal: unitPrice
      });
    }

    console.log(JSON.stringify(this.vendOrder));
  }

  addCredit(event: any, amount: any){
    this.creditAmount += amount;
    console.log("Credits: " + this.creditAmount);
  }

  clearSelection(){
    if(confirm('Clear your selection?')){
      this.itemsCount = 0;
      this.orderTotal = 0;
      this.vendOrder = [];
      this.creditAmount = 0;
    }    
    ///clear the selected items as well
  }

  newOrder(){  
    if(confirm('Place order?')){

    this.orderPayment = {
      paymentId: 0, 
      amount: this.orderTotal, 
      amountPaid: this.orderTotal, 
      paymentDate: "2021-03-06", 
      amountReturned: 0
    }

    //alert('Order created with Mock data');
    this.salesOrder = {
      orderDetails: this.vendOrder,
      paymentDetails: this.orderPayment
    };

    console.log(JSON.stringify(this.salesOrder));

    NewOrderCommandService.newOrder(this.salesOrder)
    .then((response: any) => {        
        console.log(JSON.stringify(response.data));
        if(response.data.isSuccess === true){
          alert('Success!!!\nPlease collect your items!!');

          this.itemsCount = 0;
          this.orderTotal = 0;
          this.vendOrder = [];          
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
  
}
</script>

