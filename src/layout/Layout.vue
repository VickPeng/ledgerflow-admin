<template>
  <el-container class="app-layout">
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="logo">
        <span v-show="!isCollapse">LedgerFlow</span>
        <span v-show="isCollapse">LF</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
      >
        <el-menu-item index="/dashboard">
          <i class="el-icon-s-data" />
          <span slot="title">Dashboard</span>
        </el-menu-item>
        <el-menu-item index="/orders">
          <i class="el-icon-s-order" />
          <span slot="title">Orders</span>
        </el-menu-item>
        <el-menu-item index="/customers">
          <i class="el-icon-s-custom" />
          <span slot="title">Customers</span>
        </el-menu-item>
        <el-menu-item index="/settings">
          <i class="el-icon-s-tools" />
          <span slot="title">Settings</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header height="60px">
        <div class="header-left">
          <i
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            class="collapse-btn"
            @click="toggleCollapse"
          />
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item
              v-for="(item, index) in breadcrumbs"
              :key="index"
            >
              {{ item }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <span>{{ user.email }}</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-user-solid" style="font-size: 18px; cursor: pointer;" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Profile</el-dropdown-item>
              <el-dropdown-item divided>Logout</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapState(['user']),
    activeMenu() {
      return this.$route.path
    },
    breadcrumbs() {
      return this.$route.meta && this.$route.meta.breadcrumb
        ? this.$route.meta.breadcrumb
        : []
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
