"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var AddAssumptions = function (_React$Component) {
  _inherits(AddAssumptions, _React$Component);

  function AddAssumptions(props) {
    _classCallCheck(this, AddAssumptions);

    var _this = _possibleConstructorReturn(this, (AddAssumptions.__proto__ || Object.getPrototypeOf(AddAssumptions)).call(this, props));

    _this.newClassModalOpen = function () {
      var myModal = new bootstrap.Modal(document.getElementById('newClassModal'), {});
      myModal.show();
    };

    _this.newClassModalClose = function () {
      var myModal = new bootstrap.Modal(document.getElementById('newClassModal'), {});
      myModal.hide();
    };

    _this.onBusinessClassChange = function (event) {
      console.log(event);
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      _this.setState({
        businessClass: Object.assign({}, _this.state.businessClass, _defineProperty({}, name, value))
      });
    };

    _this.onBusinessClassSubmit = function () {
      var newClass = _this.state.businessClass;
      var className = newClass.businessClassName;
      var businessClassList = _this.state.businessClassList;

      if (businessClassList.includes(className)) {
        return;
      } else {
        _this.setState(function (prevState) {
          return {
            businessClassList: [].concat(_toConsumableArray(prevState.businessClassList), [newClass])
          };
        });
        _this.setState(function (prevState) {
          return {
            businessClassFields: [].concat(_toConsumableArray(prevState.businessClassFields), [newClass.businessClassName])
          };
        });
        document.getElementById("newClassModalForm").reset();
      }
    };

    _this.state = {
      businessClassList: [],
      businessClassFields: ["accident", "engineering", "fire", "motor", "aviation", "drugs"],
      businessClass: {
        businessClassName: "",
        discountRate: "",
        expenseRatio: "",
        lossRatio: "",
        riskAdjustment: "",
        acquisitionCosts: ""
      }
    };
    return _this;
  }

  _createClass(AddAssumptions, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // this.setState({
      //   serviceProvider: this.props.spid,
      // });
    }
  }, {
    key: "render",
    value: function render() {
      var displayBusinessClassList = this.state.businessClassList;

      var addBusinessClassModal = React.createElement(
        "div",
        {
          className: "modal fade",
          id: "newClassModal",
          tabIndex: "-1",
          "aria-labelledby": "newClassLabel",
          "aria-hidden": "true"
        },
        React.createElement(
          "div",
          { className: "modal-dialog" },
          React.createElement(
            "div",
            { className: "modal-content", style: { fontSize: "0.5em" } },
            React.createElement(
              "div",
              { className: "modal-header" },
              React.createElement(
                "h5",
                {
                  className: "modal-title text-dark",
                  id: "newClassLabel",
                  style: { paddingTop: "10px" }
                },
                "New Business Class"
              ),
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-close btn-neutral",
                  "data-bs-dismiss": "modal",
                  "aria-label": "Close",
                  style: { margin: "0px", fontSize: "1.3em" }
                },
                React.createElement("i", { className: "fa-solid fa-xmark" })
              )
            ),
            React.createElement(
              "div",
              { className: "modal-body" },
              React.createElement(
                "form",
                { id: "newClassModalForm" },
                React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                    "label",
                    { className: "text-dark", htmlFor: "class" },
                    "Business Class Name"
                  ),
                  React.createElement("input", {
                    type: "text",
                    name: "businessClassName",
                    onChange: this.onBusinessClassChange,
                    className: "form-control",
                    id: "class",
                    "aria-describedby": "class",
                    placeholder: "Enter business class"
                  })
                ),
                React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                    "label",
                    { className: "text-dark", htmlFor: "discount_rate" },
                    "Discount Rate"
                  ),
                  React.createElement("input", {
                    type: "text",
                    name: "discountRate",
                    onChange: this.onBusinessClassChange,
                    className: "form-control",
                    id: "discount_rate",
                    "aria-describedby": "discount_rate",
                    placeholder: "Enter discount rate"
                  })
                ),
                React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                    "label",
                    { className: "text-dark", htmlFor: "expense_ratio" },
                    "Expense Ratio"
                  ),
                  React.createElement("input", {
                    type: "text",
                    name: "expenseRatio",
                    onChange: this.onBusinessClassChange,
                    className: "form-control",
                    id: "expense_ratio",
                    "aria-describedby": "expense_ratio",
                    placeholder: "Enter expense ratio"
                  })
                ),
                React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                    "label",
                    { className: "text-dark", htmlFor: "loss_ratio" },
                    "Loss Ratio"
                  ),
                  React.createElement("input", {
                    type: "text",
                    name: "lossRatio",
                    onChange: this.onBusinessClassChange,
                    className: "form-control",
                    id: "loss_ratio",
                    "aria-describedby": "loss_ratio",
                    placeholder: "Enter loss ratio"
                  })
                ),
                React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                    "label",
                    { className: "text-dark", htmlFor: "risk_adjustment" },
                    "Risk Adjustment"
                  ),
                  React.createElement("input", {
                    type: "text",
                    name: "riskAdjustment",
                    onChange: this.onBusinessClassChange,
                    className: "form-control",
                    id: "risk_adjustment",
                    "aria-describedby": "risk_adjustment",
                    placeholder: "Enter risk adjustment"
                  })
                ),
                React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                    "label",
                    { className: "text-dark", htmlFor: "acquisition_cost" },
                    "Acquisistion Costs"
                  ),
                  React.createElement("input", {
                    type: "text",
                    name: "acquisitionCosts",
                    onChange: this.onBusinessClassChange,
                    className: "form-control",
                    id: "acquisition_cost",
                    "aria-describedby": "acquisition_cost",
                    placeholder: "Enter acquisition costs"
                  })
                )
              )
            ),
            React.createElement(
              "div",
              { className: "modal-footer" },
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-secondary",
                  "data-bs-dismiss": "modal"
                },
                "Close"
              ),
              React.createElement(
                "button",
                {
                  type: "button",
                  onClick: this.onBusinessClassSubmit,
                  className: "btn btn-primary",
                  "data-bs-dismiss": "modal"
                },
                "Save changes"
              )
            )
          )
        )
      );

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-12" },
            React.createElement("input", {
              type: "hidden",
              name: "classFields",
              value: this.state.businessClassFields
            }),
            React.createElement(
              "div",
              { className: "card", style: { background: "#bbbbe9" } },
              React.createElement(
                "div",
                { className: "card-header" },
                React.createElement(
                  "h5",
                  { className: "card-title" },
                  "Assumptions"
                ),
                React.createElement(
                  "span",
                  { className: "card-category text-dark" },
                  "Upload dataset and add all relevant assumptions"
                ),
                React.createElement(
                  "div",
                  { className: "d-flex mt-3" },
                  React.createElement("span", { className: "card-category text-dark" }),
                  React.createElement(
                    "div",
                    {
                      className: "input-group",
                      style: { marginRight: "auto", width: "25%" }
                    },
                    React.createElement("input", {
                      type: "text",
                      name: "session__name",
                      className: "form-control",
                      placeholder: "Session Name"
                    })
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "card-body" },
                React.createElement(
                  "div",
                  { className: "table-responsive" },
                  React.createElement(
                    "table",
                    { className: "table" },
                    React.createElement(
                      "thead",
                      { className: "text-dark" },
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "th",
                          null,
                          "Business ",
                          React.createElement("br", null),
                          "Class"
                        ),
                        React.createElement(
                          "th",
                          null,
                          "Discount ",
                          React.createElement("br", null),
                          "Rate"
                        ),
                        React.createElement(
                          "th",
                          null,
                          "Expense ",
                          React.createElement("br", null),
                          "Ratio"
                        ),
                        React.createElement(
                          "th",
                          null,
                          "Loss ",
                          React.createElement("br", null),
                          "Ratio"
                        ),
                        React.createElement(
                          "th",
                          null,
                          "Risk ",
                          React.createElement("br", null),
                          "Adjustment"
                        ),
                        React.createElement(
                          "th",
                          null,
                          "Acquisistion ",
                          React.createElement("br", null),
                          "costs (Commissions)"
                        )
                      )
                    ),
                    React.createElement(
                      "tbody",
                      null,
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text" },
                          "Accident"
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "accident_discount_rate",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "accident_expense_ratio",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "accident_loss_ratio",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "accident_risk_adjustment",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "accident_acquisition_costs",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        )
                      ),
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text" },
                          "Engineering"
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "engineering_discount_rate",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "engineering_expense_ratio",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "engineering_loss_ratio",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "engineering_risk_adjustment",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "engineering_acquisition_costs",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        )
                      ),
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text" },
                          "Fire"
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "fire_discount_rate",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "fire_expense_ratio",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "fire_loss_ratio",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "fire_risk_adjustment",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "fire_acquisition_costs",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        )
                      ),
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text" },
                          "Motor"
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "motor_discount_rate",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "motor_expense_ratio",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "motor_loss_ratio",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "motor_risk_adjustment",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "motor_acquisition_costs",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        )
                      ),
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text" },
                          "Drugs"
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "drugs_discount_rate",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "drugs_expense_ratio",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "drugs_loss_ratio",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "drugs_risk_adjustment",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "drugs_acquisition_costs",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        )
                      ),
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text" },
                          "Aviation"
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "aviation_discount_rate",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "aviation_expense_ratio",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "aviation_loss_ratio",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "aviation_risk_adjustment",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement(
                            "div",
                            { className: "input-group input-group-sm" },
                            React.createElement("input", {
                              type: "number",
                              name: "aviation_acquisition_costs",
                              className: "form-control",
                              placeholder: "e.g 0.5",
                              "aria-label": "",
                              "aria-describedby": ""
                            }),
                            React.createElement(
                              "span",
                              {
                                className: "input-group-text",
                                id: "inputGroup-sizing-sm"
                              },
                              "%"
                            )
                          )
                        )
                      ),
                      displayBusinessClassList.length !== 0 ? displayBusinessClassList.map(function (element) {
                        return React.createElement(
                          "tr",
                          null,
                          React.createElement(
                            "td",
                            { className: "assumptions-text" },
                            element.businessClassName
                          ),
                          React.createElement(
                            "td",
                            { className: "assumptions-text text-center" },
                            React.createElement(
                              "div",
                              { className: "input-group input-group-sm" },
                              React.createElement("input", {
                                type: "number",
                                name: element.businessClassName.replace(/\s/g, "").toLowerCase() + "_discount_rate",
                                value: element.discountRate,
                                className: "form-control",
                                placeholder: "e.g 0.5",
                                "aria-label": "",
                                "aria-describedby": ""
                              }),
                              React.createElement(
                                "span",
                                {
                                  className: "input-group-text",
                                  id: "inputGroup-sizing-sm"
                                },
                                "%"
                              )
                            )
                          ),
                          React.createElement(
                            "td",
                            { className: "assumptions-text text-center" },
                            React.createElement(
                              "div",
                              { className: "input-group input-group-sm" },
                              React.createElement("input", {
                                type: "number",
                                name: element.businessClassName.replace(/\s/g, "").toLowerCase() + "_expense_ratio",
                                value: element.expenseRatio,
                                className: "form-control",
                                placeholder: "e.g 0.5",
                                "aria-label": "",
                                "aria-describedby": ""
                              }),
                              React.createElement(
                                "span",
                                {
                                  className: "input-group-text",
                                  id: "inputGroup-sizing-sm"
                                },
                                "%"
                              )
                            )
                          ),
                          React.createElement(
                            "td",
                            { className: "assumptions-text text-center" },
                            React.createElement(
                              "div",
                              { className: "input-group input-group-sm" },
                              React.createElement("input", {
                                type: "number",
                                name: element.businessClassName.replace(/\s/g, "").toLowerCase() + "_loss_ratio",
                                value: element.lossRatio,
                                className: "form-control",
                                placeholder: "e.g 0.5",
                                "aria-label": "",
                                "aria-describedby": ""
                              }),
                              React.createElement(
                                "span",
                                {
                                  className: "input-group-text",
                                  id: "inputGroup-sizing-sm"
                                },
                                "%"
                              )
                            )
                          ),
                          React.createElement(
                            "td",
                            { className: "assumptions-text text-center" },
                            React.createElement(
                              "div",
                              { className: "input-group input-group-sm" },
                              React.createElement("input", {
                                type: "number",
                                name: element.businessClassName.replace(/\s/g, "").toLowerCase() + "_risk_adjustment",
                                value: element.riskAdjustment,
                                className: "form-control",
                                placeholder: "e.g 0.5",
                                "aria-label": "",
                                "aria-describedby": ""
                              }),
                              React.createElement(
                                "span",
                                {
                                  className: "input-group-text",
                                  id: "inputGroup-sizing-sm"
                                },
                                "%"
                              )
                            )
                          ),
                          React.createElement(
                            "td",
                            { className: "assumptions-text text-center" },
                            React.createElement(
                              "div",
                              { className: "input-group input-group-sm" },
                              React.createElement("input", {
                                type: "number",
                                name: element.businessClassName.replace(/\s/g, "").toLowerCase() + "_acquisition_costs",
                                value: element.acquisitionCosts,
                                className: "form-control",
                                placeholder: "e.g 0.5",
                                "aria-label": "",
                                "aria-describedby": ""
                              }),
                              React.createElement(
                                "span",
                                {
                                  className: "input-group-text",
                                  id: "inputGroup-sizing-sm"
                                },
                                "%"
                              )
                            )
                          )
                        );
                      }) : null,
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text", colSpan: "2" },
                          React.createElement(
                            "button",
                            {
                              type: "button",
                              className: "btn btn-neutral mr-2",
                              onClick: this.newClassModalOpen,
                              databstoggle: "modal",
                              databstarget: "#newClassModal"
                            },
                            React.createElement("i", { className: "nc-icon nc-simple-add" }),
                            "New Class"
                          )
                        ),
                        React.createElement("td", { className: "assumptions-text text-center" }),
                        React.createElement("td", { className: "assumptions-text text-center" }),
                        React.createElement("td", { className: "assumptions-text text-center" }),
                        React.createElement("td", { className: "assumptions-text text-center" })
                      ),
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          {
                            className: "assumptions-text",
                            style: { fontWeight: "bold" }
                          },
                          "Actions"
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-right" },
                          React.createElement(
                            "span",
                            { className: "", style: { fontWeight: "bold" } },
                            "Upload Datasheet"
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-left" },
                          React.createElement(
                            "div",
                            { className: "" },
                            React.createElement("input", {
                              name: "datasheet",
                              className: "form-control text-info",
                              type: "file",
                              id: "formFile",
                              accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            })
                          )
                        ),
                        React.createElement(
                          "td",
                          {
                            className: "assumptions-text text-center",
                            colSpan: "2"
                          },
                          React.createElement(
                            "button",
                            {
                              type: "submit",
                              className: "btn mr-2",
                              style: { background: "#f99400" }
                            },
                            React.createElement("i", { className: "nc-icon nc-send" }),
                            "Submit"
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement("div", { className: "input-group input-group-sm" })
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        addBusinessClassModal
      );
    }
  }]);

  return AddAssumptions;
}(React.Component);

var domContainer = document.querySelector("#react-add-assumptions");
var spid = domContainer.getAttribute("data-spid");
ReactDOM.render(e(AddAssumptions, { spid: spid }), domContainer);