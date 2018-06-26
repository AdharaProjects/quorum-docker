# quorum-docker

## Requirements

To make full use of this software docker and docker-compose is required.

The best install instructions can be found on the docker website: [docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) and [compose](https://docs.docker.com/compose/install/). The ['Post-installation steps for Linux'](https://docs.docker.com/install/linux/linux-postinstall/) are required too.

To run the tests locally [install the CircleCi tool](https://circleci.com/docs/2.0/local-cli/).

## Usage

A pre-configured 3 node network can be found in the `./examples/docker-compose.yml` file. To run this code make sure you have both docker and docker-compose installed (see the ['Requirement'](#requirements) section above) and run the command `docker-compose up -d`.

To manually run a 3 node network (this assumes that you have already [created](#create-and-manage-a-virtual-network) a docker network called examples_two_node_quorum `docker network create examples_node_quorum_net --subnet 172.14.1.1/16`):
```bash
docker run --name n1 --network=examples_node_quorum_net --ip=172.14.1.5 \
 -e KEEP_FILES='false' \
 -e NODE_NAME='node1' \
 -e CONSENSUS='istanbul' \
 -e ROLE='coordinator' \
 -e IP='172.14.1.5' \
 adharaprojects/basic-quorum:0.0.1

docker run --name n2 --network=examples_node_quorum_net --ip=172.14.1.6 \
 -e KEEP_FILES'=false' \
 -e NODE_NAME'=node2' \
 -e CONSENSUS'=istanbul' \
 -e IP'=172.14.1.6' \
 -e COORDINATING_IP'=172.14.1.5' \
 -e ROLE'=dynamicPeer' \
 -e DEPENDENT_IP'=172.14.1.5' \
 adharaprojects/basic-quorum:0.0.1

docker run --name n3 --network=examples_node_quorum_net --ip=172.14.1.7 \
 -e KEEP_FILES'=false' \
 -e NODE_NAME'=node2' \
 -e CONSENSUS'=istanbul' \
 -e IP'=172.14.1.7' \
 -e COORDINATING_IP'=172.14.1.5' \
 -e ROLE'=dynamicPeer' \
 -e DEPENDENT_IP'=172.14.1.6' \
 adharaprojects/basic-quorum:0.0.1
```

Note: you can use `-d` in the above commands to run the containers in terminal to run them in daemon mode and free up your terminal.

### Create and manage a virtual network

List all networks:

```bash
docker networs ls
```

Get more details about a network:

```bash
docker network inspect <network name or id>
```

Create a new network:

```bash
docker network create <network name>
```

Stop and remove a network (note, to do this you need to stop all containers using this network first):

```bash
docker network rm <network name or id>
```

Other useful commands are `connect`, `disconnect` and `prune`. Please see the [docs](https://docs.docker.com/engine/reference/commandline/network/) for more details.

## Upgrade instructions

If you make a change to the docker images, be it to the version of any of the binaries you are using, or larger changes. Please follow a basic scheme, for a x.y.z version number, a change in z represents a change that doesn't change the interface, y a change in the interface, and x for a large change such as upgrading the version of QNM or even Geth to one which is substantially different.

Build the image:
```bash
docker build -t adharaprojects/basic-quorum:x.y.z .
```

Update all references to the image in all the tests and examples.

Run the examples and tests to make sure they still work correctly.

```bash
circleci build
```

Once all these tests are passing create a PR :)

## Notes

The 'geth' binary in this container is from the 'CustomQuorum' that @rynobey created for project Khokha previously.

The version of the 'constellation-node' and 'istanbul' binaries are those used in QNM version `v0.7.5-beta`.

It is also important to note that I do not build the binary executables in the docker containers. I copy across pre-built images. This isn't ideal, but at least keeps the containers simple.
