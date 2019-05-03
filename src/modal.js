import MoviesModal from './components/MoviesModal.vue'

const Modal = {

  install(Vue, options) {

    this.EventBus = new Vue()

    Vue.component('app-modal', MoviesModal)


    Vue.prototype.$modal = {
      show(params) {
        Modal.EventBus.$emit('show', params)
      }
    }
  }
}

export default Modal