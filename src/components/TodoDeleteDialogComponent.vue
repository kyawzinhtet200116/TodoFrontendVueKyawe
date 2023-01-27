<template>
    <v-dialog v-model="open" max-width="500px">
        <v-card >
            <v-card-text class="mx-auto d-block">
                <p class="text-center pt-3">
                    Are You Sure Do You Wanna Delete?
                </p>
                <v-card-actions class="d-block mx-auto">
                    <div class="d-block mx-auto text-center">
                    <button class="btn btn-light mx-1" @click="$emit('close')"> Cancel </button>
                    <button class="btn btn-danger mx-1" @click="$emit('delete',deleteId)"> Delete </button>
                    </div>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

export default{
   name:"TodoDeleteDialogComponent",
   props:{
    isOpen:Boolean,
    id:Number
   },
   data(){
    return {
        open:this.isOpen,
        deleteId:this.id
    }
   },
   watch:{
    isOpen:function(newVal){
        this.open=newVal;
    },
    id:function(newVal){
        this.deleteId=newVal;
    }
   }
}
</script>
