<template>
  <div>
      <Form
         ref="data"
         :model="data"
         :label-width="100"
         :rules="setruleValidate"
         style="padding-left:40px"
      >  
         <div v-for="(formdata) in formDataEntity" :key="formdata.prop"> 
            <FormItemGeneRate v-if="formdata.type !== 'group'" :formdata="formdata" :data="data" :selectData="selectData" :prop="formdata.prop" />
            <FormGroup v-else :formdata="formdata" :data="data"  :selectData="selectData" :prop="formdata.prop"  />
         </div>
         <FormItem>
               <div v-for="(btn) in btnGroup" style="display:inline" :key="btn.key">
                  <Button v-if="btn.show(data)" :type="btn.type" :style="btn.style"   @click="handleOnclickProxy(btn)">{{btn.label}}</Button>
               </div>
         </FormItem>        
      </Form>
  </div>
</template>

<script>
import FormGroup from "../formgenerate/FormGroup";
import FormItemGeneRate from "../formgenerate/FormItemGeneRate"
export default {
  name: "FormGeneRate",
  components: {
     FormGroup:FormGroup,
     FormItemGeneRate:FormItemGeneRate
  },
  props: {
    chunk: Object,
    formDataEntity: Array,
    btnGroup: Array,
    detail:Object,
    selectData:Object
  },
  computed: {
    setFormDataEntity(){
        return this.formDataEntity
    },
    setruleValidate() {          
      return this.ruleValidate;
    }
  },

  data() {
   let geneData = {}
   let ruleValidate ={}
   if (this.formDataEntity){
      this.formDataEntity.map(obj => {
         geneData[obj.prop]=""
         if(obj.type==="group"){
             geneData[obj.prop]=[]
             let objprops={}
             obj.groups.map(o=>{
                objprops[o.prop]=""
                geneData[o.prop]=""
                ruleValidate[o.prop] = o.rule;
             })
             geneData[obj.prop].push(objprops)

         }
         // if(this.detail)
         //    geneData[obj.prop]=this.detail[obj.prop]
         
         ruleValidate[obj.prop] = obj.rule;
      })
    }
    return {
      data:geneData,
      formDataValue: {},
      ruleValidate:ruleValidate
    };
  },


  watch:{
     selectData(value){
     },
     detail(value){
      //   this.data = value
     }
  },

  methods: {

    handleOnCancel(){

         return this.$emit("colse",this)  
    },
    handleOnSubmit(btn){
      //   const formData={}
       let selectData = this.selectData
       let groupFlag = false
       const detail = this.detail
        this.formDataEntity.map(obj=>{
            if(obj.show(this.data)){
               //  formData[obj.prop] =this.data[obj.prop]
               if(obj.type ==="group"){
                     
                     if(obj.show(this.data)){
                        let items = this.data[obj.prop]
                        let groupList =[]
                        let itemEntity ={}
                        if(items.length==0){
                           obj.groups.map(o=>{
                              itemEntity[o.prop] = this.data[o.prop]
                              let processitem=o.process({data:this.data,selectData})
                              processitem.map(pikey=>{ 
                                   itemEntity[pikey.key] = pikey.value
                              })
                           })
                           this.data[obj.prop].push(itemEntity)
                        }else{
                           let itemEnti ={}
                           obj.groups.map(o=>{
                              itemEnti[o.prop] = this.data[o.prop]
                             
                           })
                           let that = this;
                           let isAdd =obj.checkAdd({
                              that,
                              groupList: items,
                              itemTemplate:itemEnti,
                              selectData:selectData
                           });

                           if (isAdd && typeof isAdd != "function") {
                              items.push(itemEnti)
                              for (let key in itemEnti) this.data[key] = "";
                           }else{
                              isAdd();
                              groupFlag=true
                           }
                           items.map((item)=>{
                              return obj.groups.map(o=>{
                                 this.data[o.prop] = item[o.prop]
                                 
                                 let processitem=o.process({data:this.data,selectData})
                                 processitem.map(pikey=>{ 
                                    item[pikey.key] = pikey.value
                                    groupList.push(item)
                                 })
                              })
            
                           })
                   
                          this.data[obj.prop]=[...groupList]  
         
                        }
                           
                     }
                     
                    detail[obj.prop] =this.data[obj.prop]
                    let processitem=obj.process({data:this.data,selectData})
                    processitem.map(pikey=>{ 
                        detail[pikey.key] = pikey.value
                   }) 
                  }else{
                     detail[obj.prop] =this.data[obj.prop]
                     let processitem=obj.process({data:this.data,selectData})
                     processitem.map(pikey=>{ 
                        detail[pikey.key] = pikey.value
                     }) 

                  }
            }else{
               if(obj.type ==="group"){
                     let itemEntity ={}
                     obj.groups.map(o=>{
                     if(o.show(this.data)){
                        itemEntity[o.prop] = this.data[o.prop]
                        let processitem=o.process({data:this.data,selectData})
                        processitem.map(pikey=>{ 
                           itemEntity[pikey.key] = pikey.value
                        })
                     }
                     this.data[obj.prop]=[itemEntity]  
                     }) 
               }
            }
        })


       this.$refs["data"].validate(valid => {
         if (valid&&!groupFlag) {
            this.data = detail
            return this.$emit("submit",this)
         }
       });
    },
    handleOnclickProxy(btn){
       let that = this
       if(btn.handleOnCancel){
           this.handleOnCancel()
       }else if(btn.handleOnSubmit){
           this.handleOnSubmit(btn)
       }else{
          btn.handleOnClick(that)
       }


    },
  

  },
  created() {
  },
  mounted() {
  }
};
</script>
<style scoped>
</style>
