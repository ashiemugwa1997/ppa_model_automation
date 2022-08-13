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
      var myModal = new bootstrap.Modal(document.getElementById("newClassModal"), {});
      myModal.show();
    };

    _this.newClassModalClose = function () {
      var myModal = new bootstrap.Modal(document.getElementById("newClassModal"), {});
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
                  React.createElement("span", { className: "card-category text-dark" })
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
                    React.createElement("thead", { className: "text-dark" }),
                    React.createElement(
                      "tbody",
                      null,
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text", colSpan: "2" },
                          React.createElement(
                            "div",
                            { className: "d-flex mt-3" },
                            React.createElement(
                              "span",
                              { className: "", style: { fontWeight: "bold" } },
                              "Session Name"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          {
                            className: "assumptions-text",
                            colSpan: "3"
                          },
                          React.createElement(
                            "div",
                            { className: "" },
                            React.createElement("input", {
                              type: "text",
                              name: "session__name",
                              className: "form-control",
                              placeholder: "Session Name"
                            })
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement("div", { className: "input-group input-group-sm" })
                        )
                      ),
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text", colSpan: "2" },
                          React.createElement(
                            "div",
                            { className: "d-flex mt-3" },
                            React.createElement(
                              "span",
                              { className: "", style: { fontWeight: "bold" } },
                              "Upload an Excel Spreadsheet with 3 sheets i.e SourceData, CombinedRatios and ClassOfBusiness"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          {
                            className: "assumptions-text",
                            colSpan: "3"
                          },
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
                        React.createElement("td", { className: "assumptions-text text-center" })
                      ),
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text", colSpan: "2" },
                          React.createElement(
                            "div",
                            { className: "d-flex mt-3" },
                            React.createElement(
                              "span",
                              { className: "", style: { fontWeight: "bold" } },
                              "Discount Rate"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          {
                            className: "assumptions-text",
                            colSpan: "3"
                          },
                          React.createElement(
                            "div",
                            { className: "" },
                            React.createElement("input", {
                              type: "text",
                              name: "discount_rate",
                              className: "form-control",
                              placeholder: "Discount Rate"
                            })
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement("div", { className: "input-group input-group-sm" })
                        )
                      ),
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text", colSpan: "2" },
                          React.createElement(
                            "div",
                            { className: "d-flex mt-3" },
                            React.createElement(
                              "span",
                              { className: "", style: { fontWeight: "bold" } },
                              "Measurement Date"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          {
                            className: "assumptions-text",
                            colSpan: "3"
                          },
                          React.createElement(
                            "div",
                            { className: "" },
                            React.createElement("input", {
                              type: "text",
                              name: "measurement_date",
                              className: "form-control",
                              placeholder: "Measurement Date"
                            })
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement("div", { className: "input-group input-group-sm" })
                        )
                      ),
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text", colSpan: "2" },
                          React.createElement(
                            "div",
                            { className: "d-flex mt-3" },
                            React.createElement(
                              "span",
                              { className: "", style: { fontWeight: "bold" } },
                              "Risk Adjustment"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          {
                            className: "assumptions-text",
                            colSpan: "3"
                          },
                          React.createElement(
                            "div",
                            { className: "" },
                            React.createElement("input", {
                              type: "text",
                              name: "risk_adjustment",
                              className: "form-control",
                              placeholder: "Risk Adjustment"
                            })
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement("div", { className: "input-group input-group-sm" })
                        )
                      ),
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text", colSpan: "2" },
                          React.createElement(
                            "div",
                            { className: "d-flex mt-3" },
                            React.createElement(
                              "span",
                              { className: "", style: { fontWeight: "bold" } },
                              "Loss Ratio"
                            )
                          )
                        ),
                        React.createElement(
                          "td",
                          {
                            className: "assumptions-text",
                            colSpan: "3"
                          },
                          React.createElement(
                            "div",
                            { className: "" },
                            React.createElement("input", {
                              type: "text",
                              name: "loss_ratio",
                              className: "form-control",
                              placeholder: "Loss Ratio"
                            })
                          )
                        ),
                        React.createElement(
                          "td",
                          { className: "assumptions-text text-center" },
                          React.createElement("div", { className: "input-group input-group-sm" })
                        )
                      ),
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { className: "assumptions-text", colSpan: "2" },
                          React.createElement(
                            "div",
                            { className: "d-flex mt-3" },
                            React.createElement("span", { className: "", style: { fontWeight: "bold" } })
                          )
                        ),
                        React.createElement(
                          "td",
                          {
                            className: "assumptions-text",
                            colSpan: "3"
                          },
                          React.createElement(
                            "button",
                            {
                              type: "submit",
                              className: "btn",
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