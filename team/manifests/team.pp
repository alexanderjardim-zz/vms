package { "python-software-properties" :
	ensure => "present"
}

package { 'nodejs' :
	ensure => "present",
	require => Exec["add-nodejs-repo"]
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

exec { 'manager-server':
	command => "node server.js",
	cwd => "/vagrant/manager",
	path => "/usr/bin",
	logoutput => true,
	require => Package["npm"]
}