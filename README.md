# frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Deployment

To deploy the frontend service to observe new changes, you can change the project's [Kubernetes manifests here](https://gitlab.com/gitlab-da/projects/tanuki-bank/frontend-delivery/-/blob/main/manifests/dev/frontend-dev.yaml). Once merged to the main 
branch of the Frontend Delivery project, you can see the [changes running here](http://tbank.ocpgitlab.com/). To observe the service's Kubernetes infrastructure, view the [dashboard here](https://gitlab.com/gitlab-da/projects/tanuki-bank/flux-config/-/environments/25590028).