<script>
export default {
  data() {
    return {
      question: '',
      questionAutoFocus: true,
      answer: 'Questions usually contain a question mark. ;-)',
      loading: false,
    }
  },
  watch: {
    // whenever question changes, this function will run
    question(newQuestion, oldQuestion) {
      console.table({
        old: oldQuestion,
        new: newQuestion,
      })
      
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    },
  },
  methods: {
    async getAnswer() {
      this.loading = true
      this.answer = 'Thinking...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'Error! Could not reach the API. ' + error
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div class="container py-5">
    <div class="py-5">
      <div class="py-5">
        <div class="text-center">
          <h1>FAQs</h1>
          <p>Have any questions, ask our AI Agent</p>
        </div>
        <div class="row g-3 justify-content-center">
          <div class="col-md-8">
            <form>
              <div class="form-group">
                <label for="question" class="form-label">Question</label>
                <textarea
                  id="question"
                  v-model="question"
                  :autofocus="questionAutoFocus"
                  placeholder="What's on your mind?"
                  class="form-control"
                ></textarea>
              </div>
              <div class="d-flex gap-2 py-1 align-items-center">
                <div class="spinner-grow spinner-grow-sm text-primary" role="status" v-if="loading">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div v-if="answer">{{ answer }}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
