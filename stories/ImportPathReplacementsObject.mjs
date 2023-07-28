import React from 'react';

const ImportPathReplacementsObject = () => (
  <table style={{ width: '100%', marginBottom: '2rem' }}>
    <thead>
      <tr>
        <th colSpan="2">Import path replacements object</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <code>key</code>
        </td>
        <td>
          A string to match within an import path. Also accepts `^` to prepend
          relative paths.
        </td>
      </tr>
      <tr>
        <td>
          <code>value</code>
        </td>
        <td>A string to replace the matched `key` string.</td>
      </tr>
    </tbody>
  </table>
);

export default ImportPathReplacementsObject;
