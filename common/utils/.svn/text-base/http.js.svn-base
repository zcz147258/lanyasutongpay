let http = {
	'setBaseUrl': (url) => {
		if (url.charAt(url.length - 1) === "/") {
			url = url.substr(0, url.length - 1)
		}
		http.baseUrl = url;
	},
	'header': {},
	'beforeRequestFilter': (config) => {
		return config
	},
	'beforeResponseFilter': (res) => {
		return res
	},
	'afterResponseFilter': (successResult) => {},
	'get': get,
	'post': post,
	'request': request,
	'uploadFile': uploadFile,
	'downloadFile': downloadFile
}


function init(con) {
	//url
	let url = http.baseUrl;
	if (url && con.url && !con.url.match(/^(http|https):\/\/([\w.]+\/?)\S*$/)) {
		if (con.url.charAt(0) !== "/") {
			con.url = "/" + con.url;
		}
		con.url = url.concat(con.url);
	}
	//header
	if (http.header != undefined && http.header != null) {
		if (!con.header) {
			con.header = http.header;
		} else {
			Object.keys(http.header).forEach(function(key) {
				con.header[key] = http.header[key]
			});
		}
	}
}

function request(con) {
	init(con);
	let config = {
		url: con.url ? con.url : http.baseUrl,
		data: con.data,
		header: con.header,
		method: con.method ? con.method : 'GET',
		dataType: con.dataType ? con.dataType : 'json',
		responseType: con.responseType ? con.responseType : 'text',
		success: con.success ? (res) => {
			http.afterResponseFilter(con.success(http.beforeResponseFilter(res)));
		} : null,
		fail: con.fail ? (res) => {
			con.fail(res);
		} : null,
		complete: con.complete ? (res) => {
			con.complete(res);
		} : null
	}
	return uni.request(http.beforeRequestFilter(config));
}

function get(url, con, success) {
	let conf = {};
	if (con && typeof con == 'function') {
		if (success && typeof success == 'object') {
			conf = success;
		}
		conf.success = con
	} else {
		if (con && typeof con == 'object') {
			conf = con;
		}
		if (!conf.success && typeof conf.success != 'function') {
			conf.success = success;
		}
	}

	if (url) {
		conf.url = url
	}
	conf.method = "GET";
	return request(conf);
}

function post(url, data, con, success) {
	let conf = {};
	if (con && typeof con == 'function') {
		if (success && typeof success == 'object') {
			conf = success
		}
		conf.success = con;
	} else {
		if (con && typeof con == 'object') {
			conf = con;
		}
		conf.success = success;
	}
	if (url) {
		conf.url = url
	}
	if (data) {
		conf.data = data
	}
	conf.method = "POST";
	return request(conf);
}

function uploadFile(con) {
	init(con);

	let config = {
		url: con.url ? con.url : http.baseUrl,
		files: con.files,
		filesType: con.filesType,
		filePath: con.filePath,
		name: con.name,
		header: con.header,
		formData: con.formData,
		success: con.success ? (res) => {
			http.afterResponseFilter(con.success(http.beforeResponseFilter(res)));
		} : null,
		fail: con.fail ? (res) => {
			con.fail(res);
		} : null,
		complete: con.complete ? (res) => {
			con.complete(res);
		} : null
	}
	return uni.uploadFile(http.beforeRequestFilter(config));
}

function downloadFile(con) {
	init(con);

	let config = {
		url: con.url ? con.url : http.baseUrl,
		header: con.header,
		success: con.success ? (res) => {
			http.afterResponseFilter(con.success(http.beforeResponseFilter(res)));
		} : null,
		fail: con.fail ? (res) => {
			con.fail(res);
		} : null,
		complete: con.complete ? (res) => {
			con.complete(res);
		} : null
	}
	return uni.downloadFile(http.beforeRequestFilter(config));
}


export default http
