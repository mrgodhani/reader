import RESTApi from './RESTApi';

export default function BackendFactory(token = null) {
	return new RESTApi(token);
}
