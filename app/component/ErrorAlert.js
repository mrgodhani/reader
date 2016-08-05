import SimpleAlert  from 'react-native-simpledialog-android';
import _ from 'lodash';

export default class ErrorAlertClass {

	checkError(obj) {
		if(!_.isNull(obj)){
			SimpleAlert.alert('Error', obj);
		}
	}
	
}
