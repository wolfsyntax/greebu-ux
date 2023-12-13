<template>
 
 <layout>
  <!-- Modal -->
  <section id="terms-page">
    <div class="container">

      <!-- <div class="close-modal-wrap">
        <button class="btn p-o border-0" @click="$emit('close-modal')">
          <img src="/assets/close-icon.svg" alt="Close icon modal">
        </button>
      </div> -->
      <!-- Left side with titles -->

      <div class="side-wrap">

        <div class="left-side">
          <div>
            <img src="/assets/geebu-logo.svg" alt="Geebu logo">
          </div>

            <a href="#item-1-1" :class="{ active: activeTitle === 'Content 1' }">For Facebook use for the application</a>
            <a href="#item-1-2" :class="{ active: activeTitle === 'Content 2' }">
              Terms and conditions for GeeBu web and mobile applications</a>
            <a href="#item-1-3" :class="{ active: activeTitle === 'Content 3' }">Terms and Conditions for Create a Song For Artist</a>

        </div>

        <!-- Right side with content -->
        <div class="right-side" ref="rightSide" @scroll="handleScroll">

          <h2 class="title">Terms and Condition</h2>

          <div id="item-1-1">

            <div>
              <h3>1. For Facebook use for the application </h3>
              <p>Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you
                to listen,
                request to create a song and discover music products and services from around the world. Whether you are
                looking for Artist,
                digital downloads, Events, Organizers, or music lessons, Geebu has it all.</p>
              <p>By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your
                rights and obligations on our platform.
                You also agree to our privacy policy, which explains how we collect, use, and protect your personal
                data.
                Please read these documents carefully before using Geebu . If you have any questions or concerns,
                please contact us at <a href="#" class="contact-us">https://develop.geebu.ph/</a>.</p>
            </div>

            <div>
              <h5>Reproduce the work</h5>
              <p>Is one of the exclusive rights that the owner of a musical work has under intellectual property law. It
                means to make copies of the original work
                in any form or manner, such as CDs, tapes, digital files, sheet music, etc. For example, if I write a
                song and record it in a studio,
                I have the right to reproduce my song in any format I want. I also have the right to authorize or
                prevent others from reproducing my
                song. If someone wants to make a cover version of my song, they need to get my permission and pay me a
                royalty fee. If someone
                reproduces my song without my permission, they are infringing my intellectual property right and I can
                take legal action against them.</p>
            </div>

            <div>
              <h5>Intellectual Property Rights</h5>
              <p>All the content on this website, including but not limited to logos, trademarks, images, text,
                graphics, audio, video, software,
                and code, is the property of https://develop.geebu.ph/ or its licensors and is protected by applicable
                intellectual property laws.
                You may not copy, modify, distribute, or use any of the content on this website for any commercial or
                illegal purposes without
                the prior written consent of https://develop.geebu.ph/ or its licensors. Any unauthorized use of the
                content on this website may
                violate intellectual property rights and result in legal action.</p>
            </div>

            <div>
              <h5>User Accounts</h5>
              <p>To use our website, you need to create a user account with a valid email address and a password. You
                can access and manage your account settings through
                the profile page. You are responsible for keeping your account information secure and accurate, and you
                must not share your account with
                anyone else. You also agree to follow our terms and conditions and respect other users on our website.
                We have the right to suspend or
                terminate your account for any reason, such as violating our terms and conditions, or for security or
                maintenance purposes.
                We will notify you by email if we take any action on your account.</p>
            </div>

            <div>
              <h5>Disclaimers and Limitations of Liability</h5>
              <p>The website and its services are provided "as is" and "as available", without any warranties or
                guarantees of any kind, either express or implied.
                We do not warrant that the website and its services will be uninterrupted, error-free, accurate,
                reliable, secure, or free of viruses
                or other harmful components. We are not liable for any damages or losses that you or any third party may
                suffer as a result of using
                or relying on the website and its services, such as direct, indirect, incidental, consequential,
                special, punitive, or exemplary damages,
                or any loss of data, revenue, profit, or reputation. You agree to indemnify and hold us harmless from
                any claims or disputes that may
                arise from your use of the website and its services, or your breach of these terms and conditions. Your
                use of the website and its
                services is at your own risk and discretion.</p>
            </div>

            <div>
              <h5>Changes and Updates</h5>
              <p>We reserve the right to modify or update our website and its services, as well as these terms and
                conditions, at any time and without
                prior notice. We will post any changes or updates on this page and notify you by email if we have your
                contact information. You are
                responsible for reviewing these terms and conditions regularly and for keeping your account information
                up to date. Your continued use
                of our website and its services after any changes or updates constitutes your acceptance of the revised
                terms and conditions. If you do
                not agree to the changes or updates, you must stop using our website and its services immediately.</p>
            </div>

          </div>


          <div id="item-1-2">

            <div>
              <h3>2. Terms and conditions for GeeBu web and mobile applications</h3>
              <p>Welcome to GeeBu, a mobile / web  application that allows you to stream, download, and share music from
                various artists,
                genres, events, organizer and services. These terms and conditions ("Terms") govern your access and use
                of GeeBu and its
                services ("Services"). Please read them carefully before using GeeBu.</p>
              <p>Using MusicApp, you agree to be bound by these Terms. If you do not agree to these Terms, you must not
                use GeeBu</p>
            </div>

            <div>
              <h5>License</h5>
              <p>GeeBu grants you a limited, non-exclusive, non-transferable, revocable license to use GeeBu and its
                Services for your personal,
                non-commercial purposes, subject to these Terms and any applicable laws.</p>
            </div>

            <div class="may-not-wrap">
              <h5>You may not:</h5>
              <ul>
                <li>Copy, modify, distribute, sell, or lease any part of MusicApp or its Services;</li>
                <li>Use GeeBu or its Services for any illegal, fraudulent, or harmful activities;</li>
                <li>Use GeeBu or its Services to infringe the rights of GeeBu, its licensors, or any third parties;</li>
                <li>Use GeeBu or its Services to interfere with the security, performance, or functionality of GeeBu or
                  its Services;</li>
                <li>Use GeeBu or its Services to transmit any viruses, malware, or other harmful code.</li>
              </ul>
            </div>

            <div>
              <h5>Content</h5>
              <p>GeeBu and its Services allow you to access, stream, download, and share music and other content
                ("Content") from various artists,
                organizers, events and services. GeeBu does not own or control the Content, and is not responsible for
                its quality, accuracy,
                legality, or suitability. You acknowledge and agree that:</p>
              <ul>
                <li>You are solely responsible for any Content that you upload, post, or share through GeeBu or its
                  Services;</li>
                <li>You must comply with any terms and conditions, licenses, or restrictions that apply to the Content
                  that you access, stream, download, or share through GeeBu or its Services;</li>
                <li>You must respect the intellectual property rights of GeeBu, its licensors, and any third parties
                  that own or provide the Content;</li>
                <li>Use GeeBu or its Services to interfere with the security, performance, or functionality of GeeBu or
                  its Services;</li>
                <li>You must not use the Content for any purposes that are not authorized by these Terms or by the
                  owners or providers of the Content.</li>
              </ul>
            </div>

            <div>
              <h5>Privacy</h5>
              <p>GeeBu respects your privacy and is committed to protecting your personal information. Please refer to
                our Privacy
                Policy https://termly.io/resources/templates/app-terms-and-conditions/ for more information on how we
                collect, use,
                and disclose your personal information when you use GeeBu or its Services.</p>
            </div>

            <div>
              <h5>Disclaimer</h5>
              <p>GeeBu and its Services are provided "as is" and "as available", without any warranties,
                representations, or guarantees of any kind.
                To the fullest extent permitted by law, GeeBu disclaims all warranties, express or implied, including
                but not limited to warranties
                of merchantability, fitness for a particular purpose, title, and non-infringement. GeeBu does not
                warrant that:</p>
            </div>

            <div>
              <h5>Limitation of Liability</h5>
              <p>To the fullest extent permitted by law, GeeBu and its affiliates, directors, artist, organizers and
                partners shall not be liable for
                any direct, indirect, incidental, consequential, special, exemplary, or punitive damages, or any other
                damages of any kind, arising
                out of or in connection with your access or use of GeeBu or its Services, or your inability to access or
                use GeeBu or its Services,
                even if GeeBu has been advised of the possibility of such damages. This includes but is not limited to
                damages for:</p>
              <ul>
                <li>Loss of profits, revenue, data, or goodwill;</li>
                <li>Personal injury or property damage;</li>
                <li>Interruption or failure of GeeBu or its Services;</li>
                <li>Any unauthorized access, use, or alteration of your Content or personal information;</li>
                <li>Any acts or omissions of GeeBu , its licensors, or any third parties that provide the Content or the
                  Services.</li>
              </ul>
            </div>

          </div>
          <div id="item-1-3">
            <div>
              <h3>3. Terms and Conditions for Create a Song For Artist</h3>
              <p>By using our website and services, you agree to be bound by the following terms and conditions.
                Please read them carefully before creating a song.</p>
              <p>You are solely responsible for the content of your song, including the lyrics, melody, chords, and any
                other musical elements. You warrant that your
                song does not infringe on the rights of any third party, such as copyrights, trademarks, privacy, or
                publicity.</p>
              <p>You grant us a non-exclusive, worldwide, perpetual, and irrevocable license to use, reproduce,
                distribute, modify, adapt,
                and display your song on our website and any other platforms or media that we operate or partner with.
                You also grant us
                the right to sublicense your song to other users of our website and services, subject to these terms and
                conditions</p>
              <p>You acknowledge that we do not review, approve, or endorse any songs created by our users. We are not
                liable for any
                damages or losses arising from your use of our website and services, or from any songs created by you or
                other users.
                You agree to indemnify and hold us harmless from any claims, liabilities, costs, or expenses that may
                result from your
                song or your breach of these terms and conditions.</p>
              <p>We reserve the right to remove or disable access to any song that violates these terms and conditions,
                or that we deem
                to be inappropriate, offensive, unlawful, or harmful to our website and services, or to any other user
                or third party.
                We also reserve the right to terminate or suspend your account and access to our website and services,
                without prior
                notice or liability, if you violate these terms and conditions or any other policies that we may
                establish from time
                to time.</p>
              <p>We may change or update these terms and conditions at any time, without prior notice, by posting the
                revised version on our website.
                Your continued use of our website and services after any such changes constitutes your acceptance of the
                new terms and conditions.
                You should check this page regularly to ensure that you are aware of the current terms and conditions.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div><!-- end of container -->

</section>
</layout>
</template>

<script>
import Layout from '/src/components/Layouts/Layout.vue';

export default {
  components: {
    layout: Layout
  },
data() {
  return {
    activeTitle: null
  };
},
methods: {
  handleScroll() {
      const rightSide = this.$refs.rightSide;
      const scrollTop = rightSide.scrollTop;

      if (scrollTop < rightSide.scrollHeight / 3) {
        this.activeTitle = 'Content 1';
      } else if (scrollTop < (2 * rightSide.scrollHeight) / 3) {
        this.activeTitle = 'Content 2';
      } else {
        this.activeTitle = 'Content 3';
      }
    }
},

};
</script>

<style scoped>
</style>
