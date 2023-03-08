import React, {useState} from 'react';


export default ({ label, suggestions, className, hint = null, errors = [], ...props }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };
  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul class="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div class="no-suggestions">
        <em>No suggestions, you're on your own!</em>
      </div>
    );
  };

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
          onChange={onChange}
          onKeyDown={onChange}
          id={name}
          name={name}
          {...props}
          className={`form-input ${errors.length ? 'error' : ''}`}
        />
        {showSuggestions && input && <SuggestionsListComponent />}

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
