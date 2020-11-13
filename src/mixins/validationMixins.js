export default {
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      // !this.$v.username.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.username.required && errors.push("username is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      // !this.$v.username.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.password.required && errors.push("password is required.");
      return errors;
    },
    eateryErrors() {
      const errors = [];
      if (!this.$v.eatery.$dirty) return errors;
      // !this.$v.username.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.eatery.required && errors.push("eatery is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      // !this.$v.username.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.email.required && errors.push("email is required.");
      return errors;
    },

    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      // !this.$v.username.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.address.required && errors.push("address is required.");
      return errors;
    },
    postalCodeErrors() {
      const errors = [];
      if (!this.$v.postalCode.$dirty) return errors;
      // !this.$v.username.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.postalCode.required && errors.push("postal Code is required.");
      return errors;
    },
  },
};
