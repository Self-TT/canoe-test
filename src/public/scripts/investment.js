document.addEventListener('DOMContentLoaded', async function () {
    const {createApp} = Vue
    createApp({
        mixins: [helpersMixin],
        data() {
            return {
                data: [],
                modal: null,
                current: {
                    fund_id: 0,
                    company_id: 0,
                },
                funds: [],
                companies:[]
            }
        },
        async created() {
            this.fetchData();

            // fetch funds
            let response = await fetch(API_BASE_URL + "fund");
            let jsonData = await response.json();
            if (jsonData.status !== 200){
                this.handleMessage(false, jsonData.message);
                return;
            }
            this.funds = jsonData.data;

            // fetch companies
            response = await fetch(API_BASE_URL + "company");
            jsonData = await response.json();
            if (jsonData.status !== 200){
                this.handleMessage(false, jsonData.message);
                return;
            }

            this.companies = jsonData.data;
        },
        methods: {
            async fetchData() {
                const response = await fetch(API_BASE_URL + "investment");
                const jsonData = await response.json();
                if (jsonData.status !== 200){
                    this.handleMessage(false, jsonData.message);
                    return;
                }


                this.data = jsonData.data;

            },
            resetFields(){
              this.current.fund_id = 0;
              this.current.company_id = 0;
            },
            editClicked(company) {
                this.showModal();
                this.current.id = company.id;
                this.current.name = company.name;
            },
            async saveClicked() {
                const response = await fetch(API_BASE_URL + "investment", {
                    method: "POST",
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
                const response = await fetch(API_BASE_URL + "investment/" + id, {
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