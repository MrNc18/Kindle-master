import React from 'react'

export default function Distributors() {
  return (
    <div>
      <section className="inner_bg">
        <div className="overlap-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="inner_bg_text">
                <h1>Distributors</h1>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li>Distributors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="background_color pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 col-sm-5">
              <p className="p1">Enter your city to see the distributor closest to you:</p>
            </div>
            <div className="col-12 col-md-6 col-sm-6">
              <div className="searchtop">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="To search for" name="search" id="search" />
                    <button type="submit" className="input-group-text"><img src="/images/search.png" /></button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-sm-6">
              <div className="contact-box">
                <h3>Contact us</h3>
                <p>For information on sales in general or on how to represent Eacacias, contact us using the form below or write to:<a href="#">Eacacias@gmail.com</a></p>
                <form>
                  <div className="form-group">
                    <label>Name <em className="red">*</em></label>
                    <input type="text" className="form-control" id="exampleInputname" aria-describedby="" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label>Website</label>
                    <input type="text" className="form-control" id="exampleInputWebsite" aria-describedby="" placeholder="" />
                  </div>
                  <button type="submit" className="btn btn-primary">register</button>
                </form>
              </div>
            </div>
            <div className="col-12 col-md-6 col-sm-6">
              <img src="/images/scooter.png" className="img-fluid mt-5" alt="scooter-img" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
