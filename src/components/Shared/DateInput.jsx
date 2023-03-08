import React, {useState} from 'react';

export default ({ label, name, className, hint = null, errors = [], ...props }) => {

  const [hiddenHint, setHiddenHint] = useState(true);
  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <div className="relative">
        <input
          autoComplete="off"
          type="date"
          id={name}
          name={name}
          min="01/01/1950" max="31/12/2012"
          {...props}
          className={`form-input ${errors.length ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`+'' +
              'appearance-none rounded-none relative block\n' +
              '                  w-full px-3 py-2 border border-gray-300\n' +
              '                  placeholder-gray-500 text-gray-900 rounded-b-md\n' +
              '                  focus:outline-none focus:ring-indigo-500\n' +
              '                  focus:border-indigo-500 focus:z-10 sm:text-sm'}
        />
        {
          hint && (
            <>
              <span onClick={() => { setHiddenHint(!hiddenHint)}} className="absolute w-8 right-0 h-full items-center justify-center flex bg-indigo-800 text-white text-xl cursor-pointer">
                <span>?</span>
              </span>
              <span onClick={() => { setHiddenHint(!hiddenHint)}} className={(hiddenHint ? 'hidden' : '') + " absolute bottom-0 bg-indigo-800 w-full text-white p-1 text-xs"}>{hint}</span>
            </>
          )
        }
      </div>
      {errors && <div className="form-error">{errors}</div>}
    </div>
  );
};
