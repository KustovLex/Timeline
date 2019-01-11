import * as React from 'react';

import * as s from './style.css';

import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

/*
  TODO: Please, do not forget that path can be:
  - Home
  - Home / Project name
  - Home / Project name / File name
  or
  - Home / User name
*/
export class Header extends React.Component<{}, {}> {
  render() {
    return (
      <header className={s.header}>
        <SearchBox />
        <div className={s.breadcrumbs}>
          <a className={s.link} href="#" onClick={() => alert('Redirect to main page')}>All projects</a>
          <span className={s.separator}>/</span>
          <a className={s.link} href="#" onClick={() => alert('Redirect to project page')}>Project name</a>
        </div>
        <h1 className={s.projectname}>File name.ppt</h1>
      </header>
    );
  }
}
