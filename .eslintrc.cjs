module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    'vue/no-deprecated-v-bind-sync': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'vue/no-deprecated-destroyed-lifecycle': 'off',
    'vue/no-v-for-template-key-on-child': 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/no-mutating-props': 'off',
  },
  root: true,
  'env': {
    'vue/setup-compiler-macros': true,
  },
};
