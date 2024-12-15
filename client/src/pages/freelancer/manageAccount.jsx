import Header from "../../components/header/header";
import "./manageAccount.css";

function ManageAccount() {
  return (
    <div className="freelancerContainer">
      <Header />
      <div className="free-wrapper">
        <div className="account-content">
          {/* <div>
            <span>Name:</span>
            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="mahesh"
                disabled
              />
            </div>
          </div> */}
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;

//   <div class="mb-3 row">
//     <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
//     <div class="col-sm-10">
//       <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
//     </div>
//   </div>
//   <div class="mb-3 row">
//     <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
//     <div class="col-sm-10">
//       <input type="password" class="form-control" id="inputPassword">
//     </div>
//   </div>
