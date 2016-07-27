# node-internetbs

Node.js library for [Internet.bs Reseller/Registrar Domain Name API](https://www.internetbs.net/ResellerRegistrarDomainNameAPI/).

## Installation

`npm install internetbs`

## Usage overview

### new Internetbs(api_key, password [, sandbox])

	var Internetbs = require('internetbs'),
	  internetbs = new Internetbs('testapi', 'testpass', true);

	internetbs.domains.check('example.com', function(err, res) {
	  console.log(res);
	});

## [Domain Methods](https://www.internetbs.net/ResellerRegistrarDomainNameAPI/)

### internetbs.domains.check(domain, callback)

Checks the availability of a domain

	internetbs.domains.check('example.com', function(err, res) {
		console.log(res);
	});

### internetbs.domains.create(domain, years, params, callback)

Registers a new domain name. Optionally include `years` and `params` to set additional [required params](https://www.internetbs.net/ResellerRegistrarDomainNameAPI/). If `params` fields are not set, values from `internetbs.setDefaults` will be used.

	internetbs.domains.create('example.com', '1Y', function(err, res) {
		console.log(res);
	});

	internetbs.domains.create('example.com', { Registrant_FirstName: 'Pedro', ..... Billing_Email: 'pedro@oitozero.com' }, function(err, res) {
		console.log(res);
	});

### internetbs.domains.update(domain, params, callback)

Update a domain name. Optionally include `params` to set additional [required params](https://www.internetbs.net/ResellerRegistrarDomainNameAPI/). If `params` fields are not set, values from `internetbs.setDefaults` will be used.

	internetbs.domains.update('example.com', {...}, function(err, res) {
		console.log(res);
	});

### internetbs.domains.getInfo(domain, callback)

Returns information about the requested domain.

	internetbs.domains.getInfo('example.com', function(err, res) {
	  console.log(res);
	});

### internetbs.domains.getList([params,] callback)

Returns a list of domains for an account. Set [optional params](https://www.internetbs.net/ResellerRegistrarDomainNameAPI/) to filter results.

	internetbs.domains.getList(function(err, res) {
	  console.log(res);
	});

## [DNS Methods](https://www.internetbs.net/ResellerRegistrarDomainNameAPI/)

### internetbs.domains.dns.add(domain, type, value, params, callback)

Add a new DNS record to a specific zone (domain).

	internetbs.domains.dns.add('www.example.com', 'A', '192.168.1.1', {}, function(err, res) {
	  console.log(res);
	});

### internetbs.domains.dns.remove(domain, type, params, callback)

Remove a DNS record from a specific zone..

	internetbs.domains.dns.remove('www.example.com', 'A', {}, function(err, res) {
	  console.log(res);
	});

### internetbs.domains.dns.update(domain, type, newValue, params, callback)

Update an existing DNS record.

	internetbs.domains.dns.update('www.example.com', 'A', '192.168.1.2', {}, function(err, res) {
	  console.log(res);
	});

### internetbs.domains.dns.getList(domain, type, callback)

Retrieve the list of DNS records for a specific domain.

	internetbs.domains.dns.setCustom('smithfam.net', ['dns1.stabletransit.com', 'dns2.stabletransit.com'], function(err, res) {
	  console.log(res);
	});

## TODO

* Implement missing Domain methods
* Implement Nameservers (host) methods
* Implement Domain forwarding methods
* Implement Account related methods


## Author

[Pedro Sampaio](http://twitter.com/oitozero) ([pedro@oitozero.com](mailto:pedro@oitozero.com)).

## License

The MIT License (MIT)

Not endorsed by or affiliated with [Internet.bs](https://internetbs.net/).
