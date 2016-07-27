var request = require('request');
var qs = require('querystring');
var util = require('util');

var internetbs = function(api_key, password, sandbox) {
    this.api_key = (sandbox ? api_key : 'testapi');
    this.password = (sandbox ? password : 'password');
    this.endpoint = 'https://' + (sandbox ? 'testapi' : 'api') + '.internet.bs';
    this.defaults = {};
};
internetbs.prototype = {
    get domains() {
        var instance = this;
        return {
            check: function(domain, callback) {
                return instance.command('Domain/Check', { domain: domain }, callback);
            },
            create: function(domain, years, params, callback) {
                if(!domain) throw new Error('You must include a domain name.');
                var options = instance.defaults, k, y = parseInt(years);
                if('[object Function]' == Object.prototype.toString.call(years)) {
                    callback = years;
                    y = 1;
                    params = {};
                }
                else if('[object Object]' == Object.prototype.toString.call(years)) {
                    params = years;
                    y = 1;
                }
                if('[object Function]' == Object.prototype.toString.call(params)) {
                    callback = params;
                    params = {};
                }
                for(k in params) {
                    if(params.hasOwnProperty(k)) {
                        options[k] = params[k];
                    }
                }
                options.Domain = domain;
                options.Period = years; // 1Y, 2Y up to 10Y
                return instance.command('Domain/Create', options, callback);
            },
            update: function(domain, params, callback){
                if(!domain) throw new Error('You must include a domain name.');
                var options = instance.defaults;
                for(k in params) {
                    if(params.hasOwnProperty(k)) {
                        options[k] = params[k];
                    }
                }
                options.Domain = domain;
                return instance.command('Domain/Update', options, callback);
            },
            getInfo: function(domain, callback) {
                if(!domain) throw new Error('You must include a domain name.');
                return instance.command('Domain/Info', { Domain: domain }, callback);
            },
            getList: function(params, callback) {
                if('[object Function]' == Object.prototype.toString.call(params)) {
                    callback = params;
                    params = {};
                }
                return instance.command('Domain/List', params, callback);
            },
            getRegistryStatus: function(domain, callback){
                if(!domain) throw new Error('You must include a domain name.');
                return instance.command('Domain/RegistryStatus', {Domain: domain}, callback);
            },
            registrarLock: {
                enable: function(domain, callback){
                    if(!domain) throw new Error('You must include a domain name.');
                    return instance.command('Domain/RegistrarLock/Enable', {Domain: domain}, callback);
                },
                disable: function(domain, callback){
                    if(!domain) throw new Error('You must include a domain name.');
                    return instance.command('Domain/RegistrarLock/Disable', {Domain: domain}, callback);
                },
                status: function(domain, callback){
                    if(!domain) throw new Error('You must include a domain name.');
                    return instance.command('Domain/RegistrarLock/Status', {Domain: domain}, callback);
                }
            },
            ns: {
                create: function(domain, host, callback) {
                    if(!domain) throw new Error('You must include a domain name.');
                    if(!host) throw new Error('You must include a domain name.');
                    return instance.command('Domain/Host/Create', {Domain: domain, Host: host}, callback);
                },
                getInfo: function(host, callback) {
                    if(!host) throw new Error('You must include a host name.');
                    return instance.command('Domain/Host/Info', {host: host}, callback);
                },
                getList: function(domain, callback) {
                    if(!domain) throw new Error('You must include a domain name.');
                    return instance.command('Domain/Host/List', {Domain: domain}, callback);
                }
            },
            dns: {
                add: function(domain, type, value, params, callback) {
                    var options = instance.defaults;
                    options.FullRecordName = domain;
                    options.Type = type; //  A, AAAA, DYNAMIC, CNAME, MX, SRV, TXT and NS
                    options.Value = value;
                    for(k in params) {
                        if(params.hasOwnProperty(k)) {
                            options[k] = params[k];
                        }
                    }
                    return instance.command('Domain/DnsRecord/Add', options, callback);
                },
                remove: function(domain, type, params, callback) {
                    var options = instance.defaults;
                    options.FullRecordName = domain;
                    options.Type = type; //  A, AAAA, DYNAMIC, CNAME, MX, SRV, TXT and NS
                    for(k in params) {
                        if(params.hasOwnProperty(k)) {
                            options[k] = params[k];
                        }
                    }
                    return instance.command('Domain/DnsRecord/Remove', options, callback);
                },
                update: function(domain, type, value, params, callback) {
                    var options = instance.defaults;
                    options.FullRecordName = domain;
                    options.Type = type; //  A, AAAA, DYNAMIC, CNAME, MX, SRV, TXT and NS
                    options.NewValue = value;
                    for(k in params) {
                        if(params.hasOwnProperty(k)) {
                            options[k] = params[k];
                        }
                    }
                    return instance.command('Domain/DnsRecord/Update', options, callback);
                },
                getList: function(domain, type, callback){
                    var options = instance.defaults;
                    options.Domain = domain;
                    if(type !== null){
                        options.FilterType = type;
                    }
                    return instance.command('Domain/DnsRecord/List', options, callback);
                }
            }
        };
    },
    command: function(cmd, params, callback, method) {
        var instance = this;
        params.ApiKey = this.api_key;
        params.Password = this.password;
        params.ResponseFormat = 'JSON';
        var options = {
            method: method || 'GET',
            uri: this.endpoint + '/' + cmd
        };
        params = qs.stringify(params);
        if('POST' == method) {
            options.body = params;
        }
        else {
            options.uri += '?' + params;
        }
        request(options, function(err, res, body) {
            callback(err, body);
        });
        return this;
    }
};

module.exports = internetbs;
