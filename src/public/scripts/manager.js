document.addEventListener('DOMContentLoaded', async function () {
    const {createApp} = Vue
    createApp({
        mixins: [helpersMixin],
        data() {
            return {
                data: [],
                modal: null,
                current: {
                    id: "",
                    name: "",
                },
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            async fetchData() {
                const response = await fetch(API_BASE_URL + "manager");
                const jsonData = await response.json();
                if (jsonData.status !== 200){
                    this.handleMessage(false, jsonData.message);
                    return;
                }


                this.data = jsonData.data;

            },
            resetFields(){
              this.current.id = "";
              this.current.name = "";
            },
            editClicked(company) {
                this.showModal();
                this.current.id = company.id;
                this.current.name = company.name;
            },
            async saveClicked() {
                const method = this.current.id === "" ? "POST" : "PUT";
                const resource = this.current.id !== "" ? ("/" + this.current.id) : "";
                const response = await fetch(API_BASE_URL + "manager" + resource, {
                    method: method,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.current),
                });

                const jsonData = await response.json();
                if (jsonData.status !== 200){
                    this.handleMessage(false, jsonData.message);
                    return;
                }

                this.handleMessage(true, jsonData.message);

                this.fetchData();
                this.hideModal();
            },
            async deleteClicked(id) {
                const response = await fetch(API_BASE_URL + "manager/" + id, {
                    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                    headers: {"Content-Type": "application/json"},
                });

                const jsonData = await response.json();
                if (jsonData.status !== 200){
                    this.handleMessage(false, jsonData.message);
                    return;
                }

                this.handleMessage(true, jsonData.message);


                this.fetchData();
            }
        }
    }).mount('#app')
}, false);