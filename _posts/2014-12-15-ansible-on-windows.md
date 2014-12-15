---
layout: post
category: blog
tagline: Supporting tagline
tags: 
  - ansible
published: true
---
Using a linux workstation at work, but also have a laptop which unfortunately is windows.  Not that windows is too bad from a user perspective - actually has a bit of stuff I prefer over linux but when it somes to commandline it's mostly awful.  

Anyhow, the ansible folks say that ansible is not supported on windows as a control machine, however I'd like to use it for provisioning vagrant boxes. Having a lash at getting it working so will add my notes here..

I started off using [this tutorial](http://www.azavea.com/blogs/labs/2014/10/running-vagrant-with-ansible-provisioning-on-windows/) as a guide.

### Step 1. Get a better windows shell
I use git bash normally on windows, which when you configure it is okay and can look acceptable, however it's far from an ideal shell situation.  After playing around with a variety of bash-alternatives (mobi-xterm, console2, etc) I settled on a pretty nice one called [babun] (http://babun.github.io/).  This cygwin shell looks nice out of the box (zsh) but more importantly comes with a packet manager called packt which is very handy.  Check it out!

### Step 2. Install pre-requisites
I found this set of preqequisites on the web somewhere:
```
pact install python python-paramiko python-crypto gcc-g++ wget openssh python-setuptools
```
Most of this I already had installed through previous adventures.

You alson need pip of course:

```
python /usr/lib/python2.7/site-packages/easy_install.py pip
```

### Step 3. Install ansible
```
pip install ansible
```
Unfortunately for me I ran into a nasty problem with pycrypto binaries.  I managed to sort it by heading to [this page] (http://www.voidspace.org.uk/python/modules.shtml#pycrypto) and downloading the pycrypt exes (not before I wasted most of the day with c++ compilers)\

### Step 4. Crash and burn...
This was a brick wall for me at this point.. ansible just doesn't seem to do windows well.  After the install above succeeded, I get

```
markdav@MARKDAV1 ~
$ ansible-playbook
Traceback (most recent call last):
  File "c:/Python27/Scripts/ansible-playbook", line 36, in <module>
    import ansible.playbook
  File "c:\Python27\lib\site-packages\ansible\playbook\__init__.py", line 18, in <module>
    import ansible.inventory
  File "c:\Python27\lib\site-packages\ansible\inventory\__init__.py", line 25, in <module>
    import ansible.constants as C
  File "c:\Python27\lib\site-packages\ansible\constants.py", line 19, in <module>
    import pwd
ImportError: No module named pwd
```

After much [searching](https://github.com/ansible/ansible/issues/9576) and [messing around](https://github.com/ansible/ansible/pull/9210/files), I just can't seem to get it working.  Key takeaway here is that ansible on windows just doesn't work so my takeaway is don't bother trying for the time being...! nuts..

I guess the fallback should be to have a vm within a vm for vagrant, or a separate ansible controller node to provision my vagrant vms since virtualbox doesn't work inside virtualbox so I can't just do that.
