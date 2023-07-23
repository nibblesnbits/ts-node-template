# Demo TypeScript/Express API

This project contains an API implemented with TypeScript and Express, using TypeORM and Postgres for data access.

## Local Development

To run this project locally, simply install the dependencies with `npm install`, and run it with `npm start` or `npm run dev`.

> **NOTE:** This project also uses `dotenv-flow` for environment configuration (see `tsconfig.dev.json`), so don't forget to create a `.env` file at the root before running.


## Local Deployment (with `minikube`)

To deploy this project to a local minkube cluster, first ensure your terminal is configured to push images directly to minikube.

```sh
eval $(minikube docker-env)
```

Then you may run the local build script, `./docker-build.sh`.  This will build and push the image to minikube. (*This `Dockerfile` includes the use of a `.npmrc` file as a secret in the build as noted by [this guide](), hence the convenience script for building.*)


A Helm chart is provided in this project for simplified local deployment as well.  In order to use it, you must create a file at the root of the project named `helm.values.local.yaml`.  Here is an example contents:

```yaml
secrets:
  DB_PASSWORD: 'postgres'

env:
  PORT: 3000
  DB_HOST: 'host.docker.internal' # points to the local machine
  DB_USER: 'postgres'
  DB_NAME: 'postgres'
  DB_PORT: 5432

image:
  tag: "latest"

ingress:
  enabled: true
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
  className: "nginx"
  hosts:
    - host: my-api.my-org.local  # don't forget this entry in your hosts file
      paths:
        - path: /
          pathType: ImplementationSpecific

```

Once created, you can use the `./local-deploy.sh` script to deploy the project.
