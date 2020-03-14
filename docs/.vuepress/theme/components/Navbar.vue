<template>
  <header class="navbar" :style="{ transform: 'translate3d(0, ' + navbarPos + 'px, 0)' }">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
    <NavLinks class="can-hide"/>

    <router-link
      :to="$localePath"
      class="home-link"
    >
      <img
        class="logo"
        v-if="$site.themeConfig.logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      >
      <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span>
    </router-link>

    <div
      class="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
    >
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"/>
      
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

  data () {
    return {
      linksWrapMaxWidth: null,
      scrollPos: 0,
      navbarPos: 0
    }
  },

  mounted () {
    // const vm = this;
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }

    this.scrollPos = window.scrollY;
    handleLinksWrapWidth();
    window.addEventListener('resize', handleLinksWrapWidth, false);
    window.addEventListener('scroll', this.onScroll);
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },

  methods: {
    onScroll() {
      if (window.scrollY <= 0) {
        this.navbarPos = 0;
      } else if (window.scrollY > this.scrollPos) {
        this.navbarPos = Math.max(this.navbarPos + (this.scrollPos - window.scrollY), -60);
      } else {
        this.navbarPos = Math.min(this.navbarPos + (this.scrollPos - window.scrollY), 0);
      }

      this.scrollPos = window.scrollY;
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="scss">
@import '@theme/styles/config.scss';

$navbar-vertical-padding: 0.7rem;
$navbar-horizontal-padding: 1.5rem;

#nprogress .bar {
  height: 2px;
  background-color: rgba($accentColor, 0.9);

  .peg {
    box-shadow: none;
  }
}

.theme-container {
  &::before {
    content: '';
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    border-top: 2px solid $accentColor; 
    z-index: 21;

    .nprogress-busy & {
      border-top-color: transparent;  
    }
  }
}

.navbar {
  padding: $navbar-vertical-padding $navbar-horizontal-padding;
  line-height: $navbarHeight - 1.4rem;

  a, span, img {
    display: inline-block;
  }

  .logo {
    height: $navbarHeight - 1.4rem;
    min-width: $navbarHeight - 1.4rem;
    margin-right: 0.8rem;
    vertical-align: top;
  }

  .site-name {
    font-family: 'Bellefair', serif;
    font-size: 21px;
    font-weight: 400;
    color: $accentColor;
    position: relative;
    letter-spacing: 0.4em;
    margin-right: -0.2em;

    @media (max-width: $MQMobile) {
      font-size: 18px;
    }
  }

  .home-link {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    background-color: white;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    right: $navbar-horizontal-padding;
    top: $navbar-vertical-padding;
    display: flex;

    @media (max-width: $MQMobile) {
      padding-left: 0;
    }

    .search-box {
      flex: 0 0 auto;
      vertical-align: top;
      margin-right: 0;

      input {
        border: none;
        border-radius: 0;
        background: desaturate( lighten($textColor, 65%), 20%) url(../assets/images/search.svg) 0.6rem 0.6rem no-repeat;
      }

      input:focus {
        cursor: auto;
        border-color: $accentColor;
      }

      .suggestions {
        border-color: $darkborderColor;
        right: 0;
        border-radius: 0;
      }

      .suggestion {
        a {
          color: $textColor;
        }

        &.focused a {
          color: $accentColor;
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .navbar {
    padding-left: 4rem;

    .can-hide {
      display: none;
    }
  }
}
</style>
