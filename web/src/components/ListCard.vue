<template>
  <m-card :icon="icon" :title="title">
    <div class="card-body pt-3">
      <div class="nav jc-between">
        <div class="nav-item" :class="{active: active === i}"
        v-for="(category,i) in categories" :key="i"
        @click="$refs.list.swiper.slideTo(i)">
          <div class="nav-link">{{category.name}}</div>
        </div>

      </div>

      <div class="pt-2">
        <swiper ref="list" :options="{autoHeight:true}"
        @slide-change="()=>active =$refs.list.swiper.activeIndex">
          <swiper-slide v-for="(category,i) in categories" :key="i">
            <!-- <div class="py-2" v-for="n in 5" :key="n"></div> -->
            <slot name="items" :category="category"></slot>

          </swiper-slide>
        </swiper>
      </div>
    </div>
  </m-card>
</template>

<script>
export default {
    props:{
        icon:{type:String,required:true},
        title:{type:String,required:true},
        categories:{type:Array,required:true},
    },
    data(){
        return{
            active:0
        }
    }
}
</script>