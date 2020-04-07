const demo = {
    state: {
        info: ''
    },
    // 可以直接通过commit设置，不过还是建议dispatch
    mutations: {
        SET_INFO: (state, data) => {
            state.info = data;
        }
    },
    actions: {
        // 可以做异步处理
        setInfo({ commit }, data) {
            console.log(data);
            commit('SET_INFO', data);
        }
    }
};
export default demo;