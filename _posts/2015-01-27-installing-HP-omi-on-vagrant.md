---
layout: post
category: blog
tagline: Supporting tagline
tags: 
  - OMi
published: true
---
## Installing HP Operations Manager on Vagrant
Operations Manager is the leading commercial monitoring product.  I work at HP in the monitoring space, but had never tried it out so why not?  I wanted to try the latest and greatest version of Operations Manager - OMi which is sometimes referred to as the Operations Bridge.  From a quick look at the videos, it seems to position itself as an integration hub for all things monitoring, and it looks pretty neat in the you tube videos, but seeing is believing and all that!  

### 1. Download the trial installer
I used this URL to oull down the 60 day trial:

[http://www8.hp.com/us/en/software-solutions/operations-manager-i-operations-management/try-now.html](HP Operations Manager Download Page)

The download was a pretty hefty zip file at 3gb. Unzipping it revealed an install.sh.  I would have preferred a debian, or something that would let my package manager neatly remove it when done.  At this point I decided to do it in a VM within Vagrant to avoid polluting my system with stuff (it might not have done that but..).

### 2. Setup your vagrant VM
Vagrant is useful for repeatedly scripting VMs.  "vagrant init" a new operations_manager and place the installer there.  I set the Vagrantfile as follows based on minimum specs:

{% highlight ruby %}
    # -*- mode: ruby -*-
    # vi: set ft=ruby :
     
    # Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
    VAGRANTFILE_API_VERSION = "2"
      
    Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
      config.vm.box = "ubuntu/trusty64"

      config.vm.provider "virtualbox" do |v|
        v.memory = 4096
        v.cpus = 2
      end

      # config.vm.network "forwarded_port", guest: 80, host: 8080
      # config.vm.network "private_network", ip: "192.168.33.10"

      # Handle local proxy settings
      if Vagrant.has_plugin?("vagrant-proxyconf")
        if ENV["http_proxy"]
          config.proxy.http = ENV["http_proxy"]
        end
        if ENV["https_proxy"]
          config.proxy.https = ENV["https_proxy"]
        end
        if ENV["no_proxy"]
          config.proxy.no_proxy = ENV["no_proxy"]
        end
      end

      #  config.vm.network "forwarded_port", guest: 80, host:80
      config.vm.network "public_network", bridge: 'eth2'

      # Can be handy to enable the gui
      # config.vm.provider :virtualbox do |vb|
      #  vb.gui = true
      # end
      

    end
{% endhighlight %}


### 3. Run the install

```
  ->1- Single Server: (A single-server deployment has the gateway and data 
processing server installed on the same system.)
    2- Gateway Server: (In a distributed deployment, the gateway server is 
installed on a dedicated system. Deployments with multiple gateway servers 
require a load balancer.)
    3- Data Processing Server: (In a distributed deployment, the data processing 
server is installed on a dedicated system. Deployments with more than one data 
processing server offer high availability by providing backup servers.)
```

I went with Single Server and it passed the validity checks.  It informed me where the stuff was going to be installed:

    Pre-Installation Summary
    ------------------------
    Review the following before continuing:
    Application Name
        HP Operations Manager i
    Application Shortname
        HPOMi
    Application Revision
        10.00.172
    Application Directory
        /opt/OV/
    Data Directory
        /var/opt/OV/


The install failed at this point :(

    Processing of 45 packages (Using Native rpm) scheduled.
    Completed checking the installation status of all packages.
    This process might take a while. Please do not interrupt...

    Starting the installation of the packages
     45 packages will be installed during this session. (Using Redhat Package 
    Manager)
    Executing the initialize actions for HP Operations Manager i 10.00.172
    Executing initialize action : Creating the _install.properties file
    Executing initialize action : Removing previous OV installations
    Executing the initialize actions for package HPOvPerlA 5.08.096 (HP Software 
    Perl)
    Installing package HPOvPerlA 5.08.096 (HP Software Perl)
    Logfile for package HPOvPerlA is located at : 
    /tmp/HPOvInstaller/HPOMi_10.00.172/Package_rpm_HPOvPerlA_install.log
    HPOvPerlA 05.08.096 (HP Software Perl) component package installation command 
    returned an error.
    Failure installing :  package HPOvPerlA 5.08.096 (HP Software Perl)
    Rolling back : package HPOvPerlA 5.08.096 (HP Software Perl)
    Installing package HPOvPerlA 5.08.096 (HP Software Perl)
    Logfile for package HPOvPerlA is located at : 
    /tmp/HPOvInstaller/HPOMi_10.00.172/Package_rpm_HPOvPerlA_install.log
    HPOvPerlA 05.08.096 (HP Software Perl) component package installation command 
    returned an error.
    Failure installing :  package HPOvPerlA 5.08.096 (HP Software Perl)
    Rollback failed : package HPOvPerlA 5.08.096 (HP Software Perl)
    Please note that the rollback operation which is attempted after a failed 
    installation also failed.
    Please make sure that the package : HPOvPerlA 05.08.096 (HP Software Perl) is 
    properly removed before any subsequent installation effort.
    ===============================================================================
    Component package installation failed.
    --------------------------------------
    There was a failure with this installation. Component package installation 
    command has returned a non-zero error code. HP Operations Manager i will not be
    installed.  To rollback this installation and remove all the installed 
    packages, click Rollback. To cancel the installation and leave all the packages
    intact, click Quit.
    Press enter to continue ... (Y/N): 

Next step was to try with red hat - as the script seems to be using RPMs.  

I changed the VagrantFile so that it was using centos.  I chose 6.5 as something recent but not too recent, and changed the box int the Vagrantfile to:

    config.vm.box = "chef/centos-6.5"

Then ran a vagrant destroy and an up.  

I had some problems with the vbOx Guest extensions because my Kernel wasn't at the right version. I upgraded ther kernel on the VM using:

    yum update
    yum install kernel-headers kernel-devel

Ran the install script again, picking the same options.

    vagrant ssh
    [vagrant@cambon1 vagrant]$  cd /vagrant/HP_OMi_10.00_installation_for_Linux_HP_OMi_10.00_for_Linux/
    sudo ./install.sh

I should probably take the above commands and add them to a vagrant provisioning script, but for this case this is enough for my purposes.  The install finished successfully, next step is to give this software a whirl.

    sudo /etc/init.d/OVCtrl start

 It started up .. tomorrow I'm going to start looking to see about using it. Quite excited about the product - the videos look awesome!