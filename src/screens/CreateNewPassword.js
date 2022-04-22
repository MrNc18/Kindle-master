import React from 'react'

export default function CreateNewPassword() {
  return (
    <div>
      <div className="space-01"></div>
      <section className="container">
        <div className="col-12">
          <div className="form-login">
            <h1 className="text-center w-100">Create New Password</h1>
            <form>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <p className="text-center w-100">Your New Password Must be Different from Previously Used Password.</p>
                  </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                      <label for="inputPassword">New Password</label>
                      <div className="input-group" id="show_hide_password">
                        <input className="form-control" type="password" />
                        <div className="input-group-addon">
                          <a href=""><i className="fa fa-eye-slash" aria-hidden="true"></i></a>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                      <label for="inputPassword">Confirm Password</label>
                      <input type="password" className="form-control" id="inputPassword" placeholder="" />
                    </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">Reset Password</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="space-01"></div>
    </div>
  )
}
