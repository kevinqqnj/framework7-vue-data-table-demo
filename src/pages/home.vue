<template>
    <f7-page>
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
        <f7-block-title>Introduction</f7-block-title>
        <f7-block inner>
            <p>This is template for Framework7 v2, Vue and Webpack.</p>
            <p>Here use Font-awesome 5 Icons, you can replace with other icon as you like.</p>
        </f7-block>
        <f7-block-title class="searchbar-found">Links</f7-block-title>
        <f7-list class="components-list searchbar-found">
            <f7-list-item link="/form/" title="Form">
                <f7-icon slot="media" icon="far fa-list-alt fa-lg fa-fw"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/dynamic-route/blog/11/post/23/" title="Dynamic Route">
                <f7-icon slot="media" icon="far fa-star fa-lg fa-fw"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/data-table/" title="Data-table">
                <f7-icon slot="media" icon="fas fa-table fa-lg fa-fw"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/tabs-routable/" title="Routable Tabs">
                <f7-icon slot="media" icon="fas fa-th-large fa-lg fa-fw" color="blue"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/about/" title="About">
                <f7-icon slot="media" icon="fas fa-info fa-lg fa-fw"></f7-icon>
            </f7-list-item>
        </f7-list>
        <f7-list class="searchbar-not-found">
            <f7-list-item title="Nothing found"></f7-list-item>
        </f7-list>
        <f7-block-title class="searchbar-hide-on-search">Themes</f7-block-title>
        <f7-list class="searchbar-hide-on-search">
            <f7-list-item title="iOS Theme" external link="./index.html?theme=ios"></f7-list-item>
            <f7-list-item title="Material (MD) Theme" external link="./index.html?theme=md"></f7-list-item>
            <f7-list-item title="Color Themes" link="/color-themes/"></f7-list-item>
    		<f7-list-item link="#">
    			<f7-link href="https://github.com/kevinqqnj" target="_blank" external class="item-link">Github</f7-link>
    		</f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
export default {};
</script>
