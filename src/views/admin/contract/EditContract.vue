<template>
  <v-container class="pt-0 pl-0 pr-4">
    <span class="title grey--text">{{ isNew ? $t("Edit contract") : $t("Create a new contract") }}</span>
    <component :is="editSectionComponent"></component>
  </v-container>
</template>

<script>
import { routeNames } from "@/router";
import EditContractInformation from "@/components/admin/contract/EditInformation.vue";
import EditContractSoftware from "@/components/admin/contract/EditSoftware.vue";
import EditContractEngagements from "@/components/admin/contract/EditEngagements.vue";
export default {
  name: "edit-contract",
  components: {
    "edit-contract-information": EditContractInformation,
    "edit-contract-software": EditContractSoftware,
    "edit-contract-engagements": EditContractEngagements
  },
  data() {
    return {
      editSectionComponent: ""
    };
  },
  created() {
    switch (this.$route.name) {
      case routeNames.EDITCONTRACTINFORMATION:
        this.editSectionComponent = "edit-contract-information";
        break;
      case routeNames.EDITCONTRACTSOFTWARES:
        this.editSectionComponent = "edit-contract-software";
        break;
      case routeNames.EDITCONTRACTENGAGEMENTS:
        this.editSectionComponent = "edit-contract-engagements";
        break;
      default:
        this.editSectionComponent = "edit-contract-information";
        break;
    }
  },
  methods: {
    edit() {
      return;
    }
  },
  computed: {
    isNew() {
      return this.$route.params.id;
    }
  },
  beforeCreate() {
    if (!this.$auth.ready() || !this.$auth.check("admin")) {
      this.$router.push("/403");
    }
  }
};
</script>

<style lang="stylus" scoped>
.pt-0 {
  margin-left: 0px !important;
  margin-right: 0px !important;
  padding-right: 0px !important;
}

.container {
  max-width: 100%;
}

.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat):not(.error) {
  background-color: #2195f2 !important;
}
</style>
