import React from 'react'

export default function Services() {
  return (
    <div>
      <div className="popup-one">
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Enquiry Form</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><img src="/images/close-circle.png" /></span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="formGroupExampleInput">Name</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="" />
                      </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label for="exampleInputEmail1">Email address<em className="red">*</em></label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="formGroupExampleInput">Contact Number</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="" />
                      </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label for="exampleInputEmail1">Subjects</label>
                      <select className="form-control" id="exampleFormControlSelect1">
                        <option>Select Subject</option>
                        <option>Proofreading and Editing</option>
                        <option>Layout</option>
                        <option>Cover Design</option>
                        <option>Print</option>
                        <option>Editorial Advisory</option>
                        <option>Copyesque</option>
                        <option>Editorial Coordination</option>
                        <option>Illustration</option>
                        <option>Scanning Images/Photos</option>
                        <option>Iconographic Research</option>
                        <option>Text Standardization</option>
                        <option>Proof Review</option>
                        <option>Ghost Writer</option>
                        <option>ISBN</option>
                        <option>Legal deposit</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                      <div className="form-group">
                        <label for="formGroupExampleInput">Message</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                      </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
        </div>

        <section className="inner_bg">
        <div className="overlap-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="inner_bg_text">
                <h1>Services</h1>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li>Services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container space-01">
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/proofreading.png" alt="" className="img-fluid" />
              </span>
              <h2>Proofreading and Editing</h2>
              <p>Careful reading and rereading, in order to correct problems related to: spelling of words, unnecessary repetitions, language vices, coherence, cohesion</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/layout.png" alt="" className="img-fluid" />
              </span>
              <h2>Layout</h2>
              <p>Changing the original to the desired editorial format, which presupposes the choice of font and body of characters, distribution of elements such as colors</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/cover.png" alt="" className="img-fluid" />
              </span>
              <h2>Cover Design</h2>
              <p>Process in which the visual elements of the work are arranged, such as font and body of characters, layout, colors, format, images, text layout.</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/print.png" alt="" className="img-fluid" />
              </span>
              <h2>Print</h2>
              <p>Once the book production process is finished, we ask our partners to print it, in this case, the printers. The print runs depend largely on the author</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/advisory.png" alt="" className="img-fluid" />
              </span>
              <h2>Editorial Advisory</h2>
              <p>Literary coaching, or editorial advice. It consists of supporting the author in order to improve the original and adapt it to production standards</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/copyesque.png" alt="" className="img-fluid" />
              </span>
              <h2>Copyesque</h2>
              <p>Changes to the content and structure of the text, if necessary. However, always keeping the spirit and essence of what was written. Copyediting</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/coordination.png" alt="" className="img-fluid" />
              </span>
              <h2>Editorial Coordination</h2>
              <p>Team responsible for organizing all phases of the editorial process from reception, analysis to publication of the work. this service is part</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/Illustration.png" alt="" className="img-fluid" />
              </span>
              <h2>Illustration</h2>
              <p>Production of images that complement the message conveyed in a visual way. Made by specialized professionals, it can be in black and white or color</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/scanning.png" alt="" className="img-fluid" />
              </span>
              <h2>Scanning Images/Photos</h2>
              <p>Process of inserting photos or images, which can help transmit the message conveyed in the work, through scanning or digitization. In these cases,</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/iconographic-research.png" alt="" className="img-fluid" />
              </span>
              <h2>Iconographic Research</h2>
              <p>Search and choice of images to be used as the theme of a text in an editorial work. This search is performed by an expert on our team who may</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/text-standardization.png" alt="" className="img-fluid" />
              </span>
              <h2>Text Standardization</h2>
              <p>Text improvement so that it conforms to our editorial norms and standards. It presupposes the elimination of any formatting made by the author that makes it</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/proof-review.png" alt="" className="img-fluid" />
              </span>
              <h2>Proof Review</h2>
              <p>Comparison of the original, already standardized and revised, with the first printed proof. In order to ensure that there have been no drastic changes</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/ghost-writer.png" alt="" className="img-fluid" />
              </span>
              <h2>Ghost Writer</h2>
              <p>Process in which the original is written by a professional who is not the author. This service is used when the author has a good story to tell, but</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/isbn.png" alt="" className="img-fluid" />
              </span>
              <h2>ISBN</h2>
              <p>The ISBN (International Standard Book Number) is a standardized, unique and definitive code that determines the characteristics of the book,</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xs-12">
            <div className="who-we-are">
              <span>
                <img src="/images/legal-deposit.png" alt="" className="img-fluid" />
              </span>
              <h2>Legal deposit</h2>
              <p>It is the work's registration number, registration of its bibliographic data that serves to identify it, facilitating its cataloging in libraries, bookstores,</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-01"></div>
    </div>
  )
}
