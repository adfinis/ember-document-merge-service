import { Serializer } from "ember-cli-mirage";

export default Serializer.extend({
  serialize(/*object, request*/) {
    // This is how to call super, as Mirage borrows [Backbone's implementation of extend](http://backbonejs.org/#Model-extend)
    let json = Serializer.prototype.serialize.apply(this, arguments);

    return { results: json.templates };
  }
});
