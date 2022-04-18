import React from 'react';

export default function NewInfo(props) {
  const { info } = props;

  return (
    <div className="border border-2 border-dark rounded p-2 col-12 mb-4">
      <div id="head" className="h3">
        {info.title}
      </div>

      <div className="px-3 h5 w-100">
        {info.body.split('\n').map((text) => {
          return (
            <>
              {text}
              <br />
            </>
          );
        })}
        {/* replace */}
        <div className="text-end">
          by: <i>{info.owner}</i>
        </div>
      </div>
    </div>
  );
}
