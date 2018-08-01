<template>
  <div>
    <header> <h1>Text Anybody</h1></header>
    <section>
      <p class="intro">Enter a number, begins with a country code</p>
      <form @submit.prevent="send">
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="3"><label for="number">Phone</label></b-col>
            <b-col sm="9">
              <b-form-input
                id="number"
                type="number"
                name="number"
                v-model="data.number">
              </b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3"><label for="text">Text</label></b-col>
            <b-col sm="9">
              <b-form-input
                id="text"
                type="text"
                name="text"
                v-model="data.text">
              </b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-btn
              type="submit"
              variant="success">Send text
            </b-btn>
          </b-row>
        </b-container>
      </form>
    </section>

    <p class="response"></p>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      data: {}
    }
  },
  methods: {
    async send () {
      // sendSms can take any data object that looks like this:
      // { number: 12345668, text: "some message"}
      const res = await api.sendSms(this.data)
      console.log(res)
    }
  }
}
</script>

<style>

</style>
