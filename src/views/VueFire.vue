<template>
  <div>
    <button @click="signIn">Google Login</button>
  </div>
</template>

<script>
import
  {
    getRedirectResult,
    signInWithRedirect,
    signOut,
    signInWithPopup,
    GoogleAuthProvider
  } from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire';
export const googleAuthProvider = new GoogleAuthProvider();

export default {
  setup () {
    const auth = useFirebaseAuth()
    function signIn()
    {
      signInWithPopup(auth, googleAuthProvider).catch((reason) =>
      {
        console.error('Failed sign', reason)
        error.value = reason
      })
    }
    return {
      signIn
    }
  }
}
</script>

<style scoped>

</style>