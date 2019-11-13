import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../../src/Input';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
  <div>
    <Input placeholder='Regular text input' name='text' required />
    <Input type='email' placeholder='Email input' name='email' required />
    <Input type='password' placeholder='Password input' name='password'
      required />
    <Input type='file' placeholder='Choose files…' name='file' required multiple
      multipleFilesLabel='${count} files selected' />
    <Input type='range' name='range' />
    <Input type='search' placeholder='Search field' name='search' required />
    <Input type='url' placeholder='Enter a URL' name='url' required />
    <Input type='tel' placeholder='Phone number' name='tel' required />
    <Input type='date' placeholder='Pick a date' name='date' required />
    <Input type='month' placeholder='Pick a month' name='month' required />
    <Input type='week' placeholder='Pick a week' name='week' required />
    <Input type='time' placeholder='Pick a time' name='time' required />
    <Input type='color' placeholder='Pick a color' name='color'
      defaultValue='#a87cff'/>
    <Input type='number' placeholder='Pick a number' name='number' required />
    <Input type='select' placeholder='Dropdown' name='select' required
      choices={[
        {text: 'A'},
        {text: 'B'},
        {text: 'C'},
      ]} />
    <Input type='select' placeholder='Select multiple' name='select-multiple'
      required multiple choices={[
        {text: 'A'},
        {text: 'B'},
        {text: 'C'},
        {text: 'D'},
        {text: 'E'},
        {text: 'F'},
        {text: 'G'},
        {text: 'H'},
      ]} />
    <Input type='multiline' placeholder='Multiline input' name='multiline'
      required rows='4' />
    <Input type='checkbox' label='A checkbox' name='checkbox' required />
  </div>,
  root
);

/*
    <RadioGroup id='radio' legend='Bunch of radio buttons' name='radio'
      required
      choices={[
        'Option A',
        'Option B',
        'Option C',
      ]} />
*/
