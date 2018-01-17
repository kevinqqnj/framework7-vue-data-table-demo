<template>
	<div>
    <f7-block-title>About 1</f7-block-title>
    <f7-block strong>
      <p><f7-link popover-open=".popover-menu"><i class="icon fas fa-home fa-2x"></i> popover tab1</f7-link> framework to develo<br>
    
        <f7-icon icon="fas fa-home fa-lg"></f7-icon><f7-badge color="red" class="fa-badge-lg">7</f7-badge>
    <f7-icon icon="fas fa-home fa-2x"></f7-icon><f7-badge color="red" class="fa-badge-2x">8</f7-badge>
    <br>p hybrid mobile apps or web apps with iOS or Android (Material) native look and feel. It is also an indispensable prototyping apps tool to show working app prototype as soon as possible in case you need to. Framework7 is created by Vladimir Kharlampidi (iDangero.us).</p>
      <p><br><br>The main approach of the Framework7 is to give yo<br><br>u an opportunity to create iOS and Android (Material) apps with HTML, CSS and JavaScript easily and clear. Framework7 is full of freedom. It doesn't limit your imagination or offer ways of any solutions somehow. Framework7 gives you freedom!</p>
      <p><br><br>Framework7 is not compatible with all platforms. It is focuse<br><br>d only on iOS and Android (Material) to bring the best experience and simplicity.</p>
      <p>Framework7 is definitely <br><br>for you if you decide <br><br>to build iOS and Android h<br><br>ybrid app (PhoneGap) or web app that looks like a<br><br>nd feels as great native iOS or Android (Material) apps.</p>
    <br>
    </f7-block>
    		
    		    	<f7-popover class="popover-menu" id="mypop">
      <f7-list>
        <f7-list-item link="/form/" popover-close title="Tab1 Forms"></f7-list-item>
        <f7-list-item link="#" popover-close title="Use methods" @click.native="pop_menu"></f7-list-item>
        <f7-list-item link="#" popover-close><f7-link href="http://www.baidu.com" external target="_blank" >External   </f7-link></f7-list-item>
        <f7-list-item link="#" popover-close class="panel-open" open-panel="left" title="Side Panels"></f7-list-item>
      </f7-list>
    </f7-popover>
    					
    </div>
</template>

<style>
.page-content .pt-tabs {
	padding-top: 0px;
}
</style>

<script>
 export default {
  mounted() {
        console.log('tab1.vue')
    },
    	methods: {
    		pop_menu() {
    		console.log('popover menu clicked')
    		}	
    	}
  };
</script>
