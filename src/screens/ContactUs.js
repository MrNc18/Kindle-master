import React from 'react'

export default function ContactUs() {
  return (
    <div>
      <section className="inner_bg">
        <div className="overlap-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="inner_bg_text">
                <h1>Contact Us</h1>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid services contact">
        <div className="container">
          <div className="row services_row">
            <div className="col-md-4">
              <div className="service-box">
                <img src="/images/address.png" alt="address" />
                <p className="text-center contactus">Address</p>
                <div className="green-border"></div>
                <p className="cont_details text-center">RUA REVERENDO AGOSTINHO PEDRO NETO, BUILDING 20, 1º ANDAR, PORTA Nº 15- LUANDA -ANGOLA.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-box">
                <img src="/images/contact.png" alt="contact" />
                <p className="text-center contactus">Contact</p>
                <div className="green-border"></div>
                <p className="cont_details text-center">
                  +244 226 432 020<br />
                  +244 931 167 191
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-box">
                <img src="/images/email.png" alt="email" />
                <p className="text-center contactus">Email</p>
                <div className="green-border"></div>
                <p className="cont_details text-center">editora.acacias@eacacias.com</p>
              </div>
            </div>
          </div>
          <div className="row contact_row">
            <div className="col-md-6">
              <div className="contact_left_content">
                <h3>our contact</h3>
                <h2>Get In Touch With Us</h2>
                <p>Consectetuer consequuntur ne, no virtute atomorum usu. Eu quo nemore causae tacimates, eos viderer persequeris an. Cu molestie consulatu qui. Aldus PageMaker including versions of Lorem Ipsum.</p>
                <div className="sociallinks">
                  <a href="#"><i className="fa fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-login">
                <h1>contact us</h1>
                <form>
                  <div className="row">
                    <div className="col-12 col-md-6 col-sm-6">
                      <div className="form-group">
                        <label for="first_name">Full Name<em className="red">*</em></label>
                        <input type="text" className="form-control" name="first_name" id="first_name" aria-describedby="" placeholder="" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-sm-6">
                      <div className="form-group">
                        <label for="email">Email address<em className="red">*</em></label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-sm-6">
                      <div className="form-group">
                        <label for="country_city">Country/City<em className="red">*</em></label>
                        <input type="text" className="form-control" name="country_city" id="country_city" aria-describedby="" placeholder="" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-sm-6">
                      <div className="form-group">
                        <label for="subject">Subject<em className="red">*</em></label>
                        <select className="form-control" name="subject" id="subject">
                          <option value="">Choose Subject</option>
                          <option value="consignate_books">Consignate Books</option>
                          <option value="commercials">Commercials</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label for="contact_message">Message<em className="red">*</em></label>
                        <textarea className="form-control" name="contact_message" id="contact_message" rows="5"></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <input type="file" className="form-control-file mb-4 mt-2" name="contact_fileupload" id="contact_fileupload" />
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary contact_submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126152.95222125259!2d13.214063866633502!3d-8.853525839624648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15cdc8d2c7d%3A0x850c1c5c5ecc5a92!2sLuanda%2C%20Angola!5e0!3m2!1sen!2sin!4v1634883344829!5m2!1sen!2sin" width="100%" height="450" style={{border:'0px'}} allowfullscreen="" loading="lazy"></iframe>
        </div>
      </section>
    </div>
  )
}
