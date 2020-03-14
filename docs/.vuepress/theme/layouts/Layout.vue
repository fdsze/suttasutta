<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />

    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    ></div>

    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <slot
        name="sidebar-top"
        slot="top"
      />
      <slot
        name="sidebar-bottom"
        slot="bottom"
      />
    </Sidebar>

    <Home v-if="$page.frontmatter.home"/>

    <Page
      v-else
      :sidebar-items="sidebarItems"
    >
      <slot
        name="page-top"
        slot="top"
      />
      <slot
        name="page-bottom"
        slot="bottom"
      />
    </Page>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems } from '../util'

export default {
  components: { Home, Page, Sidebar, Navbar },

  data () {
    return {
      isSidebarOpen: false
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  mounted () {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  },

  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },

    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '@theme/styles/config.scss';
@import '@theme/styles/global.scss';
@import '@theme/styles/fonts.scss';
@import '@theme/styles/arrow.scss';
@import '@theme/styles/code.scss';
@import '@theme/styles/wrapper.scss';
@import '@theme/styles/page.scss';
@import '@theme/styles/toc.scss';
@import '@theme/styles/custom-blocks.scss';
@import '@theme/styles/sidebar-link.scss';

.navbar {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  height: $navbarHeight;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid $darkborderColor;
  box-shadow: 0 4px 0 0 rgba(darken($accentColor, 20%), 0.03);
}

.sidebar-mask {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: none;
}

.sidebar {
  font-size: 16px;
  background-color: lighten($accentColor, 47%);
  width: $sidebarWidth;
  position: fixed;
  z-index: 10;
  margin: 0;
  top: $navbarHeight;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  border-right: 1px solid $borderColor;
  overflow-y: auto;
}

#{$contentClass}:not(.custom) {
    // @extend .wrapper;
  > *:first-child {
    // margin-top: $navbarHeight;
  }

  a:hover {
    // text-decoration: underline;
  }

  p.demo {
    padding: 1rem 1.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  img {
    max-width: 100%;
  }
}

#{$contentClass}.custom {
  padding: 0;
  margin: 0;

  img {
    max-width: 100%;
  }
}

.theme-container {
  &.sidebar-open {
    .sidebar-mask {
      display: block;
    }
  }

  &.no-navbar {
    #{$contentClass}:not(.custom) > h1, h2, h3, h4, h5, h6 {
      padding-top: 0;
    }

    .sidebar {
      top: 0;
    }
  }
}

@media (min-width: $MQMobile + 1px) {
  .theme-container.no-sidebar {
    .sidebar {
      display: none;
    }

    .page {
      padding-left: 0;
    }
  }
}

@import '@theme/styles/mobile.scss';

</style>
