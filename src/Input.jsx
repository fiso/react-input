import React, {useCallback, useRef, useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {replaceVars} from '@fhaglund/replacevars';
import {outerClass} from './Input.scss';
import './Input.scss';

let idCounter = 0;

export function uniqueId (prefix = '_') {
  let id = '';

  do {
    id = prefix + idCounter++;
  } while (document.getElementById(id) !== null);

  return id;
}


export default function Input ({choices, className, label, multiple,
  multipleFilesLabel, onChange, placeholder, type, ...props}) {
  const [id] = useState(uniqueId());
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
      <select className={classNames(outerClass, type, className)}
        ref={inputRef}
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
        <input ref={inputRef} type={type} {...props} />
        <span className='label'>{label}</span>
      </label>
    );
  } else if (type === 'radiogroup') {
    const {defaultValue, ...restProps} = props;
    return (
      <fieldset className={classNames(outerClass, type, className)} {...restProps}>
        <legend>{label}</legend>
        {choices.map((choice, i) => {
          const {label, value} = typeof choice === 'string'
            ? {label: choice, value: String(i)}
            : choice;
          return <Input name={props.name} type='radio' key={i}
            label={label} defaultChecked={value === String(defaultValue)}
            value={value} required={props.required} />;
        }
        )}
      </fieldset>
    );
  } else if (type === 'multiline') {
    return (
      <textarea className={classNames(outerClass, type, className)}
        ref={inputRef} placeholder={placeholder} {...props} />
    );
  } else if (type === 'file') {
    const placeholderVisible = !filename;

    return (
      <>
        <input className={classNames(outerClass, type, className, {
          'placeholder-visible': placeholderVisible,
        })}
          ref={inputRef} type={type} onChange={onChangeFile}
          multiple={multiple} {...props} id={id} />
        <label
          htmlFor={id} tabIndex={-1}>
          {filename || placeholder || 'Choose a file…'}
        </label>
      </>
    );
  } else {
    return <input className={classNames(outerClass, type, className)}
      type={type} ref={inputRef} placeholder={placeholder} {...props} />;
  }
}

Input.propTypes = {
  choices: PropTypes.array, // FIXME: func assert(choices.length > 0);
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  getInterface: PropTypes.func,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  multipleFilesLabel: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  type: 'text',
};
