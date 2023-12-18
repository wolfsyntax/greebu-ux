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
          <div class="right-side" ref="rightSide" @scroll="handleScroll">
            <h2 class="title">Cookies Policy</h2>
            <p class="para-title">Last updated: [12-13-2023]</p>
            <div>
              <p class="para-body">
                Geebu ("us", "we", or "our") uses cookies on
                https://develop.geebu.ph/(the "Service"). By using the Service,
                you consent to the use of cookies.
              </p>
              <p class="para-body">
                Our Cookies Policy explains what cookies are, how we use
                cookies, how third-parties we may partner with may use cookies
                on the Service, your choices regarding cookies and further
                information about cookies.
              </p>
            </div>
            <div id="item-1-1">
              <h5 class="para-title">What are cookies?</h5>
              <div class="may-not-wrap">
                <p class="para-body">
                  Cookies are small pieces of text sent by your web browser by a
                  website you visit. A cookie file is stored in your web browser
                  and allows the Service or a third-party to recognize you and
                  make your next visit easier and the Service more useful to
                  you.
                </p>
                <p class="para-body">
                  Cookies can be "persistent" or "session" cookies.
                </p>
              </div>
            </div>
            <div id="item-1-2">
              <h5 class="para-title">How Geebu uses cookies?</h5>
              <div class="may-not-wrap">
                <p class="para-body">
                  When you use and access the Service, we may place a number of
                  cookies files in your web browser.
                </p>
                <p class="para-body">
                  We use cookies for the following purposes: to enable certain
                  functions of the Service, to provide analytics, to store your
                  preferences, to enable advertisements delivery, including
                  behavioral advertising.
                </p>
                <p class="para-body">
                  We use both session and persistent cookies on the Service and
                  we use different types of cookies to run the Service:
                </p>
                <ul class="para=body">
                  <li>
                    Essential cookies. We may use essential cookies to
                    authenticate users and prevent fraudulent use of user
                    accounts.
                  </li>
                  <li>
                    Preferences cookies. We may use preferences cookies to
                    remember information that changes the way the Service
                    behaves or looks, such as the "remember me" functionality of
                    a registered user or a user's language preference.
                  </li>
                  <li>
                    Analytics cookies. We may use analytics cookies to track
                    information how the Service is used so that we can make
                    improvements. We may also use analytics cookies to test new
                    advertisements, pages, features or new functionality of the
                    Service to see how our users react to them.
                  </li>
                  <li>
                    Advertising cookies. These type of cookies are used to
                    deliver advertisements on and through the Service and track
                    the performance of these advertisements. These cookies may
                    also be used to enable third-party advertising networks to
                    deliver ads that may be relevant to you based upon your
                    activities or interests.
                  </li>
                </ul>
              </div>
            </div>
            <div id="item-1-3">
              <h5 class="para-title">Third-party cookies</h5>
              <div class="may-not-wrap">
                <p class="para-body">
                  In addition to our own cookies, we may also use various
                  third-parties cookies to report usage statistics of the
                  Service, deliver advertisements on and through the Service,
                  and so on.
                </p>
              </div>
            </div>
            <div class="item-1-4">
              <h5 class="para-title">
                What are your choices regarding cookies?
              </h5>
              <div class="may-not-wrap">
                <p class="para-body">
                  If you'd like to delete cookies or instruct your web browser
                  to delete or refuse cookies, please visit the help pages of
                  your web browser.
                </p>
                <p class="para-body">
                  Please note, however, that if you delete cookies or refuse to
                  accept them, you might not be able to use all of the features
                  we offer, you may not be able to store your preferences, and
                  some of our pages might not display properly.
                </p>
                <p class="para-body">
                  Please note, however, that if you delete cookies or refuse to
                  accept them, you might not be able to use all of the features
                  we offer, you may not be able to store your preferences, and
                  some of our pages might not display properly.
                </p>
                <ul class="para-body">
                  <li>
                    For the Chrome web browser, please visit this page from
                    Google: How to delete cookies in Chrome
                    https://www.websitepolicies.com/blog/sample-cookie-policy-template
                  </li>
                  <li>
                    For the Internet Explorer web browser, please visit this
                    page from Microsoft: How to delete cookies in Internet
                    Explorer
                    https://termly.io/resources/templates/cookie-policy-template/
                  </li>
                  <li>
                    For the Firefox web browser, please visit this page from
                    Mozilla: How to delete cookies in Firefox
                    https://www.cookieyes.com/blog/cookie-policy-template/
                  </li>
                  <li>
                    For the Safari web browser, please visit this page from
                    Apple: How to delete cookies in Safari
                    https://termly.io/products/cookie-policy-generator/
                  </li>
                  <li>
                    For any other web browser, please visit your web browser's
                    official web pages.
                  </li>
                </ul>
              </div>
            </div>
            <div id="item-1-5">
              <h5 class="para-title">
                Where can you find more information about cookies?
              </h5>
              <div class="may-not-wrap">
                <p class="para-body">
                  You can learn more about cookies and the following third-party
                  websites:
                </p>
                <ul class="para-body">
                  <li>[AllAboutCookies]: [http://www.allaboutcookies.org/]</li>
                  <li>
                    [Network Advertising Initiative]:
                    [http://www.networkadvertising.org/]
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        { title: "What are cookies?" },
        { title: "How Geebu uses cookies?" },
        { title: "Third-party cookies" },
        { title: "What are your choices regarding cookies?" },
        { title: "Where can you find more information about cookies?" },
      ],
    };
  },
  methods: {
    handleScroll() {
      const rightSide = this.$refs.rightSide;
      const scrollTop = rightSide.scrollTop;

      if (scrollTop < rightSide.scrollHeight / 5) {
        this.activeTitle = "Content 1";
        this.activeStep = 1;
      } else if (scrollTop < (2 * rightSide.scrollHeight) / 5) {
        this.activeTitle = "Content 2";
        this.activeStep = 2;
      } else if (scrollTop < (3 * rightSide.scrollHeight) / 5) {
        this.activeTitle = "Content 3";
        this.activeStep = 3;
      } else if (scrollTop < (4 * rightSide.scrollHeight) / 5) {
        this.activeTitle = "Content 4";
        this.activeStep = 4;
      } else {
        this.activeTitle = "Content 5";
        this.activeStep = 5;
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
