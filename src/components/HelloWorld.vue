<template>
    <div class="hello">
      <h4>Table with inline Add,Edit and Delete operations with pagination</h4>
      <div class="container">
                   <div class="row ">
                    <div class="col-sm-8" >
                    <button class="btn btn-default icon-btn" :class="addClassname" 
                    v-on:click="changeadd" @click="handleAdd">
                      Add
                      </button>
                      <span class="p-1"></span>
                    <button class="btn btn-default icon-btn "
                     v-on:click="changedelete" @click="del()">
                      Delete
                      </button>
                      <span class="p-1"></span>
                    <button class="btn btn-default icon-btn " 
                     v-on:click="changeHidden" @click="edit()">
                      Edit
                      </button>
                    </div>
                    <div class="col-sm-4" >
                      <button type="button" class="btn btn-default"
                      v-if="isHidden" v-on:click="isHidden = !isHidden" @click="cancel()">Cancel</button>
                      <span class="p-1"></span>
                      <button type="button" class="btn btn-default" v-if="isHidden"
                     v-on:click="isHidden = !isHidden" @click="save()">Save</button>
                    </div>
                </div>
      
  <a-table :columns="columns" :dataSource="data">
    <template v-for="col in ['code', 'description']" :slot="col" slot-scope="text, record, index">
      <div>
        <a-input
          v-if="record.editable"
          style="margin: -5px 0;border-radius:5px;border-color: #bfbfbf;"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>{{text}}</template>
      </div>
    </template>
      <template v-if="isdelete" slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="onDelete(record.key)"><i class="fas fa-minus "></i></a>
      </template>
  </a-table>
        </div>
    </div>
</template>

<script>
const columns = [{
        title: '',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      },
      {
        title: 'Code',
        dataIndex: 'code',
        scopedSlots: { customRender: 'code' },
      }, 
      {
        title: 'Description',
        dataIndex: 'description',
        scopedSlots: { customRender: 'description' },
      }]
const data = []
for (let i = 0; i < 5; i++) {
  data.push({
     key: i.toString(),
    code: `code ${i}`,
    description: `description ${i}`,
  })
}
export default {
    props: {
    isHidden: Boolean,
    isdelete: Boolean,
    isadd:Boolean,
  },
    isHidden:false,
    isdelete:false,
    isadd:false,
  data () {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      data,
      columns,
    }
  },
  methods: {

    handleChange (value, key, column) {
        const newData = [...this.data]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
        target[column] = value
        this.data = newData
        }
    },
    edit () {
      var key;
          for (let i = 0; i < 6; i++) {
          var j=i.toString();
          key=j;
          const newData = [...this.data]
          const target = newData.filter(item => key === item.key)[0]
          if (target) {
          target.editable = true
          this.data = newData
          }
          else{
            this.data[(this.data.length-1)].editable=true;
          }
          }
    },
    save () {
         var key;
         this.isdelete=false;
         this.isHidden=false;
         this.isadd=false;
            for (let i = 0; i < 6; i++) {
            var j=i.toString();
            key=j;
            const newData = [...this.data]
            const target = newData.filter(item => key === item.key)[0]
            if (target) {
            delete target.editable
            this.data = newData
            this.cacheData = newData.map(item => ({ ...item }))
                }
            else{
                this.data[(this.data.length-1)].editable=false;
                data.push( this.data[(this.data.length-1)]);               
                }
            }
    },
    cancel () {
         var key;
         this.isdelete=false;
         this.isHidden=false;
         this.isadd=false;      
    for (let i = 0; i < 6; i++)
     {
        var j=i.toString();
        key=j;
        const newData = [...this.data]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
                Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
                delete target.editable
                this.data = newData
                  }
            else{
              this.data[(this.data.length-1)].editable=false;
              this.data[(this.data.length-2)].editable=false;
              this.data[(this.data.length-3)].editable=false;
              this.data = data.filter(item => item.key !== key)                    
            }
}
    },
  del () {
      this.isHidden=true;
      },
    handleAdd (value) {
        this.isHidden=true;
        var key;
        const data = this.data;
        var count=this.data.length;
        var newData = {
          key: count,
          code: ``,
          description: ``,
        }
        this.data = [...data, newData]
        key=count;
        this.count = count + 1;    
        newData = [...this.data]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target.editable = true;
          this.data = newData
        }
},
  changeHidden()
  {
    this.cancel();
    this.isHidden=true;
  },
  changedelete()
  {
    this.cancel();
    this.isdelete=true;
  },
  changeadd()
  {
    this.cancel();
    this.isadd=true;
  },
  onDelete(key)
  {
      const data = [...this.data]
      this.data = data.filter(item => item.key !== key)
  }
  },
}
</script>