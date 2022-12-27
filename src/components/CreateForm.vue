<template>
    <div>
        <div class="modal_background"></div>
        <div class="modal">
            <div class="close">
                <!-- Create Update Modalni o'chirib datalarni o'chiradi -->
                <button @click="() => {$emit('closeModal'), formData = {}, formDataProps = {}}">x</button>
            </div>
            <div class="modal_contant">
                <h2>Create TODO</h2>
                <input v-model="formData.title" type="text" placeholder="Todo Title"/>
                <p v-if="errorMSG" style="color: red; margin: 5px 0 -15px 0;">Fill the input</p>
                <button @click="save">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        formDataProps: {}
    },  
    data() {    
        return {
            formData: {
                id: null,
                title: ''
            },
            errorMSG: false
        }
    },
    watch: {
        // error yozuvni o'chiradi
        'formData.title': {
            handler(e) {
                if(this.errorMSG) {
                    this.errorMSG = false
                }
            }
        }
    },
    methods: {
        //Todo ni saqlash
        save() {
            if(this.formData.title) {
                this.$emit('save', this.formData)
            } else {
                this.errorMSG = true
            }
        }
    },
    created() {
        // Todo Update
        if(this.formDataProps) {
            this.formData = this.formDataProps           
        }
    }
}
</script>

<style lang="scss" scoped>
.modal_background {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #333232;
    filter:opacity(0.5);
    filter:blur(80%);
}
.modal {
    position: absolute;
    left: 50%;
    right: -50%;
    transform: translate(-50%, 0%);
    bottom: 60%;
    top: 15%;
    width: 300px;
    background: white;
    border-radius: 15px 5px;
    .close {
        display: flex;
        justify-content: end;
        padding: 5px;
        button {
            border: 1px solid #e2dede;
            border-radius: 5px 5px;
            background: transparent;
        }
    }
    h2 {
        text-align: center;
        margin-top: -5px;
        color: #ed4b87;
    }
    .modal_contant {        
        display: flex;
        flex-direction: column;
        align-items: center;        
        input {
            width: 80%;
            outline: none;
            padding: 5px 10px;
            border-radius: 15px 5px;
            border: 1px solid #e2dede;
            font-size: 18px;
            margin-top: 10px;
        }
        button {
            margin-top: 25px;
            width: 50%;
            padding: 5px;
            border-radius: 15px 5px;
            border: 1px solid #e2dede;
            background: transparent;
            font-size: 16px;
        }
    }
}
</style>