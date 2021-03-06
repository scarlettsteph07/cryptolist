import React from 'react';
import { BasicInfo } from './basic-info';
import { Markets } from './markets';
import { Chart } from './chart';
import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

export class Switcher extends React.Component {
  render() {
    const { match } = this.props;
    const PropsBasicInfo = () => <BasicInfo {...this.props} />;
    const PropsChart = () => (
      <Chart {...this.props} currencySymbol={this.props.currency.currencySymbol} />
    );
    const PropsMarkets = () => (
      <Markets {...this.props} currencySymbol={this.props.currency.currencySymbol} />
    );
    const pathHead = `/${match.params.quote}/${match.params.base}`;
    const pathname = this.props.location.pathname.toLowerCase();
    const qs = this.props.location.search;

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <Link
              className={`nav-link ${pathname.endsWith('chart') ? 'active' : ''}`}
              to={`${pathHead}/chart${qs}`}
            >
              Chart
            </Link>
          </NavItem>
          <NavItem>
            <Link
              className={`nav-link ${pathname.endsWith('info') ? 'active' : ''}`}
              to={`${pathHead}/info${qs}`}
            >
              Info
            </Link>
          </NavItem>
          <NavItem>
            <Link
              className={`nav-link ${pathname.endsWith('markets') ? 'active' : ''}`}
              to={`${pathHead}/markets${qs}`}
            >
              Markets
            </Link>
          </NavItem>
        </Nav>
        <Route path={`${pathHead}/chart`} render={PropsChart} />
        <Route path={`${pathHead}/info`} render={PropsBasicInfo} />
        <Route path={`${pathHead}/markets`} render={PropsMarkets} />
      </div>
    );
  }
}

Switcher.propTypes = {
  currency: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
};
