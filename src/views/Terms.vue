<template>
  <layout>
    <section id="terms-page">
      <div class="container">
        <div class="side-wrap">
          <div class="left-side"></div>
          <!-- Right side with content -->
          <div class="right-side" ref="rightSide" @scroll="handleScroll">
            <h2 class="title">Terms and Condition</h2>
            <div id="item-1-1">
              <div>
                <h3 class="sub-title">For Facebook use for the application</h3>
                <p class="para-body">
                  Welcome to Geebu, the ultimate online destination for music
                  lovers. Geebu is a platform that allows you to listen, request
                  to create a song and discover music products and services from
                  around the world. Whether you are looking for Artist, digital
                  downloads, Events, Organizers, or music lessons, Geebu has it
                  all.
                </p>
                <p class="para-body">
                  By accessing or using Geebu, you agree to be bound by our
                  terms and conditions, which govern your rights and obligations
                  on our platform. You also agree to our privacy policy, which
                  explains how we collect, use, and protect your personal data.
                  Please read these documents carefully before using Geebu . If
                  you have any questions or concerns, please contact us at
                  <a href="#" class="contact-us">https://develop.geebu.ph/</a>.
                </p>
              </div>
              <div>
                <h5 class="para-title">Reproduce the work</h5>
                <p class="para-body">
                  Is one of the exclusive rights that the owner of a musical
                  work has under intellectual property law. It means to make
                  copies of the original work in any form or manner, such as
                  CDs, tapes, digital files, sheet music, etc. For example, if I
                  write a song and record it in a studio, I have the right to
                  reproduce my song in any format I want. I also have the right
                  to authorize or prevent others from reproducing my song. If
                  someone wants to make a cover version of my song, they need to
                  get my permission and pay me a royalty fee. If someone
                  reproduces my song without my permission, they are infringing
                  my intellectual property right and I can take legal action
                  against them.
                </p>
              </div>
              <div>
                <h5 class="para-title">Intellectual Property Rights</h5>
                <p class="para-body">
                  All the content on this website, including but not limited to
                  logos, trademarks, images, text, graphics, audio, video,
                  software, and code, is the property of
                  https://develop.geebu.ph/ or its licensors and is protected by
                  applicable intellectual property laws. You may not copy,
                  modify, distribute, or use any of the content on this website
                  for any commercial or illegal purposes without the prior
                  written consent of https://develop.geebu.ph/ or its licensors.
                  Any unauthorized use of the content on this website may
                  violate intellectual property rights and result in legal
                  action.
                </p>
              </div>
              <div>
                <h5 class="para-title">User Accounts</h5>
                <p class="para-body">
                  To use our website, you need to create a user account with a
                  valid email address and a password. You can access and manage
                  your account settings through the profile page. You are
                  responsible for keeping your account information secure and
                  accurate, and you must not share your account with anyone
                  else. You also agree to follow our terms and conditions and
                  respect other users on our website. We have the right to
                  suspend or terminate your account for any reason, such as
                  violating our terms and conditions, or for security or
                  maintenance purposes. We will notify you by email if we take
                  any action on your account.
                </p>
              </div>
              <div>
                <h5 class="para-title">
                  Disclaimers and Limitations of Liability
                </h5>
                <p class="para-body">
                  The website and its services are provided "as is" and "as
                  available", without any warranties or guarantees of any kind,
                  either express or implied. We do not warrant that the website
                  and its services will be uninterrupted, error-free, accurate,
                  reliable, secure, or free of viruses or other harmful
                  components. We are not liable for any damages or losses that
                  you or any third party may suffer as a result of using or
                  relying on the website and its services, such as direct,
                  indirect, incidental, consequential, special, punitive, or
                  exemplary damages, or any loss of data, revenue, profit, or
                  reputation. You agree to indemnify and hold us harmless from
                  any claims or disputes that may arise from your use of the
                  website and its services, or your breach of these terms and
                  conditions. Your use of the website and its services is at
                  your own risk and discretion.
                </p>
              </div>
              <div>
                <h5 class="para-title">Changes and Updates</h5>
                <p class="para-body">
                  We reserve the right to modify or update our website and its
                  services, as well as these terms and conditions, at any time
                  and without prior notice. We will post any changes or updates
                  on this page and notify you by email if we have your contact
                  information. You are responsible for reviewing these terms and
                  conditions regularly and for keeping your account information
                  up to date. Your continued use of our website and its services
                  after any changes or updates constitutes your acceptance of
                  the revised terms and conditions. If you do not agree to the
                  changes or updates, you must stop using our website and its
                  services immediately.
                </p>
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
    return {};
  },
};
</script>

<style scoped></style>
