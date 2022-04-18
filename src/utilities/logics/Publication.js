export default class Publication {
  constructor(owner, titlen, bodyn, createdn, state) {
    this._owner = owner;
    this._title = titlen;
    this._body = bodyn;
    this._created = createdn;
    this._public = state;
  }

  //TITLE OF THE DOC
  set title(title) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  //owner
  set owner(name) {
    this._owner = name;
  }

  get owner() {
    return this._owner;
  }

  //BODY OF THE DOC
  set body(bodyNew) {
    this._body = bodyNew;
  }

  get body() {
    return this._body;
  }

  //DATE OF CREATION
  set created(create) {
    this._created = create;
  }

  get created() {
    return this._created;
  }

  //WHO CAN SEE THIS DOC
  set access(state) {
    this._public = state;
  }

  get access() {
    return this._public;
  }

  //get the body of doc firebase

  doc() {
    return {
      owner: this.owner,
      title: this.title,
      body: this.body,
      created: this.created.getTime(),
      public: this.access,
    };
  }
}
