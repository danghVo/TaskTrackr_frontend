<template>
        <div class="modal fade" ref="modal" id="exampleModal" tabindex="-1" aria-labelledby="modal" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal">Bạn có chắc chắn muốn xóa không</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                        <button type="button" class="btn btn-primary">Có</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    props: ["open"],
    watch: {
        open(newValue, oldValue) {
            if(this.open)
                this.$refs.modal.display = "block"
        }
    }
}
</script>

<style>
</style>