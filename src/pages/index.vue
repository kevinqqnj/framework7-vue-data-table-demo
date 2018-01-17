<template>
    <f7-page :page-content="false">
        <f7-navbar>
            <f7-nav-left>
                <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
            </f7-nav-left>
            <div class="title">Framework7-Vue</div>
            <f7-nav-right>
                <f7-link class="searchbar-enable" data-searchbar=".searchbar-components" icon="fas fa-search"></f7-link>
            </f7-nav-right>
            <f7-searchbar class="searchbar-components" search-container=".components-list" search-in="a" expandable></f7-searchbar>
        </f7-navbar>
        <f7-toolbar tabbar>
            <a href="./" class="tab-link" data-route-tab-id="tab1">
              <i class="icon fas fa-home fa-2x"></i>
              <!-- <span class="tabbar-label">Home</span> -->
            </a>
            <a href="tab2/" class="tab-link" data-route-tab-id="tab2">
              <span class="fa-layers fa-2x">
                <i class="fas fa-calendar-alt"></i>
                <span class="fa-layers-counter">19</span>
              </span>
            </a>
            <a href="tab3/" class="tab-link" data-route-tab-id="tab3">
              <i class="icon fas fa-user fa-2x"></i>
            </a>
                    <a href="tab4/" class="tab-link" data-route-tab-id="tab4">
              <i class="icon fas fa-cog fa-2x"></i>
            </a>
        </f7-toolbar>
        <f7-tabs routable>
            <f7-tab class="page-content hide-navbar-on-scroll" id="tab1"></f7-tab>
            <f7-tab class="page-content" id="tab2"></f7-tab>
            <f7-tab class="page-content" id="tab3"></f7-tab>
    		<f7-tab class="page-content" id="tab4"></f7-tab>
        </f7-tabs>
    </f7-page>
</template>
<style>
.fa-layers-counter {
    height: 1.05em;
    right: -0.2em;
    font-size: 1.7em;
}
</style>
<script>
export default {};
</script>
