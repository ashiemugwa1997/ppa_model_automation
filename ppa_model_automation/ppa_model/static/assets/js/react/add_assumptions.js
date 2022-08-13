"use strict";

const e = React.createElement;

class AddAssumptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessClassList: [],
      businessClassFields: [
        "accident",
        "engineering",
        "fire",
        "motor",
        "aviation",
        "drugs",
      ],
      businessClass: {
        businessClassName: "",
        discountRate: "",
        expenseRatio: "",
        lossRatio: "",
        riskAdjustment: "",
        acquisitionCosts: "",
      },
    };
  }

  componentDidMount() {
    // this.setState({
    //   serviceProvider: this.props.spid,
    // });
  }

  newClassModalOpen = () => {
    let myModal = new bootstrap.Modal(
      document.getElementById("newClassModal"),
      {}
    );
    myModal.show();
  };

  newClassModalClose = () => {
    let myModal = new bootstrap.Modal(
      document.getElementById("newClassModal"),
      {}
    );
    myModal.hide();
  };

  onBusinessClassChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    this.setState({
      businessClass: {
        ...this.state.businessClass,
        [name]: value,
      },
    });
  };

  onBusinessClassSubmit = () => {
    let newClass = this.state.businessClass;
    let className = newClass.businessClassName;
    let businessClassList = this.state.businessClassList;

    if (businessClassList.includes(className)) {
      return;
    } else {
      this.setState((prevState) => ({
        businessClassList: [...prevState.businessClassList, newClass],
      }));
      this.setState((prevState) => ({
        businessClassFields: [
          ...prevState.businessClassFields,
          newClass.businessClassName,
        ],
      }));
      document.getElementById("newClassModalForm").reset();
    }
  };

  render() {
    let displayBusinessClassList = this.state.businessClassList;

    const addBusinessClassModal = (
      <div
        className="modal fade"
        id="newClassModal"
        tabIndex="-1"
        aria-labelledby="newClassLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ fontSize: "0.5em" }}>
            <div className="modal-header">
              <h5
                className="modal-title text-dark"
                id="newClassLabel"
                style={{ paddingTop: "10px" }}
              >
                New Business Class
              </h5>
              <button
                type="button"
                className="btn btn-close btn-neutral"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ margin: "0px", fontSize: "1.3em" }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <form id="newClassModalForm">
                <div className="form-group">
                  <label className="text-dark" htmlFor="class">
                    Business Class Name
                  </label>
                  <input
                    type="text"
                    name="businessClassName"
                    onChange={this.onBusinessClassChange}
                    className="form-control"
                    id="class"
                    aria-describedby="class"
                    placeholder="Enter business class"
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark" htmlFor="discount_rate">
                    Discount Rate
                  </label>
                  <input
                    type="text"
                    name="discountRate"
                    onChange={this.onBusinessClassChange}
                    className="form-control"
                    id="discount_rate"
                    aria-describedby="discount_rate"
                    placeholder="Enter discount rate"
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark" htmlFor="expense_ratio">
                    Expense Ratio
                  </label>
                  <input
                    type="text"
                    name="expenseRatio"
                    onChange={this.onBusinessClassChange}
                    className="form-control"
                    id="expense_ratio"
                    aria-describedby="expense_ratio"
                    placeholder="Enter expense ratio"
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark" htmlFor="loss_ratio">
                    Loss Ratio
                  </label>
                  <input
                    type="text"
                    name="lossRatio"
                    onChange={this.onBusinessClassChange}
                    className="form-control"
                    id="loss_ratio"
                    aria-describedby="loss_ratio"
                    placeholder="Enter loss ratio"
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark" htmlFor="risk_adjustment">
                    Risk Adjustment
                  </label>
                  <input
                    type="text"
                    name="riskAdjustment"
                    onChange={this.onBusinessClassChange}
                    className="form-control"
                    id="risk_adjustment"
                    aria-describedby="risk_adjustment"
                    placeholder="Enter risk adjustment"
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark" htmlFor="acquisition_cost">
                    Acquisistion Costs
                  </label>
                  <input
                    type="text"
                    name="acquisitionCosts"
                    onChange={this.onBusinessClassChange}
                    className="form-control"
                    id="acquisition_cost"
                    aria-describedby="acquisition_cost"
                    placeholder="Enter acquisition costs"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={this.onBusinessClassSubmit}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className="card" style={{ background: "#bbbbe9" }}>
              <div className="card-header">
                <h5 className="card-title">Assumptions</h5>
                <span className="card-category text-dark">
                  Upload dataset and add all relevant assumptions
                </span>
                <div className="d-flex mt-3">
                  <span className="card-category text-dark"></span>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="text-dark"></thead>
                    <tbody>
                      <tr>
                        <td className="assumptions-text" colSpan="2">
                          <div className="d-flex mt-3">
                            <span className="" style={{ fontWeight: "bold" }}>
                              Session Name
                            </span>
                          </div>
                        </td>
                        <td
                          className="assumptions-text"
                          colSpan="3"
                        >
                          <div className="">
                              <input
                                type="text"
                                name="session__name"
                                className="form-control"
                                placeholder="Session Name"
                              />
                          </div>
                        </td>
                        <td className="assumptions-text text-center">
                          <div className="input-group input-group-sm"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="assumptions-text" colSpan="2">
                          <div className="d-flex mt-3">
                            <span className="" style={{ fontWeight: "bold" }}>
                              Upload an Excel Spreadsheet with 3 sheets i.e
                              SourceData, CombinedRatios and ClassOfBusiness
                            </span>
                          </div>
                        </td>
                        <td
                          className="assumptions-text"
                          colSpan="3"
                        >
                        <div className="">
                            <input
                              name="datasheet"
                              className="form-control text-info"
                              type="file"
                              id="formFile"
                              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            />
                          </div>
                        </td>
                        <td className="assumptions-text text-center">
                        </td>
                      </tr>
                      <tr>
                        <td className="assumptions-text" colSpan="2">
                          <div className="d-flex mt-3">
                            <span className="" style={{ fontWeight: "bold" }}>
                              Discount Rate
                            </span>
                          </div>
                        </td>
                        <td
                          className="assumptions-text"
                          colSpan="3"
                        >
                          <div className="">
                              <input
                                type="text"
                                name="discount_rate"
                                className="form-control"
                                placeholder="Discount Rate"
                              />
                          </div>
                        </td>
                        <td className="assumptions-text text-center">
                          <div className="input-group input-group-sm"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="assumptions-text" colSpan="2">
                          <div className="d-flex mt-3">
                            <span className="" style={{ fontWeight: "bold" }}>
                              Measurement Date
                            </span>
                          </div>
                        </td>
                        <td
                          className="assumptions-text"
                          colSpan="3"
                        >
                          <div className="">
                              <input
                                type="text"
                                name="measurement_date"
                                className="form-control"
                                placeholder="Measurement Date"
                              />
                          </div>
                        </td>
                        <td className="assumptions-text text-center">
                          <div className="input-group input-group-sm"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="assumptions-text" colSpan="2">
                          <div className="d-flex mt-3">
                            <span className="" style={{ fontWeight: "bold" }}>
                              Risk Adjustment
                            </span>
                          </div>
                        </td>
                        <td
                          className="assumptions-text"
                          colSpan="3"
                        >
                          <div className="">
                              <input
                                type="text"
                                name="risk_adjustment"
                                className="form-control"
                                placeholder="Risk Adjustment"
                              />
                          </div>
                        </td>
                        <td className="assumptions-text text-center">
                          <div className="input-group input-group-sm"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="assumptions-text" colSpan="2">
                          <div className="d-flex mt-3">
                            <span className="" style={{ fontWeight: "bold" }}>
                              Loss Ratio
                            </span>
                          </div>
                        </td>
                        <td
                          className="assumptions-text"
                          colSpan="3"
                        >
                          <div className="">
                              <input
                                type="text"
                                name="loss_ratio"
                                className="form-control"
                                placeholder="Loss Ratio"
                              />
                          </div>
                        </td>
                        <td className="assumptions-text text-center">
                          <div className="input-group input-group-sm"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="assumptions-text" colSpan="2">
                          <div className="d-flex mt-3">
                            <span className="" style={{ fontWeight: "bold" }}>
                              
                            </span>
                          </div>
                        </td>
                        <td
                          className="assumptions-text"
                          colSpan="3"
                        >
                         <button
                            type="submit"
                            className="btn"
                            style={{ background: "#f99400" }}
                          >
                            <i className="nc-icon nc-send"></i>
                            Submit
                          </button>
                        </td>
                        <td className="assumptions-text text-center">
                          <div className="input-group input-group-sm"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {addBusinessClassModal}
      </div>
    );
  }
}

const domContainer = document.querySelector("#react-add-assumptions");
const spid = domContainer.getAttribute("data-spid");
ReactDOM.render(e(AddAssumptions, { spid }), domContainer);
