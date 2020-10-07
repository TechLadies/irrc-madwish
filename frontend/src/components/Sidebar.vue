<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar
        open
        position="static"
        type="is-light"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        :fullheight="fullheight">
        <div class="p-1">
          <div class="block">
            <img src="/src/assets/icons/irrc-logo.svg" />
            <div class="spacer"></div>

            <b-menu class="is-custom-mobile">
              <b-menu-list label="By Status">
                <b-menu-item
                  v-for="(item, index) in menu.status" 
                  tag="router-link"
                  :active="item.active"
                  :key="index"
                  :to="{ path: item.to }"
                  :label="item.label"></b-menu-item>
              </b-menu-list>

              <div class="spacer"></div>

              <b-button @click.native="createNew()" class="button" size="is-small">
                <span>New</span>
                <b-icon icon="plus" size="is-small"></b-icon>
              </b-button>
              
              <b-menu-list label="Profiles">
                <b-menu-item
                  v-for="(item, index) in menu.profiles" 
                  tag="router-link"
                  :active="item.active"
                  :key="index"
                  :to="{ path: item.to }"
                  :label="item.label"></b-menu-item>
              </b-menu-list>

            </b-menu>
          </div>
        </div>
      </b-sidebar>
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    createNew() {
      this.$emit('createNew')
    }
  },
  watch: {
    $route(to, from) {
      Object.keys(this.menu).forEach(value => {
        this.menu[value].forEach(_ => {
          _.active = false
          if (_.to === to.path)  _.active = true
        })
      })      
    },
  },
  data() {
    return {
      expandOnHover: false,
      mobile: "reduce",
      reduce: false,
      fullheight: true
    }
  }
}
</script>

<style lang="scss">

.spacer {
  padding: 30px;
}

.spacer01 {
  padding: 20px;
}

.menu-list {
  a {
    color: #FFFFFF !important;
    &.is-active {
      background-color: #F0FCFF !important;
      color: #2F4858 !important;
    }
    &:hover {
      background: #99aacc !important;
      color: #F0FCFF !important;
    }
  }
}

.menu-label {
  color: #F0FCFF !important;
  font-size: 1em !important;
}

.b-sidebar {
  .sidebar-content {
    background-color: #3C4F76 !important;
  }
}

.p-1 {
  padding: 1em;
}

.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;

  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100vh;
  }
}
</style>