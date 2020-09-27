<template>
    <div class="table-wrapper">
        <v-data-table
            :headers="tableData.headers"
            :items="tableData.data"
            hide-actions
            item-key="id"
            no-data-text="All orders Delivered Happily !!!"
        >
        <template v-slot:items="props">
            <tr :item-key="props.index">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.noOfItems }}</td>
                <td>{{ props.item.totalAmount }}</td>
                <td class="status">
                    <v-btn class="statusBtn" 
                        @click="changeStatus(props.item)"
                        :class="{'received': props.item.status==='Order Received', 
                        'preparing': props.item.status==='Order Preparing',
                        'ready': props.item.status==='Ready to Serve'}">
                        {{ props.item.status }}
                    </v-btn>
                    <span class="deleteIcon" @click="deleteItem(props)" v-if="props.item.status === 'Ready to Serve'"><v-icon>delete</v-icon></span>
                </td>
            </tr>
        </template>
        </v-data-table>  
    </div>
</template>

<script>

export default {
    name: "tableComp",
    props: {
        tableData: [Object, Array]
    },
    methods: {
        changeStatus(item) {
           this.$emit('changeStatus', item)
        },
        deleteItem(item) {
            this.$emit('deleteItem', item)
        }
    }
}
</script>
