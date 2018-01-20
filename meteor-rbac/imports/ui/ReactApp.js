import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

// class MenuGroup extends Component {
//     constructor(props) {
//         super();
//         this.state = props;
//     }

//     render() {
//         const { title, allPath, allText, newPath, newText } = this.state;
//         return (
//             <ul className="aside-menu-list top-gap-0 unit-0">
//                 <h3 className="top-gap-0">{title}</h3>
//                 <li>
//                     <NavLink to={allPath} activeClassName="active">
//                         {allText}
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink to={newPath} activeClassName="active">
//                         {newText}
//                     </NavLink>
//                 </li>
//             </ul>
//         );
//     }
// }

const MenuGroup = ({ title, allPath, allText, newPath, newText }) => (
    <ul className="aside-menu-list top-gap-0 unit-0">
        <h3 className="top-gap-0">{title}</h3>
        <li>
            <NavLink to={allPath} activeClassName="active">
                {allText}
            </NavLink>
        </li>
        <li>
            <NavLink to={newPath} activeClassName="active">
                {newText}
            </NavLink>
        </li>
    </ul>
);

export default class App extends Component {
    menuGroups = [
        {
            title: 'Account',
            allPath: '/account/list',
            allText: 'All Accounts',
            newPath: '/account/new',
            newText: 'Create Account'
        },
        {
            title: 'Access',
            allPath: '/access/list',
            allText: 'All Accesses',
            newPath: '/access/new',
            newText: 'Create Access'
        },
        {
            title: 'Role',
            allPath: '/role/list',
            allText: 'All Roles',
            newPath: '/role/new',
            newText: 'Create Role'
        }
    ];

    render() {
        return (
            <Router>
                <div>
                    <div className="aside-wrapper flex-center">
                        <div className="container-wider">
                            <div className="height-100 flex-left">
                                <aside className="unit-1-4 flex-vertical scroll-view aside">
                                    {this.menuGroups.map((one, i) => <MenuGroup key={i} {...one} />)}
                                    <ul className="aside-menu-list top-gap-0 unit" />
                                    <ul className="aside-menu-list top-gap-0 unit-0">
                                        <li>
                                            <a>Logout</a>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        </div>
                    </div>

                    <div className="main-wrapper">
                        <div className="flex-center">
                            <div className="container-wider">
                                <div className="flex-left units-gap-big">
                                    <div className="site-height-0 unit-1-4" />
                                    <div className="main unit-3-4">
                                        <Route exact path="/" component={Home} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

const Home = () => <h1>Home</h1>;
