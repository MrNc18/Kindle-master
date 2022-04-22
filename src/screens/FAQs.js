import React, { useEffect, useState } from "react";
import DisplayAdvanceEditorText from "../admin/components/atoms/DisplayAdvanceEditorText";
import { getFAQforAll } from "./../admin/services/cms";

export default function FAQs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const resp = await getFAQforAll();
      setData(resp);
    })();
  }, []);
  return (
    <div>
      <section className="inner_bg">
        <div className="overlap-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="inner_bg_text">
                <h1>FAQs</h1>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>FAQs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid services">
        <div className="container">
          <div id="accordion" className="accordion">
            <div className="card mb-0">
              {data.map(({ question, answer, id }) => {
                return (
                  <div className="accordion_box">
                    <div
                      className="card-header collapsed"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href={`#collapse${id}`}
                    >
                      <a className="card-title">{question}</a>
                    </div>
                    <div
                      id={`collapse${id}`}
                      className="collapse"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <DisplayAdvanceEditorText data={answer} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
