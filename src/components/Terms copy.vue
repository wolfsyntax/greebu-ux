<template>
  <div>

    <!-- Modal -->
    <div v-if="showModal" id="terms-modal">
      <div class="modal-content">
        <div>
          <button class="btn" @click="$emit('close-modal')">Close Modal</button>
        </div>
        <!-- Left side with titles -->
        <div class="left-side">
          <a href="#item-1-1" :class="{ active: activeTitle === 'Content 1' }">Content 1</a>
          <a href="#item-1-2" :class="{ active: activeTitle === 'Content 2' }">Content 2</a>
          <a href="#item-1-3" :class="{ active: activeTitle === 'Content 3' }">Content 3</a>
        </div>

        <!-- Right side with content -->
        <div class="right-side" ref="rightSide" @scroll="handleScroll">
          <div id="item-1-1">
            <p>Section 1 - Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>
            <p>Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>
            <p>Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>
            <p>Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>
            <p>Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>
            <p>Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>
            <p>Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>v

          </div>
          <div id="item-1-2">
            <p>Section 2 - Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>
          </div>
          <div id="item-1-3">
            <p>Section 3 - Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>
            <p>Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>
            <p>Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>
            <p>Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>
            <p>Welcome to Geebu, the ultimate online destination for music lovers. Geebu is a platform that allows you to
              listen, request to create a song and discover music products and services from around the world. Whether you
              are looking for Artist, digital downloads, Events, Organizers, or music lessons, Geebu has it all.

              By accessing or using Geebu, you agree to be bound by our terms and conditions, which govern your rights and
              obligations on our platform. You also agree to our privacy policy, which explains how we collect, use, and
              protect your personal data. Please read these documents carefully before using Geebu . If you have any
              questions or concerns, please contact us at https://develop.geebu.ph/.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
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
  }
};
</script>

<style scoped>/* Modal styling */
#terms-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

#terms-modal .modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 78.688rem;
  height: 90%;
  overflow: hidden;
  display: flex;
}

/* Left side styling */
#terms-modal .left-side {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

#terms-modal .left-side a {
  text-decoration: none;
  color: #333;
  padding: 10px;
  cursor: pointer;
}

#terms-modal .left-side a.active {
  color: orange;
}

/* Right side styling */
#terms-modal .right-side {
  flex: 2;
  padding: 10px;
  overflow-y: auto;
}

#terms-modal .right-side p {
  margin-bottom: 20px;
}</style>
