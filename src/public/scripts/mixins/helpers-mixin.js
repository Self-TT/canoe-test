const helpersMixin = {
    data() {
        return {
            success:"",
            error:"",
            modal: null,
        }
    },
    mounted() {
        this.modal = new bootstrap.Modal(document.getElementById('modal'));
    },
    methods:{
        showModal(cb) {
            this.modal.show();
            if(cb)
                cb();
        },
        hideModal() {
            this.modal.hide();
        },
        handleMessage(isSuccess, message) {
            isSuccess ? (this.success = message) : (this.error = message)
            setTimeout(() => {
                isSuccess ? (this.success = "") : (this.error = "")
            }, 7000)
        },
    }
}
