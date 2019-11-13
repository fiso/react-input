import React, {useCallback, useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {replaceVars} from 'replacevars';
import './Input.scss';

/*
  clear () {
    this.inputRef.current.value = '';
  }

  focus () {
    this.inputRef.current.focus();
  }

  set value (value) {
    this.inputRef.current.value = value;
  }

  get value () {
    return this.inputRef.current.value;
  }
*/

const outerClass = 'r-input';

export default function Input ({choices, className, label, multiple,
  multipleFilesLabel, onChange, placeholder, type, ...props}) {
  const inputRef = useRef();
  const [filename, setFilename] = useState('');

  const onChangeFile = useCallback((e) => {
    const label = multipleFilesLabel || '${count} files selected';
    const el = inputRef.current;
    const filename = el.files && el.files.length > 1 ?
      replaceVars(label, {count: el.files.length})
      : el.value.split('\\').pop();

    setFilename(filename);

    if (onChange) {
      onChange(e);
    }
  }, []);

  if (type === 'select') {
    const showPlaceholder = placeholder
      ? !props.defaultValue
      : false;

    return (
      <select ref={this.inputRef}
        className={classNames(outerClass, type, className)}
        multiple={multiple}
        defaultValue={multiple
          ? Array.isArray(props.defaultValue)
            ? props.defaultValue
            : props.defaultValue ? [props.defaultValue] : []
          : props.defaultValue || ''} {...props}>
        {showPlaceholder &&
          <option disabled hidden value=''>
            {placeholder}
          </option>
        }
        {choices.map((choice, i) =>
          <option key={i} value={choice.value || choice.text}>
            {choice.text || choice.value}
          </option>
        )}
      </select>
    );
  } else if (['checkbox', 'radio'].some(e => e === type)) {
    return (
      <label className={classNames(outerClass, type, className)}>
        <input ref={this.inputRef} type={type} {...props} />
        <span className='label'>{label}</span>
      </label>
    );
  } else if (type === 'multiline') {
    return (
      <textarea className={classNames(outerClass, type, className)}
        ref={this.inputRef} placeholder={placeholder} {...props} />
    );
  } else if (type === 'file') {
    return (
      <label className={classNames(outerClass, type, className)} tabIndex={-1}>
        <input ref={this.inputRef} type={type} onChange={onChangeFile}
          multiple={multiple} {...props} />
        <span>{filename || placeholder || 'Choose a file…'}</span>
      </label>
    );
  } else {
    return <input type={type} ref={inputRef} placeholder={placeholder}
      {...props} />;
  }
}

Input.propTypes = {
  choices: PropTypes.array, // FIXME: func assert(choices.length > 0);
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  multipleFilesLabel: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  type: 'text',
};
