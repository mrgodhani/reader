import React, {PropTypes,Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import * as articleActions from '../actions/articleAction';
import {Actions} from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import HTMLView from 'react-native-htmlview';
import ResponsiveImage from 'react-native-responsive-image';
import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native'
import FitImage from 'react-native-fit-image';
var {width, height} = Dimensions.get('window');
import _ from 'lodash';

const actions = [
  articleActions
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
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 40
  },
  imgWrapper: {
    flex:1
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  titlecontainer: {
    paddingTop: 80,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 0
  },
  articletitle: {
    fontSize: 20,
    fontFamily:'CormorantGaramond-Bold',
    marginBottom: 10,
    textAlign: 'left'
  },
  datetime: {
    fontSize: 12,
    marginLeft: 15
  }
})

var htmlRender = StyleSheet.create({
  p: {
    fontSize: 17,
    fontFamily: 'CormorantGaramond-Regular',
    color: 'black',
    lineHeight: 25
  },
  h1: {
    fontSize: 26,
    fontFamily:'CormorantGaramond-Bold'
  },
  h2: {
    fontSize: 24,
    fontFamily:'CormorantGaramond-Bold'
  },
  h3: {
    fontSize: 18,
    fontFamily:'CormorantGaramond-Bold'
  },
  h4: {
    fontSize: 20,
    fontFamily:'CormorantGaramond-Bold'
  },
  a: {
    fontFamily: 'CormorantGaramond-Bold',
  }
})

class ArticleView extends Component {

  static propTypes = {
    routes: PropTypes.object,
  };

  componentDidMount = () => {
    this.props.actions.getArticle(this.props.id)
  }

  _renderNode = (data,index) => {
    var name = data.name
    if(data.name === 'img') {
      var uri = data.attribs.src;
      return (
        <View key={index} style={{ width: Dimensions.get('window').width/1.5 ,height: 300, alignSelf: 'stretch'}}>
        <FitImage
          source={{ uri: uri }}
        />
        </View>
      )
    }
  }

  render() {
    if(this.props.articles.isFetching) {
      return (
        <ActivityIndicator
        animating={true}
        style={[styles.centering, {height: 80}]}
        size="large"
        />
      )
    } else {
      return(
        <ScrollView horizontal={false} width={Dimensions.get('window').width} height={Dimensions.get('window').height}>
          <View style={styles.titlecontainer}>
            <Text style={styles.articletitle}>{ this.props.articletitle }</Text>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 15 }}>
              <Image source={{ uri: this.props.favicon }} style={{ width: 15, height: 15 }} />
              <Text style={styles.datetime}>{ this.props.feedtitle }</Text>
              <Text style={styles.datetime}>{ this.props.published_date }</Text>
            </View>
          </View>
          <View style={styles.container}>
            <HTMLView
              value={this.props.articles.article_detail.content}
              onLinkPress={(url) => console.log('clicked link: ', url)}
              stylesheet={htmlRender}
              />
          </View>
        </ScrollView>
      )
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticleView);
