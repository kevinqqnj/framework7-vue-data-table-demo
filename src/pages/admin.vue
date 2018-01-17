<template>
	<div>
    <f7-block-title>About 2. Welcome to Framework7</f7-block-title>
    <f7-block strong>
          <p>Framework7 - is a free and open source HTML mobile <f7-link popover-open=".popover-menu">popover tab2</f7-link> framework to develo<br>

      <p>Framework7 - is a free and open source HTML mobile f<br><br>ramework to develop hybrid mobile apps or web apps with iOS or Android (Material) native look and feel. It is also an indispensable prototyping apps tool to show working app prototype as soon as possible in case you need to. Framework7 is created by Vladimir Kharlampidi (iDangero.us).</p>
      <p><br><br>The main approach of the Framework7 is to give <br><br>you an opportunity to create iOS and Android (Material) apps with HTML, CSS and JavaScript easily and clear. Framework7 is full of freedom. It doesn't limit your imagination or offer ways of any solutions somehow. Framework7 gives you freedom!</p>
      <p><br><br>Framework7 is not compatible with all platforms. It is focused only on iOS <br><br>and Android (Material) to bring the best experience and simplicity.</p>
      <p>Framework7 is definitely for you if you decide to build iOS <br><br>and Android hybrid app (PhoneGap) or web app that looks like and feels as great native iOS or Android (Material) apps.</p>
    </f7-block>
    	  
    	      		    	<f7-popover class="popover-menu" id="mypop">
      <f7-list>
        <f7-list-item link="/form/" popover-close title="tab2 Forms"></f7-list-item>
        <f7-list-item link="#" popover-close><f7-link href="http://www.baidu.com" external target="_blank" >External</f7-link></f7-list-item>
        <f7-list-item link="#" popover-close class="panel-open" open-panel="left" title="Side Panels"></f7-list-item>
      </f7-list>
    </f7-popover>
    					
    </div>
</template>
<style>
.overflow-tabs {
	overflow: auto;
	}
</style>
<script>
 export default {
 	   mounted() {
        console.log('admin.vue')
    },
  };
</script>
