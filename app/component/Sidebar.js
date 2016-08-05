import React,{ PropTypes, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, InteractionManager } from 'react-native';
import { Actions, ActionsConst } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Dimensions from 'Dimensions'
import plus from '../images/plus-icon.png';
import {Map} from 'immutable';
import settingsicon from '../images/settings.png';
import staricon from '../images/star.png';
import unread from '../images/unread.png';
import * as feedActions from '../actions/feedAction';
import _ from 'lodash';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  drawerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  drawerText: {
    fontSize:15,
    marginLeft: 15,
    marginRight: 100,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'OpenSans'
  },
  feedContainer: {
    flexDirection:'row',
    alignItems: 'center',
    paddingTop:30,
    paddingLeft: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  badgecounter: {
    padding:5,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    fontSize:11,
    borderRadius: 4,
    backgroundColor: 'red'
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    textAlign:'left',
    color: '#393E41',
    marginRight: 145,
    justifyContent: 'flex-start'
  }
});


const actions = [
  feedActions
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

class Sidebar extends Component {

  constructor(props,context){
    super(props)
    context.drawer;
  }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
        this.props.actions.getSubscribeFeeds();
    })
  }

  static PropTypes = {
    feeds: PropTypes.any
  }

  render() {
    let feeds;
    const drawer = this.context.drawer;
    if(!_.isUndefined(this.props.feed.subscribedFeeds)){
      feeds = this.props.feed.subscribedFeeds.map((item) => {
        return (
          <TouchableOpacity key={item.id} style={styles.drawerContent} onPress={() => {
              drawer.close();
              Actions.Singlefeed({ title: item.title, feedId: item.id });
            }}>
            <Image
              source={{ uri: item.favicon }}
              style= {{ height:20, width: 20, resizeMode: 'contain' }}
              />
            <Text style={styles.drawerText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )
      })
    }
    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <ScrollView>
          <View style= {{ height: 80, flexDirection: 'row', paddingTop:25, paddingBottom: 8, backgroundColor: '#3F88C5'}}>
            <Text style={{fontSize: 30, textAlign: 'left',color:'#fff',marginLeft: 15, marginRight: 87, marginBottom: 5,fontFamily: 'Montserrat-Bold'}}>
              reader
            </Text>
          </View>
          <TouchableOpacity style={styles.drawerContent}>
            <Image source={unread} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
            <Text style={styles.drawerText}>
              Unread Articles
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerContent}>
            <Image source={staricon} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
            <Text style={styles.drawerText}>
              Favourites
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerContent}>
            <Image source={settingsicon} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
            <Text style={styles.drawerText}>
              Settings
            </Text>
          </TouchableOpacity>
          <View style={styles.feedContainer}>
            <Text style={styles.sectionTitle}>FEEDS ({!_.isUndefined(this.props.feed.subscribedFeeds) ? this.props.feed.subscribedFeeds.length : 0})</Text>
            <TouchableOpacity onPress = {() => { Actions.feed()}}>
              <Image source={plus}  style={{ width:22, height: 22 }}/>
            </TouchableOpacity>
          </View>
          { feeds }
        </ScrollView>
      </View>
    );
  }
}

Sidebar.contextTypes = {
  drawer: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
