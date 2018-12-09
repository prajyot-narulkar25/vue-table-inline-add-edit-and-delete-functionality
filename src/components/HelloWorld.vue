<template>
    <div class="hello">
  <a-table :columns="columns" :dataSource="data" bordered>
    <template v-for="col in ['name', 'address']" :slot="col" slot-scope="text, record, index">
      <div>
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>{{text}}</template>
      </div>
    </template>
  </a-table>
        </div>
    </div>
</template>

<script>

const columns = [
{
  title: 'Name',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
},
{
  title: 'Address',
  dataIndex: 'address',
  scopedSlots: { customRender: 'address' },
}]
const data = []
for (let i = 0; i < 8; i++) {
  data.push({
     key: i.toString(),
    name: `Edrward ${i}`,
    address: `London Park no. ${i}`,
  })
}
export default {
  data () {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      data,
      columns,
    }
  },
}
</script>
<style scoped>


</style>
