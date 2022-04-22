import React from 'react'

export default function Register() {
  return (
    <div>
      <div className="space-01"></div>
      <section className="container">
        <div className="col-12">
          <h2 className="register-for">register For</h2>
          <div className="wrp-small">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="register-box">
              <a href="/register-form/3"><img id="author" src="/images/author.png"/></a>
                <div className="form-radio">
                  <input type="radio" className="form-radio-input" id="exampleradio1" />
                  <label className="form-radio-label" for="exampleradio1">Author</label>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="register-box">
              <a href="/register-form/5"><img id="client" src="/images/client.png"/></a>
                <div className="form-radio">
                  <input type="radio" className="form-radio-input" id="exampleradio2" />
                  <label className="form-radio-label" for="exampleradio2">Client</label>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="register-box">
              <a href="/register-form/4"><img id="consignee" src="/images/consignee.png"/></a>
                <div className="form-radio">
                  <input type="radio" className="form-radio-input" id="exampleradio3" />
                  <label className="form-radio-label" for="exampleradio3">Consignee</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
      <div className="space-01"></div>
    </div>
  )
}
