import React from 'react'

export default function VerifyEmailAddress() {
  return (
    <div>
      <div className="space-01"></div>
      <section className="container">
        <div className="col-12">
          <div className="form-login form-verification">
            <h1 className="text-center w-100">Verify Your Email Address</h1>
            <form>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <p className="text-center w-100">Please Enter The 4 Digit Code Send to <br/> <a href="#" className="green-color">markjakrbag@gmail.com</a></p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="0" />
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="0" />
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="0" />
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="0" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">Confirm</button>
                  <p className="mt-3">Don't receive the code? <a href="#" className="green-color">Resend</a></p>
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
