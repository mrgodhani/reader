import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import { Router, TabBar, Scene, ActionConst, Actions, Modal } from 'react-native-router-flux';
import configureStore from './store/configureStore';

// States
import authInitialState from './states/authInitialState';
import feedInitialState from './states/feedInitialState';
import globalInitialState from './states/globalInitialState';

// Drawer
import Drawer from './component/Drawer';

// Containers
import App from './containers/App';
import Login from './containers/Login';
import Register from './containers/Register';
import AllArticles from './containers/AllArticles';
import SingleFeed from './containers/SingleFeed';
import AddFeed from './containers/AddFeed';
import ArticleView from './containers/ArticleView';

// Actions
import {setStore} from './actions/globalAction';

// Images
import _drawerImage from './images/navbar.png';
import backbtn from './images/back.png';
import cross from './images/cross.png';
import optionbtn from './images/optionbtn.png';


function getInitialState() {
	const _initState = {
		auth: new authInitialState,
		global: (new globalInitialState)
	}
	return _initState;
}

const RouterWithRedux = connect()(Router);

export default class Root extends Component {

	state = {
		isLoading: true,
		store: configureStore(getInitialState(),() => {
			this.setState({
				isLoading: false
			})
		})
	}

	componentDidMount = () => {
		this.state.store.dispatch(setStore(this.state.store));
	}

	render() {
		return (
			<Provider store={this.state.store}>
				<RouterWithRedux>
					<Scene key="modal" component={Modal}>
						<Scene key="root" hideNavBar={true}>

							<Scene key="drawer" component={Drawer}>
								<Scene key="main" drawerImage={_drawerImage}  type={ActionConst.REPLACE}  leftButtonIconStyle={{ width: 22, marginTop: 2 }} navigationBarStyle={{backgroundColor: '#393E41',paddingTop: 10}} titleStyle={{color:'white',fontSize: 19, fontFamily:'OpenSans'}}>
									<Scene key="AllArticles" component={AllArticles} title="All Articles" />
									<Scene key="Singlefeed"
										backButtonImage={backbtn}
										component={SingleFeed}
										title="Single Feed"
										/>
								</Scene>
							</Scene>

							<Scene key="feed" direction="vertical">
								<Scene key="addFeed"
									component={AddFeed}
									navigationBarStyle={{backgroundColor: '#393E41',paddingTop: 10, borderBottomColor: '#393E41'}}
									titleStyle={{color:'white',fontSize: 19, fontFamily:'OpenSans'}}
									leftButtonImage={cross}
									leftButtonIconStyle={{ width: 20, height: 20, marginTop: 5}}
									rightTitle={'Add'}
									rightButtonTextStyle={{ color: 'white' }}
									onRight={() => Actions.pop()}
									onLeft={() => Actions.pop()}
									schema="modal"
									title="Subscribe to Feed" />
							</Scene>

              <Scene key="ArticleView"
                  component={ArticleView}
									hideNavBar={false}
									navigationBarStyle={{backgroundColor: '#393E41',paddingTop: 10}}
									leftButtonIconStyle={{ width: 22, marginTop: 2 }}
									titleStyle={{color:'white',fontSize: 19, fontFamily:'OpenSans'}}
									backButtonImage={backbtn}
									onRight={() => console.log('pressed')}
									rightButtonImage={optionbtn}
									rightButtonIconStyle={{ width: 20, height: 20, marginTop: 5 }}
                  title="Article"
              />

							<Scene key="MainPage"
								component={App}
								initial={true}
								title="Homepage"
								/>

							<Scene key="Login"
								component={Login}
								title="Login"
								/>

							<Scene key="Register"
								component={Register}
								title="Register"
								/>

						</Scene>
					</Scene>
				</RouterWithRedux>
			</Provider>
		)
	}
}
