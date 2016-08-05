import React, {PropTypes,Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import * as articleActions from '../actions/articleAction';
import * as globalActions from '../actions/globalAction';
import {Actions} from 'react-native-router-flux';
import ArticleListView from '../component/ArticlesListView';
import { StatusBar } from 'react-native';

import {
  StyleSheet
} from 'react-native'

const actions = [
  articleActions,
  globalActions
]

function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
  .merge(...actions)
  .filter(value => typeof value === 'function')
  .toObject();
  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 50
  },
  logoTitle: {
    fontFamily:'Montserrat-Bold',
    fontSize: 65,
    color: 'white'
  },
  subHeading: {
    fontFamily:'OpenSans',
    fontSize:18,
    marginTop:5,
    marginBottom: 25,
    color: 'white'
  },
  button: {
    backgroundColor: '#3023AE',
    borderColor: '#3023AE',
    borderWidth: 2,
    borderRadius: 15
  },
  buttonText: {
    fontFamily: 'OpenSans-SemiBold',
    color: 'white'
  }
})

class AllArticles extends Component {

  componentDidMount = () => {
    StatusBar.setBarStyle('light-content');
  }

  onFetch = (page, callback) => {
    this.props.actions.getSubscribedArticles(page)
    .then((data) => {
      if(data.length > 0){
        callback(data)
      } else {
        callback(data, {
          allLoaded: true
        })
      }
    }).catch((error) => {
      if(this.props.articles.articles){
        callback(this.props.articles.articles,{
          allLoaded: true
        });
      }
    })
  }

  render() {
    return(
      <ArticleListView onFetch={(page,callback) => this.onFetch(page,callback)}/>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllArticles);
