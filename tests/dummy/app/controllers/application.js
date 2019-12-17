import Controller from "@ember/controller";

export default Controller.extend({
  input: "",
  data: null,

  actions: {
    updateData(event) {
      const { value } = event.target;
      try {
        this.set("data", JSON.parse(value));
      } catch (error) {
        alert(error.message);
      }
    }
  }
});
