var Movie = Backbone.Model.extend({

  initialize: function() {
    this.on('change:like', function() {
      this.collection.sort();
    });
  },

  defaults: {
    like: true
  },

  toggleLike: function() {
    // your code here
    var thisLike = this.get('like');
    this.set('like', !thisLike);

  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    // your code here
    //this.set('comparator', 'title');
    this.comparator = 'title';

  },

  comparator: 'title',

  sortByField: function(field) {
    // your code here
    this.comparator = field;
    this.sort();
  },

});
  // model.on('change', function() {
  //   console.log('hello');
  // }

var AppView = Backbone.View.extend({
  initialize: function() {

  },

  events: {
    'click form input': 'handleClick',
    'sort': 'render'
  },


  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    // your code here
    this.model.on('change', this.render, this);
  },

  events: {
    'click button': 'handleClick',
    'sort': 'render'
  },

  handleClick: function(e) {
    // your code here
    // var field = $(e.target).val();
    this.model.toggleLike();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
    this.collection.on('sort', this.render, this);
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
