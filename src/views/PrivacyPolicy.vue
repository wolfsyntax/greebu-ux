<template>
  <layout>
    <section id="terms-page">
      <div class="container">
        <div class="side-wrap">
          <div class="left-side">
            <div class="stepper d-flex flex-column mt-5 ml-2">
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="d-flex mb-1"
              >
                <div class="d-flex flex-column pr-4 align-items-center">
                  <div
                    class="rounded-circle py-2 px-2"
                    :class="{
                      'bg-primary': index + 1 <= activeStep,
                      'bg-inactive': index + 1 > activeStep,
                    }"
                  ></div>
                  <div class="line h-100" v-if="index < steps.length - 1"></div>
                </div>
                <div>
                  <a
                    href="'#item-1-' + (index + 1)"
                    :class="{
                      active: activeTitle === 'Content ' + (index + 1),
                    }"
                  >
                    {{ step.title }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- Right side with content -->
          <div class="right-side" ref="rightSide" @scroll="handleScroll">
            <h2 class="title">Privacy Policy for Geebu</h2>
            <div>
              <div>
                <p class="para-body">
                  This privacy policy explains how we collect, use, and protect
                  your personal information when you sign up and use our web
                  application [Web Application Name]. By signing up and using
                  our web application, you agree to this privacy policy and
                  consent to our data practices.
                </p>
              </div>
              <div>
                <div>
                  <div id="item-1-1">
                    <h5 class="para-title">What information do we collect?</h5>
                    <div class="may-not-wrap">
                      <h5 class="para-title">
                        When you sign up and use our web application, we may
                        collect the following types of information from you:
                      </h5>
                      <ul class="para-body">
                        <li>
                          Personal information: This includes your name, email
                          address, password, phone number and any other
                          information that you voluntarily provide to us when
                          you create an account or update your profile.
                        </li>
                        <li>
                          Usage information: This includes information about how
                          you use our web application, such as the features you
                          access, the actions you perform, the time and duration
                          of your sessions, and the errors or issues you
                          encounter.
                        </li>
                        <li>
                          Device information: This includes information about
                          the device you use to access our web application, such
                          as the type, model, operating system, browser, IP
                          address, and other identifiers.
                        </li>
                        <li>
                          Location information: This includes information about
                          your approximate geographic location, based on your IP
                          address or other sources.
                        </li>
                        <li>
                          Cookies and other tracking technologies: These are
                          small files or pieces of code that are stored on your
                          device or browser when you visit our web application.
                          They help us remember your preferences, enhance your
                          user experience, and deliver relevant ads.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div id="item-1-2">
                      <h5 class="para-title">
                        How do we use your information?
                      </h5>

                      <div class="may-not-wrap">
                        <h5 class="para-title">
                          We use your information for the following purposes:
                        </h5>
                        <ul class="para-body">
                          <li>
                            To provide, maintain, and improve our web
                            application and its features, functionality, and
                            performance.
                          </li>
                          <li>
                            To communicate with you about your account, our web
                            application, and our policies, and to respond to
                            your inquiries, feedback, or requests.
                          </li>
                          <li>
                            To personalize your user experience and tailor our
                            web application to your interests, needs, and
                            preferences.
                          </li>
                          <li>
                            To analyze and measure our web application's usage,
                            performance, and effectiveness, and to conduct
                            research and development.
                          </li>
                          <li>
                            To protect our web application, our users, and our
                            rights, and to prevent, detect, and address fraud,
                            abuse, security, or technical issues.
                          </li>
                          <li>
                            To comply with our legal obligations, enforce our
                            terms and conditions, and resolve any disputes or
                            claims that may arise from or relate to our web
                            application or this privacy policy.
                          </li>
                          <li>
                            To market and advertise our web application and
                            other products or services that may be of interest
                            to you, with your consent or as permitted by law.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div id="item-1-3">
                      <h5 class="para-title">
                        Who do we share your information with?
                      </h5>
                    </div>
                    <div class="may-not-wrap">
                      <h5 class="para-title">
                        We may share your information with the following
                        parties, under the following circumstances:
                      </h5>
                      <ul class="para-body">
                        <li>
                          Service providers: These are third-party companies or
                          individuals that we hire to perform certain functions
                          or services on our behalf, such as hosting, storage,
                          analytics, payment processing, email delivery, or
                          customer support. We only share your information with
                          service providers to the extent necessary for them to
                          perform their functions or services, and we require
                          them to protect your information and comply with this
                          privacy policy and applicable laws.
                        </li>
                        <li>
                          Affiliates: These are our parent, subsidiary, or
                          related companies that are under common control or
                          ownership with us. We may share your information with
                          our affiliates for the purposes described in this
                          privacy policy, and we require them to protect your
                          information and comply with this privacy policy and
                          applicable laws.
                        </li>
                        <li>
                          Business partners: These are third-party companies or
                          organizations that we collaborate with to offer or
                          promote our web application or other products or
                          services that may be of interest to you. We may share
                          your information with our business partners with your
                          consent or as permitted by law, and we require them to
                          protect your information and comply with this privacy
                          policy and applicable laws.
                        </li>
                        <li>
                          Other users: Our web application may allow you to
                          interact with other users, such as by posting
                          comments, sending messages, or sharing content. If you
                          choose to do so, your information, such as your name,
                          profile picture, and content, may be visible to other
                          users. You are responsible for the information you
                          share with other users, and we are not liable for any
                          consequences that may result from such sharing.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div id="item-1-4">
                      <h5 class="para-title">
                        How do we protect your information?
                      </h5>
                    </div>
                    <div class="may-not-wrap">
                      <p class="para-body">
                        We take reasonable measures to protect your information
                        from unauthorized access, use, disclosure, modification,
                        or destruction. However, no method of transmission or
                        storage is completely secure, and we cannot guarantee
                        the absolute security of your information. You are also
                        responsible for maintaining the confidentiality of your
                        account and password, and for notifying us immediately
                        if you suspect any unauthorized activity or breach of
                        security involving your account or our web application.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div id="item-1-5">
                      <h5 class="para-title">
                        What are your choices and rights regarding your
                        information?
                      </h5>
                    </div>
                    <div class="may-not-wrap">
                      <h5 class="para-title">
                        You have the following choices and rights regarding your
                        information:
                      </h5>
                      <ul class="para-body">
                        <li>
                          Access: You can access and review your information by
                          logging into your account or contacting us.
                        </li>
                        <li>
                          Update: You can update or correct your information by
                          logging into your account or contacting us.
                        </li>
                        <li>
                          Delete: You can delete your information by logging
                          into your account or contacting us. However, some
                          information may remain in our records for legal,
                          operational, or technical reasons.
                        </li>
                        <li>
                          Manage cookies and other tracking technologies: You
                          can manage your cookie preferences and settings by
                          adjusting your browser or device settings. However,
                          some features or functionality of our web application
                          may not work properly without cookies or other
                          tracking technologies.
                        </li>
                        <li>
                          Exercise your rights under applicable laws: Depending
                          on where you live or where we operate, you may have
                          additional rights under applicable laws, such as the
                          right to request access, rectification, erasure,
                          restriction, portability, or objection of your
                          information, or the right to lodge a complaint with a
                          supervisory authority. To exercise your rights under
                          applicable laws, please contact us.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div id="item-1-6">
                      <h5 class="para-title">How can you contact us?</h5>
                    </div>
                    <div class="may-not-wrap">
                      <p class="para-body">
                        If you have any questions, comments, or concerns about
                        this privacy policy or our data practices, please
                        contact us at:
                      </p>
                      <p class="para-body">https://develop.geebu.ph/</p>
                      <p class="para-body">
                        49 B M. Castro St Brgy Tinago Naga City
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end of container -->
    </section>
  </layout>
</template>
<script>
import Layout from "/src/components/Layouts/Layout.vue";

export default {
  components: {
    layout: Layout,
  },
  data() {
    return {
      activeStep: 1,
      activeTitle: "Content 1",
      steps: [
        { title: "What information do we collect?" },
        { title: "How do we use your information?" },
        { title: "Who do we share your information with?" },
        { title: " How do we protect your information?" },
        {
          title:
            " What are your choices and rights regarding your information?",
        },
        { title: "How can you contact us?" },
      ],
    };
  },
  methods: {
    handleScroll() {
      const rightSide = this.$refs.rightSide;
      const scrollTop = rightSide.scrollTop;

      if (scrollTop < rightSide.scrollHeight / 6) {
        this.activeTitle = "Content 1";
        this.activeStep = 1;
      } else if (scrollTop < (2 * rightSide.scrollHeight) / 6) {
        this.activeTitle = "Content 2";
        this.activeStep = 2;
      } else if (scrollTop < (3 * rightSide.scrollHeight) / 6) {
        this.activeTitle = "Content 3";
        this.activeStep = 3;
      } else if (scrollTop < (4 * rightSide.scrollHeight) / 6) {
        this.activeTitle = "Content 4";
        this.activeStep = 4;
      } else if (scrollTop < (5 * rightSide.scrollHeight) / 6) {
        this.activeTitle = "Content 5";
        this.activeStep = 5;
      } else {
        this.activeTitle = "Content 6";
        this.activeStep = 6;
      }
    },
  },
};
</script>
<style scoped>
.bg-inactive {
  background-color: #f8a541; /* Set the background color for inactive ellipses */
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
}
</style>
