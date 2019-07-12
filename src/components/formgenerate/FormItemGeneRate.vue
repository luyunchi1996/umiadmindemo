<template>
  <FormItem
    v-if="formdata.show(data)"
    :label="formdata.label"
    :prop="dataProp"
  >
    <Input
      v-if="formdata.type==='input'"
      v-model.trim="data[dataProp]"
      class="bs-form-input"
      @on-change="(val)=>handleonChangeProxy(val,formdata)"
      :placeholder="formdata.placeholder"
      :disabled="disabled"
    />
    <Select
      v-if="formdata.type==='select'"
      v-model="data[dataProp]"
      class="bs-form-select"
      clearable
      @on-change="(val)=>handleonChangeProxy(val,formdata)"
      :placeholder="formdata.placeholder"
      :disabled="disabled"
    >
      <Option
        v-for="item in selectData[formdata.prop]"
        :value="item.id"
        :key="item.id"
      >{{item.code}}</Option>
    </Select>
  </FormItem>
</template>
<script>
export default {
  name: "FromItemGeneRate",
  components: {},
  props: {
    name:String,
    idx:Number,
    formdata: Object,
    data:Object,
    selectData: Object,
    prop:String,
    renderType:String,
    disabled:Boolean
  },
  data() {
    return {
       dataProp:this.formdata.prop
    };
  },
  created(){
    if(this.renderType ==="group"){
        this.dataProp = this.prop
    }
  },
  methods: {
    handleonChangeProxy(val,obj){
      let value =""
      if( val instanceof Event)
          value= val.currentTarget.value
      else
          value = val
       if(this.renderType ==="group"){
          this.data[this.name][this.idx][obj.prop] =obj.handleonChange(value)
          this.data[this.prop] = this.data[this.name][this.idx][obj.prop]
       }else{
          this.data[obj.prop] =obj.handleonChange(value)
       }
       
    }

  }
};
</script>
