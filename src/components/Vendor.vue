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
    <div class="col-sm-1"><button class="btn btn-lg btn-success">Buy</button></div>
    <div class="col-sm-1"><button class="btn btn-lg btn-danger">Clear</button></div>
    <div class="col-sm-3"><h4>Selected Items {{itemsCount}}</h4></div>
  </div>

</div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
//import {ProductQueryModel} from '../models/product-query-model';
import QueryDataService from '../services/query-data-service';

@Component
export default class Vendor extends Vue {
  @Prop() private msg!: string;
  itemsCount = 0;
  public inventory: any[] = [];

    retrieveTutorials() {
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
    this.retrieveTutorials();
    console.log('mounted');
  }

  incrementCount(){
    if(this.itemsCount == 6){
      this.itemsCount = 0;
    }
    this.itemsCount++;
  }
  
}
</script>

