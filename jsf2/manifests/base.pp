 file {'bashrc':
      path    => '/home/vagrant/.bashrc',
      ensure  => present,
      mode    => 0640,
      owner   => vagrant,
      group   => vagrant,
      content => "export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-i386"
    }

package { 'maven2':
	ensure => present
}

package { 'openjdk-7-jdk':
	ensure => present
}