<template>
    <div>
        <h1>TESTING CRUD</h1>
        

        <b-container class="bv-example-row">
            
            <b-row>
                <b-col lg="6" class="my-1">
                    <b-form-group
                    label="Filter"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="filterInput"
                    class="mb-0"
                    >
                    <b-input-group size="sm">
                        <b-form-input
                        v-model="filter"
                        type="search"
                        id="filterInput"
                        placeholder="Type to Search"
                        ></b-form-input>
                        <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col lg="6" class="my-1">
                    <b-button variant="success" v-b-modal.modal-add-test>Add Test Item</b-button>
                </b-col>
            </b-row>
            <br>
            <b-row class="justify-content-md-center">
                <b-col>
                    <b-table striped hover 
                        :fields="column" 
                        :items="testItems"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        @filtered="onFiltered"
                    >
                        <template v-slot:cell(actions)="data">
                            <div class="table-button-container">
                                <b-button variant="danger" size="sm" @click.prevent="deleteTest(data.item._id)">DELETE</b-button> &nbsp;
                                <b-button v-b-modal.updatebus-modal-tall size="sm" @click="viewTestInModal(data.item, data.index, $event.target)">UPDATE</b-button>
                            </div>
                        </template> 
                    </b-table>
                </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
                <b-col sm="5" md="6" class="my-1">
                    <b-form-group
                    label="Per page"
                    label-cols-lg="2"
                    label-align-sm="left"
                    label-size="sm"
                    label-for="perPageSelect"
                    class="mb-0"
                    >
                    <b-form-select
                        v-model="perPage"
                        id="perPageSelect"
                        size="sm"
                        :options="pageOptions"
                    ></b-form-select>
                    </b-form-group>
                </b-col>

                <b-col sm="7" md="6" class="my-1">
                    <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                    ></b-pagination>
                </b-col>
            </b-row>

        </b-container>

        <b-modal :id="infoModal.id" :title="infoModal.title"  @ok="updateTest()">
            <!-- <pre>{{ infoModal.content }}</pre> -->
            <b-form-group label="Name: ">
                <b-form-input v-model="testUpdate.name" name="name" type="text" placeholder="Enter name"></b-form-input>
            </b-form-group>
            <b-form-group label="Description: ">
                <b-form-textarea
                id="textarea"
                v-model="testUpdate.description"
                placeholder="Enter description..."
                rows="3"
                max-rows="6"
                ></b-form-textarea>
            </b-form-group>
            <template v-slot:modal-footer="{ cancel, ok }">
                <b-button size="sm" variant="success" @click="ok()">
                    Update
                </b-button>
                <b-button size="sm" variant="danger" @click="cancel()">
                    Cancel
                </b-button>
            </template>
        </b-modal>

        <b-modal id="modal-add-test" title="BootstrapVue" @ok="addTest(test)">
            <b-form-group label="Name: ">
                <b-form-input v-model="test.name" name="name" type="text" placeholder="Enter name"></b-form-input>
            </b-form-group>
            <b-form-group label="Description: ">
                <b-form-textarea
                id="textarea"
                v-model="test.description"
                placeholder="Enter description..."
                rows="3"
                max-rows="6"
                ></b-form-textarea>
            </b-form-group>
            <template v-slot:modal-footer="{ cancel, ok }">
                <b-button size="sm" variant="success" @click="ok()">
                    Add
                </b-button>
                <b-button size="sm" variant="danger" @click="cancel()">
                    Cancel
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('test')
const vm = this

export default {
    name:"Test",
    data(){
        return {
            column: [
                    {
                        key: "_id",
                        sortable: true,
                        label: "Id",
                        class: "text-left options-column"
                    },
                    {
                        key: "name",
                        sortable: true,
                        label: "Name",
                        class: "text-left options-column"
                    },
                    {
                        key: "description",
                        sortable: true,
                        label: "Description",
                        class: "text-left options-column"
                    },
                    'Actions'
                ],
            infoModal: {
                    id: 'info-modal',
                    title: '',
                    content: ''
            },
            test : {
                name:'oalalal',
                description: 'walalallalal'
            },
            testUpdate : {
                _id : '',
                name:'',
                description: ''
            },
            totalRows: 1,
            currentPage: 1,
            perPage:5,
            pageOptions: [5,10,15],
            filter: null,
            filterOn: [],
            
        }
    },
	computed : {
        ...mapGetters(['testItems','testing','testLength']),
        sortOptions() {
            return this.fields
            .filter(f => f.sortable)
            .map(f => {
                return { text: f.label, value: f.key }
            })
        }
    },
    mounted() {
       this.getAllTestAsync()
       this.totalRows = this.testLength
    },
	methods: {
    ...mapActions(['getAllTestAsync','addTestAsync','deleteTestAsync','updateTestAsync']),
        addTest(test){
            this.addTestAsync(test)
        },
        viewTestInModal(item, index, button) {
            this.testUpdate._id = item._id;
            this.testUpdate.name = item.name;
            this.testUpdate.description = item.description;
            this.infoModal.title = `Row index: ${index}`
            this.infoModal.content = JSON.stringify(item, null, 2)
            this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        },
        async updateTest() {
            await this.updateTestAsync(this.testUpdate)
        },
        deleteTest(testID) {
            this.deleteTestAsync(testID)
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        }
    }
}
</script>

<style>
    .column-width { 
       max-width: 150px; 
    }
    .select-width {
        max-width: 70px;
    }
</style>