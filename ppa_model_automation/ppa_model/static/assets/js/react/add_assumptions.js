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
    this.setState((prevState) => ({
      businessClassList: [...prevState.businessClassList, newClass],
    }));
    this.setState((prevState) => ({
      businessClassFields: [
        ...prevState.businessClassFields,
        newClass.businessClassName,
      ],
    }));
  };

  render() {
    let displayBusinessClassList = this.state.businessClassList;
    console.log("fields: ", this.state.businessClassFields);

    const addBusinessClassModal = (
      <div
        className="modal fade"
        id="newClass"
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
              <form>
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
            <input type="hidden" name="classFields" value={this.state.businessClassFields} />
                
              <div className="card" style={{ background: "#bbbbe9" }}>
                <div className="card-header">
                  <h5 className="card-title">Assumptions</h5>
                  <p className="card-category text-dark">
                    Upload dataset and add all relevant assumptions
                  </p>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="text-dark">
                        <tr>
                          <th>
                            Business <br />
                            Class
                          </th>
                          <th>
                            Discount <br />
                            Rate
                          </th>
                          <th>
                            Expense <br />
                            Ratio
                          </th>
                          <th>
                            Loss <br />
                            Ratio
                          </th>
                          <th>
                            Risk <br />
                            Adjustment
                          </th>
                          <th>
                            Acquisistion <br />
                            costs (Commissions)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="assumptions-text">Accident</td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="accident_discount_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="accident_expense_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="accident_loss_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="accident_risk_adjustment"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="accident_acquisition_cost"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="assumptions-text">Engineering</td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="engineering_discount_rate"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="engineering_expense_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="engineering_loss_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="engineering_risk_adjustment"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="engineering_acquisition_costs"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="assumptions-text">Fire</td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="fire_discount_rate"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="fire_expense_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="fire_loss_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="fire_risk_adjustment"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="fire_acquisition_costs"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="assumptions-text">Motor</td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="motor_discount_rate"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="motor_expense_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="motor_loss_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="motor_risk_adjustment"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="motor_acquisition_costs"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="assumptions-text">Drugs</td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="drugs_discount_rate"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="drugs_expense_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="drugs_loss_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="drugs_risk_adjustment"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="drugs_acquisition_costs"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="assumptions-text">Aviation</td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="aviation_discount_rate"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="aviation_expense_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="aviation_loss_ratio"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="aviation_risk_adjustment"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                          <td className="assumptions-text text-center">
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                name="aviation_acquisition_costs"
                                className="form-control"
                                placeholder="e.g 0.5"
                                aria-label=""
                                aria-describedby=""
                              />
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </td>
                        </tr>

                        {displayBusinessClassList.length !== 0
                          ? displayBusinessClassList.map((element) => {
                              return (
                                <tr>
                                  <td className="assumptions-text">
                                    {element.businessClassName}
                                  </td>
                                  <td className="assumptions-text text-center">
                                    <div className="input-group input-group-sm">
                                      <input
                                        type="number"
                                        name={
                                          element.businessClassName
                                            .replace(/\s/g, "")
                                            .toLowerCase() + "_discount_rate"
                                        }
                                        value={element.discountRate}
                                        className="form-control"
                                        placeholder="e.g 0.5"
                                        aria-label=""
                                        aria-describedby=""
                                      />
                                      <span
                                        className="input-group-text"
                                        id="inputGroup-sizing-sm"
                                      >
                                        %
                                      </span>
                                    </div>
                                  </td>
                                  <td className="assumptions-text text-center">
                                    <div className="input-group input-group-sm">
                                      <input
                                        type="number"
                                        name={
                                          element.businessClassName
                                            .replace(/\s/g, "")
                                            .toLowerCase() + "_expense_ratio"
                                        }
                                        value={element.expenseRatio}
                                        className="form-control"
                                        placeholder="e.g 0.5"
                                        aria-label=""
                                        aria-describedby=""
                                      />
                                      <span
                                        className="input-group-text"
                                        id="inputGroup-sizing-sm"
                                      >
                                        %
                                      </span>
                                    </div>
                                  </td>
                                  <td className="assumptions-text text-center">
                                    <div className="input-group input-group-sm">
                                      <input
                                        type="number"
                                        name={
                                          element.businessClassName
                                            .replace(/\s/g, "")
                                            .toLowerCase() + "_loss_ratio"
                                        }
                                        value={element.lossRatio}
                                        className="form-control"
                                        placeholder="e.g 0.5"
                                        aria-label=""
                                        aria-describedby=""
                                      />
                                      <span
                                        className="input-group-text"
                                        id="inputGroup-sizing-sm"
                                      >
                                        %
                                      </span>
                                    </div>
                                  </td>
                                  <td className="assumptions-text text-center">
                                    <div className="input-group input-group-sm">
                                      <input
                                        type="number"
                                        name={
                                          element.businessClassName
                                            .replace(/\s/g, "")
                                            .toLowerCase() + "_risk_adjustment"
                                        }
                                        value={element.riskAdjustment}
                                        className="form-control"
                                        placeholder="e.g 0.5"
                                        aria-label=""
                                        aria-describedby=""
                                      />
                                      <span
                                        className="input-group-text"
                                        id="inputGroup-sizing-sm"
                                      >
                                        %
                                      </span>
                                    </div>
                                  </td>
                                  <td className="assumptions-text text-center">
                                    <div className="input-group input-group-sm">
                                      <input
                                        type="number"
                                        name={
                                          element.businessClassName
                                            .replace(/\s/g, "")
                                            .toLowerCase() +
                                          "_acquisition_costs"
                                        }
                                        value={element.acquisitionCosts}
                                        className="form-control"
                                        placeholder="e.g 0.5"
                                        aria-label=""
                                        aria-describedby=""
                                      />
                                      <span
                                        className="input-group-text"
                                        id="inputGroup-sizing-sm"
                                      >
                                        %
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          : ""}
                        <tr>
                          <td
                            className="assumptions-text"
                            style={{ fontWeight: "bold" }}
                          >
                            Actions
                          </td>
                          <td className="assumptions-text text-right">
                            <span className="" style={{ fontWeight: "bold" }}>
                              Upload Datasheet
                            </span>
                          </td>
                          <td className="assumptions-text text-left">
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
                          <td
                            className="assumptions-text text-center"
                            colSpan="2"
                          >
                            <button
                              type="button"
                              className="btn btn-neutral mr-2"
                              data-bs-toggle="modal"
                              data-bs-target="#newClass"
                            >
                              <i className="nc-icon nc-simple-add"></i>
                              New Class
                            </button>
                            <button
                              type="submit"
                              className="btn mr-2"
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
