const axios = require('axios')
const url = process.env.VUE_APP_API_URL+'/tests'

const state = {
    tests: [],
    test : ["oallalala","dfasd"]
}

const getters = {
    testItems: (state,getters) => {
        return state.tests
    },
    testing: (state) => {
        return state.test
    },
    testLength: (state) => {
        return state.tests.length
    }
}

const mutations = {
    SET_TESTS_ITEMS (state, { tests }) {
        state.tests = tests
    },
    TEST_ADDED (state, { test }) {
        state.tests = [...state.tests,  test];
    },
    TEST_DELETED (state, { testID }) {
        state.tests = state.tests.filter(testItem => testItem._id !== testID)
    },
    TEST_UPDATED (state, { test }) {
        var foundIndex = state.tests.findIndex(x => x._id == test._id);
        state.tests[foundIndex].name = test.name;
        state.tests[foundIndex].description = test.description;
    }
}

const actions = {
    async getAllTestAsync({ commit }){
        await axios.get(url)
        .then((resp) =>{
            commit('SET_TESTS_ITEMS',{ tests: resp.data})
        })
        .catch(function (error) {
            console.log(error);
        })
    },
    async addTestAsync({ commit }, test){       
        await axios.post(url,test)
        .then((resp) =>{
            console.log(resp)
            commit('TEST_ADDED',{ test: resp.data})
        })
        .catch(function (error) {
            console.log(error);
        })
    },
    async deleteTestAsync({ commit }, testID){     
        await axios.delete(url,{ data: { _id: testID}})
        .then((resp) =>{
            console.log(resp)
            commit('TEST_DELETED',{ testID: testID})
        })
        .catch(function (error) {
            console.log(error);
        })
    },
    async updateTestAsync({ commit }, test){  
        await axios.put(url,test)
        .then((resp) =>{
            console.log(resp)
            commit('TEST_UPDATED',{ test: test})
        })
        .catch(function (error) {
            console.log(error);
        })
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
