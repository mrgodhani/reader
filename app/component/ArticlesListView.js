import React, { Component } from 'react';
import GiftedListView from 'react-native-gifted-listview';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import _ from 'lodash';

// Styles
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:65
  },
  loaderContainer: {
    marginTop:100
  },
  articleContainer: {
    padding:20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  loadMoreContainer: {
    padding:20
  },
  articleTitle: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 14
  },
  loadMoreText: {
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#3943B7'
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop:8
  },
  source: {
    marginLeft: 10,
    fontSize: 12,
    color: '#A6A6A8'
  },
  datetime: {
    marginLeft: 15,
    fontSize: 12,
    color: '#A6A6A8'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  }
});

export default class ArticleListView extends Component {

  _onFetch = (page = 1, callback, options) => {
    this.props.onFetch(page,callback);
  }

  _renderEmptyView = (refreshCallback) => {
    return (
      <View style={styles.container}>
        <Icon name="newspaper-o" size={100} color={'#0E0E52'} />
        <Text> No Articles Found </Text>
      </View>
    )
  }

  _onPress = (data) => {
    Actions.ArticleView({ articletitle: data.title, title: _.truncate(data.title,{ 'length': 24, separator: ' '}), feedtitle: data.feed.title, id: data.id, favicon: data.feed.favicon, published_date: moment(data.published_date).format('LL') })
  }

  _renderRowView = (data) => {
    return (
      <TouchableHighlight
        underlayColor='#E8E9F3'
        onPress={() => this._onPress(data)}
        style={styles.articleContainer}
        >
        <View>
          <Text style={styles.articleTitle}>{data.title}</Text>
          <View style={styles.metaContainer}>
            <Image source={{ uri: data.feed.favicon }} style={{ width: 15, height:15 }} />
            <Text style={styles.source}>{data.feed.title}</Text>
            <Text style={styles.datetime}>{moment(data.published_date).format('LL')}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  // Pagination Waiting View

  _renderPaginationWaitingView = (paginateCallback) => {
    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        onPress={paginateCallback}
        style={styles.loadMoreContainer}
        >
        <Text style={styles.loadMoreText}>
          Load more
        </Text>
      </TouchableHighlight>
    )
  }

  _renderPaginationFetchingView = () => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size='small'
          />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedListView
          rowView={this._renderRowView}
          onFetch={this._onFetch}
          firstLoader={true}
          pagination={true}
          paginationFetchingView={this._renderPaginationFetchingView}
          paginationWaitingView={this._renderPaginationWaitingView}
          refreshable={false}
          withSections={false}
          enableEmptySections={true}
          rowHasChanged={(r1,r2)=>{
            r1.id !== r2.id
          }}
          distinctRows={(rows)=>{
            var indentitis = {};
            var newRows = [];
            for(var i = 0;i<rows.length; i++){
              if(indentitis[rows[i].id]){

              }else{
                indentitis[rows[i].id]=true;
                newRows.push(rows[i]);
              }
            }
            return newRows;
          }}
          emptyView={this._renderEmptyView}
          />
      </View>
    )
  }
}
