<template>
  <div>
    <div style="position: relative;">
      <Icon  style="position:absolute;top:10px;right:70px;z-index: 100;color: #0d78d6;font-size: 16px;" type="plus" @click="handleOnAdd" v-if="formdata.addBtnShow(data)"></Icon>
      <div v-for="(itemform) in formdata.groups" :key="itemform.prop">
        <FormItemGeneRate
          :formdata="itemform"
          :data="data"
          :selectData="selectData"
          :prop="itemform.prop"
        />
      </div>
    </div>
    <div v-if="formdata.show(data)">
      <div v-for="(listitem,idx) in groupList " :key="idx"  style="position: relative;">
        <Icon type="trash-a" @click="handleOnRm(idx)" style="position:absolute;top:10px;right:70px;z-index: 100;color: #dc1616;font-size: 16px;" ></Icon>
        <div v-for="(itemform) in formdata.groups" :key="itemform.prop">
          <FormItemGeneRate
            :formdata="itemform"
            :disabled="true"
            :data="listitem"
            :selectData="selectData"
            :prop="itemform.prop1"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormItemGeneRate from "../formgenerate/FormItemGeneRate";
export default {
  name: "FormGroup",
  components: {
    FormItemGeneRate: FormItemGeneRate
  },
  props: {
    formdata: Object,
    data: Object,
    selectData: Object,
    prop: String
  },
  data() {
    return {
      groupList: [],
      itemObj: {}
    };
  },
  created() {
    //    console.log(this.formdata)
    //    console.log(this.itemObj)
    this.itemObj = JSON.parse(JSON.stringify( {
      key: this.prop,
      value: this.data[this.prop][0]
    }));
    this.data[this.prop].pop()
  },
  watch: {
    formdata(val) {}
  },
  methods: {
    handleOnRm(idx) {
      const itemTemplateKey = this.itemObj.key;
       this.groupList.splice(idx, 1);
       this.data[itemTemplateKey].splice(idx, 1);
    },
    handleOnAdd() {
      const itemTemplateKey = this.itemObj.key;
      let itemTemplate = this.itemObj.value;

      for (let key in itemTemplate) {
        itemTemplate[key] = this.data[key];
      }
      let that = this;
      let isAdd = this.formdata.checkAdd({
        that,
        groupList: this.groupList,
        itemTemplate,
        selectData: this.selectData
      });
      if (isAdd && typeof isAdd != "function") {
        for (let key in itemTemplate) this.data[key] = "";
        this.groupList.push(JSON.parse(JSON.stringify(itemTemplate)));
        this.data[itemTemplateKey].push(JSON.parse(JSON.stringify(itemTemplate)))
      } else {
        isAdd();
      }
    }
  }
};
</script>
<style scoped>
   .ivu-icon:hover{
     transform: scale(1.2) rotate(2deg);
     cursor: pointer;
   }
</style>