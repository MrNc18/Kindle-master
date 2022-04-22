import React from 'react'

export default function ForgetPassword() {
  return (
    <div>
      <div className="space-01"></div>
      <section className="container">
        <div className="col-12">
          <div className="form-login">
            <h1>Forgot Password</h1>
            <form>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <p>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
                    <label for="exampleInputEmail1">Enter your Registered Email Address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
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
