---
layout: post
category: blog
tagline: Supporting tagline
tags: 
  - monasca
published: true
---

I've been playing with [Monasca](https://launchpad.net/monasca), an interesting monitoring framework that the smart folk from Openstack are working on.  Monasca is really geared towards Ubuntu but I wanted to see what would be involved in monitoring a RedHat/CentOS box.  In this case I went with CentOS 6.3 which I set up as a fresh VM on the HP Helion public cloud.  Steps below:

<!--more-->

First update the repo:

    yum -y update

This led to an ssl error with https, swiftly fixed by:

    sudo sed -i "s/mirrorlist=https/mirrorlist=http/" /etc/yum.repos.d/epel.repo

Next I installed python pip, and attempted to install monasca:

    yum install python-pip
    pip install monasca-agent

This threw an error with the monasca install:

    Downloading/unpacking pylint (from monasca-agent)
  Running setup.py egg_info for package pylint
    Traceback (most recent call last):
      File "<string>", line 16, in <module>
      File "/tmp/pip-build-root/pylint/setup.py", line 123
        exclude = {'invalid_encoded_data*',
                                          ^
    SyntaxError: invalid syntax
    Complete output from command python setup.py egg_info:
    Traceback (most recent call last):

    File "<string>", line 16, in <module>

    File "/tmp/pip-build-root/pylint/setup.py", line 123

    exclude = {'invalid_encoded_data*',

So, looking at python with a python -V it seems to be 2.6 on redhat but 2.7 on the ubuntu instance where I successfully installed the agent in the past.  I was surprised!  [This article](https://www.digitalocean.com/community/tutorials/how-to-set-up-python-2-7-6-and-3-3-3-on-centos-6-4) has some helpful pointers. First line of attack was to upgrade python.  

Install the dev tools and some other handy stuff:

    yum groupinstall "Development tools"
    yum install -y zlib-dev openssl-devel sqlite-devel bzip2-devel

Download and install python

    wget http://www.python.org/ftp/python/2.7.6/Python-2.7.6.tar.xz

I didn't have to install xz tools, but if I didn't I would have ran: yum install xz-libs

    xz -d Python-2.7.6.tar.xz
    tar -xvf Python-2.7.6.tar
    cd Python-2.7.6.tar
    ./configure

    # this bit takes a while!
    make
    make altinstall

20 mins later, I had python 2.7 installed in /usr/bin/local/Python2.7.. but no pip I think.  

    wget --no-check-certificate https://pypi.python.org/packages/source/s/setuptools/setuptools-1.4.2.tar.gz
    tar -xvf setuptools-1.4.2.tar.gz    
    cd setuptools-1.4.2
    python2.7 setup.py install
    curl https://raw.githubusercontent.com/pypa/pip/master/contrib/get-pip.py | python2.7 -

After that I was able to install monasca agent with:

    pip2.7 install monasca-agent

This got me a lot further in that it actually installed, but still seemed to get some warnings which probably don't bode too well.  

      Running setup.py install for redis
    
    warning: no previously-included files found matching '__pycache__'
    warning: no previously-included files matching '*.pyc' found under directory 'tests'
  Running setup.py install for gearman
    
    no previously-included directories found matching 'docs/_build'
  Running setup.py install for supervisor
    
    warning: no previously-included files matching '*' found under directory 'docs/.build'
    Skipping installation of /usr/local/lib/python2.7/site-packages/supervisor/__init__.py (namespace package)
    Installing /usr/local/lib/python2.7/site-packages/supervisor-3.1.3-py2.7-nspkg.pth
    Installing echo_supervisord_conf script to /usr/local/bin
    Installing pidproxy script to /usr/local/bin
    Installing supervisorctl script to /usr/local/bin
    Installing supervisord script to /usr/local/bin
    Compiling /tmp/pip_build_root/pylint/pylint/test/functional/abstract_abc_methods.py ...
      File "/tmp/pip_build_root/pylint/pylint/test/functional/abstract_abc_methods.py", line 6
    class Parent(object, metaclass=abc.ABCMeta):
                                  ^
    SyntaxError: invalid syntax

    Compiling /tmp/pip_build_root/pylint/pylint/test/functional/abstract_class_instantiated_py2.py ...
    File "/tmp/pip_build_root/pylint/pylint/test/functional/abstract_class_instantiated_py2.py", line 15
    class GoodClass(object, metaclass=abc.ABCMeta):
                           
The final message looks okay, but is probably misleading:

    Successfully installed monasca-agent pymongo redis gearman supervisor requests pylint PyYAML python-memcached python-monascaclient ntplib tornado httplib2 psutil simplejson meld3 astroid six logilab-common iso8601 babel python-keystoneclient pbr PrettyTable argparse certifi backports.ssl-match-hostname pytz netaddr oslo.config oslo.utils oslo.serialization stevedore oslo.i18n
    Cleaning up...

Might look at it tomorrow!