document.addEventListener('DOMContentLoaded', async function () {
    const {createApp} = Vue
    createApp({
        mixins: [helpersMixin],
        data() {
            return {
                data: [],
                managers: [],
                modal: null,
                current: {
                    id: "",
                    name: "",
                    fund_manager_id: "",
                    start: ""
                },
                currentAlias: {
                    fund_id: "",
                    name:"",
                    aliases: []
                },
                aliasModal: null,
            }
        },
        mounted() {
            this.aliasModal = new bootstrap.Modal(document.getElementById('aliasModal'));
        },
        async created() {
            this.fetchData();
            const response = await fetch(API_BASE_URL + "manager");
            const jsonData = await response.json();
            if (jsonData.status !== 200) {
                this.handleMessage(false, jsonData.message);
                return;
            }
            this.managers = jsonData.data;
        },
        methods: {
            async fetchData() {
                const response = await fetch(API_BASE_URL + "fund");
                const jsonData = await response.json();
                if (jsonData.status !== 200) {
                    this.handleMessage(false, jsonData.message);
                    return;
                }

                console.log(jsonData);
                this.data = jsonData.data;

            },
           async fetchAlias(){
                const response = await fetch(API_BASE_URL +"fund/" + this.currentAlias.fund_id +"/alias");
                const jsonData = await response.json();
                if (jsonData.status !== 200) {
                    this.handleMessage(false, jsonData.message);
                    return;
                }
                this.currentAlias.aliases = jsonData.data
            },
            resetFields() {
                this.current.id = "";
                this.current.name = "";
                this.current.manager = "";
                this.current.start = "";
            },
            editClicked(obj) {
                this.showModal();
                this.current.id = obj.id;
                this.current.name = obj.name;
                this.current.fund_manager_id = obj.fund_manager_id;
                this.current.start = this.formatDate(obj.start_year);
            },
            async aliasClicked(fund_id) {
                this.currentAlias.fund_id = fund_id;
                this.aliasModal.show();
               this.fetchAlias();
            },
            formatDate(date) {
                return moment(date).format('YYYY-MM-DD');
            },
            async saveClicked() {
                const method = this.current.id === "" ? "POST" : "PUT";
                const resource = this.current.id !== "" ? ("/" + this.current.id) : "";
                const response = await fetch(API_BASE_URL + "fund" + resource, {
                    method: method,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.current),
                });

                const jsonData = await response.json();
                if (jsonData.status !== 200) {
                    this.handleMessage(false, jsonData.message);
                    return;
                }

                this.handleMessage(true, jsonData.message);

                this.fetchData();
                this.hideModal();
            },
            async deleteClicked(id) {
                const response = await fetch(API_BASE_URL + "fund/" + id, {
                    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                    headers: {"Content-Type": "application/json"},
                });

                const jsonData = await response.json();
                if (jsonData.status !== 200) {
                    this.handleMessage(false, jsonData.message);
                    return;
                }

                this.handleMessage(true, jsonData.message);


                this.fetchData();
            },

            async saveAliasClicked() {
                const response = await fetch(API_BASE_URL + "fund/alias/" + this.currentAlias.fund_id, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        name: this.currentAlias.name
                    }),
                });

                const jsonData = await response.json();
                if (jsonData.status !== 200) {
                    this.handleMessage(false, jsonData.message);
                    return;
                }

                this.handleMessage(true, jsonData.message);

                this.fetchAlias();
                this.hideModal();
            },
            async deleteAliasClicked(id) {
                const response = await fetch(API_BASE_URL + "fund/alias/" + id, {
                    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                    headers: {"Content-Type": "application/json"},
                });

                const jsonData = await response.json();
                if (jsonData.status !== 200) {
                    this.handleMessage(false, jsonData.message);
                    return;
                }

                this.handleMessage(true, jsonData.message);


                this.fetchAlias();
            }
        }
    }).mount('#app')
}, false);