<template>
  <f7-page>
    <f7-navbar title="Data Table" back-link="Back"></f7-navbar>

    <f7-block-title>With title and different actions on select</f7-block-title>
    <div class="data-table data-table-init card">
      <div class="card-header">
        <div class="data-table-header">
          <div class="data-table-title">Nutrition</div>
        <div class="data-table-links"><a class="link">Add</a><a class="link">Remove</a></div>
          <div class="data-table-actions">
            <f7-link icon-if-ios="f7:sort" icon-if-md="material:sort"></f7-link>
            <f7-link icon-if-ios="f7:more_vertical_round" icon-if-md="material:more_vert"></f7-link>
          </div>
        </div>
        <div class="data-table-header-selected">
          <div class="data-table-title-selected"><span class="data-table-selected-count"></span> items selected</div>
          <div class="data-table-actions">
            <f7-link icon-if-ios="f7:trash" icon-if-md="material:delete"></f7-link>
            <f7-link icon-if-ios="f7:more_vertical_round" icon-if-md="material:more_vert"></f7-link>
          </div>
        </div>
      </div>
      <div class="card-content">
        <table>
          <thead>
            <tr>
              <th class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
              </th>
              <th class="label-cell sortable-cell sortable-cell-active">Desert (100g serving)</th>
              <th class="numeric-cell sortable-cell">Calories</th>
              <th class="numeric-cell sortable-cell">Fat (g)</th>
              <th class="numeric-cell sortable-cell">Carbs</th>
              <th class="numeric-cell sortable-cell">Protein (g)</th>
              <th class="tablet-only"><f7-icon if-ios="f7:chat_fill" if-md="material:message"></f7-icon> Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox" :checked="id_select" @click="id_click" />
                  <i class="icon-checkbox"></i>
                </label>
              </td>
              <td class="label-cell" ><f7-link popover-open="#mypop">Yogurt</f7-link></td>
              <td class="numeric-cell">159</td>
              <td class="numeric-cell">6.0</td>
              <td class="numeric-cell">24</td>
              <td class="numeric-cell">4.0</td>
              <td class="tablet-only">I like frozen yogurt</td>
            </tr>
            <tr>
              <td class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
              </td>
              <td class="label-cell">Ice cream sandwich</td>
              <td class="numeric-cell">237</td>
              <td class="numeric-cell">9.0</td>
              <td class="numeric-cell">37</td>
              <td class="numeric-cell">4.4</td>
              <td class="tablet-only">But like ice cream more</td>
            </tr>
            <tr>
              <td class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
              </td>
              <td class="label-cell">Eclair</td>
              <td class="numeric-cell">262</td>
              <td class="numeric-cell">16.0</td>
              <td class="numeric-cell">24</td>
              <td class="numeric-cell">6.0</td>
              <td class="tablet-only">Super tasty</td>
            </tr>
            <tr>
              <td class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
              </td>
              <td class="label-cell">Cupcake</td>
              <td class="numeric-cell">305</td>
              <td class="numeric-cell">3.7</td>
              <td class="numeric-cell">67</td>
              <td class="numeric-cell">4.3</td>
              <td class="tablet-only">Don't like it</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    	
    	<f7-popover class="popover-menu" id="mypop">
      <f7-list>
        <f7-list-item link="/form/" popover-close title="Forms"></f7-list-item>
        	<f7-list-item link="#" popover-close title="Use methods" @click.native="pop_menu"></f7-list-item>
        <f7-list-item link="#" popover-close><f7-link href="http://www.baidu.com" external target="_blank" >External</f7-link></f7-list-item>
        <f7-list-item link="#" popover-close class="panel-open" open-panel="left" title="Side Panels"></f7-list-item>
      </f7-list>
    </f7-popover>
   

  </f7-page>
</template>
<script>
 export default {
	data() {
        return {
            id_select: true,
        }
    },
    mounted() {
	this.$axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (response) {
    console.log(response);
  });
    },
    methods: {
    	id_click() {
    		this.id_select = ! this.id_select
    		console.log(`id_select: ${this.id_select}`)
    	},
    			pop_menu() {
    		console.log('popover menu clicked')
    		}	
    }
  };
</script>
