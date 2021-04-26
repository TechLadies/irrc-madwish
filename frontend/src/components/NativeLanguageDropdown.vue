<template>
  <b-autocomplete
    field="NativeLanguage"
    placeholder="e.g. Bangla"
    :value="nativeLanguage"
    :data="languages"
    @typing="filteredLanguageDataArray"
    @select="setSelected"
  >
    <template slot="header">
      <a @click="showAddLanguage">
        <span> Add new... </span>
      </a>
    </template>
  </b-autocomplete>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NativeLanguageDropdown",
  props: ["selected"],
  data() {
    return {
      languages: [],
    };
  },
  computed: {
    ...mapGetters(["API_nativeLanguage"]),
    // If NativeLanguage is changed, we assign it this value
    nativeLanguage() {
      return this.selected ? this.selected.NativeLanguage : "";
    },
  },
  mounted() {
    this.getNativeLanguages();
  },
  methods: {
    ...mapActions(["getNativeLanguages"]),
    setSelected(value) {
      this.$emit("change", value);
    },
    filteredLanguageDataArray(language = "") {
      this.languages = this.API_nativeLanguage.filter((option) => {
        return option.NativeLanguage.toLowerCase().includes(
          (language || "").toLowerCase()
        );
      });
    },
    showAddLanguage() {
      this.$buefy.dialog.prompt({
        message: `Add new language`,
        inputAttrs: {
          placeholder: "e.g. Italian",
          maxlength: 255,
        },
        confirmText: "Add",
        onConfirm: (value) => {
          this.$emit("change", { NativeLanguage: value });
        },
      });
    },
  },
};
</script>
