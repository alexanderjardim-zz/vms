package { "python-software-properties" :
	ensure => "present"
}

exec { 'update':
	command => "apt-get update -y",
	path => "/usr/bin",
	logoutput => true,
	before => Exec["upgrade"],
	require => Exec["add-nodejs-repo"]
}

exec { 'upgrade':
	command => "apt-get -y upgrade",
	path => [ "/usr/bin", "/bin", "/usr/local/sbin", "/usr/sbin", "/sbin" ],
	logoutput => true,
	environment	=> [ "DEBIAN_FRONTEND=noninteractive" ]
}

package { 'nodejs' :
	ensure => "present",
	require => Exec["upgrade"]
}

exec { 'add-nodejs-repo':
	command => "add-apt-repository ppa:richarvey/nodejs",
	path => [ "/usr/bin", "/bin", "/usr/local/sbin", "/usr/sbin", "/sbin" ],
	logoutput => true,
	require => Package["python-software-properties"]
}

package { 'npm' :
	ensure => "present",
	require => Package["nodejs"]
}

