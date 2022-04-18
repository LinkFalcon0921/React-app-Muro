import React, { useRef } from 'react';
import { publish } from '../../utilities/messages/PublishActions';
import Publication from '../../utilities/logics/Publication';

export default function Publish(props) {
  const { user } = props;

  const title = useRef();
  const body = useRef();

  const actionSummit = async (e) => {
    e.preventDefault();
    // debugger;

    const nameUser = user();
    const titleObj = title.current.value;
    const bodyObj = body.current.value;
    const timeNow = new Date();

    const item = new Publication(nameUser, titleObj, bodyObj, timeNow, true);
    publish(item.doc());
  };

  return (
    <div className="w-100 p-md-5 p-4">
      <form method="post" onSubmit={actionSummit}>
        <div className="row">
          <div className="col-md-12">
            {/* Titulo */}
            <div className="form-group">
              <label className="label" htmlFor="titulo">
                Titulo
              </label>
              <input
                type="text"
                className="form-control"
                name="titulo"
                ref={title}
                id="titulo"
                placeholder="Subject"
                required
              />
            </div>
          </div>
          {/* Message */}
          <div className="col-md-12 p-2">
            <div className="form-group">
              <label className="label" htmlFor="message">
                Message
              </label>
              <textarea
                name="message"
                ref={body}
                className="form-control"
                id="message"
                cols="30"
                rows="4"
                placeholder="Message"
              />
            </div>
          </div>
          {/* Summit botton */}
          <div className="col-md-12">
            <div className="form-group">
              <input
                type="submit"
                value="Send Message"
                className="btn btn-primary"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
