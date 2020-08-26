<template>
  <aside class="sidebar">
    <NavLinks/>
    <slot name="top"/>
    <SidebarLinks :depth="0" :items="items"/>
    <slot name="bottom"/>
  </aside>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  name: 'Sidebar',

  components: { SidebarLinks, NavLinks },

  props: ['items']
}
</script>

<style lang="scss">
@import '@theme/styles/config.scss';

.sidebar {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: $sidebarWidth;
  bottom: 0;
  margin: 0;
  padding-top: $navbarHeight;
  border-right: 1px solid $borderColor;
  box-sizing: border-box;
  font-size: 16px;
  background-color: lighten($accentColor, 47%);
  overflow-y: auto;

  @media (max-width: $MQMobile) {
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }

  @media (max-width: $MQNarrow) {
    font-size: 15px;
    width: $mobileSidebarWidth;
  }

  .home &,
  .toc-page &,
  .theme-container.no-sidebar & {
    display: none;

    @media (max-width: $MQMobile) {
      display: block;
    }
  }

  .theme-container.no-navbar & {
    padding-top: 0;
  }

  .theme-container.sidebar-open & {
    @media (max-width: $MQMobile) {
      transform: translateX(0);
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem 0 0.75rem 0;

    @media (max-width: $MQMobile) {
      display: block;
    }

    a {
      font-weight: 600;
    }

    .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
      @media (max-width: $MQMobile) {
        top: calc(1rem - 2px);
      }
    }

    & > .sidebar-links {
      @media (max-width: $MQMobile) {
        padding: 1rem 0;
      }
    }

    .nav-item,
    .repo-link {
      display: block;
      line-height: 1.25rem;
      font-size: 1em;
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
  }

  & > .sidebar-links {
    padding: 1.35rem 0 0.75rem;

    & > li > a.sidebar-link {
      font-size: 1em;
      line-height: 1.2;
    }

    & > li:not(:first-child) {
      margin-top: .25rem;
    }
  }
}
</style>
