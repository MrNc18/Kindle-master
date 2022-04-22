import React from 'react'

export default function PreSaleForm() {
  return (
    <div>
      <div className="space-01"></div>

    <section className="container">
    <div className="col-12">
        <div className="row">
        <img src="/images/Pre-sale.png" className="img-fluid" />
        </div>
        <div className="row">
        <div className="pre-sale-box">
        <h2>Pre-sale of the book THE KINGDOM AND THE HEARTLESS GIANT by Sofia P. Costa</h2>
        <h4>THE KINGDOM AND THE GIANT NO HEART / THE KINGDOM AND THE HEARTLESS GIANT</h4>
        <p><b>PRICE:</b><br/>8,500 Kz</p>
        <p className="m-0"><b>Features</b><br/>Size: 22x22cm</p>
        <p>Number of pages: 65 pages<br/>illustrated book<br/>Book Bilingual: Portuguese / English</p>
        <p><b>SYNOPSIS:</b> In a kingdom in Africa, a boy loose a prisoner who tormented people in that land because he didn't have his heart in his chest. When the boy becomes an adult, strong and brave, he starts an adventure in search of the prisoner's heart to undo all the harm caused by him and transform the kingdom once again into a place of peace and quiet.</p>
        <p>**Books will be available for delivery from July 22, 2021</p>
        <p><b>Customer support:</b> 931 167 191 (available on normal working days and hours).</p>
        <h1>Pre Sale Form</h1>
        <div className="pre-sale-form">
            <form>
            <div className="row">
                <div className="col-12 col-md-6">
                <div className="form-group">
                    <label for="formGroupExampleInput">Name<em className="red">*</em></label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="" />
                </div>
                </div>
                <div className="col-12 col-md-6">
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address<em className="red">*</em></label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                </div>
                </div>
                <div className="col-12 col-md-6">
                <div className="form-group">
                    <label for="formGroupExampleInput">Telephone Number<em className="red">*</em></label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="" />
                </div>
                </div>
                <div className="col-12 col-md-6">
                <div className="form-group">
                    <label for="formGroupExampleInput">Delivery address (where you want to receive the books)<em className="red">*</em></label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="" />
                </div>
                </div>
                <div className="col-12 col-md-6">
                <div className="form-group">
                    <label for="formGroupExampleInput">Number of books<em className="red">*</em></label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="" />
                </div>
                </div>
                <div className="col-12">
                <div className="form-group">
                    <label for="formGroupExampleInput">Where do you prefer to be contacted?<em className="red">*</em></label>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                    <label className="form-check-label" for="exampleRadios1">
                        Whatsapp
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                    <label className="form-check-label" for="exampleRadios2">
                        Email
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
                    <label className="form-check-label" for="exampleRadios2">
                        Cell
                    </label>
                    </div>
                </div>
                </div>
                <div className="col-12">
                <div className="form-group">
                    <label for="formGroupExampleInput">Do you want to join the home delivery service?<em className="red">*</em></label>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option4" />
                    <label className="form-check-label" for="exampleRadios4">
                        Yes, in the City Center - add 1000 AKZ
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="option5" />
                    <label className="form-check-label" for="exampleRadios5">
                        Yes, in Talatona, Patriota, Nova Vida, Viana or Morro Bento - add 2000 AKZ
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value="option6" />
                    <label className="form-check-label" for="exampleRadios6">
                        Yes, Kilamba, Sequele, Benfica, Cacuaco or Zango 0 - add 2500 AKZ
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios7" value="option7" />
                    <label className="form-check-label" for="exampleRadios7">
                        No, I have availability to pick up on the spot.
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios8" value="option8" />
                    <label className="form-check-label" for="exampleRadios8">
                        Deliveries outside Luanda - Price on request.
                    </label>
                    </div>
                </div>
                </div>
                <div className="col-12">
                <div className="form-group">
                    <label for="formGroupExampleInput">THE KINGDOM AND THE HEARTLESS GIANT / THE KINGDOM AND THE HEARTLESS GIANT</label>
                    <div className="kingdom-box">
                    <img src="/images/kingdom.png" />
                    </div>
                </div>
                </div>
                <div className="col-12">
                <div className="form-group">
                    <label for="formGroupExampleInput">Would you like to refer someone to access the book?</label>
                    <textarea className="form-control"></textarea>
                </div>
                </div>
                <div className="col-12">
                <button type="submit" className="btn btn-primary">submit</button> <a href="#">Clear Form</a>
                </div>
            </div>
            </form>
        </div>
        </div>
        </div>
    </div>
    </section>
    <div className="space-01"></div>
    </div>
  )
}
