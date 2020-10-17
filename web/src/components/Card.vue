<template>
        <div class="card bg-white p-3 mt-3">
      <div class="card-header d-flex ai-center "
    :class="{'border-bottom':!plain ,'pb-3':!plain}"
      >
        <i class="iconfont " :class="`icon-${icon}`"></i>
        <div class="fs-xl px-2 flex-1"><strong>{{title}}</strong></div>
        <i class="iconfont icon-menu" v-if="!plain"></i>
      </div>

      <div class="card-body pt-1">
          <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
        plain:{type:Boolean}
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/_variables.scss';
    .card{
/*         .card-header{
            border-bottom: 1px solid $border-color;
        } */
        border-bottom: 1px solid $border-color;
    }

</style>