const Parent = window.DDG.base.Page;
const TrackerListView = require('./../views/trackerlist.es6.js');
const TrackerListModel = require('./../models/trackerlist.es6.js');
const TrackerListTemplate = require('./../templates/trackerlist.es6.js');

const SiteView = require('./../views/site.es6.js');
const SiteModel = require('./../models/site.es6.js');
const SiteTemplate = require('./../templates/site.es6.js');

const SearchView = require('./../views/search.es6.js');
const SearchModel = require('./../models/search.es6.js');
const SearchTemplate = require('./../templates/search.es6.js');

const ItemMenuView = require('./../views/itemMenu.es6.js');
const ItemMenuModel = require('./../models/itemMenu.es6.js');
const ItemMenuTemplate = require('./../templates/itemMenu.es6.js');

function Trackers (ops) {
    Parent.call(this, ops);
};

Trackers.prototype = $.extend({},
    Parent.prototype,
    {

        pageType: 'trackers',

        ready: function() {

            var $parent = $('#ddg-site-info');

            Parent.prototype.ready.call(this);

            this.views.search = new SearchView({
                pageView: this,
                model: new SearchModel({searchText:''}), // TODO proper location of remembered query
                appendTo: $parent,
                template: SearchTemplate
            });

            this.views.site = new SiteView({
                pageView: this,
                model: new SiteModel({
                    domain: "cnn.com",    // FIXME remove dummy data, handle initial/zero case
                    isWhitelisted: false,
                    siteRating: 'B',
                    trackerCount: 0
                }),
                appendTo: $parent,
                template: SiteTemplate
            });

            this.views.trackerlist = new ItemMenuView({
                pageView: this,
                model: new ItemMenuModel({title: 'Options', id: "options-page",
                     link: function() { chrome.tabs.create({ url: 'chrome-extension://' + chrome.runtime.id + '/html/options.html' }); }
                }),
                appendTo: $parent,
                template: ItemMenuTemplate
            });

            this.views.trackerlist = new TrackerListView({
                pageView: this,
                model: new TrackerListModel({}),
                appendTo: $parent,
                template: TrackerListTemplate
            });


        }

    }
);

// kickoff!
window.DDG = window.DDG || {};
window.DDG.page = new Trackers();