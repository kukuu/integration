# Containerisation

Source code of any  program cannot fully describe the function of that program without the context it will be compiled and run in. Most unexpected behaviour during deployment comes from build environments being different than expected. To make deployment repeatable, we need to make a program’s context repeatable. That’s where Docker comes in.

Docker essentially allows you to specify a “source code” for a program’s context that can then be “compiled” to an image and run as a container. This means that once we have tested an image we can have high confidence that it will perform equally well in every environment it is deployed to.

Additionally, Docker allows you to specify deploy configurations made up of multiple containers all linked in a private network and DNS that allows services that depend strongly on each other to be deployed and scaled together. 

To be fully context-agnostic, deployment should be able to happen to any host on the network on whatever port the host happens to have free. This presents a challenge: how do services link up when their network locations are fluid? You need a reverse proxy (like nginx) and a way to keep its configuration up to date in a changing service landscape.
You will need a  Consul to store and manage service states.


#### What a deployment looks like:

	1.	Build Docker image.

	2.	Test that image in isolation.

	3.	Push that image to the in-house image registry.

	4.	Pull all images you need to deploy linked.

	5.	Deploy them to a test environment.

	6.	Run automated tests against the container system.

	7.	Upload service configuration to Consul API (if changed).

	8.	Deploy the containers to all hosts, tagged with the offline colour.

	9.	Wait until they are all responding and passing automated checks.

	10.	Flip environment alias to point at the offline colour.

	11.	The new build is now online.
