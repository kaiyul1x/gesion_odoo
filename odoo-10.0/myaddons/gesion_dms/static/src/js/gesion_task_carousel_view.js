odoo.define('gesion_dms_views.task_carousel_view', function(require) {
"use strict";

var core = require('web.core');
var Widget = require('web.Widget');
var _t = core._t;

var TaskCarouselView = Widget.extend({
	template: '',
	events: {
    },
	init: function(parent, action) {
        this._super(parent);
        this.name = _t('Gesion Task Carouse lView');
        console.log(action);
        this.params = action.params;
        this.context_params = action.context;
    },
    start: function () {
    	this.$('[data-toggle="tooltip"]').tooltip();
        this.load_view();
    },
    load_view: function() {
    	var self = this;
    	console.log(self);
    	var carousel_url = '/gesion_dms/static/src/carousel/index.html?project_id=' + self.context_params.active_id.toString();
    	// window.location.href=carousel_url;
    	window.open(carousel_url, '_blank');
    },
});

core.action_registry.add('gesion_dms_views.task_carousel_view', TaskCarouselView);

return TaskCarouselView;

});