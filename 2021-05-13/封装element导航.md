# 封装elementUI 的导航栏

**注意：**

1. **数据需要通过父页面传递进来，在模板中会造成数据溢出**
2. 模板需要有name属性，调用模板的父页面的组件名称和模板name需一致，才能实现递归。

```vue
//menu.vue;
<template>
  <div>
    <template v-for="list in this.menuList">
      <!-- //循环数据；数据menuList通过props传递 -->
      <el-submenu
                  v-if="list.children.length > 0"
                  :key="list.resourceId"
                  :index="list.resourceName"
                  >
        <template slot="title">
          <!-- <i class="el-icon-menu"></i> -->
          <span slot="title">{{ list.resourceName }}</span>
  </template>
  <nav-menu :menuList="list.children"></nav-menu>
  <!-- //当有子集数据再次使用这个模板，:menuList通过props传递 -->
  </el-submenu>
  <el-menu-item
                v-else
                :index="list.resourceName"
                :key="list.resourceId"
                >
    <span>{{ list.resourceName }}</span>
  </el-menu-item>
  </template>
  </div>
</template>
<style>
  .el-menu--collapse span,
  .el-menu--collapse i.el-submenu__icon-arrow {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
</style>
<script>
  export default {
    name: "NavMenu", //模板名称
    data() {
      return {};
    },
    beforeMount() {},
    props: ["menuList"],
  };
</script>
```

2.父页面使用组件

```vue
<template>
<div class="home">
  <el-button>哈哈</el-button>
  <el-menu
           class="el-menu-vertical-demo"
           :collapse="isCollapse"
           unique-opened
           >
    <nav-menu :menuList="this.menuList" />
    <!-- <Menu :menuList="this.menuList"></Menu> -->
  </el-menu>
  </div>
</template>

<script>
  import NavMenu from "../components/NavMenu.vue";

  export default {
    name: "Home",
    data: () => ({
      menuList: [ // 无限层级
        {
          resourceName: "1导航",
          resourceId: "1",
          children: [
            {
              resourceName: "1-1导航",
              resourceId: "1-1",
              children: [
                {
                  resourceName: "1-2导航",
                  resourceId: "1-2",
                  children: [
                    {
                      resourceName: "1-3导航",
                      resourceId: "1-3",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          resourceName: "2导航",
          resourceId: "2",
          children: [],
        },
      ],
      isCollapse: false,
    }),
    components: {
      HelloWorld,
      NavMenu,
    },
  };
</script>
<style scoped>
  .home {
    max-width: 200px;
  }
</style>
```

