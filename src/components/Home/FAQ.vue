<template>
  <div>
    <section class="faq">
      <div class="container">
        <h2>Frequent Ask Questions</h2>
        <p class="sub-heading">Pellentesque cras adipiscing tempus libero vel nullam mauris tellus. Aliquam ultrices
          tellus <br>consequat amet, lectus aliquam est in neque.</p>

        <div class="accordion" id="faq">
          <div class="accordion-item" v-for="(question, index) in askedQuestions" :key="'question-' + index">
            <h2 class="accordion-header" :id="'question-heading-' + index">
              <button class="accordion-button" type="button" :class="isOpen(index) ? 'active' : ''"
                @click="toggleAccordion(index)">
                <i :class="getIconClass(index)"></i> {{ question.question }}
              </button>
            </h2>
            <div :id="'question-collapse-' + index" class="accordion-collapse collapse" :class="{ show: isOpen(index) }"
              :aria-labelledby="'question-heading-' + index" data-bs-parent="#faq">
              <div class="accordion-body">
                <div class="content">
                  {{ question.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  data()
  {
    return {
      askedQuestions: [
        {
          question: 'Is the Artist being paid hourly pay?',
          answer: 'Venenatis, fames a a, in. Morbi pellentesque lacus, purus in tristique justo, pretium egestas. Commodo leo nisl consectetur nisi, tortor, erat sit at aliquet. Ultrices in aliquam maecenas cursus. Sed enim cursus augue quis risus. Ac donec quisque vitae feugiat dignissim diam. '
        },
        {
          question: 'Do customer need to pay upfront for the Artist?',
          answer: 'Venenatis, fames a a, in. Morbi pellentesque lacus, purus in tristique justo, pretium egestas. Commodo leo nisl consectetur nisi, tortor, erat sit at aliquet. Ultrices in aliquam maecenas cursus. Sed enim cursus augue quis risus. Ac donec quisque vitae feugiat dignissim diam. '
        },
        {
          question: ' Can the Artist accept request songs from the Audience?',
          answer: 'Venenatis, fames a a, in. Morbi pellentesque lacus, purus in tristique justo, pretium egestas. Commodo leo nisl consectetur nisi, tortor, erat sit at aliquet. Ultrices in aliquam maecenas cursus. Sed enim cursus augue quis risus. Ac donec quisque vitae feugiat dignissim diam. '
        },
        {
          question: 'Do we need to sign up for the Artist and Client to use this web application?',
          answer: 'Venenatis, fames a a, in. Morbi pellentesque lacus, purus in tristique justo, pretium egestas. Commodo leo nisl consectetur nisi, tortor, erat sit at aliquet. Ultrices in aliquam maecenas cursus. Sed enim cursus augue quis risus. Ac donec quisque vitae feugiat dignissim diam. '
        },
        {
          question: 'How much would it cost for a customized song?',
          answer: 'Venenatis, fames a a, in. Morbi pellentesque lacus, purus in tristique justo, pretium egestas. Commodo leo nisl consectetur nisi, tortor, erat sit at aliquet. Ultrices in aliquam maecenas cursus. Sed enim cursus augue quis risus. Ac donec quisque vitae feugiat dignissim diam. '
        }

      ],
      activeQuestions: [],
    }
  },
  methods: {
    toggleAccordion(index)
    {
      const isActive = this.activeQuestions.includes(index);
      if (isActive) {
        this.activeQuestions = this.activeQuestions.filter((item) => item !== index);
      } else {
        this.activeQuestions = [index];
      }
    },
    getIconClass(index)
    {
      return this.isOpen(index) ? 'bi bi-dash' : 'bi bi-plus';
    },
  },
  computed: {
    isOpen()
    {
      return (index) => this.activeQuestions.includes(index);
    },
  },


};
</script>

<style scoped></style>